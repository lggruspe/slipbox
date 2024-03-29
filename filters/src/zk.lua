local filters = require "src.filters"
local slipbox = require "src.slipbox"

local current_slipbox = slipbox.SlipBox:new()

return {
  filters.preprocess(),
  filters.init(current_slipbox),
  filters.collect(current_slipbox),
  filters.hashtag(),
  filters.modify(current_slipbox),
  filters.citations(current_slipbox),
  filters.serialize(current_slipbox),
  filters.check(current_slipbox),
  filters.cleanup(),
}
