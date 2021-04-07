-- Pandoc filters.

local pandoc = require "pandoc"
local log = require "src.log"
local metadata = require "src.metadata"
local utils = require "src.utils"

local function preprocess()
  -- Create filter that preprocesses headers by setting the filename
  -- attribute of Headers to the name of the file.

  local function Pandoc(doc)
    local _metadata = {}
    for _, elem in ipairs(doc.blocks) do
      if elem.tag == "CodeBlock" then
        for key, val in pairs(metadata.parse(elem.text) or {}) do
          _metadata[key] = val or _metadata[key]
        end
      elseif elem.tag == "Header" and elem.level == 1 then
        assert(_metadata.filename)
        assert(_metadata.hash)
        elem.attributes.filename = _metadata.filename
        elem.attributes.hash = _metadata.hash
      end
    end
    return doc
  end

  return {
    Pandoc = Pandoc,
  }
end

local function init(slipbox)
  -- Create filter that preprocesses headers by splitting the document
  -- into sections.

  local function CodeBlock(elem)
      -- Strip slipbox-metadata code block.
      if metadata.parse(elem.text) then
        return {}
      end
  end

  local function Header(elem)
    -- Only scan level 1 headers.
    if elem.level ~= 1 then return end

    local id
    local content = elem.content
    if content[1].tag == "Str" then
      id = tonumber(content[1].text:match '^%d+$')
    end
    if id == nil then return end

    table.remove(content, 1)
    while #content > 0 do
      if content[1].tag == "Space" then
        table.remove(content, 1)
      else
        break
      end
    end
    local title = pandoc.utils.stringify(content)
    if not title or title == "" then return end

    local filename = elem.attributes.filename
    slipbox:save_file(filename, elem.attributes.hash)
    local err = slipbox:save_note(id, title, filename)
    if err then log.warning(err) end

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
    current_tag = nil,
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
  local link = utils.get_link(self.id, elem)
  if link then
    link.tag = self.current_tag
    self.slipbox:save_link(link)
  end
end

function Collector:Str(elem)
  local tag = utils.hashtag_prefix(elem.text)
  if tag then
    self.slipbox:save_link { src = self.id, dest = self.id, tag = tag }
    self.current_tag = tag
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

function Modifier.Link(elem)
  -- Rewrite links with empty targets/text.
  if not elem.target or elem.target == "" then
    return elem.content
  end

  local content = pandoc.utils.stringify(elem.content or "")
  if content == "" then
    return {
      pandoc.Str " [",
      pandoc.Link(
        {pandoc.Str(elem.target)},
        elem.target,
        elem.title),
      pandoc.Str "]",
    }
  end
end

function Modifier:Note(elem)
  -- Collect footnotes.
  table.insert(self.footnotes, pandoc.Div(elem.content))
  local count = #self.footnotes
  return pandoc.Superscript(pandoc.Str(tostring(count)))
end

function Modifier:filter()
  return {
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

local function citations(slipbox)
  return {
    Div = function(div)
      -- Suppress bibliography and update SQL.
      if div.identifier == "refs" then

        local function Div(elem)
          -- Save reference text.
          if utils.is_reference_id(elem.identifier) then
            slipbox:save_reference(elem.identifier, pandoc.utils.stringify(elem.content))
            return {}
          end
        end

        pandoc.walk_block(div, {Div = Div})
        return {}
      end
    end
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
  -- Create filter that prints warning messages for invalid notes.
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
      log.warning(messages)
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
