pandoc.utils = require "pandoc.utils"
local sqlite3 = require "lsqlite3"

local relpath
local warnings = {}

local function get_relpath(m)
    relpath = m.relpath
end

function Link(elem)
    assert(relpath)
    if elem.target == "" then
        warnings["empty link"] = pandoc.utils.stringify(elem.content)
        elem = elem.content
    else
        elem.target = elem.target:gsub("(.*).md", "%1.html")
    end
    return elem
end

local function show_warnings(m)
    for warning, context in pairs(warnings) do
        io.stderr:write(string.format("Warning: %s in %s (%s)\n", warning, m.relpath, context))
    end
end

return {
    { Meta = get_relpath },
    { Link = Link, Meta = show_warnings }
}
