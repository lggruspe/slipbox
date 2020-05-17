pandoc.utils = require "pandoc.utils"
local pl = {}
pl.path = require "pl.path"
local sqlite3 = require "lsqlite3"

local metadata = {}

local function fz_parent(id)
    local ok
    id, ok = id:gsub("^(.-)%d+$", "%1")
    if ok ~= 0 then return id, ok end
    return id:gsub("^(.-)%a+$", "%1")
end

local function next_seqnum(seqnum)
    local c = seqnum:sub(#seqnum, #seqnum)
    return seqnum .. (c:match('%d') and 'a' or c:match('%a') and '1' or "")
end

local function get_some_metadata(m)
    metadata.title = pandoc.utils.stringify(m.title or "")
    metadata.basedir = m.basedir
    metadata.relpath = m.relpath
    metadata.folgezettel = m.folgezettel == true
    metadata.database = sqlite3.open(m.database) -- closed in log_warnings
end

local function get_alternative_title_from_header(elem)
    assert(metadata.title)
    if metadata.title == "" and elem.level == 1 then
        metadata.title = pandoc.utils.stringify(elem.content)
        return {}
    end
end

local citations = 0
local function count_citations()
    citations = citations + 1
end

local function get_backlinks(db, filename)
    local stmt = db:prepare [[
        SELECT * FROM links JOIN notes ON src = filename
            WHERE dest = ? AND description != ""
    ]]
    stmt:bind_values(filename)
    return stmt:nrows()
end

local function set_missing_metadata(m)
    m.title = m.title or pandoc.MetaString(metadata.title or "")
    m.subtitle = m.subtitle or pandoc.MetaString(m.relpath or "")
    return m
end

local function backlinks_section()
    local basedir = metadata.basedir
    local relpath = metadata.relpath
    local database = metadata.database

    local items = {}
    local start = pl.path.join(basedir, pl.path.dirname(relpath))
    for backlink in get_backlinks(database, relpath) do
        local term = {}
        local description = {}
        local item = {term, description}
        table.insert(items, item)
        table.insert(term, pandoc.Link(
            pandoc.Str(string.format("%s (%s)",
                backlink.title or "",
                backlink.filename)
            ),
            pl.path.relpath(pl.path.join(basedir, backlink.src), start)
        ))
        table.insert(description, {
            pandoc.Plain(pandoc.Str(backlink.description))
        })
    end
    if next(items) then return pandoc.DefinitionList(items) else return nil end
end

local function get_folgezettels(db)
    -- get neighbor notes based on folgezettel-type outlines
    local folgezettels = {}
    -- folgezettels table structure:
    -- folgezettels = {
    --     [<outline paths>] = {
    --         title = [<outline title>],
    --         seqnums = {
    --             [<seqnums of current note in outline>] = true,
    --         },
    --         neighbors = {
    --             {
    --                 seqnum = [<seqnum>],
    --                 title = [<title>],
    --                 filename = [<filename>],
    --             }, ...
    --         },
    --     }
    -- }

    -- first get fz-outlines that contain current note
    local sql = db:prepare [[
        SELECT outline, title, seqnum
            FROM folgezettels JOIN notes ON outline = filename
                WHERE note = ?
    ]]
    sql:bind_values(metadata.relpath)
    for row in sql:nrows() do
        if not folgezettels[row.outline] then
            folgezettels[row.outline] = {
                title = row.title,
                seqnums = {},
                neighbors = {},
            }
        end
        folgezettels[row.outline].seqnums[row.seqnum] = true

        -- then get neighbor notes
        local fz_sql = db:prepare [[
            SELECT title, filename, seqnum
                FROM notes JOIN folgezettels ON note = filename
                    WHERE outline = ? AND (seqnum = ? OR seqnum LIKE ?)
                        ORDER BY seqnum
        ]]
        local parent = fz_parent(row.seqnum)
        local children = string.format("%s_", row.seqnum)
        fz_sql:bind_values(row.outline, parent, children)
        for neighbor in fz_sql:nrows() do
            -- check if really parent or child
            if neighbor.seqnum == parent or fz_parent(neighbor.seqnum) == row.seqnum then
                table.insert(folgezettels[row.outline].neighbors, {
                    seqnum = neighbor.seqnum,
                    title = neighbor.title,
                    filename = neighbor.filename,
                })
            end
        end
    end
    return folgezettels
end

local function references_section()
    if citations > 0 then
        return pandoc.Header(3, pandoc.Str "References")
    else
        return nil
    end
end

local function folgezettels_section()
    local basedir = metadata.basedir
    local relpath = metadata.relpath
    local database = metadata.database
    local folgezettels = get_folgezettels(database)
    if not next(folgezettels) then return nil end
    local block = {}
    local pardir = pl.path.join(basedir, pl.path.dirname(relpath))
    for path, outline in pairs(folgezettels) do
        table.insert(block, pandoc.Para{
            pandoc.Link(
                pandoc.Str(string.format("%s (%s)", outline.title, path)),
                pl.path.relpath(pl.path.join(basedir, path), pardir))
        })

        local self_links = {pandoc.Str "Current note: "}
        local current_seqnums = {}
        for seqnum in pairs(outline.seqnums) do
            table.insert(current_seqnums, seqnum)
        end
        table.sort(current_seqnums)
        for i, seqnum in ipairs(current_seqnums) do
            if i > 1 then table.insert(self_links, pandoc.Str ", ") end
            table.insert(self_links, pandoc.Str(seqnum))
        end
        table.insert(block, pandoc.Para(self_links))

        for _, neighbor in ipairs(outline.neighbors) do
            table.insert(block, pandoc.Para{
                pandoc.Str(string.format("[%s]: ", neighbor.seqnum)),
                pandoc.Link(
                    pandoc.Str(string.format("%s (%s)", neighbor.title, neighbor.filename)),
                    pl.path.relpath(pl.path.join(basedir, neighbor.filename), pardir)),
            })
        end
    end
    return pandoc.Div(block)
end

local function generate_extra_sections(doc)
    local backlinks = backlinks_section()
    local references = references_section()
    local folgezettels = folgezettels_section()
    if backlinks or references or folgezettels then
        table.insert(doc.blocks, pandoc.HorizontalRule())
        if folgezettels then
            table.insert(doc.blocks, pandoc.Header(3, pandoc.Str "Folgezettels"))
            table.insert(doc.blocks, folgezettels)
        end
        if backlinks then
            table.insert(doc.blocks, pandoc.Header(3, pandoc.Str "Backlinks"))
            table.insert(doc.blocks, backlinks)
        end
        if references then
            table.insert(doc.blocks, references)
        end
        return doc
    end
end

local warnings = {}

local current_seqnum = "0"
local function fix_links(elem)
    -- converts markdown to html links
    local content = pandoc.utils.stringify(elem.content)
    if metadata.folgezettel then
        -- add seqnum to textless links
        if content == "" then
            elem.content = {pandoc.Str(current_seqnum)}
            current_seqnum = next_seqnum(current_seqnum)
        end
    end

    if elem.target == "" then
        warnings["Empty link"] = content
        elem = elem.content
    else
        elem.target = elem.target:gsub("(.*).md$", "%1.html")
    end
    return elem
end

local function log_warnings(m)
    for warning, context in pairs(warnings) do
        io.stderr:write(string.format("[WARNING] %s in %s (%s)\n", warning, m.relpath, context))
    end
    metadata.database:close()
end

return {
    { Meta = get_some_metadata },
    {
        Header = get_alternative_title_from_header,
        Cite = count_citations,
        Meta = set_missing_metadata,
        Pandoc = generate_extra_sections,
    },
    { Link = fix_links, Meta = log_warnings },
}
