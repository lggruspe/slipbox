require "busted.runner" ()

local links = require "src.links"

local function join(table, sep)
  local result = ""
  sep = sep or ""
  for i, str in ipairs(table) do
    if i > 1 then
      result = result .. sep
    end
    result = result .. str
  end
  return result
end

describe("parse_note_link", function()
  local parse_note_link = links.parse_note_link

  describe("with invalid target", function()
    local examples = {
      "",
      "?#100",
      "#tags",
      "#100?",
      "100",
    }

    it("returns false", function()
      for _, example in ipairs(examples) do
        assert.falsy(parse_note_link(example))
      end
    end)
  end)

  describe("with valid target", function()
    local examples = {
      {"", "#100"},
      {">", "#50"},
      {"<", "#25"},
    }

    it("result contains target ID and direction", function()
      for _, example in ipairs(examples) do
        local ok, result = parse_note_link(join(example))
        assert.truthy(ok)
        assert.equals(type(result.target), "string")
        assert.is_not.equals(result.target, "")

        local direction = result.direction
        assert.truthy(direction == "" or direction == "<" or direction == ">")

        assert.equals(example[1], direction)
        assert.equals(example[2], result.target)
      end
    end)
  end)
end)
