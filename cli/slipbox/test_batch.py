# type: ignore
"""Test batch.py."""

from .batch import group_by_file_extension


def test_group_by_file_extension():
    """group_by_file_extension should split by file type.

    Files with no extension should be considered their own type.
    """
    files = ["a.md", "b.md", ".md", "c.tex", ".tex", ""]
    batches = group_by_file_extension(files)
    groups = [batch.paths for batch in batches]
    assert len(groups) == 5
    assert ("a.md", "b.md") in groups
    assert (".md",) in groups
    assert ("c.tex",) in groups
    assert (".tex",) in groups
    assert ("",) in groups


def test_group_by_file_extension_on_the_same_type():
    """group_by_file_extension should group files with the same type together.
    """
    files = tuple(f"{c}.md" for c in "abcdefg")
    batches = group_by_file_extension(files)
    groups = [batch.paths for batch in batches]
    assert len(groups) == 1
    assert files in groups
