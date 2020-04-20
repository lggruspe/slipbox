pandoc.utils = require "pandoc.utils"

local title = nil

local function get_alternative_title_from_header(elem)
    if not title and elem.level == 1 then
        title = pandoc.utils.stringify(elem.content)
        elem = {}
    end
    return elem
end

local function set_missing_titles(m)
    if not m.title then
        m.title = pandoc.MetaString(title or "")
    end
    m.subtitle = pandoc.MetaString(m.relpath)
    return m
end

return {
    { Header = get_alternative_title_from_header, Meta = set_missing_titles }
}
