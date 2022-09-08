-- Useful functions used in other scripts.

local function run(command)
   local ok, _, code = os.execute(command)
   if not ok then
      os.exit(code)
   end
end

return {
   run = run,
}
