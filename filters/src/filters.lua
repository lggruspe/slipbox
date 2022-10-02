-- Pandoc filters.

local pandoc = require "pandoc"
local links = require "src.links"
local log = require "src.log"
local metadata = require "src.metadata"
local utils = require "src.utils"

pandoc.utils = require "pandoc.utils"

local function preprocess()
  -- Set filename and hash attributes of level 1 Headers.
  -- The attribute values are taken from preceding metadata CodeBlocks.
  return {
    Pandoc = function(doc)
      local _metadata = {}
      for _, elem in ipairs(doc.blocks) do
        if elem.tag == "CodeBlock" then
          _metadata = metadata.parse(elem.text) or {}
        elseif elem.tag == "Header" and elem.level == 1 then
          assert(_metadata.filename, "missing filename")
          assert(_metadata.hash, "missing hash")
          elem.attributes.filename = _metadata.filename
          elem.attributes.hash = _metadata.hash
        end
      end
      return doc
    end,
  }
end

local function parse_note_header(elem)
  -- Parse note header content.
  -- Returns ok, note ID and title.
  -- If it's not a proper header, ok is false and the rest of the results are nil.
  local content = elem.content

  -- Get note ID.
  local id
  if content[1].tag == "Str" then
    id = tonumber(content[1].text:match '^%d+$')
  end
  if id == nil then
    return false
  end

  -- Strip note ID and whitespace prefix.
  repeat
    table.remove(content, 1)
  until #content == 0 or content[1].tag ~= "Space"

  -- Get note title.
  local title = pandoc.utils.stringify(content)
  if not title or title == "" then
    return false
  end

  return true, id, title
end

local function init(slipbox)
  -- Split the document into sections with level 1 headers.

  local function CodeBlock(elem)
      -- Strip slipbox-metadata code block.
      if metadata.parse(elem.text) then
        return {}
      end
  end

  local function Header(elem)
    -- Save slipbox notes and set ID and title attributes in the Header.
    if elem.level ~= 1 then
      return
    end

    local ok, id, title = parse_note_header(elem)
    if not ok then
      return
    end

    local filename = elem.attributes.filename
    slipbox:save_file(filename, elem.attributes.hash)

    ok = slipbox:save_note(id, title, filename)
    if not ok then
      return
    end

    elem.identifier = id
    elem.attributes.title = title
    elem.attributes.level = elem.level  -- Gets added to parent section
    return elem
  end

  local function Pandoc(doc)
    doc.blocks = pandoc.utils.make_sections(false, nil, doc.blocks)
    return doc
  end

  return {
    Header = Header,
    CodeBlock = CodeBlock,
    Pandoc = Pandoc,
  }
end

local Collector = {}
function Collector:new(slipbox, div)
  local id = tonumber(div.identifier)
  if not id then return end

  self.__index = self
  return setmetatable({
    slipbox = slipbox,
    id = id,
    div = div,
    has_empty_link_target = false,
  }, self)
end

function Collector:Cite(elem)
  for _, citation in pairs(elem.citations) do
    self.slipbox:save_citation(self.id, "ref-" .. citation.id)
  end
end

function Collector:Image(elem)
  self.slipbox:save_image(self.id, elem.src)
end

function Collector:Link(elem)
  if not elem.target or elem.target == "" then
    self.has_empty_link_target = true
  end
  local link = links.parse_note_link(elem.target)
  if link then
    self.slipbox:save_link {
      src = self.id,
      dest = tonumber(link.target:sub(2)),
      description = elem.title,
      direction = link.direction,
    }
  end
end

function Collector:Str(elem)
  local tag = utils.hashtag_prefix(elem.text)
  if tag then
    self.slipbox:save_tag(self.id, tag)
  end
end

function Collector:filter()
  return {
    Cite = function(elem) return self:Cite(elem) end,
    Image = function (elem) return self:Image(elem) end,
    Link = function(elem) return self:Link(elem) end,
    Str = function(elem) return self:Str(elem) end,
  }
end

local function collect(slipbox)
  -- Create filter that saves citations, links and tags.
  return {
    Div = function(div)
      local col = Collector:new(slipbox, div)
      if col then
        pandoc.walk_block(div, col:filter())
        if col.has_empty_link_target then
          slipbox.invalid.has_empty_link_target[col.id] = true
        end
      end
    end
  }
end

local function hashtag()
  -- Create filter that turns #tags into links.
  return {
    Str = function(elem)
      local tag = utils.hashtag_prefix(elem.text)
      if tag then
        return {
          pandoc.Link({pandoc.Str(tag)}, '#tags/' .. tag:sub(2)),
          pandoc.Str(elem.text:sub(#tag + 1)),
        }
      end
    end
  }
end

local Modifier = {}
function Modifier:new()
  self.__index = self
  return setmetatable({
    footnotes = {},
  }, self)
end

function Modifier.Image(elem)
  -- Lazy load images.
  elem.attributes.loading = "lazy"
  return elem
end

function Modifier.Link(elem)
  -- Rewrite links with empty targets/text, and remove direction prefix from
  -- URL targets.
  if not elem.target or elem.target == "" then
    return elem.content
  end

  local link = links.parse_note_link(elem.target)
  if link ~= nil then
    elem.target = link.target
  end

  local content = pandoc.utils.stringify(elem.content or "")

  if content ~= "" then return elem end
  return {
    pandoc.Str " [",
    pandoc.Link(
      {pandoc.Str(elem.target)},
      elem.target,
      elem.title),
    pandoc.Str "]",
  }
end

function Modifier:Note(elem)
  -- Collect footnotes.
  table.insert(self.footnotes, pandoc.Div(elem.content))
  local count = #self.footnotes
  return pandoc.Superscript(pandoc.Str(tostring(count)))
end

function Modifier:filter()
  return {
    Image = function(elem) return self.Image(elem) end,
    Link = function(elem) return self.Link(elem) end,
    Note = function(elem) return self:Note(elem) end,
  }
end

local function modify()
  -- Create filter that modifies the document.
  return {
    Div = function(div)
      local mod = Modifier:new()
      div = pandoc.walk_block(div, mod:filter())
      if next(mod.footnotes) then
        local ol = pandoc.OrderedList{}
        for _, block in ipairs(mod.footnotes) do
          table.insert(ol.content, {block})
        end
        table.insert(div.content, pandoc.HorizontalRule())
        table.insert(div.content, ol)
      end

      if div.attributes.level then
        if div.attributes.level == "1" then
          table.insert(div.classes, "slipbox-note")
        end
        div.attributes.level = nil
      end
      return div
    end
  }
end

local function to_html(block)
  local doc = pandoc.Pandoc{block}
  return pandoc.write(doc, "html")
end

local function citations(slipbox)
  return {
    Div = function(div)
      -- Suppress bibliography.
      if div.identifier == "refs" then

        local function Div(elem)
          -- Save reference HTML entry.
          local identifier = elem.identifier
          if utils.is_reference_id(identifier) then
            elem.identifier = ""
            slipbox:save_reference(identifier, to_html(elem))
          end
        end

        pandoc.walk_block(div, {Div = Div})
        return {}
      end
    end,
  }
end

local function serialize(slipbox)
  -- Create filter to dump slipbox data into working directory.
  return {
    Pandoc = function()
      slipbox:write_data()
    end
  }
end

local function check(slipbox)
  -- Log warning messages for invalid notes.
  return {
    Pandoc = function()
      local has_empty_link_target = {}
      for id in pairs(slipbox.invalid.has_empty_link_target) do
        table.insert(has_empty_link_target, id)
      end
      if #has_empty_link_target == 0 then
        return
      end

      table.sort(has_empty_link_target)

      local messages = {"The notes below contain links with an empty target."}
      local template = "%d. %s in '%s'."
      for _, id in ipairs(has_empty_link_target) do
        local note = slipbox.notes[id] or {}
        local title = note.title
        local filename = note.filename
        if title and filename then
          local message = template:format(id, title, filename)
          table.insert(messages, message)
        end
      end

      assert(#messages > 1)
      log.warning(table.concat(messages, "\n"))
    end
  }
end

local function cleanup()
  return {
    Header = function(elem)
      elem.attributes = {}
      return elem
    end,
    Div = function(elem)
      elem.attributes.hash = nil
      return elem
    end,
    Pandoc = function()
      -- Output all logged errors.
      log.done()
    end,
  }
end

return {
  preprocess = preprocess,
  init = init,
  collect = collect,
  hashtag = hashtag,
  modify = modify,
  citations = citations,
  serialize = serialize,
  check = check,
  cleanup = cleanup,
}
