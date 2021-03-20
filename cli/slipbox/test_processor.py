# type: ignore
"""Test processor.py."""
from .processor import preprocess, MARKDOWN_TEMPLATE


def test_preprocess_markdown_with_sources(files_abc, tmp_path):
    """There must be a code block between each file section in the
    result.
    """
    _, *sources = files_abc
    sources[0].write_text("B")
    sources[1].write_text("C")

    content = preprocess(MARKDOWN_TEMPLATE, *sources, basedir=tmp_path)
    template = """
```
[slipbox-metadata]
filename={}
```
"""

    assert template.format(str(sources[0].relative_to(tmp_path))) in content
    assert template.format(str(sources[1].relative_to(tmp_path))) in content


def test_preprocess_markdown_with_no_sources(tmp_path):
    """It must return an empty string."""
    content = preprocess(MARKDOWN_TEMPLATE, basedir=tmp_path)
    assert not content
