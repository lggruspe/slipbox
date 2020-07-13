local function make_sql_dump_filter(slipbox)
  -- Create filter to dump sql from slipbox into SLIPBOX_SQL.
  local function Pandoc()
    local sql_file = os.getenv "SLIPBOX_SQL"
    local scan_input_list = os.getenv "SCAN_INPUT_LIST"
    if sql_file and sql_file ~= "" then
      local scan = require "filters/scan"
      local filenames = scan.parse_grep_output(slipbox, scan.grep_headers(scan_input_list))
      local sql = slipbox:to_sql(filenames)
      local file = io.open(sql_file, 'a')
      if file then
        file:write(sql)
        file:close()
      end
    end
  end
  return {Pandoc = Pandoc}
end

return {
  make_sql_dump_filter = make_sql_dump_filter,
}
