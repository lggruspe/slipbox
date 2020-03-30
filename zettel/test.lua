local sqlite3 = require "lsqlite3"
local session = require "session"

local db = sqlite3.open_memory()
session.initialize(db)

session.insert_note(db, {
    filename = "3pc.md",
    title = "Three-phase compiler architecture",
    author = "Levi Gruspe",
})

session.insert_note(db, {
    filename = "compiler.md",
    author = "Levi Gruspe",
})

session.insert_note(db, {
    filename = "frontend.md"
})

session.add_link(db, "frontend.md", "3pc.md")
session.add_link(db, "compiler.md", "3pc.md")
session.add_link(db, "frontend.md", "3pc.md")

for link in db:nrows[[SELECT * FROM links]] do
    for k, v in pairs(link) do
        print(k, v)
    end
    print()
end

for note in session.get_notes(db, "author", "Levi Gruspe") do
    print(note.title, note.author, note.date, note.filename)
end
print()

for note in session.get_notes(db, "filename", "3pc.md") do
    print(note.title, note.author, note.date, note.filename)
end

for note in session.get_backlinks(db, "3pc.md") do
    print(note.title, note.author, note.date, note.filename)
end
print()

for note in session.get_links(db, "3pc.md") do
    print(note.title, note.author, note.date, note.filename)
end
