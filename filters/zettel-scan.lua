-- store metadata and links in database

pandoc.utils = require "pandoc.utils"
local queue = require "zettel.queue"
local request = require "zettel.request"

local title = nil

local function get_title_from_metadata(m)
    title = pandoc.utils.stringify(m.title or "")
end

local function get_alternative_title_from_header(elem)
    assert(title)
    if title == "" and elem.level == 1 then
        title = pandoc.utils.stringify(elem.content)
        return {}
    end
end

local keywords = {}
local links = {}
local warnings = {}

local function Str(elem)
    -- TODO does this include #id info in divs, spans, etc.?
    if elem.text:match("^#[a-zA-Z][-a-zA-Z0-9]+$") then
        keywords[elem.text] = true
    end
end

local function Link(elem)
    -- even if elem.target == "", Meta sets links[""] to nil
    links[elem.target] = elem.title
    if elem.target ~= "" and elem.title == "" then
        warnings["unannotated link"] = pandoc.utils.stringify(elem.content)
    end
end

local function Meta(m)
    local host = "localhost"
    local port = m.port or 5000
    local title = title
    local note_req = request.note(title, m.relpath)
    queue.message(host, port, note_req)
    links[""] = nil
    for link, description in pairs(links) do
        local link_req = request.link(m.relpath, link, description)
        queue.message(host, port, link_req)
    end

    keywords[""] = nil
    for kw in pairs(keywords) do
        local kw_req = request.keyword(m.relpath, kw)
        queue.message(host, port, kw_req)
    end

    for warning, context in pairs(warnings) do
        io.stderr:write(string.format("Warning: %s in %s (%s)\n", warning, m.relpath, context))
    end

    --- edit metadata if not set already
    m.title = m.title or pandoc.MetaString(title or "")
    m.subtitle = m.subtitle or pandoc.MetaString(m.relpath or "")
    return m
end

return {
    { Meta = get_title_from_metadata },
    { Header = get_alternative_title_from_header, Str = Str, Link = Link, Meta = Meta },
}
