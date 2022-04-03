local function parse_note_link(target)
  local pattern = "^([<>]?)(#%d+)$"
  local direction, target_ = string.match(target, pattern)

  if direction == nil then
    return nil
  end
  return {direction = direction, target = target_}
end

return {
  parse_note_link = parse_note_link,
}
