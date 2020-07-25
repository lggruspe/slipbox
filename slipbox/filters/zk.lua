pandoc.utils = require "pandoc.utils"
local cites = require "filters/cites"
local header = require "filters/header"
local images = require "filters/images"
local links = require "filters/links"
local post = require "filters/post"
local slipbox = require "filters/slipbox"
local tags = require "filters/tags"
local footnotes = require "filters/footnotes"

local current_slipbox = slipbox.SlipBox:new()

local function Div(elem)
  -- Process tags and links.
  local filter = tags.make_tag_filter(elem, current_slipbox)
  elem = pandoc.walk_block(elem, filter)
  filter = links.make_link_filter(elem, current_slipbox)
  elem = pandoc.walk_block(elem, filter)
  filter = cites.make_cite_filter(elem, current_slipbox)
  elem = pandoc.walk_block(elem, filter)

  local notes = {}
  filter = footnotes.make_footnote_filter(notes)
  elem = pandoc.walk_block(elem, filter)
  if next(notes) then
    table.insert(elem.content, pandoc.HorizontalRule())
    table.insert(elem.content, footnotes.list_footnotes(notes))
  end
  return elem
end

return {
  header.make_id_title_filter(current_slipbox),
  {Div = Div},
  images.make_image_filter(),
  post.make_sql_dump_filter(current_slipbox),
}
