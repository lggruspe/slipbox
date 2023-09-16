rockspec_format = "3.0"
package = "slipbox-filters"
version = "dev-1"
source = {
   url = "git+ssh://git@github.com/lggruspe/slipbox.git"
}
description = {
   summary = "Lua filters used by slipbox",
   homepage = "https://github.com/lggruspe/slipbox",
   license = "MIT"
}
dependencies = {
   "lua >= 5.1, < 5.5",
   "dkjson"
}
test_dependencies = {
   "amalg",
   "busted",
   "luacheck",
   "luafilesystem"
}
build = {
   type = "builtin",
   modules = {
      csv = "src/csv.lua",
      errors = "src/errors.lua",
      filters = "src/filters.lua",
      links = "src/links.lua",
      metadata = "src/metadata.lua",
      slipbox = "src/slipbox.lua",
      utils = "src/utils.lua",
      zk = "src/zk.lua"
   }
}
test = {
   type = "command",
   script = "scripts/test.lua",
}
