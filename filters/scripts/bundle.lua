-- Bundle filters into a single-file.

local utils = require "scripts.utils"
local run = utils.run

local lfs = require "lfs"

local function bundle()
   local sources = {
      "src.csv",
      "src.errors",
      "src.filters",
      "src.links",
      "src.slipbox",
      "src.utils",
      "src.metadata",
      "dkjson",
   }

   local command = "%s %s -s src/zk.lua -o build/filter.lua"
   local prog = "lua_modules/bin/amalg.lua"
   local args = table.concat(sources, " ")
   run(command:format(prog, args))
end

lfs.mkdir "build"
bundle()
