-- For communicating errors to python.

local json = require "dkjson"
local utils = require "src.utils"

local messages = {}

local function duplicate_note_id(id, notes)
  -- Create record of duplicate-note-id error.
  assert(type(id) == "number")
  assert(#notes > 1)

  local copy = {}
  for _, note in ipairs(notes) do
    assert(type(note.title) == "string" and note.title ~= "")
    assert(type(note.filename) == "string" and note.filename ~= "")
    table.insert(copy, {title = note.title, filename = note.filename})
  end

  local message = {
    level = "error",
    name = "duplicate-note-id",
    value = {
      id = id,
      notes = copy,
    },
  }
  table.insert(messages, message)
end

local function empty_link_target(note)
  -- Create record of empty-link-target warning.
  assert(type(note.id) == "number")
  assert(type(note.title) == "string" and note.title ~= "")
  assert(type(note.filename) == "string" and note.filename ~= "")
  local message = {
    level = "warning",
    name = "empty-link-target",
    value = {
      id = note.id,
      title = note.title,
      filename = note.filename,
    },
  }
  table.insert(messages, message)
end

local function write()
  -- Write error and warning messages to json file.
  local str = json.encode(messages)
  local ok = utils.write_text("messages.json", str)
  if ok then
    messages = {}
  end
  return ok
end

return {
  duplicate_note_id = duplicate_note_id,
  empty_link_target = empty_link_target,
  write = write,

  -- For testing purposes only.
  _messages = messages,
}
