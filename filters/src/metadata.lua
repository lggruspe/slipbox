-- Metadata parser.

local function strip(text)
  -- Strip leading and trailing whitespace.
  return text:match('^%s*(.-)%s*$')
end

local function strip_header(text)
  local pattern = '^%[slipbox%-metadata%]\n(.-)$'
  return text:match(pattern)
end

local function lines(text)
  local str = text
  return function()
    if str ~= "" then
      local index = str:find '\n' or #str
      local result = str:sub(1, index)
      str = str:sub(index + 1)
      return result
    end
  end
end

local function parse_line(line)
  local key = line:match '^(.-)='
  local val = line:match '^.-=(.*)$'
  if key and val then
    return strip(key), strip(val)
  end
end

local function parse(text)
  local body = strip_header(text)
  if not body then return end

  local metadata = {}
  for line in lines(strip(body)) do
    local key, val = parse_line(line)
    if not (key and val) then
      return
    end
    metadata[key] = val
  end
  return metadata
end

return {parse = parse}
