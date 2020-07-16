require "busted.runner" ()

local slipbox = require "filters/slipbox"

describe("parent_sequence", function()
  it("should drop the last sequence of digits or letters", function()
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
      assert.are.equal(o, result)
    end
  end)
end)
