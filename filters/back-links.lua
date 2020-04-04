-- add backlinks stored in sqlite3 database into document

local sqlite3 = require "lsqlite3"
local metadata = require "zettel.metadata"
local session = require "zettel.session"

function Pandoc(doc)
    local db = sqlite3.open(doc.meta.database)
    local filename = metadata.get_filename(doc.meta)
    assert(filename)
    
    local blocklists = {}
    for backlink in session.get_backlinks(db, filename) do
        local link = backlink.filename
        local content = string.format("%s (%s)", backlink.title or "", link)
        local inline = pandoc.Link(pandoc.Str(content), link)
        local block = pandoc.Plain{inline}
        table.insert(blocklists, {block})
    end

    if next(blocklists) then
        table.insert(doc.blocks, pandoc.Header(1, pandoc.Str "See also"))
        table.insert(doc.blocks, pandoc.BulletList(blocklists))
    end
    db:close()
    return doc
end
