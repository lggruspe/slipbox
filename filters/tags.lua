local metadata = require "zettel.metadata"

function Pandoc(doc)
    local keywords = metadata.get_keywords(doc.meta) or ""
    table.insert(doc.blocks, pandoc.Para(keywords))
    return doc
end
