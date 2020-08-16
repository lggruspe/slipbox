-- Pandoc filters.

local pandoc = require "pandoc"
pandoc.utils = require "pandoc.utils"

local log = require "filters/log"
local utils = require "filters/utils"

local function init(slipbox)
  -- Create filter that preprocesses headers by splitting the document
  -- into sections.

  local function Header(elem)
    -- Only scan level 1 headers.
    if elem.level ~= 1 then return end

    local content = pandoc.utils.stringify(elem.content)
    local id, title = utils.parse_id_and_title(content)
    if id and title then
      local err = slipbox:save_note(id, title)
      if err then log.warning(err) end

      elem.identifier = id
      elem.attributes.title = title
      elem.attributes.level = elem.level  -- Gets added to parent section
      return elem
    end
  end

  local function Pandoc(doc)
    doc.blocks = pandoc.utils.make_sections(false, nil, doc.blocks)
    return doc
  end

  return {
    Header = Header,
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
  }, self)
end

function Collector:Cite(elem)
  for _, citation in pairs(elem.citations) do
    self.slipbox:save_citation(self.id, citation.id)
  end
end

function Collector:Link(elem)
  local link = utils.get_link(self.id, elem)
  if link then
    self.slipbox:save_link(link)
  end
end

function Collector:Str(elem)
  if utils.hashtag_prefix(elem.text) then
    self.slipbox:save_tag(self.id, elem.text)
  end
end

function Collector:filter()
  return {
    Cite = function(elem) return self:Cite(elem) end,
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
      end
    end
  }
end

local Modifier = {}
function Modifier:new(div)
  local id = tonumber(div.identifier)
  if not id then return end

  self.__index = self
  return setmetatable({
    id = id,
    div = div,
    has_empty_link_target = false,
  }, self)
end

function Modifier:Link(elem)
  -- Rewrite links with empty targets/text.
  if not elem.target or elem.target == "" then
    self.has_empty_link_target = true
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

function Modifier.Str(elem)
  -- Turn #tags into links.
  if utils.hashtag_prefix(elem.text) then
    return pandoc.Link({elem}, '#'..elem.text)
  end
end

function Modifier:filter()
  return {
    Link = function(elem) return self:Link(elem) end,
    Str = function(elem) return self.Str(elem) end,
  }
end

local function modify(slipbox)
  -- Create filter that modifies the document.
  return {
    Div = function(div)
      local mod = Modifier:new(div)
      if mod then
        div = pandoc.walk_block(div, mod:filter())
        if mod.has_empty_link_target then
          slipbox.invalid.has_empty_link_target[mod.id] = true
        end
      end
      return div
    end
  }
end

local function serialize(slipbox)
  -- Create filter to dump slipbox data into SLIPBOX_TMPDIR.
  return {
    Pandoc = function()
      local tmpdir = os.getenv "SLIPBOX_TMPDIR"
      local scan_input_list = os.getenv "SCAN_INPUT_LIST"
      if not tmpdir or tmpdir == "" then return end

      local scan = require "filters/scan"
      scan.grep_filenames(slipbox, scan_input_list)
      slipbox:write_data(tmpdir)
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

return {
  init = init,
  collect = collect,
  modify = modify,
  serialize = serialize,
  check = check,
}
