local function to_hashtag(s)
  return s:match('^#+[^%s]+$')
end

local function make_tag_filter(div, slipbox)
  -- create filter to walk div block
  local function Str(elem)
    -- save hashtag keywords
    -- run by walking from div
    if to_hashtag(elem.text) then
      local id = tonumber(div.identifier)
      if id then slipbox:save_tag(id, elem.text) end

      -- convert to link
      return pandoc.Link({elem}, '#'..elem.text)
    end
  end
  return {Str = Str}
end

return {
  make_tag_filter = make_tag_filter,
}
