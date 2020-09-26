local function hashtag_prefix(s)
  return s:match '^#+[-_a-zA-Z0-9]+'
end

local function cluster_link_prefix(s)
  local tag_pattern = '^#[-_a-zA-Z0-9]+'
  local tag = s:match(tag_pattern)
  if tag then
    local link_pattern = '^/[0-9]+'
    local link = s:sub(#tag + 1):match(link_pattern)
    if link then
      return tag, tonumber(link:sub(2)), 'N'
    else
      local child_pattern = '^/[-_a-zA-Z0-9]+'
      local child = s:sub(#tag + 1):match(child_pattern)
      if child then
        return tag, '#' .. child:sub(2), 'T'
      end
      return tag
    end
  end
end

local function get_link(src, link)
  assert(link.tag == "Link")
  assert(type(src) == "number")
  if not link.target:match('^#%d+$') then return end
  return {
    src = src,
    dest = tonumber(link.target:sub(2)),
    description = link.title,
  }
end

local function parse_id_and_title(s)
  local pattern = '^%s*(%d+)%s+(.-)%s*$'
  local id, count = s:gsub(pattern, '%1')
  if count == 0 then return nil end
  local title
  title, count = s:gsub(pattern, '%2')
  if count ~= 0 and title ~= "" then
    id = tonumber(id)
    assert(type(id) == "number")
    assert(type(title) == "string")
    return id, title
  end
end

local function append_text(filename, text)
  local file = io.open(filename, 'a')
  if not file then return false end
  file:write(text)
  file:close()
  return true
end

local function write_text(filename, text)
  local file = io.open(filename, 'w')
  if not file then return false end
  file:write(text)
  file:close()
  return true
end

local function parse_filename(elem)
  assert(elem.tag == "RawBlock")
  local pattern = '^<!%-%-#slipbox%-metadata\nfilename: (.-)\n%-%->$'
  local filename, count = elem.text:gsub(pattern, '%1')
  if count > 0 then return filename end
end

local function is_reference_id(text)
  -- Check if text (string) is a reference identifier.
  return text:match('^ref%-.+$') and true or false
end

return {
  is_reference_id = is_reference_id,
  hashtag_prefix = hashtag_prefix,
  get_link = get_link,
  parse_id_and_title = parse_id_and_title,
  parse_filename = parse_filename,
  write_text = write_text,
  append_text = append_text,
  cluster_link_prefix = cluster_link_prefix,
}
