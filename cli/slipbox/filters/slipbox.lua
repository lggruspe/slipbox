local csv = require "filters/csv"
local utils = require "filters/utils"

local SlipBox = {}
function SlipBox:new()
  self.__index = self
  return setmetatable({
    notes = {},
    links = {},
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

function SlipBox:save_link(link)
  if link and link.src then
    local links = self.links[link.src] or {}
    table.insert(links, link)
    self.links[link.src] = links
  end
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

local function links_to_csv(links)
  -- Create CSV data from direct links in slipbox.
  local w = csv.Writer:new{"src", "dest", "tag"}
  for src, dests in pairs(links) do
    for _, dest in ipairs(dests) do
      w:write{src, dest.dest, dest.tag}
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
  write(basedir .. "/links.csv", links_to_csv(self.links))
  write(basedir .. "/bibliography.csv", bibliography_to_csv(self.bibliography))
  write(basedir .. "/citations.csv", citations_to_csv(self.citations))
end

return {
  SlipBox = SlipBox,
}
