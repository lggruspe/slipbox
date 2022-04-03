require "busted.runner" ()

local utils = require "src.utils"

it("hashtag_prefix", function()
  local examples = {
    ["# "]  = nil,
    ["## "] = nil,
    ["#tag."] = "#tag",
  }
  for input, expected in pairs(examples) do
    local output = utils.hashtag_prefix(input)
    assert.equal(output, expected)
  end
end)
