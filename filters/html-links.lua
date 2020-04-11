pandoc.utils = require "pandoc.utils"

local warnings = {}

function Link(elem)
    if elem.target == "" then
        warnings["empty link"] = pandoc.utils.stringify(elem.content)
        elem = elem.content
    else
        elem.target = elem.target:gsub("(.*).md", "%1.html")
    end
    return elem
end

function Meta(m)
    for warning, context in pairs(warnings) do
        io.stderr:write(string.format("Warning: %s in %s (%s)\n", warning, m.relpath, context))
    end
end
