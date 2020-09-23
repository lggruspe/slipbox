#type: ignore
"""Test preprocess.py."""
from .preprocess import concatenate

def test_concatenate_when_dest_exists(files_abc, tmp_path):
    """There must be an HTML comment between each file section in the
    destination file.

    Assume destination file exists.
    """
    dest, *sources = files_abc
    sources[0].write_text("B")
    sources[1].write_text("C")

    concatenate(dest, *sources, basedir=tmp_path)
    content = dest.read_text()
    template = """<!--#slipbox-metadata
filename: {}
-->"""

    assert template.format(str(sources[0].relative_to(tmp_path))) in content
    assert template.format(str(sources[1].relative_to(tmp_path))) in content

def test_concatenate_when_dest_does_not_exist(tmp_path):
    """preprocess.concatenate must work even if the destination file
    does not exist.
    """
    dest = tmp_path/"dest.md"
    source_a = tmp_path/"a.md"
    source_b = tmp_path/"b.md"
    source_a.write_text("A")
    source_b.write_text("B")
    assert not dest.exists()

    concatenate(dest, source_a, source_b, basedir=tmp_path)
    content = dest.read_text()
    template = """<!--#slipbox-metadata
filename: {}
-->"""

    assert template.format(str(source_a.relative_to(tmp_path))) in content
    assert template.format(str(source_b.relative_to(tmp_path))) in content

def test_concatenate_when_there_are_no_sources(tmp_path):
    """preprocess.concatenate must create an empty file."""
    dest = tmp_path/"dest.md"
    dest.write_text("Delete this.")
    concatenate(dest, basedir=tmp_path)

    content = dest.read_text()
    assert not content
