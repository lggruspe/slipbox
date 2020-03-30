pandoc.utils = require "pandoc.utils"

local M = {}

function M.get_filename(m)
    return m.filename:gsub(".*/([^/]*).md", "%1.md")
end

function M.get_author(m)
    return pandoc.utils.stringify(m.author)
end

function M.get_title(m)
    return pandoc.utils.stringify(m.title)
end

function M.get_date(m)
    return pandoc.utils.stringify(m.date)
end

function M.get_keywords(m)
    local keywords = {}
    for _, kw in pairs(m.keywords[1].content) do
        if kw.text then table.insert(keywords, kw.text) end
    end
    return keywords
end

return M
