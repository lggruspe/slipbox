-- Pandoc filters for collecting data.

local utils = require "filters/utils"

local function citations(id, slipbox)
  -- Create div filter that saves citations for note ID.
  assert(type(id) == "number")
  return {
    Cite = function(elem)
      for _, citation in pairs(elem.citations) do
        slipbox:save_citation(id, citation.id)
      end
    end
  }
end

local function tags(id, slipbox)
  -- Create div filter that saves #tags for note ID.
  assert(type(id) == "number")
  return {
    Str = function(elem)
      if utils.hashtag_prefix(elem.text) then
        slipbox:save_tag(id, elem.text)
      end
    end
  }
end

local function links(id, slipbox)
  -- Create div filter that saves links from note ID.
  assert(type(id) == "number")
  return {
    Link = function(elem)
      local link = utils.get_link(id, elem)
      if link then
        slipbox:save_link(link)
      end
    end
  }
end

return {
  citations = citations,
  links = links,
  tags = tags,
}
