-- store metadata and links in database

pandoc.utils = require "pandoc.utils"
local metadata = require "zettel.metadata"
local queue = require "zettel.queue"

local title = nil
local links = {}

function Header(elem)
    -- use content of first level 1 header as title in case there's no title
    -- metadata
    if not title and elem.level == 1 then
        title = pandoc.utils.stringify(elem.content)
    end
end

function Link(elem)
    links[elem.target] = true
end

function Meta(m)
    if not m.title and title then
        m.title = pandoc.MetaString(title)
    end

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
