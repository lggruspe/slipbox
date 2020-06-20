pandoc.utils = require "pandoc.utils"

local function is_reference_id(s)
  -- Check if s is a reference identifier.
  return s:match('^ref%-.+$') and true or false
end

local function make_cite_filter(references)
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
  local sql_file = os.getenv("SLIPBOX_SQL")
  if sql_file and sql_file ~= "" then
    local sql = to_sql(refs)
    if sql and sql ~= "" then
      local file = io.open(sql_file, 'a')
      if file then
        file:write(sql)
        file:close()
      end
    end
  end
end

local function Div(elem)
  -- Suppress bibliography and update SQL.
  if elem.identifier == "refs" then
    local refs = {}
    pandoc.walk_block(elem, make_cite_filter(refs))
    save_to_sql(refs)
    return {}
  end
end

return {{Div = Div}}
