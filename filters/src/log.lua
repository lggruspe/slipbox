-- For logging errors into a csv file.

local csv = require "src.csv"
local utils = require "src.utils"

local writer = csv.Writer:new{"verbosity", "message"}

local function warning(message)
  writer:write{"warning", message}
end

local function error_(message)
  writer:write{"error", message}
end

local function done()
  -- Output messages into log file and reset csv writer.
  local ok = utils.write_text("log.csv", writer.data)
  if ok then
    writer = csv.Writer:new{"verbosity", "message"}
  end
  return ok
end

return {
  warning = warning,
  error = error_,
  done = done,
}
