local function section_filter(div, slipbox)
  -- Create filter that records citations.
  local function Cite(elem)
    local id = tonumber(div.identifier)
    if id then
      for _, citation in pairs(elem.citations) do
        slipbox:save_citation(id, citation.id)
      end
    end
  end
  return {Cite = Cite}
end

return {
  section_filter = section_filter,
}
