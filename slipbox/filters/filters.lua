-- Pandoc filters.

local pandoc = require "pandoc"
pandoc.utils = require "pandoc.utils"

local log = require "filters/log"
local utils = require "filters/utils"

local function init(slipbox)
  -- Create filter that preprocesses headers by splitting the document
  -- into sections.

  local function Header(elem)
    -- Only scan level 1 headers.
    if elem.level ~= 1 then return end

    local content = pandoc.utils.stringify(elem.content)
    local id, title = utils.parse_id_and_title(content)
    if id and title then
      local err = slipbox:save_note(id, title)
      if err then log.warning(err) end

      elem.identifier = id
      elem.attributes.title = title
      elem.attributes.level = elem.level  -- Gets added to parent section
      return elem
    end
  end

  local function Pandoc(doc)
    doc.blocks = pandoc.utils.make_sections(false, nil, doc.blocks)
    return doc
  end

  return {
    Header = Header,
    Pandoc = Pandoc,
  }
end

local function collect(slipbox)
  -- Create filter that saves citations, links and tags.

  return {
    Div = function(div)
      local id = tonumber(div.identifier)
      if id then
        pandoc.walk_block(div, {

          Cite = function(elem)
            for _, citation in pairs(elem.citations) do
              slipbox:save_citation(id, citation.id)
            end
          end,

          Link = function(elem)
            local link = utils.get_link(id, elem)
            if link then
              slipbox:save_link(link)
            end
          end,

          Str = function(elem)
            if utils.hashtag_prefix(elem.text) then
              slipbox:save_tag(id, elem.text)
            end
          end,
        })
      end
    end
  }
end

local function modify()
  -- Create filter that modifies the document.

  return {
    Link = function(elem)
      -- Rewrite links with empty targets/text.
      if not elem.target or elem.target == "" then
        return elem.content
      end

      local content = pandoc.utils.stringify(elem.content or "")
      if content == "" then
        return {
          pandoc.Str " [",
          pandoc.Link(
            {pandoc.Str(elem.target)},
            elem.target,
            elem.title),
          pandoc.Str "]",
        }
      end
    end,

    Str = function(elem)
      -- Turn #tags into links.
      if utils.hashtag_prefix(elem.text) then
        return pandoc.Link({elem}, '#'..elem.text)
      end
    end
  }
end

local function serialize(slipbox)
  -- Create filter to dump slipbox data into SLIPBOX_TMPDIR.
  return {
    Pandoc = function()
      local tmpdir = os.getenv "SLIPBOX_TMPDIR"
      local scan_input_list = os.getenv "SCAN_INPUT_LIST"
      if not tmpdir or tmpdir == "" then return end

      local scan = require "filters/scan"
      local filenames = scan.parse_grep_output(slipbox, scan.grep_headers(scan_input_list))
      slipbox:write_data(tmpdir, filenames)
    end
  }
end

return {
  init = init,
  collect = collect,
  modify = modify,
  serialize = serialize,
}
