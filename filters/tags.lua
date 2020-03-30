local metadata = require "zettel.metadata"

function Pandoc(doc)
    local keywords = metadata.get_keywords(doc.meta)
    if next(keywords) then
        local content = table.concat(keywords, ', ')
        table.insert(doc.blocks, pandoc.Para(content))
    end
    return doc
end
