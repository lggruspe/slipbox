local utils = require "filters/utils"

local function parse_number_target(s)
  -- Return identifier if s is a section number.
  local t, count = s:gsub('^#(%d+)$', '%1')
  if count ~= 0 then
    return tonumber(t)
  end
end

local function get_link(div, link)
  assert(div.tag == "Div" and link.tag == "Link")

  local tag = "sequence"
  local seqnum = link.title or ""
  if not utils.is_valid_alias(seqnum) then
    tag = "direct"
  end
  if seqnum:match '^%d+$' then
    tag = "direct"
  end

  local src = tonumber(div.identifier)
  local dest = parse_number_target(link.target)
  if src and dest then
    return {
      tag = tag,
      src = src,
      dest = dest,
      description = link.title,
    }
  end
end

local function is_textless_link(elem)
  -- Check if pandoc Link has no content.
  assert(elem.tag == "Link")
  local content = pandoc.utils.stringify(elem.content or "")
  return content == nil or content == ""
end

local function rewrite_textless_link(link, elem)
  -- Create a new pandoc Link for textless links.
  --
  -- link
  -- : Either a direct or a sequence link.
  -- elem
  -- : A pandoc Link object.
  assert(elem.tag == "Link")
  assert(link.tag == "direct" or link.tag == "sequence")
  if is_textless_link(elem) then
    local title = link.description
    return {
      pandoc.Str" [",
      pandoc.Link({pandoc.Str(link.dest)}, elem.target, title, elem.attributes),
      pandoc.Str']',
    }
  end
end

local function make_link_filter(div, slipbox)
  -- Create filter to walk div block.
  local function Link(elem)
    -- Process direct links and sequence links.
    -- Run by walking from div.
    if not elem.target or elem.target == "" then return elem.content end

    local link = get_link(div, elem)
    if link then
      assert(link.tag == "sequence" or link.tag == "direct")
      slipbox:save_link(link)
      return rewrite_textless_link(link, elem)
    end
  end

  return {Link = Link}
end

return {
  make_link_filter = make_link_filter,
  -- private:
  get_link = get_link,
}
