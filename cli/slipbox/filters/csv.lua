local Writer = {}
function Writer:new(fields)
  self.__index = self
  return setmetatable({
    header = table.concat(fields, ','),
    columns = #fields,
    data = "",
  }, self)
end

local function quoted(string)
  return '"' .. tostring(string):gsub('"', '""') .. '"'
end

function Writer:record(fields)
  -- Create CSV record.
  local record = quoted(fields[1])
  for i = 2, self.columns do
    if not fields[i] then
      record = record .. ','
    else
      record = record .. ',' .. quoted(fields[i])
    end
  end
  return record
end

function Writer:write(fields)
  self.data = string.format("%s%s\n", self.data, self:record(fields))
end

return {Writer = Writer}
