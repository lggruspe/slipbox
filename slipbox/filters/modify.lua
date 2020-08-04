-- Pandoc filters for modifying notes.

pandoc.utils = require "pandoc.utils"
local utils = require "filters/utils"

local function tags()
  -- Create div filter that turns #tags into links.
  return {
    Str = function(elem)
      if utils.hashtag_prefix(elem.text) then
        return pandoc.Link({elem}, '#'..elem.text)
      end
    end
  }
end

local function links()
  -- Create div filter that rewrites links with empty targets/text.
  return {
    Link = function(elem)
      if not elem.target or elem.target == "" then
        return elem.content
      end

      local content = pandoc.utils.stringify(elem.content or "")
      if content == "" then
        return {
          pandoc.Str " [",
          pandoc.Link(
            {pandoc.Str(elem.target)},
            elem.target,
            elem.title),
          pandoc.Str "]",
        }
      end
    end
  }
end

return {
  links = links,
  tags = tags,
}
