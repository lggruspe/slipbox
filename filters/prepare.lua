-- store metadata and links in database

pandoc.utils = require "pandoc.utils"
local queue = require "zettel.queue"
local request = require "zettel.request"

local keywords = {}
local links = {}
local warnings = {}

local function get_title(m)
    if not m.title then return nil end
    return pandoc.utils.stringify(m.title)
end

function Str(elem)
    if elem.text:match("^#[a-zA-Z][-a-zA-Z0-9]+$") then
        keywords[elem.text] = true
    end
end

function Link(elem)
    -- even if elem.target == "", Meta sets links[""] to nil
    links[elem.target] = elem.title
    if elem.target ~= "" and elem.title == "" then
        warnings["unannotated link"] = pandoc.utils.stringify(elem.content)
    end
end

function Meta(m)
    local host = "localhost"
    local port = m.port or 5000
    local title = get_title(m)
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
end
