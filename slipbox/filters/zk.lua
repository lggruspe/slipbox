local pandoc = require "pandoc"
pandoc.utils = require "pandoc.utils"
local filters = require "filters/filters"
local images = require "filters/images"
local slipbox = require "filters/slipbox"
local footnotes = require "filters/footnotes"

local current_slipbox = slipbox.SlipBox:new()

local function Div(elem)
  -- Process tags and links.
  elem = pandoc.walk_block(elem, filters.modify())

  local notes = {}
  local filter = footnotes.make_footnote_filter(notes)
  elem = pandoc.walk_block(elem, filter)
  if next(notes) then
    table.insert(elem.content, pandoc.HorizontalRule())
    table.insert(elem.content, footnotes.list_footnotes(notes))
  end

  if elem.attributes.level then
    if elem.attributes.level == "1" then
      elem.attributes.style = "display:none"
    end
    elem.attributes.level = nil
  end
  return elem
end

return {
  filters.init(current_slipbox),
  filters.collect(current_slipbox),
  {Div = Div},
  images.make_image_filter(),
  filters.serialize(current_slipbox),
}
