local header = require "filters/header"

local function grep_headers(options)
  local command = [[grep -rIoZH "[0-9]\+\s\+.\+" ]]
  if options and options ~= "" then command = command .. options end
  return io.popen(command):lines()
end

local function gsubs(args)
  local s = args.s
  local pattern = args.pattern
  local result = {}
  for _, replace in ipairs(args) do
    local t, count = s:gsub(pattern, replace)
    if count == 0 then return nil end
    table.insert(result, t)
  end
  return result
end

local function parse_grep_line_output(line)
  -- Parse an output line of grep and return filename and matched string.
  -- Return nil on failure.
  -- Extra spaces and markers are removed from the matched string.
  local pattern = '^(.+)\0(%d+)%s+(.+)$'
  local matched = gsubs{s = line, pattern = pattern, '%1', '%2', '%3'}
  if matched then
    return matched[1], string.format("# %s %s", matched[2], matched[3])
  end
end

local function normalize_header(markup)
  local block = pandoc.read(markup).blocks[1]
  local content = pandoc.utils.stringify(block.content)
  return header.parse_id_and_title(content)
end

local function parse_grep_output(slipbox, iter)
  -- Parse grep output and store result (note id and filename) in a table.
  -- iter
  -- : An iterator that generates lines of the output.
  local filenames = {}
  while true do
    local line = iter()
    if not line then break end
    local filename, matched = parse_grep_line_output(line)
    assert(matched)
    local h = normalize_header(matched)
    if h then
      if filename and h.id and h.title then
        local k = tonumber(h.id)
        assert(k)
        local note = slipbox.notes[k]
        if note and h.title:sub(1, #note.title) == note.title then
          -- check prefix instead of comparing directly because grepped string
          -- might contain trailing symbols
          -- ex: \chapter{10 Note title} would cause the title to have a
          -- trailing }
          filenames[k] = {filename = filename, title = h.title}
        end
      end
    end
  end
  return filenames
end

return {
  grep_headers = grep_headers,
  parse_grep_output = parse_grep_output,
}
