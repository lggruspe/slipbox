-- Useful functions used in other scripts.

local function run(command)
   -- Execute command and exit on error.
   local ok, _, code = os.execute(command)
   if not ok then
      os.exit(code)
   end
end

local updated = false

local function update_paths()
   -- Include lua_modules/ in require path.
   assert(not updated)
   if not updated then
      package.path = "lua_modules/share/lua/5.4/?.lua;" .. package.path
      package.cpath = "lua_modules/lib64/lua/5.4/?.so;" .. package.cpath
      updated = true
   end
end

update_paths()

return {
   run = run,
}
