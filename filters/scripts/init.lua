-- Install dev requirements.

local utils = require "scripts.utils"
local run = utils.run

local function install(rock)
   -- Install rock in current directory.
   local command = "luarocks install --tree lua_modules %s"
   run(command:format(rock))
end

local requirements = {"amalg", "busted", "luacheck", "luafilesystem"}

for _, requirement in ipairs(requirements) do
   install(requirement)
end
