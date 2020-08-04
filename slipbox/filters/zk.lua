pandoc.utils = require "pandoc.utils"
local collect = require "filters/collect"
local header = require "filters/header"
local images = require "filters/images"
local modify = require "filters/modify"
local post = require "filters/post"
local slipbox = require "filters/slipbox"
local footnotes = require "filters/footnotes"

local current_slipbox = slipbox.SlipBox:new()

local function Div(elem)
  -- Process tags and links.
  local id = tonumber(elem.identifier)
  if id then
    pandoc.walk_block(elem, collect.tags(id, current_slipbox))
    pandoc.walk_block(elem, collect.links(id, current_slipbox))
    pandoc.walk_block(elem, collect.citations(id, current_slipbox))
  end

  elem = pandoc.walk_block(elem, modify.tags())
  elem = pandoc.walk_block(elem, modify.links())

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
  header.make_id_title_filter(current_slipbox),
  {Div = Div},
  images.make_image_filter(),
  post.make_sql_dump_filter(current_slipbox),
}
