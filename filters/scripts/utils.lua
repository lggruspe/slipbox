-- Useful functions used in other scripts.

-- Executes command.
-- Raises an error on failure.
local function exec(command)
  if not os.execute(command) then
    error "command failed"
  end
end

return {exec = exec}
