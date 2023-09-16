-- Update package path to load from lua_modules.

local version = _VERSION:match "%d+%.%d+"

package.path = "lua_modules/share/lua/" .. version .. "/?/init.lua;" .. package.path
package.path = "lua_modules/share/lua/" .. version .. "/?.lua;" .. package.path
package.cpath = "lua_modules/lib/lua/" .. version .. "/?.so;" .. package.cpath
package.cpath = "lua_modules/lib64/lua/" .. version .. "/?.so;" .. package.cpath
