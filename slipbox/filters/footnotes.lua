local function make_footnote_filter(footnotes)
  local fn = 0
  local function Note(elem)
    fn = fn + 1
    table.insert(footnotes, pandoc.Div(elem.content))
    return pandoc.Superscript(pandoc.Str(tostring(fn)))
  end
  return {Note = Note}
end

local function list_footnotes(footnotes)
  local ol = pandoc.OrderedList {}
  for _, block in ipairs(footnotes) do
    table.insert(ol.content, {block})
  end
  return ol
end

return {
  make_footnote_filter = make_footnote_filter,
  list_footnotes = list_footnotes,
}
