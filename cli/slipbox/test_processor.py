# type: ignore
"""Test processor.py."""
from .processor import process_markdown


def test_process_markdown_with_sources(files_abc, tmp_path):
    """There must be an HTML comment between each file section in the
    result.
    """
    _, *sources = files_abc
    sources[0].write_text("B")
    sources[1].write_text("C")

    content = process_markdown(*sources, basedir=tmp_path)
    template = """<!--#slipbox-metadata
filename: {}
-->"""

    assert template.format(str(sources[0].relative_to(tmp_path))) in content
    assert template.format(str(sources[1].relative_to(tmp_path))) in content


def test_process_markdown_with_no_sources(tmp_path):
    """preprocess.process_markdown must return empty string."""
    content = process_markdown(basedir=tmp_path)
    assert not content
