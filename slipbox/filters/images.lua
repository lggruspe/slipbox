local base64 = require "filters/base64"

local function get_file_extension(filename)
  local ext, ok = filename:gsub('.+(%..*)', '%1')
  if not ok then return "" else return ext:sub(2) end
end

local function make_image_filter()
  local convert = os.getenv "CONVERT_TO_DATA_URL"
  if convert and convert ~= "" then
    return {
      Image = function(elem)
        local ext = get_file_extension(elem.src)
        if ext ~= "" then
          elem.src = string.format("data:image/%s;base64,%s", ext,
            base64.file_to_base64(elem.src))
          return elem
        end
      end
    }
  end
  return {}
end

return {
  make_image_filter = make_image_filter,
}