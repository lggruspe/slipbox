local pandoc = require "pandoc"
pandoc.utils = require "pandoc.utils"

local function parse_header_text(text)
    local pattern = '^%s*(%d+)%s+(.-)%s*$'
    local id, count = text:gsub(pattern, '%1')
    if count > 0 then
        local title
        title, count = text:gsub(pattern, '%2')
        if count > 0 then
            return tonumber(id), title
        end
    end
end

local function Header(elem)
    if elem.level ~= 1 then return end
    local content = pandoc.utils.stringify(elem)
    assert(content)
    local id, title = parse_header_text(content)
    io.stderr:write(string.format('%d %s\n', id, title))
    if id and title then
        elem.identifier = tostring(id)
        elem.attributes.title = title
        elem.attributes.level = tostring(elem.level)
    end
end

local function Pandoc(doc)
    doc.blocks = pandoc.utils.make_sections(false, nil, doc.blocks)
    return doc
end

return {
    {
        Header = Header,
        Pandoc = Pandoc,
    }
}
