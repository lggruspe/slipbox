local csv = require "filters/csv"
local log = require "filters/log"
local utils = require "filters/utils"

local SlipBox = {}
function SlipBox:new()
  self.__index = self
  return setmetatable({
    notes = {},
    links = {},
    aliases = {},
    tags = {},
    citations = {},
    bibliography = {},

    invalid = {
      has_empty_link_target = {},
    },
  }, self)
end

function SlipBox:save_citation(id, citation)
  -- Save citation from note id (number).
  assert(type(id) == "number")
  local citations = self.citations[id] or {}
  citations[citation] = true
  self.citations[id] = citations
end

function SlipBox:save_reference(id, text)
  -- Save reference into slipbox.
  assert(type(id) == "string")
  assert(type(text) == "string")
  assert(id ~= "")
  assert(string ~= "")
  self.bibliography[id] = text
end

function SlipBox:save_note(id, title, filename)
  -- Save note into slipbox.
  -- Return list of error messages if a note with the same ID already
  -- exists.
  assert(type(id) == "number")
  assert(type(title) == "string")
  assert(type(filename) == "string")
  assert(title ~= "")
  assert(filename ~= "")

  local note = self.notes[id]
  if note then
    return {
      string.format("Duplicate ID: %d.", id),
      string.format("Could not insert note '%s'.", title),
      string.format("Note '%s' already uses the ID.", note.title)
    }
  end
  self.notes[id] = {title = title, filename = filename}
end

function SlipBox:save_alias(id, alias, owner)
  -- Save alias record in the slipbox.
  -- Return list of error messages if the alias is already used by a
  -- different note.
  assert(type(id) == "number")
  assert(utils.is_valid_alias(alias))
  assert(alias)

  local record = self.aliases[alias]
  if record and record.id ~= id then
    return {
      string.format("Duplicate alias definition for '%s' used by note %d.",
        alias, record.id),
      string.format("It will not be used as an alias for note %d.", id),
    }
  end

  self.aliases[alias] = {
    id = id,
    owner = owner,
  }
end

function SlipBox:save_sequence(link)
  -- Set aliases table for sequence/folgezettel notes.
  -- Return list of error messages if source of sequence link is not the
  -- same as the root of the sequence.
  -- Also return list of error messages if note aliases can't be defined.
  assert(link ~= nil)
  assert(type(link.dest) == "number")
  assert(link.tag == "sequence" and link.description)
  assert(link.description ~= "")

  local owner = tostring(link.src)
  local err = self:save_alias(link.dest, link.description, owner)
  if err then return err end

  local parent = utils.alias_parent(link.description)
  if parent == tostring(link.src) then
    err = self:save_alias(link.src, parent, owner)
    if err then return err end
  end

  -- TODO does this work even if dest or parent are not going to be scanned?
end

function SlipBox:save_link(link)
  if link and link.src then
    if link.tag == "direct" or link.tag == "sequence" then
      local links = self.links[link.src] or {}
      table.insert(links, link)
      self.links[link.src] = links
    end
    if link.tag == "sequence" then
      local err = self:save_sequence(link)
      if err then
        log.warning(err)
      end
    end
  end
end

function SlipBox:save_tag(id, tag)
  -- Insert id into self:tags[tag].
  assert(type(id) == "number")
  assert(type(tag) == "string")
  assert(tag ~= "")

  local tags = self.tags[tag] or {}
  table.insert(tags, id)
  self.tags[tag] = tags
end

local function notes_to_csv(notes)
  -- Generate CSV data from slipbox notes.
  local w = csv.Writer:new{"id", "title", "filename"}
  for id, note in pairs(notes) do
    if note.filename then
      w:write{id, note.title, note.filename}
      -- TODO show warning if note.filename is nil
      -- This occurs when the title in the header contains other symbols
      -- (ex: links, references, equations, etc.).
    end
  end
  return w.data
end

local function tags_to_csv(tags)
  -- Generate CSV data from tags in slipbox.
  local w = csv.Writer:new{"tag", "id"}
  for tag, ids in pairs(tags) do
    for _, id in ipairs(ids) do
      assert(id and id == tonumber(id))
      w:write{tag, id}
    end
  end
  return w.data
end

local function links_to_csv(links)
  -- Create CSV data from direct links in slipbox.
  -- Ignores sequence links.
  local w = csv.Writer:new{"src", "dest", "annotation"}
  for src, dests in pairs(links) do
    for _, dest in ipairs(dests) do
      if dest.tag == "direct" then
        w:write{src, dest.dest, dest.description}
      end
    end
  end
  return w.data
end

local function aliases_to_csv(aliases)
  local w = csv.Writer:new{"id", "alias", "owner"}
  for alias, rec in pairs(aliases) do
    w:write{rec.id, alias, rec.owner}
  end
  return w.data
end

local function sequences_to_csv(aliases)
  local w = csv.Writer:new{"prev", "next"}
  for alias, rec in pairs(aliases) do
    local parent = utils.alias_parent(alias)
    if parent then
      if not aliases[parent] then
        log.warning {
          string.format("Missing note alias: '%s'.", parent),
          string.format("Note %d with alias '%s' will be unreachable.", rec.id, alias),
        }
      else
        w:write{parent, alias}
      end
    end
  end
  return w.data
end

local function bibliography_to_csv(refs)
  local w = csv.Writer:new{"key", "text"}
  for ref, text in pairs(refs) do
    w:write{ref, text}
  end
  return w.data
end

local function files_to_csv(notes)
  local unique_filenames = {}
  for _, note in pairs(notes) do
    unique_filenames[note.filename] = true
  end

  local w = csv.Writer:new{"filename"}
  for filename in pairs(unique_filenames) do
    w:write{filename}
  end
  return w.data
end

local function citations_to_csv(citations)
  local w = csv.Writer:new{"note", "reference"}
  for id, cites in pairs(citations) do
    for cite in pairs(cites) do
      w:write{id, cite}
    end
  end
  return w.data
end

function SlipBox:write_data(basedir)
  -- Create sql statements from slipbox contents.
  local write = utils.write_text
  write(basedir .. "/files.csv", files_to_csv(self.notes))
  write(basedir .. "/notes.csv", notes_to_csv(self.notes))
  write(basedir .. "/tags.csv", tags_to_csv(self.tags))
  write(basedir .. "/links.csv", links_to_csv(self.links))
  write(basedir .. "/aliases.csv", aliases_to_csv(self.aliases))
  write(basedir .. "/sequences.csv", sequences_to_csv(self.aliases))
  write(basedir .. "/bibliography.csv", bibliography_to_csv(self.bibliography))
  write(basedir .. "/citations.csv", citations_to_csv(self.citations))
end

return {
  SlipBox = SlipBox,
}
