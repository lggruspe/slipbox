local slipbox = require "filters/slipbox"

local function test_parent_sequence_prefix()
  local cases = {
    ["10a"] = "10",
    ["10a1"] = "10a",
    ["10a1a1"] = "10a1a",
    ["10a1a2"] = "10a1a",
    ["10a1a3"] = "10a1a",
    ["10a1a1a"] = "10a1a1",
  }
  for i, o in pairs(cases) do
    local result = slipbox.parent_sequence(i)
    assert(o == result)
  end
end

test_parent_sequence_prefix()
