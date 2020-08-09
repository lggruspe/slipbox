require "busted.runner" ()

local utils = require "filters/utils"

local function mock_attr(identifier, classes, attributes)
  -- Mock pandoc.Attr.
  -- identifier
  -- : A string.
  -- classes
  -- : A list of strings.
  -- attributes
  -- : A list of key-value pairs.
  return {
    identifier = identifier,
    classes = classes,
    attributes = attributes,
  }
end

local function mock_str(text)
  -- Mock pandoc.Str.
  -- text
  -- : A string.
  return {
    text = text,
    tag = "Str",
    t = "Str",
  }
end

local function mock_link(content, target, title, attr)
  -- Mock pandoc.Link.
  -- content
  -- : A list of inlines.
  -- target
  -- : A string.
  -- title
  -- : A string.
  -- attr
  -- : A list of key-value pairs.
  local _attr = mock_attr(nil, nil, attr)
  return {
    attr = _attr,
    content = content,
    target = target,
    identifier = _attr.identifier,
    classes = _attr.classes,
    attributes = attr,
    tag = "Link",
    t = "Link",
    title = title,
  }
end

--[[
local function mock_div(content, attr)
  -- Mock pandoc.Div.
  -- content
  -- : A list of blocks.
  -- attr
  -- : a list of key-value pairs.
  local _attr = mock_attr(nil, nil, attr)
  return {
    content = content,
    attr = _attr,
    identifier = _attr.identifier,
    classes = _attr.classes,
    attributes = attr,
    tag = "Div",
    t = "Div",
  }
end

local function mock_plain(content)
  -- Mock pandoc.Plain.
  -- content
  -- : A list of inlines.
  return {
    content = content,
    tag = "Plain",
    t = "Plain",
  }
end
--]]

local function make_sample_str()
  return mock_str"text"
end

local function make_direct_link()
  return mock_link({make_sample_str()}, "#5", "Description")
end

local function make_sequence_link()
  return mock_link({make_sample_str()}, "#5", "1a")
end

local function make_tag_link()
  return mock_link({make_sample_str()}, "##tag")
end

describe("get_link", function()
  describe("on a direct Link", function()
    it("should be able to return an object with a non-null description", function()
      local link = make_direct_link()
      local result = utils.get_link(0, link)
      assert.truthy(result)
      assert.truthy(result.description)
      assert.are_not.equal(result.description, "")
    end)
  end)

  describe("on a sequence Link", function()
    it("should return an object with an alias description.", function()
      local link = make_sequence_link()
      local result = utils.get_link(0, link)
      assert.truthy(result)
      assert.truthy(result.description)
      assert.truthy(result.description:match('^%d+%a[%d%a]*$'))
    end)

    describe("with an integer alias", function()
      it("should return a direct link", function()
        local link = mock_link({make_sample_str()}, "#5", "5")
        local result = utils.get_link(0, link)
        assert.truthy(result)
        assert.is_equal(result.tag, "direct")
      end)
    end)
  end)

  describe("on tag links", function()
    it("should return nil", function()
      local link = make_tag_link()
      local result = utils.get_link(0, link)
      assert(not result)
    end)
  end)
end)

it("hashtag_prefix", function()
  local examples = {
    ["# "]  = nil,
    ["## "] = nil,
    ["#tag."] = "#tag",
    ["##Hash-Tag_0-9!"] = "##Hash-Tag_0-9",
  }

  for input, expected in pairs(examples) do
    local output = utils.hashtag_prefix(input)
    assert.are.equal(output, expected)
  end
end)

describe("alias_parent", function()
  assert.are.equal(utils.alias_parent("1a"), "1")
  assert.are.equal(utils.alias_parent(nil), nil)
  assert.are_equal(utils.alias_parent(""), nil)
  assert.are.equal(utils.alias_parent("2"), nil)

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
      local result = utils.alias_parent(i)
      assert.are.equal(o, result)
    end
  end)
end)

it("is_valid_alias", function()
  assert.truthy(utils.is_valid_alias(nil))
  assert.truthy(utils.is_valid_alias("0"))
  assert.truthy(utils.is_valid_alias("1a"))

  assert.falsy(utils.is_valid_alias(1))
  assert.falsy(utils.is_valid_alias("b"))
  assert.falsy(utils.is_valid_alias(""))
end)

describe("parse_id_and_title", function()
  it("should work with multiple whitespace characters between ID and title", function()
    local id, title = utils.parse_id_and_title("0      Title")
    assert.are.equal(id, 0)
    assert.are.equal(title, "Title")
  end)

  it("should return nil if there's no whitespace between ID andtitle", function()
    local id, title = utils.parse_id_and_title("1Title")
    assert.is_nil(id)
    assert.is_nil(title)
  end)

  it("should return nil if there's no ID", function()
    local id, title = utils.parse_id_and_title("100%")
    assert.is_nil(id)
    assert.is_nil(title)
  end)

  it("should return nil if theren's no title", function()
    local id, title = utils.parse_id_and_title("2       ")
    assert.is_nil(id)
    assert.is_nil(title)
  end)

  it("should work with whitespace characters before the ID", function()
    local id, title = utils.parse_id_and_title(" 3 Title")
    assert.are.equal(id, 3)
    assert.are.equal(title, "Title")
  end)

  it("should omit whitespace characters at the end of the title", function()
    local id, title = utils.parse_id_and_title("4 Title    ")
    assert.are.equal(id, 4)
    assert.are.equal(title, "Title")
  end)
end)

describe("alias_root", function()
  describe("with invalid alias input", function()
    it("should return nil", function()
      assert.is_nil(utils.alias_root(""))
      assert.is_nil(utils.alias_root("a"))
    end)
  end)

  describe("with valid alias input", function()
    it("should return nil if it has no parent", function()
      for i = 0, 3 do
        assert.is_nil(utils.alias_root(tostring(i)))
      end
    end)

    it("should drop everything but the number prefix", function()
      assert.are.equal(utils.alias_root("1a"), "1")
      assert.are.equal(utils.alias_root("2ab"), "2")
      assert.are.equal(utils.alias_root("3a1b"), "3")
    end)
  end)
end)
