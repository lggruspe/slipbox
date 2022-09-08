-- Bundle filters into a single-file.

local utils = require "scripts.utils"
local run = utils.run

local function bundle()
   local sources = {
      "src.csv",
      "src.filters",
      "src.links",
      "src.log",
      "src.slipbox",
      "src.utils",
      "src.metadata",
   }

   local command = "%s %s -s src/zk.lua -o build/filter.lua"
   local prog = "lua_modules/bin/amalg.lua"
   local args = table.concat(sources, " ")
   run(command:format(prog, args))
end

run "mkdir -p build"
bundle()
