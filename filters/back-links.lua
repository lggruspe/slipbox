-- add backlinks stored in sqlite3 database into document

local sqlite3 = require "lsqlite3"
local metadata = require "zettel.metadata"
local session = require "zettel.session"

function Pandoc(doc)
    local para = {}
    local db = sqlite3.open(doc.meta.database)
    local note = session.first_note(db, "title", metadata.get_title(doc.meta)) or {}
    assert(note.filename)
    if not note.filename then
        goto cleanup
    end
    for backlink in session.get_backlinks(db, note.filename) do
        local link = backlink.filename
        local content = (backlink.title or "") .. " (" .. link .. ")"
        table.insert(para, pandoc.Link(content, link))
        table.insert(para, pandoc.Str ", ")
    end
    if next(para) then
        table.remove(para)
        table.insert(doc.blocks, pandoc.Header(1, pandoc.Str "See also"))
        table.insert(doc.blocks, pandoc.Para(para))
    end
::cleanup::
    db:close()
    return doc
end
