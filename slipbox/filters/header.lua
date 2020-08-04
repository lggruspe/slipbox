pandoc.utils = require "pandoc.utils"

local function parse_id_and_title(s)
  local pattern = '^(%d+)%s+(.+)$'
  local id, count = s:gsub(pattern, '%1')
  if count == 0 then return nil end
  local title
  title, count = s:gsub(pattern, '%2')
  if count ~= 0 then
    local _id = tonumber(id)
    assert(_id)
    return {id = _id, title = title}
  end
end

local function make_id_title_filter(slipbox)
  -- Create filter for processing header ids and titles
  -- and splitting the document into sections.
  local function Header(elem)
    -- Try to set elem id and title from content.
    local content = pandoc.utils.stringify(elem.content)
    local h = parse_id_and_title(content)
    if h then
      slipbox:save_note(h)
      elem.identifier = h.id
      elem.attributes.title = h.title
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
  parse_id_and_title = parse_id_and_title,
}
