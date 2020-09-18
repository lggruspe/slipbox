local filters = require "filters/filters"
local images = require "filters/images"
local slipbox = require "filters/slipbox"

local current_slipbox = slipbox.SlipBox:new()

return {
  filters.preprocess(),
  filters.init(current_slipbox),
  filters.collect(current_slipbox),
  filters.modify(current_slipbox),
  filters.citations(current_slipbox),
  images.make_image_filter(),
  filters.serialize(current_slipbox),
  filters.check(current_slipbox),
  filters.cleanup(),
}
