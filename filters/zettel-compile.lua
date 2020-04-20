pandoc.utils = require "pandoc.utils"

local sqlite3 = require "lsqlite3"

local title = nil

local function get_alternative_title_from_header(elem)
    if not title and elem.level == 1 then
        title = pandoc.utils.stringify(elem.content)
        elem = {}
    end
    return elem
end

local function set_missing_titles(m)
    if not m.title then
        m.title = pandoc.MetaString(title or "")
    end
    m.subtitle = pandoc.MetaString(m.relpath)
    return m
end

local function get_relative_link(db, src, dest)
    local stmt = db:prepare [[
        SELECT relative_link FROM links WHERE src = ? AND original_link = ?
    ]]
    stmt:bind_values(src, dest)
    for row in stmt:nrows() do
        return row.relative_link
    end
end

local database
local relpath

local function get_some_metadata(m)
    database = m.database
    relpath = m.relpath
end

function fix_relative_links(elem)
    -- fixes links not relative to file
    local db = sqlite3.open(database)
    local dest = get_relative_link(db, relpath, elem.target)
    elem.target = dest or elem.target
    db:close()
    return elem
end

local function get_backlinks(db, filename)
    local stmt = db:prepare [[
        SELECT * FROM links JOIN notes ON src = filename
            WHERE dest = ? AND description != ""
    ]]
    stmt:bind_values(filename)
    return stmt:nrows()
end

function add_backlinks(doc)
    local db = sqlite3.open(doc.meta.database)
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

    table.insert(doc.blocks, pandoc.HorizontalRule())

    if next(blocklists) then
        table.insert(doc.blocks, pandoc.Header(3, pandoc.Str "See also"))
        table.insert(doc.blocks, pandoc.BulletList(blocklists))
    end
    db:close()
    return doc
end

local warnings = {}

local function modify_html_links(elem)
    if elem.target == "" then
        warnings["empty link"] = pandoc.utils.stringify(elem.content)
        elem = elem.content
    else
        elem.target = elem.target:gsub("(.*).md", "%1.html")
    end
    return elem
end

local function log_warnings(m)
    for warning, context in pairs(warnings) do
        io.stderr:write(string.format("Warning: %s in %s (%s)\n", warning, m.relpath, context))
    end
end

local function add_reference_section(doc)
    local header = pandoc.Header(3, pandoc.Str "References")
    local blocks = {header}
    local section = pandoc.Div(blocks, pandoc.Attr("refs"))
    table.insert(doc.blocks, section)
    return doc
end

return {
    { Header = get_alternative_title_from_header, Meta = set_missing_titles },
    { Meta = get_some_metadata },
    { Link = fix_relative_links },
    { Pandoc = add_backlinks },
    { Link = modify_html_links, Meta = log_warnings },
    { Pandoc = add_reference_section },
}
