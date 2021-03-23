-- Print errors.

local function show(messages)
  if not messages or #messages < 1 then return end
  io.stderr:write(messages[1])
  io.stderr:write '\n'
  for i = 2, #messages do
    io.stderr:write "  "
    io.stderr:write(messages[i])
    io.stderr:write '\n'
  end
end

local function warning(messages)
  io.stderr:write "[WARNING] "
  show(messages)
end

local function _error(messages)
  io.stderr:write "[ERROR] "
  show(messages)
end

return {
  warning = warning,
  error = _error,
}
