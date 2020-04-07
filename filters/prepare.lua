-- store metadata and links in database

local metadata = require "zettel.metadata"
local queue = require "zettel.queue"
local request = require "zettel.request"

local links = {}
local warnings = {}

function Link(elem)
    if elem.title == "" then
        if elem.target ~= "" then
            warnings["unannotated link"] = pandoc.utils.stringify(elem.content)
        end
    else
        links[elem.target] = elem.title
    end
end

function Meta(m)
    local host = "localhost"
    local port = m.port or 5000
    local title = metadata.get_title(m)
    local note_req = request.note(title, m.relpath)
    queue.message(host, port, note_req)
    links[""] = nil
    for link, description in pairs(links) do
        local link_req = request.link(m.relpath, link, description)
        queue.message(host, port, link_req)
    end

    for warning, context in pairs(warnings) do
        io.stderr:write(string.format("Warning: %s in %s (%s)\n", warning, m.relpath, context))
    end
end
