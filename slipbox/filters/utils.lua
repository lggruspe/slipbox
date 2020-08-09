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

local function alias_root(alias)
  -- Return alias root or nil (if invalid).
  local pattern = '^(%d+)(%a[%a%d]*)$'
  local prefix, count = alias:gsub(pattern, '%1')
  if count > 0 then return prefix end
end

local function hashtag_prefix(s)
  return s:match '^#+[-_a-zA-Z0-9]+'
end

local function parse_number_target(s)
  -- Return identifier if s is a section number.
  local t, count = s:gsub('^#(%d+)$', '%1')
  if count ~= 0 then
    return tonumber(t)
  end
end

local function get_link(src, link)
  assert(link.tag == "Link")
  assert(type(src) == "number")

  local dest = parse_number_target(link.target)
  if not src or not dest then return nil end

  local tag = "sequence"
  local seqnum = link.title or ""
  if not is_valid_alias(seqnum) then
    tag = "direct"
  end
  if seqnum:match '^%d+$' then
    tag = "direct"
  end

  if src and dest then
    return {
      tag = tag,
      src = src,
      dest = dest,
      description = link.title,
    }
  end
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

return {
  is_valid_alias = is_valid_alias,
  alias_root = alias_root,
  hashtag_prefix = hashtag_prefix,
  get_link = get_link,
  parse_id_and_title = parse_id_and_title,
  alias_parent = alias_parent,
  write_text = write_text,
  append_text = append_text,
}
