local sqlite3 = require "lsqlite3"

local function get_relative_link(db, src, dest)
    local stmt = db:prepare [[
        SELECT relative_link FROM links WHERE src = ? AND original_link = ?
    ]]
    stmt:bind_values(src, dest)
    for row in stmt:nrows() do
        return row.relative_link
    end
end

local database
local relpath

local function get_some_metadata(m)
    database = m.database
    relpath = m.relpath
end

function Link(elem)
    -- fixes links not relative to file
    local db = sqlite3.open(database)
    local dest = get_relative_link(db, relpath, elem.target)
    elem.target = dest or elem.target
    db:close()
    return elem
end

return {
    { Meta = get_some_metadata },
    { Link = Link }
}
