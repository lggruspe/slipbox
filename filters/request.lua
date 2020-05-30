-- construct request data for zettel sqlite3

local socket = require "socket"

local M = {}

local function json_string(s)
    return string.format('"%s"', s:gsub('"', [[\"]]))
end

function M.note(title, filename)
    local tmpl = [[
    {
        "type": "note",
        "data": {
            "title": @title@,
            "filename": @filename@
        }
    }
    ]]
    return tmpl:gsub("@filename@", json_string(filename))
        :gsub("@title@", json_string(title))
end

function M.link(src, dest, description)
    local tmpl = [[
    {
        "type": "link",
        "data": {
            "src": @src@,
            "dest": @dest@,
            "description": @description@
        }
    }
    ]]
    return tmpl:gsub("@description@", json_string(description))
        :gsub("@dest@", json_string(dest))
        :gsub("@src@", json_string(src))
end

function M.keyword(note, keyword)
    -- note (filename) and keyword (tag)
    local tmpl = [[
    {
        "type": "keyword",
        "data": {
            "note": @note@,
            "keyword": @keyword@
        }
    }
    ]]
    return tmpl:gsub("@keyword@", json_string(keyword))
        :gsub("@note@", json_string(note))
end

function M.folgezettel(outline, note, seqnum)
    local tmpl = [[
    {
        "type": "folgezettel",
        "data": {
            "outline": @outline@,
            "note": @note@,
            "seqnum": @seqnum@
        }
    }
    ]]
    return tmpl:gsub("@seqnum@", json_string(seqnum))
        :gsub("@note@", json_string(note))
        :gsub("@outline@", json_string(outline))
end

function M.message(host, port, msg)
    local client = assert(socket.tcp())
    client:connect(host, port)
    client:send(msg)
    client:close()
end

return M
