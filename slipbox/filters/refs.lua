pandoc.utils = require "pandoc.utils"

local utils = require "filters/utils"

local function is_reference_id(s)
  -- Check if s is a reference identifier.
  return s:match('^ref%-.+$') and true or false
end

local function section_filter(references)
  -- Create filter that transforms pandoc-citeproc bibliography.
  local function Div(elem)
    if is_reference_id(elem.identifier) then
      references[elem.identifier] = pandoc.utils.stringify(elem.content)
      return {}
    end
  end
  return {Div = Div}
end

local function sqlite_string(s)
  return string.format("'%s'", s:gsub("'", "''"))
end

local function to_sql(refs)
  -- Create SQL statements for references.
  local sql = ""
  local template = "UPDATE Bibliography SET text = %s WHERE key = %s;\n"
  for ref, text in pairs(refs) do
    sql = sql..string.format(template, sqlite_string(text), sqlite_string(ref))
  end
  return sql
end

local function save_to_sql(refs)
  -- Write reference info to SQL.
  -- Append to citations.sql (see slipbox.lua:write_to_sql).
  local tmpdir = os.getenv "SLIPBOX_TMPDIR"
  if not tmpdir or tmpdir == "" then return end

  local sql = to_sql(refs)
  if not sql or sql == "" then return end

  utils.append_text(tmpdir .. "/citations.sql", sql)
end

local function Div(elem)
  -- Suppress bibliography and update SQL.
  if elem.identifier == "refs" then
    local refs = {}
    pandoc.walk_block(elem, section_filter(refs))
    save_to_sql(refs)
    return {}
  end
end

return {{Div = Div}}
