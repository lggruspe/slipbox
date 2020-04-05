local socket = require "socket"

local M = {}

local function sqlite_string(s)
    if s == nil then return "NULL" end
    return string.format("'%s'", s:gsub("'", "''"))
end

function M.add_note(note)
    local sql = "INSERT INTO notes (filename, title) VALUES (@filename@, @title@)"
    local filename = sqlite_string(note.filename)
    local title = sqlite_string(note.title)
    sql = sql:gsub("@title@", title, 1)
        :gsub("@filename@", filename, 1)
    return sql
end

function M.add_link(link)
    local sql = "INSERT INTO links (src, dest, description) VALUES " 
        .. string.format("(%s, %s, %s)",
            sqlite_string(link.src),
            sqlite_string(link.dest),
            sqlite_string(link.description))
    return sql
end

function M.message(host, port, msg)
    local client = assert(socket.tcp())
    client:connect(host, port)
    client:send(msg)
    client:close()
end

return M 
