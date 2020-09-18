local basexx = require "basexx"

local cache = {}
local function file_to_base64(filename)
  local base64 = cache[filename]
  if base64 then return base64 end

  local file = io.open(filename)
  if file == nil then return "" end
  local content = file:read"*a"
  file:close()

  base64 = basexx.to_base64(content)
  cache[filename] = base64
  return base64
end

return {
    file_to_base64 = file_to_base64,
}
