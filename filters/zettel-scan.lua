-- store metadata and links in database

pandoc.utils = require "pandoc.utils"
local pl = {}
pl.path = require "pl.path"
local request = require "filters.request"

local metadata = {}

local function get_some_metadata(m)
    metadata.title = pandoc.utils.stringify(m.title or "")
    metadata.basedir = m.basedir
    metadata.relpath = m.relpath
    metadata.folgezettel = m.folgezettel == true
end

local function get_alternative_title_from_header(elem)
    assert(metadata.title)
    if metadata.title == "" and elem.level == 1 then
        metadata.title = pandoc.utils.stringify(elem.content)
        return {}
    end
end

local function extract_code(block)
    local save_as = block.attributes["save-as"]
    if save_as and save_as ~= "" then
        local code = pl.path.join(metadata.basedir, pl.path.dirname(metadata.relpath), save_as)
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
local folgezettels = {} -- for folgezettel

local function Str(elem)
    -- TODO does this include #id info in divs, spans, etc.?
    if elem.text:match("^#[a-zA-Z][-a-zA-Z0-9]+$") then
        keywords[elem.text] = true
    end
end

local function next_seqnum(seqnum)
    local c = seqnum:sub(#seqnum, #seqnum)
    return seqnum .. (c:match('%d') and 'a' or c:match('%a') and '1' or "")
end

local current_seqnum = "0"
local function Link(elem)
    -- even if elem.target == "", Meta sets links[""] to nil
    links[elem.target] = elem.title
    if metadata.folgezettel then
        local seqnum = pandoc.utils.stringify(elem.content or "")
        local target = elem.target or ""
        if target ~= "" then
            if seqnum:match("^%d+[%d%a]*$") then
                if folgezettels[seqnum] then
                    if not warnings["Duplicate sequence number"] then
                        warnings["Duplicate sequence number"] = {}
                    end
                    table.insert(warnings["Duplicate sequence number"], seqnum)
                end
                folgezettels[seqnum] = target
            elseif seqnum == "" then
                -- generate seqnum if link has no text
                if folgezettels[current_seqnum] then
                    if not warnings["Duplicate sequence number"] then
                        warnings["Duplicate sequence number"] = {}
                    end
                    table.insert(warnings["Duplicate sequence number"], current_seqnum)
                end
                folgezettels[current_seqnum] = target
                current_seqnum = next_seqnum(current_seqnum)
            end
        end
    else
        -- show warnings for unannotated links
        -- TODO don't show warnings for unannotated external links
        if elem.target ~= "" and elem.title == "" then
            if not warnings["Unannotated link"] then
                warnings["Unannotated link"] = {}
            end
            table.insert(warnings["Unannotated link"], pandoc.utils.stringify(elem.content))
        end
    end
end

local function Meta(m)
    local host = "localhost"
    local port = m.port or 5000
    local title = metadata.title
    local relpath = metadata.relpath
    local note_req = request.note(title, relpath)
    request.message(host, port, note_req)
    links[""] = nil
    for link, description in pairs(links) do
        local link_req = request.link(relpath, link, description)
        request.message(host, port, link_req)
    end

    keywords[""] = nil
    for kw in pairs(keywords) do
        local kw_req = request.keyword(relpath, kw)
        request.message(host, port, kw_req)
    end

    folgezettels[""] = nil
    for seqnum, v in pairs(folgezettels) do
        local target = pl.path.normpath(pl.path.join(pl.path.dirname(relpath), v))
        local fz_req = request.folgezettel(relpath, target, seqnum)
        request.message(host, port, fz_req)
    end

    for warning, context in pairs(warnings) do
        for _, data in ipairs(context) do
            io.stderr:write(string.format("[WARNING] %s in %s (%s)\n", warning, relpath, data))
        end
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
