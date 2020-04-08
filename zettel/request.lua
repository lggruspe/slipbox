-- construct request data for zettel sqlite3

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

return M
