local function section_filter(id, slipbox)
  -- Create filter that records citations for note ID.
  assert(type(id) == "number")

  local function Cite(elem)
    for _, citation in pairs(elem.citations) do
      slipbox:save_citation(id, citation.id)
    end
  end
  return {Cite = Cite}
end

return {
  section_filter = section_filter,
}
