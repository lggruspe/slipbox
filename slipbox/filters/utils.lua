local function character_class(character)
  local code = string.byte(character)
  if 47 <= code and code < 58 then return 'd' end
  if 97 <= code and code < 123 then return 'a' end
end

local function is_valid_alias(alias)
  if alias == nil then return true end
  if type(alias) ~= "string" then return false end
  if alias == "" then return false end
  if character_class(alias:sub(1, 1)) ~= 'd' then return false end

  for i = 1, #alias do
    local class = character_class(alias:sub(i, i))
    if class ~= 'd' and class ~= 'a' then return false end
  end
  return true
end

local function hashtag_prefix(s)
  return s:match '^#+[-_a-zA-Z0-9]+'
end

local function get_link(src, link)
  assert(link.tag == "Link")
  assert(type(src) == "number")

  if not link.target:match('^#%d+$') then return end

  local tag = link.title:match('^/%a%w*$') and "sequence" or "direct"
  local description = link.title
  if tag == "sequence" then
    description = tostring(src) .. link.title:sub(2)
  end

  return {
    tag = tag,
    src = src,
    dest = tonumber(link.target:sub(2)),
    description = description,
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

local function alias_parent(alias)
  if not is_valid_alias(alias) then return nil end
  if alias == nil then return nil end

  local result, count = alias:gsub('^(.-)%d+$', '%1')
  if count > 0 and result ~= "" then return result end
  result, count = alias:gsub('^(.-)%a+$', '%1')
  if count > 0 and result ~= "" then return result end
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
  is_valid_alias = is_valid_alias,
  is_reference_id = is_reference_id,
  hashtag_prefix = hashtag_prefix,
  get_link = get_link,
  parse_id_and_title = parse_id_and_title,
  parse_filename = parse_filename,
  alias_parent = alias_parent,
  write_text = write_text,
  append_text = append_text,
}
