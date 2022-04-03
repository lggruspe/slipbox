local translation = {
  [""] = "",
  ["<"] = "<",
  [">"] = ">",
  ["%3e"] = ">",
  ["%3E"] = ">",
  ["%3c"] = "<",
  ["%3C"] = "<",
}
local function normalize_direction(direction)
  return translation[direction]
end

local function parse_note_link(target)
  local pattern = "^(.*)(#%d+)$"
  local prefix, target_ = string.match(target, pattern)

  if target_ == nil then return nil end

  local direction = normalize_direction(prefix)
  if direction == nil then return nil end
  return {
    direction = normalize_direction(prefix),
    target = target_,
  }
end

return {
  parse_note_link = parse_note_link,
}
