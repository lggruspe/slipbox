pandoc.utils = require "pandoc.utils"

local M = {}

function M.get_filename(m)
    return m.filename:gsub(".*/([^/]*).md", "%1.md")
end

function M.get_author(m)
    if not m.author then
        return nil
    end
    return pandoc.utils.stringify(m.author)
end

function M.get_title(m)
    if not m.title then
        return nil
    end
    return pandoc.utils.stringify(m.title)
end

function M.get_date(m)
    if not m.date then
        return nil
    end
    return pandoc.utils.stringify(m.date)
end

function M.get_keywords(m)
    if not m.keywords then
        return nil
    end
    return pandoc.utils.stringify(m.keywords)
end

return M
