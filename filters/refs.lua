function Pandoc(doc)
    local header = pandoc.Header(3, pandoc.Str "References")
    local blocks = {header}
    local section = pandoc.Div(blocks, pandoc.Attr("refs"))
    table.insert(doc.blocks, section)
    return doc
end
