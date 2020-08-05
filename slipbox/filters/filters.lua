-- Pandoc filters.

pandoc.utils = require "pandoc.utils"

local utils = require "filters/utils"

local function init(slipbox)
  -- Create filter that preprocesses headers by splitting the document
  -- into sections.

  local function Header(elem)
    local content = pandoc.utils.stringify(elem.content)
    local id, title = utils.parse_id_and_title(content)
    if id and title then
      slipbox:save_note(id, title)
      elem.identifier = id
      elem.attributes.title = title
      elem.attributes.level = elem.level  -- Gets added to parent section
      return elem
    end
  end

  local function Pandoc(doc)
    doc.blocks = pandoc.utils.make_sections(false, nil, doc.blocks)
    return doc
  end

  return {
    Header = Header,
    Pandoc = Pandoc,
  }
end

local function collect(id, slipbox)
  -- Create filter that saves citations, links and tags.

  assert(type(id) == "number")
  return {
    Cite = function(elem)
      for _, citation in pairs(elem.citations) do
        slipbox:save_citation(id, citation.id)
      end
    end,

    Link = function(elem)
      local link = utils.get_link(id, elem)
      if link then
        slipbox:save_link(link)
      end
    end,

    Str = function(elem)
      if utils.hashtag_prefix(elem.text) then
        slipbox:save_tag(id, elem.text)
      end
    end,
  }
end

return {
  init = init,
  collect = collect,
}
