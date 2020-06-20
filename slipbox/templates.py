"""HTML elements."""

from textwrap import indent

class Elem:
    """Represents an HTML element."""
    def __init__(self, tag, *children, **attributes):
        self.tag = tag
        self.children = list(children)
        self.attributes = attributes.copy()

def render(elem, prefix=""):
    """Render HTML from Elem or str."""
    if isinstance(elem, str):
        return prefix + elem
    assert isinstance(elem, Elem)
    attrs = ""
    for key, val in elem.attributes.items():
        attrs += f" {key}={val!r}"
    children = indent("\n".join(render(child) for child in elem.children),
                      prefix + "  ")
    return "<{tag}{attrs}>\n{children}\n</{tag}>".format(
        tag=elem.tag,
        attrs=attrs,
        children=children)
