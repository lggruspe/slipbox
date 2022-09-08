-- Run tests and linters.

local utils = require "scripts.utils"
local run = utils.run

run "lua_modules/bin/luacheck src/*.lua scripts/*.lua --std max+busted"
run "lua_modules/bin/busted src -p '.*.test.lua'"
