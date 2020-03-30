pandoc.utils = require "pandoc.utils"

function Pandoc(doc)
    doc.meta.subtitle = pandoc.MetaString(doc.meta.filename)
    return doc
end
