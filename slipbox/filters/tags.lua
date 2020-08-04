local function hashtag_prefix(s)
  return s:match('^#+[-_a-zA-Z0-9]+')
end

local function section_filter(div, slipbox)
  -- create filter to walk div block
  local function Str(elem)
    -- save hashtag keywords
    -- run by walking from div
    if hashtag_prefix(elem.text) then
      local id = tonumber(div.identifier)
      if id then slipbox:save_tag(id, elem.text) end

      -- convert to link
      return pandoc.Link({elem}, '#'..elem.text)
    end
  end
  return {Str = Str}
end

return {
  section_filter = section_filter,
  hashtag_prefix = hashtag_prefix,
}
