-- store metadata and links in database

local metadata = require "zettel.metadata"
local queue = require "zettel.queue"

local links = {}

function Link(elem)
    links[elem.target] = true
    return elem
end

function Meta(m)
    local host = "localhost"
    local port = m.port or 5000
    local filename = metadata.get_filename(m)
    local note_sql = queue.add_note {
        filename = filename,
        title = metadata.get_title(m),
    }
    queue.message(host, port, note_sql)
    links[""] = nil
    for link in pairs(links) do
        local link_sql = queue.add_link {
            src = filename,
            dest = link,
        }
        queue.message(host, port, link_sql)
    end
end
