-- store metadata and links in database

pandoc.utils = require "pandoc.utils"
local pl = {}
pl.path = require "pl.path"
local queue = require "zettel.queue"
local request = require "zettel.request"

local title
local relpath
local basedir
local outline -- TODO set to true if title starts with Outline of...
local folgezettel -- TODO specify as outline value

local function get_some_metadata(m)
    title = pandoc.utils.stringify(m.title or "")
    basedir = m.basedir
    relpath = m.relpath
    outline = m.outline == true
    folgezettel = m.folgezettel == true
end

local function get_alternative_title_from_header(elem)
    assert(title)
    if title == "" and elem.level == 1 then
        title = pandoc.utils.stringify(elem.content)
        return {}
    end
end

local function extract_code(block)
    local save_as = block.attributes["save-as"]
    if save_as and save_as ~= "" then
        local code = pl.path.join(basedir, pl.path.dirname(relpath), save_as)
        local f = io.open(code, "w")
        if f then
            f:write(block.text)
            f:close()
        end
    end
end

local keywords = {}
local links = {}
local warnings = {}
local sequence = {} -- for outlines
local folgezettels = {} -- for folgezettel

local function Str(elem)
    -- TODO does this include #id info in divs, spans, etc.?
    if elem.text:match("^#[a-zA-Z][-a-zA-Z0-9]+$") then
        keywords[elem.text] = true
    end
end

local function Link(elem)
    -- even if elem.target == "", Meta sets links[""] to nil
    links[elem.target] = elem.title
    if elem.target ~= "" and elem.title == "" then
        warnings["Unannotated link"] = pandoc.utils.stringify(elem.content)
    end
    if outline and elem.target and elem.target ~= "" then
        table.insert(sequence, elem.target)
    end
    if folgezettel then
        local seqnum = pandoc.utils.stringify(elem.content or "")
        local target = elem.target or ""
        if seqnum ~= "" and target ~= "" then
            folgezettels[seqnum] = target
        end
    end
end

local function Meta(m)
    local host = "localhost"
    local port = m.port or 5000
    local title = title
    local note_req = request.note(title, relpath)
    queue.message(host, port, note_req)
    links[""] = nil
    for link, description in pairs(links) do
        local link_req = request.link(relpath, link, description)
        queue.message(host, port, link_req)
    end

    keywords[""] = nil
    for kw in pairs(keywords) do
        local kw_req = request.keyword(relpath, kw)
        queue.message(host, port, kw_req)
    end

    for i = 2, #sequence do
        local prev_note = sequence[i-1]
        local next_note = sequence[i]
        local seq_req = request.sequence(relpath, prev_note, next_note)
        queue.message(host, port, seq_req)
    end

    folgezettels[""] = nil
    for seqnum, v in pairs(folgezettels) do
        local target = pl.path.normpath(pl.path.join(pl.path.dirname(relpath), v))
        local fz_req = request.folgezettel(relpath, target, seqnum)
        queue.message(host, port, fz_req)
    end

    for warning, context in pairs(warnings) do
        io.stderr:write(string.format("[WARNING] %s in %s (%s)\n", warning, relpath, context))
    end

    --- edit metadata if not set already
    m.title = m.title or pandoc.MetaString(title or "")
    m.subtitle = m.subtitle or pandoc.MetaString(relpath or "")
    return m
end

return {
    { Meta = get_some_metadata },
    {
        CodeBlock = extract_code,
        Header = get_alternative_title_from_header,
        Str = Str,
        Link = Link,
        Meta = Meta,
    },
}
