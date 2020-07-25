local function make_footnote_filter(footnotes)
  local function Note(elem)
    io.stderr:write([[[WARNING] Slipbox does not support footnotes.
  Footnote will be moved to the end of the section.
]])
    for _, block in ipairs(elem.content) do
      table.insert(footnotes, block)
    end
    return {}
  end
  return {Note = Note}
end

return {make_footnote_filter = make_footnote_filter}
