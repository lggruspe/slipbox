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
  -- Return ok and parsed result.
  local pattern = "^(.*)(#%d+)$"
  local prefix, target_ = string.match(target, pattern)

  if target_ == nil then
    return false
  end

  local direction = normalize_direction(prefix)
  if direction == nil then
    return false
  end
  return true, {
    direction = normalize_direction(prefix),
    target = target_,
  }
end

return {
  parse_note_link = parse_note_link,
}
