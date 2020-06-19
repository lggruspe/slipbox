local function make_cite_filter(div, slipbox)
  -- Create filter that records citations.
  local function Cite(elem)
    for _, citation in pairs(elem.citations) do
      slipbox:save_citation(div.identifier, citation.id)
    end
  end
  return {Cite = Cite}
end

return {
  make_cite_filter = make_cite_filter,
}
