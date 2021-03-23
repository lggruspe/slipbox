package = "slipbox-filters"
version = "0.1-1"
source = {
   url = "git+ssh://git@github.com/lggruspe/slipbox.git"
}
description = {
   homepage = "https://github.com/lggruspe/slipbox",
   license = "MIT"
}
dependencies = {
   "lua ~> 5.3"
}
build = {
   type = "builtin",
   modules = {
      csv = "src/csv.lua",
      filters = "src/filters.lua",
      log = "src/log.lua",
      slipbox = "src/slipbox.lua",
      utils = "src/utils.lua",
      ["utils.test"] = "src/utils.test.lua",
      zk = "src/zk.lua"
   }
}
