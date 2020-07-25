require "busted.runner" ()

local links = require "filters/links"

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

local function make_sample_div()
  local div = mock_div{mock_plain{mock_str"Content"}}
  div.identifier = 1
  return div
end

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
      local div = make_sample_div()
      local link = make_direct_link()
      local result = links.get_link(div, link)
      assert.truthy(result)
      assert.truthy(result.description)
      assert.are_not.equal(result.description, "")
    end)
  end)

  describe("on a sequence Link", function()
    it("should return an object with an alias description.", function()
      local div = make_sample_div()
      local link = make_sequence_link()
      local result = links.get_link(div, link)
      assert.truthy(result)
      assert.truthy(result.description)
      assert.truthy(result.description:match('^%d+%a[%d%a]*$'))
    end)

    describe("with an integer alias", function()
      it("should return a direct link", function()
        local div = make_sample_div()
        local link = mock_link({make_sample_str()}, "#5", "5")
        local result = links.get_link(div, link)
        assert.truthy(result)
        assert.is_equal(result.tag, "direct")
      end)
    end)
  end)

  describe("on tag links", function()
    it("should return nil", function()
      local div = make_sample_div()
      local link = make_tag_link()
      local result = links.get_link(div, link) or
        links.get_link(div, link)
      assert(not result)
    end)
  end)
end)
