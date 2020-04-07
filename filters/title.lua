pandoc.utils = require "pandoc.utils"
local metadata = require "zettel.metadata"

local title = nil

function Header(elem)
    if not title and elem.level == 1 then
        title = pandoc.utils.stringify(elem.content)
        elem = {}
    end
    return elem
end

function Pandoc(doc)
    if not doc.meta.title then
        doc.meta.title = pandoc.MetaString(title or "")
    end
    doc.meta.subtitle = pandoc.MetaString(metadata.get_filename(doc.meta))
    return doc
end
