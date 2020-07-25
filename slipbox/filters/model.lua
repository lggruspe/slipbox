local utils = require "filters/utils"

local is_valid_alias = utils.is_valid_alias

local Database = {}
function Database:new()
  self.__index = self
  return setmetatable({
    aliases = {},
    notes = {},
  }, self)
end


local Note = {}
function Note:new(id, title)
  assert(type(id) == "number", "invalid Note.id")
  assert(id % 1 == 0, "non-integer Note.id")
  assert(type(title) == "string", "invalid Note.title")
  assert(title ~= "", "empty Note.title")
  self.__index = self
  return setmetatable({
    id = id,
    title = title,
  }, self)
end

function Note:add_to(db)
  db.data.notes[self.id] = {
    title = self.title,
    aliases = {},
    links = {},
    backlinks = {},
  }
end

function Note:equals(note)
  return self.id == note.id and self.title == note.title
end


local Alias = {}
function Alias:new(id, alias)
  assert(type(id) == "number", "invalid Alias.id")
  assert(id % 1 == 0, "non-integer Alias.id")
  assert(type(alias) == "string", "invalid Alias.alias")
  assert(alias ~= "", "empty alias")

  self.__index = self
  return setmetatable({
    id = id,
    alias = alias,
  }, self)
end

function Alias:add_to(db)
  local note = db.data.notes[self.id]
  assert(note ~= nil, "Alias.id does not exist")
  db.data.aliases[self.alias] = {
    id = self.id,
    children = {},
    parent = nil,
  }
  table.insert(note.aliases, self.alias)
end


local function alias_parent(alias)
  if not is_valid_alias(alias) then return nil end
  if alias == nil then return nil end

  local result, count = alias:gsub('^(.-)[0-9]+$', '%1')
  if count > 0 and result ~= "" then return result end
  result, count = alias:gsub('^(.-)[a-z]+$', '%1')
  if count > 0 and result ~= "" then return result end
end

local function is_sequence(prev, next)
  return alias_parent(next) == prev
end

local Sequence = {}
function Sequence:new(prev, next)
  assert(is_valid_alias(prev), "invalid Sequence.prev")
  assert(is_valid_alias(next), "invalid Sequence.next")
  assert(is_sequence(prev, next), "Sequence.prev and Sequence.next are not in sequence")
  assert(prev ~= nil, "null Sequence.prev")
  assert(next ~= nil, "null Sequence.next")

  self.__index = self
  return setmetatable({
    prev = prev,
    next = next,
  }, self)
end

function Sequence:add_to(db)
  local prev = db.data.aliases[self.prev]
  local next = db.data.aliases[self.next]
  if prev == nil or next == nil then return end

  local prev_note = db.data.notes[prev.id]
  local next_note = db.data.notes[next.id]
  if prev_note == nil or next_note == nil then return end

  next.parent = self.prev
  table.insert(prev.children, self.next)
end


local Link = {}
function Link:new(src, dest, annotation)
  assert(getmetatable(src) == Note, "invalid src Note")
  assert(getmetatable(dest) == Note, "invalid dest Note")
  assert(type(annotation) == "string", "non-string Link.annotation")
  self.__index = self
  return setmetatable({
    src = src,
    dest = dest,
    annotation = annotation,
  }, self)
end

function Link:add_to(db)
  local src = db.data.notes[self.src.id]
  local dest = db.data.notes[self.dest.id]
  assert(src ~= nil, "Link.src does not exist")
  assert(dest ~= nil, "Link.dest does not exist")

  local link = {
    src = self.src,
    dest = self.dest,
    annotation = self.annotation,
  }
  table.insert(src.links, link)
  if link.annotation ~= "" then
    table.insert(dest.backlinks, link)
  end
end


local Query = {}
function Query:new(db)
  self.__index = self
  return setmetatable({
    db = db,
  }, self)
end

function Query:note(id)
  local record = self.db.data.notes[id]
  if record == nil then return nil end

  local note = Note:new(id, record.title)

  note.links = function() return self:links(note) end
  note.backlinks = function() return self:backlinks(note) end

  note.aliases = function()
    local i = 0
    return function()
      i = i + 1
      if i <= #record.alias then return record.aliases[i] end
    end
  end

  note.parents = function()
    local aliases = note.aliases()
    local function me()
      local alias = aliases()
      if alias ~= nil then
        local parent = self:parent(alias)
        return parent ~= nil and parent or me()
      end
    end
    return me
  end

  note.children = function()
    local aliases = note.aliases()

    local alias = aliases()
    if alias == nil then return nil end
    local children = self:children(alias)

    local function me()
      local child = children()
      if child ~= nil then return child end

      alias = aliases()
      if alias == nil then return nil end
      children = self:children(alias)
      return me()
    end
    return me
  end

  note.links = function(note_)
    local src = self.db.data.notes[note_.id]
    return function()
      if not src then return nil end
      local link = src.links()
      if link ~= nil then return link end
    end
  end

  note.backlinks = function(note_)
    local dest = self.db.data.notes[note_.id]
    return function()
      if not dest then return nil end
      local backlink = dest.backlinks()
      if backlink ~= nil then return backlink end
    end
  end

  note.parent = function(alias)
    local record_ = self.db.data.aliases[alias]
    if record_ == nil or record_.parent == nil then return nil end

    local parent_record = self.db.data.aliases[record_.parent]
    if not parent_record or parent_record.id == nil then return nil end
    return {
      note = self:note(parent_record.id),
      alias = record_.parent,
    }
  end

  note.children = function(alias)
    local record_ = self.db.data.aliases[alias]
    if not record_ then return nil end

    local children = record_.children or {}
    local i = 0
    local function me()
      i = i + 1
      if i > #children then return nil end

      local child_alias = children[i]

      local child_record = self.db.data.aliases[child_alias]
      if not child_record then return me() end

      local child_id = child_record.id
      local child = self:note(child_id)
      if child ~= nil then
        return {
        note = child,
        alias = child_alias,
      }
      end
      return me()
    end
    return me
  end
end

return {
  Alias = Alias,
  alias_parent = alias_parent,
  Database = Database,
  is_sequence = is_sequence,
  Link = Link,
  Note = Note,
  Query = Query,
  Sequence = Sequence,
}
