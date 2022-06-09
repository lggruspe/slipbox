"""Basic templates.

Also includes functions for building HTML elements.
"""

from pathlib import Path
from string import Template as StringTemplate
from textwrap import indent
import typing as t


class Template(StringTemplate):
    """Extended string.Template with file loader."""
    @staticmethod
    def load(path: Path, encoding: t.Optional[str] = None) -> "Template":
        """Load template from file."""
        return Template(path.read_text(encoding=encoding))

    def render(self, **kwargs: t.Any) -> str:
        """Substitute template variables."""
        return self.safe_substitute(**kwargs)


def render_template(path: t.Union[str, Path], **kwargs: t.Any) -> str:
    """Render template from templates directory."""
    basedir = Path(__file__).parent/"templates"
    template = Template.load(basedir/path, encoding="utf-8")
    return template.render(**kwargs)


class Elem:
    """Represents an HTML element."""
    def __init__(self,
                 tag: str,
                 *children: t.Union[str, "Elem"],
                 **attributes: t.Any):
        self.tag = tag
        self.children = list(children)
        self.attributes = attributes.copy()


def render(elem: t.Union[str, Elem], prefix: str = "") -> str:
    """Render HTML from Elem or str."""
    if isinstance(elem, str):
        return prefix + elem
    assert isinstance(elem, Elem)
    attrs = ""
    for key, val in elem.attributes.items():
        attrs += f" {key}={val!r}"
    if not elem.children:
        return "<{tag}{attrs}></{tag}>".format(tag=elem.tag, attrs=attrs)
    children = indent("\n".join(render(child) for child in elem.children),
                      prefix + "  ")
    return "<{tag}{attrs}>\n{children}\n</{tag}>".format(
        tag=elem.tag,
        attrs=attrs,
        children=children)
