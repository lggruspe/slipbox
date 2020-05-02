pandoc.utils = require "pandoc.utils"
local sqlite3 = require "lsqlite3"

local title
local database
local relpath
local bibliography_html
local db

local function get_some_metadata(m)
    title = pandoc.utils.stringify(m.title or "")
    database = m.database
    relpath = m.relpath
    bibliography_html = m["bibliography-zettel"] or ""
    db = sqlite3.open(database) -- closed in log_warnings
end

local function get_alternative_title_from_header(elem)
    assert(title)
    if title == "" and elem.level == 1 then
        title = pandoc.utils.stringify(elem.content)
        return {}
    end
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

function add_backlinks(doc)
    local blocklists = {}
    for backlink in get_backlinks(db, doc.meta.relpath) do
        local filename = backlink.filename
        local link = backlink.relative_backlink
        local content = string.format("%s (%s)", backlink.title or "", filename)
        local description = string.format(" - %s", backlink.description)
        local block = pandoc.Plain {
            pandoc.Link(pandoc.Str(content), link),
            pandoc.Str(description),
        }
        table.insert(blocklists, {block})
    end

    if next(blocklists) then
        table.insert(doc.blocks, pandoc.HorizontalRule())
        table.insert(doc.blocks, pandoc.Header(3, pandoc.Str "See also"))
        table.insert(doc.blocks, pandoc.BulletList(blocklists))
    end
    return doc
end

local warnings = {}

local function fix_links(elem)
    -- converts markdown to html links and fixes citation links
    if elem.target == "" then
        warnings["empty link"] = pandoc.utils.stringify(elem.content)
        elem = elem.content
    elseif elem.target:match("^#ref-") then
        elem.target = bibliography_html .. elem.target
    else
        elem.target = elem.target:gsub("(.*).md$", "%1.html")
    end
    return elem
end

local function log_warnings(m)
    for warning, context in pairs(warnings) do
        io.stderr:write(string.format("Warning: %s in %s (%s)\n", warning, m.relpath, context))
    end
    db:close()
end

return {
    { Meta = get_some_metadata },
    {
        Header = get_alternative_title_from_header,
        Meta = set_missing_metadata,
        Pandoc = add_backlinks,
    },
    { Link = fix_links, Meta = log_warnings },
}
