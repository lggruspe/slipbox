local function hashtag_prefix(s)
  return s:match '^#[-_a-zA-Z0-9]+'
end

local function append_text(filename, text)
  local file = io.open(filename, 'a')
  if not file then
    return false
  end
  file:write(text)
  file:close()
  return true
end

local function write_text(filename, text)
  local file = io.open(filename, 'w')
  if not file then
    return false
  end
  file:write(text)
  file:close()
  return true
end

local function is_reference_id(text)
  -- Check if text (string) is a reference identifier.
  return text:match('^ref%-.+$') and true or false
end

return {
  is_reference_id = is_reference_id,
  hashtag_prefix = hashtag_prefix,
  write_text = write_text,
  append_text = append_text,
}
