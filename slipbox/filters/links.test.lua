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

local function test_get_sequence_link_non_null()
  -- Check if get_sequence_link ever returns a non-null object.
  local div = make_sample_div()
  local link = make_sequence_link()
  local result = links.get_sequence_link(div, link)
  assert(result)
end

local function test_get_sequence_link_alias()
  local div = make_sample_div()
  local link = make_sequence_link()
  local result = links.get_sequence_link(div, link)
  assert(result.alias)
  assert(result.alias:match('^%d+%a[%d%a]*$'))
end

local function test_get_direct_link_description()
  -- Check if get_direct_link ever returns a non-null description.
  local div = make_sample_div()
  local link = make_direct_link()
  local result = links.get_direct_link(div, link)
  assert(result)
  assert(result.description and result.description ~= "")
end

local function test_get_link_nil()
  -- Make sure get_sequence_link and get_direct_link can return nil.
  -- Test case: tag links should not be classified as a direct or sequence link.
  local div = make_sample_div()
  local link = make_tag_link()
  local result = links.get_direct_link(div, link) or
    links.get_sequence_link(div, link)
  assert(not result)
end

test_get_sequence_link_non_null()
test_get_sequence_link_alias()
test_get_direct_link_description()
test_get_link_nil()
