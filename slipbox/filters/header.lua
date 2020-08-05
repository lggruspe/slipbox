pandoc.utils = require "pandoc.utils"
local utils = require "filters/utils"

local function make_id_title_filter(slipbox)
  -- Create filter for processing header ids and titles
  -- and splitting the document into sections.
  local function Header(elem)
    -- Try to set elem id and title from content.
    local content = pandoc.utils.stringify(elem.content)

    local id, title = utils.parse_id_and_title(content)
    if id and title then
      slipbox:save_note(id, title)
      elem.identifier = id
      elem.attributes.title = title
      elem.attributes.level = elem.level
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

return {
  make_id_title_filter = make_id_title_filter,
}
