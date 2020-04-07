pandoc.utils = require "pandoc.utils"

local M = {}

function M.get_title(m)
    if not m.title then
        return nil
    end
    return pandoc.utils.stringify(m.title)
end

function M.get_keywords(m)
    if not m.keywords then
        return nil
    end
    return pandoc.utils.stringify(m.keywords)
end

return M
