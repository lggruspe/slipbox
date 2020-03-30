pandoc.utils = require "pandoc.utils"
local metadata = require "zettel.metadata"

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
    local filename = metadata.get_filename(m)
    for warning, context in pairs(warnings) do
        io.stderr:write(string.format("Warning: %s in %s (%s)\n", warning, filename, context))
    end
end
