local socket = require "socket"

local M = {}

function M.message(host, port, msg)
    local client = assert(socket.tcp())
    client:connect(host, port)
    client:send(msg)
    client:close()
end

return M 
