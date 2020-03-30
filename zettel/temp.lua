local queue = require "queue"

local host = "localhost"
local port = 5000

local function Note(note)
    local sql = queue.add_note(note)
    print(sql)
    queue.message(host, port, sql)
end

local function Link(link)
    local sql = queue.add_link(link)
    print(sql)
    queue.message(host, port, sql)
end

Note {filename = "frontend.md"}

Note {
    filename = "3pc.md",
    title = "Three-phase compiler architecture",
    author = "Levi Gruspe",
}

Note {
    filename = "compiler.md",
    author = "Levi Gruspe",
}

Link {
    src = "frontend.md",
    dest = "3pc.md",
}

Link {
    src = "compiler.md",
    dest = "3pc.md",
}

Link {
    src = "foo'bar.md",
    dest = "'''",
}

queue.message(host, port, "shutdown")
