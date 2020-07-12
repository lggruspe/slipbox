local SlipBox = {}
function SlipBox:new()
  self.__index = self
  return setmetatable({
    notes = {},
    links = {},
    backlinks = {},
    aliases = {},
    children = {},
    tags = {},
    citations = {},
  }, self)
end

function SlipBox:save_citation(id, citation)
  id = tonumber(id)
  if id then
    local citations = self.citations[id] or {}
    citations[citation] = true
    self.citations[id] = citations
  end
end

function SlipBox:save_note(note)
  if note.id then
    self.notes[note.id] = {title = note.title}
  end
end

local function parent_sequence(s)
  local t, count = s:gsub('^(.-)%d+$', '%1')
  if count ~= 0 then return t end
  t, count = s:gsub('^(.-)%a+$', '%1')
  if count ~= 0 then return t end
end

function SlipBox:save_backlink(link)
  assert(link ~= nil)
  assert(link.tag == "direct" and link.src and link.dest)
  assert(link.description)
  if link.description ~= "" then
    local backlinks = self.backlinks[link.dest] or {}
    table.insert(backlinks, link)
    self.backlinks[link.dest] = backlinks
  end
end

function SlipBox:save_sequence(link)
  -- Set aliases and children tables (for sequence/folgezettel notes).
  assert(link ~= nil)
  assert(link.tag == "sequence" and link.alias and link.root)
  assert(link.root ~= "" and link.alias ~= "")

  if link.dest and link.alias then
    self.aliases[link.alias] = {
      id = link.dest,
      owner = link.src,
    }
    -- dest might not be in notes if it's not in the current set of input files
    if self.notes[link.dest] then
      local aliases = assert(self.notes[link.dest]).aliases or {}
      table.insert(aliases, link.alias)
      self.notes[link.dest].aliases = aliases
    end
    local parent = parent_sequence(link.alias)
    if parent then
      local children = self.children[parent] or {}
      table.insert(children, link.alias)
      self.children[parent] = children
    end
  end
end

function SlipBox:save_link(link)
  if link and link.src then
    if link.tag == "direct" or link.tag == "sequence" then
      local links = self.links[link.src] or {}
      table.insert(links, link)
      self.links[link.src] = links
    end
    if link.tag == "direct" then
      if link.description and link.description ~= "" then
        self:save_backlink(link)
      end
    elseif link.tag == "sequence" then
      self:save_sequence(link)
    end
  end
end

function SlipBox:save_tag(id, tag)
  -- Insert id into self:tags[tag].
  if id and tag ~= "" then
    local tags = self.tags[tag] or {}
    table.insert(tags, id)
    self.tags[tag] = tags
  end
end

local function sqlite_string(s)
  return string.format("'%s'", s:gsub("'", "''"))
end

local function notes_to_sql(notes, filenames)
  -- Generate sql from notes in slipbox.
  -- Get filenames from filenames table.
  local values = ""
  for id, note in pairs(notes) do
    local result = filenames[id]
    if result then
      local title = sqlite_string(note.title)
      local filename = sqlite_string(result.filename)
      local value = string.format("(%d, %s, %s)", id, title, filename)
      if values == "" then
        values = values .. ' ' .. value
      else
        values = values .. ", " .. value
      end
      -- result might be nil if scan.lua couldn't find its filename.
      -- This occurs when the title in the header contains other symbols
      -- (ex: links, references, equations, etc.).
      -- TODO warning
    end
  end
  if values ~= "" then
    return "INSERT OR IGNORE INTO Notes (id, title, filename) VALUES "
      .. values .. ";\n"
  end
  return ""
end

local function tags_to_sql(tags)
  -- Generate sql from tags in slipbox.
  local values = ""
  for tag, ids in pairs(tags) do
    for _, id in ipairs(ids) do
      assert(id and id == tonumber(id))
      local value = string.format("(%s, %d)", sqlite_string(tag), id)
      if values == "" then
        values = values .. ' ' .. value
      else
        values = values .. ", " .. value
      end
    end
  end
  if values ~= "" then
    return "INSERT OR IGNORE INTO Tags (tag, id) VALUES " .. values .. ";\n"
  end
  return ""
end

local function links_to_sql(links)
  -- Create sql from direct links in slipbox.
  -- Ignores sequence links.
  local values = ""
  for src, dests in pairs(links) do
    for _, dest in ipairs(dests) do
      if dest.tag == "direct" then
        local annotation = sqlite_string(dest.description)
        local value = string.format("(%d, %d, %s)", src, dest.dest, annotation)
        if values == "" then
          values = values .. ' ' .. value
        else
          values = values .. ", " .. value
        end
      end
    end
  end
  if values ~= "" then
    return "INSERT OR IGNORE INTO Links (src, dest, annotation) VALUES "
      ..values.. ";\n"
  end
  return ""
end

local function aliases_to_sql(aliases)
  local values = ""
  for alias, rec in pairs(aliases) do
    local value = string.format("(%d, %s, %d)", rec.id, sqlite_string(alias),
      rec.owner)
    if values == "" then
      values = values .. ' ' .. value
    else
      values = values .. ", " .. value
    end
  end
  if values ~= "" then
    return "INSERT OR IGNORE INTO Aliases (id, alias, owner) VALUES "
      .. values .. ";\n"
  end
  return ""
end

local function sequences_to_sql(sequences)
  local values = ""
  for alias, children in pairs(sequences) do
    -- aliases must contain numbers and letters
    if not alias:match'^%d+$' then
      local parent = sqlite_string(alias)
      for _, v in ipairs(children) do
        local child = sqlite_string(v)
        local value = string.format("(%s, %s)", parent, child)
        if values == "" then
          values = values .. ' ' .. value
        else
          values = values .. ", " .. value
        end
      end
    end
  end
  if values ~= "" then
    return "INSERT OR IGNORE INTO Sequences (prev, next) VALUES "
      .. values .. ";\n"
  end
  return ""
end

local function files_to_sql(filenames)
  local values = ""
  local unique_filenames = {}
  for _, v in pairs(filenames) do
    unique_filenames[v.filename] = true
  end
  for filename in pairs(unique_filenames) do
    local value = string.format("(%s)", sqlite_string(filename))
    if values == "" then
      values = values .. ' ' .. value
    else
      values = values .. ", " .. value
    end
  end
  if values ~= "" then
    return "INSERT OR IGNORE INTO Files (filename) VALUES " .. values .. ";\n"
  end
  return ""
end

local function citations_to_sql(citations)
  local references = {}
  local values = ""
  for id, cites in pairs(citations) do
    for cite in pairs(cites) do
      local ref = sqlite_string("ref-"..cite)
      references[ref] = true
      local value = string.format("(%d, %s)", id, ref)
      if values == "" then
        values = values .. ' ' .. value
      else
        values = values .. ", " .. value
      end
    end
  end
  local sql = ""
  if values ~= "" then
    local ref_sql = ""
    for ref in pairs(references) do
      if ref_sql == "" then
        ref_sql = ref_sql .. string.format("(%s)", ref)
      else
        ref_sql = ref_sql .. string.format(", (%s)", ref)
      end
    end
    sql = sql .. "INSERT OR IGNORE INTO Bibliography (key) VALUES " .. ref_sql ..
      ";\n"
    sql = sql .. "INSERT OR IGNORE INTO Citations (note, reference) VALUES " ..
      values ..";\n"
    return sql
  end
  return ""
end

function SlipBox:to_sql(filenames)
  -- Create sql statements from slipbox contents.
  -- filenames
  -- : Table that maps note ids to filenames (see scan.parse_grep_output).
  return files_to_sql(filenames) .. notes_to_sql(self.notes, filenames) ..
    tags_to_sql(self.tags) .. links_to_sql(self.links) ..
    aliases_to_sql(self.aliases) .. sequences_to_sql(self.children) ..
    citations_to_sql(self.citations)
end

return {
  SlipBox = SlipBox,
  -- private:
  parent_sequence = parent_sequence,
}
