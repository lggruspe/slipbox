"""HTML elements."""

from __future__ import annotations
from textwrap import indent
from typing import Any, Union

class Elem:
    """Represents an HTML element."""
    def __init__(self, tag: str, *children: Union[str, Elem], **attributes: Any):
        self.tag = tag
        self.children = list(children)
        self.attributes = attributes.copy()

def render(elem: Union[str, Elem], prefix: str = "") -> str:
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
