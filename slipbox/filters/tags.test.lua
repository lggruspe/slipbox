require "busted.runner" ()

local tags = require "filters/tags"

it("hashtag_prefix", function()
  local examples = {
    ["# "]  = nil,
    ["## "] = nil,
    ["#tag."] = "#tag",
    ["##Hash-Tag_0-9!"] = "##Hash-Tag_0-9",
  }

  for input, expected in pairs(examples) do
    local output = tags.hashtag_prefix(input)
    assert.are.equal(output, expected)
  end
end)
