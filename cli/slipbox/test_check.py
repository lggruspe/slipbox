# type: ignore
"""Test check.py."""

import pytest

from .check import invalid_links, invalid_clusters, isolated_notes
from .utils import check_requirements

@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_invalid_links(sbox, test_md):
    """invalid_links must return note and invalid ID."""
    test_md.write_text("# 0 Test\n[](#1)\n\n# 2 Test\n[](#0)\n")
    sbox.process([test_md])
    result = list(invalid_links(sbox))
    assert result == [((0, "Test", "test.md"), 1)]

@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_invalid_clusters(sbox, test_md):
    """invalid_clusters must return note and invalid ID."""
    test_md.write_text("# 0 Test\n#test/1\n\n# 2 Test\n#test/0\n")
    sbox.process([test_md])
    result = list(invalid_clusters(sbox))
    assert result == [((0, "Test", "test.md"), 1)]

@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_isolated_notes(sbox, test_md):
    """isolated_notes must return untagged notes only."""
    test_md.write_text("# 0 Foo\n#test/1\n\n# 1 Bar\n\n# 2 Baz\n")
    sbox.process([test_md])
    result = list(isolated_notes(sbox))
    assert result == [(2, "Baz", "test.md")]
