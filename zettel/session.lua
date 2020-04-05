local M = {}

function M.initialize(db)
    return db:exec [[
        PRAGMA foreign_keys = ON;

        CREATE TABLE notes(
            filename TEXT PRIMARY KEY,
            title TEXT,
            author TEXT,
            date TEXT
        );

        CREATE TABLE links(
            src TEXT,
            dest TEXT,
            FOREIGN KEY (src) REFERENCES notes(filename),
            PRIMARY KEY (src, dest)
        );

        CREATE TABLE keywords(
            note TEXT,
            keyword TEXT,
            FOREIGN KEY (note) REFERENCES notes(filename),
            PRIMARY KEY (note, keyword)
        );
    ]]
end

function M.get_notes(db, key, val)
    assert(key:match('^[_a-zA-Z][_a-zA-Z0-9]*$'))
    local sql = "SELECT * FROM notes WHERE @key@ = ?"
    local stmt = db:prepare(sql:gsub("@key@", key))
    stmt:bind_values(val)
    return stmt:nrows()
end

function M.first_note(db, key, val)
    for row in M.get_notes(db, key, val) do
        return row
    end
end

function M.get_links(db, filename)
    local stmt = db:prepare [[
        SELECT * FROM
            (SELECT * FROM links WHERE src = ?)
            JOIN notes ON dest = filename
    ]]
    stmt:bind_values(filename)
    return stmt:nrows()
end

function M.get_backlinks(db, filename)
    local stmt = db:prepare [[
        SELECT * FROM
            (SELECT * FROM links WHERE dest = ?)
            JOIN notes ON src = filename
    ]]
    stmt:bind_values(filename)
    return stmt:nrows()
end

local function params(m, n)
    -- (?1, ..., ?m) n times
    assert(m > 0)
    assert(n > 0)
    local row = '(' .. string.rep("?, ", m):sub(1, -3) .. ')'
    return (row .. '@'):rep(n):sub(1, -2):gsub('@', ", ")
end

local function link_params(src, dests)
    local args = {}
    local n = 0
    for dest in pairs(dests) do
        table.insert(args, src)
        table.insert(args, dest)
        n = n + 2
    end
    return args, n
end

function M.add_links(db, src, dests)
    -- dests = { dest1 = true, dest2 = true, ... }
    dests[""] = nil
    if next(dests) then
        local values, n = link_params(src, dests)
        local sql = "INSERT INTO links (src, dest) VALUES " .. params(2, n//2)
        local stmt = db:prepare(sql)
        stmt:bind_values(table.unpack(values))
        return stmt:step()
    end
    return 0 -- OK
end

function M.insert_note(db, args)
    local stmt = db:prepare [[
        INSERT INTO notes (filename, title, author, date) VALUES (?, ?, ?, ?)
    ]]
    stmt:bind_values(
        args.filename,
        args.title,
        args.author,
        args.date or os.date("%Y-%m-%d %H:%M:%S"))
    return stmt:step()
end

return M
