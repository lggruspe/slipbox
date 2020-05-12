pandoc.utils = require "pandoc.utils"
local pl = {}
pl.path = require "pl.path"
local sqlite3 = require "lsqlite3"

local title
local database
local relpath
local basedir
local db

local function fz_parent(id)
    local id, ok = id:gsub("^(.-)%d+$", "%1")
    if ok ~= 0 then return id, ok end
    return id:gsub("^(.-)%a+$", "%1")
end

local function get_some_metadata(m)
    title = pandoc.utils.stringify(m.title or "")
    database = m.database
    basedir = m.basedir
    relpath = m.relpath
    db = sqlite3.open(database) -- closed in log_warnings
end

local function get_alternative_title_from_header(elem)
    assert(title)
    if title == "" and elem.level == 1 then
        title = pandoc.utils.stringify(elem.content)
        return {}
    end
end

local citations = 0
local function count_citations(elem)
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
    m.title = m.title or pandoc.MetaString(title or "")
    m.subtitle = m.subtitle or pandoc.MetaString(m.relpath or "")
    return m
end

local function backlinks_section()
    local blocklists = {}
    local start = pl.path.join(basedir, pl.path.dirname(relpath))
    for backlink in get_backlinks(db, relpath) do
        local filename = backlink.filename
        local link = pl.path.relpath(pl.path.join(basedir, backlink.src), start)
        local content = string.format("%s (%s)", backlink.title or "", filename)
        local description = string.format(" - %s", backlink.description)
        local block = pandoc.Plain {
            pandoc.Link(pandoc.Str(content), link),
            pandoc.Str(description),
        }
        table.insert(blocklists, {block})
    end
    if next(blocklists) then
        return pandoc.BulletList(blocklists)
    else
        return nil
    end
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
    --         parents = {
    --             [<parent seqnums>] = {
    --                 title = [<title of parent note>],
    --                 filename = [<filename of parent note>],
    --             }
    --         },
    --         children = {
    --             [<children seqnums>] = {
    --                 title = [<title of child note>],
    --                 filename = [<filename of child note>],
    --             }
    --         },
    --     }
    -- }

    -- first get fz-outlines that contain current note
    local sql = db:prepare [[
        SELECT outline, title, seqnum
            FROM folgezettels JOIN notes ON outline = filename
                WHERE note = ?
    ]]
    sql:bind_values(relpath)
    for row in sql:nrows() do
        if not folgezettels[row.outline] then
            folgezettels[row.outline] = {
                title = row.title,
                seqnums = {},
                parents = {},
                children = {},
            }
        end
        folgezettels[row.outline].seqnums[row.seqnum] = true

        -- then get neighbor notes
        local fz_sql = db:prepare [[
            SELECT title, filename, seqnum
                FROM notes JOIN folgezettels ON note = filename
                    WHERE outline = ? AND (seqnum = ? OR seqnum LIKE ?)
        ]]
        local parent = fz_parent(row.seqnum)
        local children = string.format("%s_", row.seqnum)
        fz_sql:bind_values(row.outline, parent, children)
        for neighbor in fz_sql:nrows() do
            -- check if really parent or child
            if neighbor.seqnum == parent then
                folgezettels[row.outline].parents[neighbor.seqnum] = {
                    title = neighbor.title,
                    filename = neighbor.filename,
                }
            elseif fz_parent(neighbor.seqnum) == row.seqnum then
                folgezettels[row.outline].children[neighbor.seqnum] = {
                    title = neighbor.title,
                    filename = neighbor.filename,
                }
            end
        end
    end
    return folgezettels
end

local function get_sequences(db)
    local seqs = {}
    local prevs = db:prepare [[
        SELECT prev, outline, P.title as prev_title, O.title as outline_title
            FROM (sequences JOIN notes P ON prev = P.filename)
                JOIN notes O on outline = O.filename
                    WHERE next = ?
    ]]
    prevs:bind_values(relpath)
    for row in prevs:nrows() do
        if not seqs[row.outline] then
            seqs[row.outline] = {
                title = row.outline_title,
                prevs = {},
                nexts = {},
            }
        end
        table.insert(seqs[row.outline].prevs, {
            title = row.prev_title,
            path = row.prev,
        })
    end
    local nexts = db:prepare [[
        SELECT next, outline, N.title as next_title, O.title as outline_title
            FROM (sequences JOIN notes N on next = N.filename)
                JOIN notes O on outline = O.filename
                    WHERE prev = ?
    ]]
    nexts:bind_values(relpath)
    for row in nexts:nrows() do
        if not seqs[row.outline] then
            seqs[row.outline] = {
                title = row.outline_title,
                prevs = {},
                nexts = {},
            }
        end
        table.insert(seqs[row.outline].nexts, {
            title = row.next_title,
            path = row.next,
        })
    end
    return seqs
end

local function sequences_section()
    local sequences = get_sequences(db)
    if not next(sequences) then return nil end

    local block = {}
    local current_start = pl.path.join(basedir, pl.path.dirname(relpath))
    for outline, links in pairs(sequences) do
        local content = pandoc.Str(string.format("%s (%s)", links.title, outline))
        local target = pl.path.relpath(pl.path.join(basedir, outline), current_start)
        table.insert(block, pandoc.Para{
            pandoc.Link(content, target)
        })
        local list = {}
        for _, note in ipairs(links.prevs) do
            local content = pandoc.Str(string.format("%s (%s)", note.title, note.path))
            local target = pl.path.relpath(pl.path.join(basedir, note.path), current_start)
            table.insert(list, pandoc.Para{
                pandoc.Str "Prev: ",
                pandoc.Link(content, target),
            })
        end
        for _, note in ipairs(links.nexts) do
            local content = pandoc.Str(string.format("%s (%s)", note.title, note.path))
            local target = pl.path.relpath(pl.path.join(basedir, note.path), current_start)
            table.insert(list, pandoc.Para{
                pandoc.Str "Next: ",
                pandoc.Link(content, target),
            })
        end
        table.insert(block, pandoc.Div(list))
    end
    return pandoc.Div(block)
end

local function references_section()
    if citations > 0 then
        return pandoc.Header(3, pandoc.Str "References")
    else
        return nil
    end
end

local function folgezettels_section()
    local folgezettels = get_folgezettels(db)
    if not next(folgezettels) then return nil end
    local block = {}
    for path, outline in pairs(folgezettels) do
        table.insert(block, pandoc.Para{
            pandoc.Link(
                pandoc.Str(string.format("%s (%s)", outline.title, path)),
                pl.path.relpath(pl.path.join(basedir, path), pl.path.join(basedir, pl.path.dirname(relpath)))
            )
        })

        local self_links = {pandoc.Str "Current note: "}
        for seqnum in pairs(outline.seqnums) do
            table.insert(self_links, pandoc.Link(pandoc.Str(seqnum), "#"))
            table.insert(self_links, pandoc.Str " ")
        end
        table.insert(block, pandoc.Para(self_links))

        for seqnum, parent in pairs(outline.parents) do
            table.insert(block, pandoc.Para{
                pandoc.Str(parent.title .. ": "),
                pandoc.Link(
                    pandoc.Str(seqnum),
                    pl.path.relpath(pl.path.join(basedir, parent.filename), pl.path.join(basedir, pl.path.dirname(relpath)))
                ),
            })
        end
        for seqnum, child in pairs(outline.children) do
            table.insert(block, pandoc.Para{
                pandoc.Str(child.title .. ": "),
                pandoc.Link(
                    pandoc.Str(seqnum),
                    pl.path.relpath(pl.path.join(basedir, child.filename), pl.path.join(basedir, pl.path.dirname(relpath)))
                ),
            })
        end
    end
    return pandoc.Div(block)
end

local function generate_extra_sections(doc)
    local backlinks = backlinks_section()
    local references = references_section()
    local sequences = sequences_section()
    local folgezettels = folgezettels_section()
    if backlinks or references or sequences or folgezettels then
        table.insert(doc.blocks, pandoc.HorizontalRule())
        if sequences then
            table.insert(doc.blocks, pandoc.Header(3, pandoc.Str "Sequences"))
            table.insert(doc.blocks, sequences)
        end
        if folgezettels then
            table.insert(doc.blocks, pandoc.Header(3, pandoc.Str "Folgezettels"))
            table.insert(doc.blocks, folgezettels)
        end
        if backlinks then
            table.insert(doc.blocks, pandoc.Header(3, pandoc.Str "See also"))
            table.insert(doc.blocks, backlinks)
        end
        if references then
            table.insert(doc.blocks, references)
        end
        return doc
    end
end

local warnings = {}

local function fix_links(elem)
    -- converts markdown to html links
    if elem.target == "" then
        warnings["Empty link"] = pandoc.utils.stringify(elem.content)
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
    db:close()
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
