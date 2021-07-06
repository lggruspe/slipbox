"""Parses sections in ephemeral pandoc output."""

from html.parser import HTMLParser
import typing as t


Attrs = t.List[t.Tuple[str, t.Optional[str]]]


def note_id(tag: str, attrs: Attrs) -> t.Optional[int]:
    """Return section as int if it's in the list of attributes."""
    if tag == "section" and attrs:
        id_ = dict(attrs).get("id") or ""
        if id_.isdigit():
            return int(id_)
    return None


class SectionParser(HTMLParser):
    """Parses sections in ephemeral pandoc output."""

    Callback = t.Callable[["SectionParser"], None]

    def __init__(self, callback: Callback):
        HTMLParser.__init__(self, convert_charrefs=False)
        self.id_ = -1
        self.section = ""
        self.callback = callback

    def error(self, message: str) -> None:
        """Dummy method to satisfy pylint."""
        HTMLParser.error(self, message)

    def close(self) -> None:
        self.callback(self)
        HTMLParser.close(self)

    def handle_starttag(self, tag: str, attrs: Attrs) -> None:
        id_ = note_id(tag, attrs)
        if id_ is not None:
            if self.id_ >= 0 and self.section:
                self.callback(self)
            self.id_ = id_
            self.section = ""
        self.section += self.get_starttag_text() or ""

    def handle_endtag(self, tag: str) -> None:
        self.section += f"</{tag}>"

    def handle_startendtag(self, tag: str, attrs: Attrs) -> None:
        self.section += self.get_starttag_text() or ""

    def handle_data(self, data: str) -> None:
        self.section += data

    def handle_entityref(self, name: str) -> None:
        self.section += f"&{name};"

    def handle_charref(self, name: str) -> None:
        self.section += f"&#{name};"

    def handle_comment(self, data: str) -> None:
        self.section += f"<!--{data}-->"

    def handle_decl(self, decl: str) -> None:
        self.section += f"<!{decl}>"

    def handle_pi(self, data: str) -> None:
        self.section += f"<?{data}>"

    def unknown_decl(self, data: str) -> None:
        self.section += f"<![{data}]>"


def parse_sections(html: str, callback: SectionParser.Callback) -> None:
    """Parses sections in ephemeral pandoc output."""
    parser = SectionParser(callback)
    parser.feed(html)
    parser.close()
