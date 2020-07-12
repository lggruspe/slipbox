local basexx = require "basexx"

local function file_to_base64(filename)
  local file = io.open(filename)
  if file == nil then return "" end
  local content = file:read"*a"
  file:close()
  return basexx.to_base64(content)
end

return {
    file_to_base64 = file_to_base64,
}
