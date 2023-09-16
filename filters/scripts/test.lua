-- Run tests and linters.

local exec = require("scripts.utils").exec

exec "lua_modules/bin/busted"
exec "lua_modules/bin/luacheck src spec scripts"
