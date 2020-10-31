# type: ignore
"""Test check.py."""

import pytest

from .check import invalid_links, isolated_notes, unsourced_notes
from .utils import check_requirements

@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_invalid_links(sbox, test_md):
    """invalid_links must return note and invalid ID."""
    test_md.write_text("# 0 Test\n[](#1)\n\n# 2 Test\n[](#0)\n")
    sbox.process([test_md])
    result = list(invalid_links(sbox))
    assert result == [((0, "Test", "test.md"), 1)]

@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_isolated_notes(sbox, test_md):
    """isolated_notes must return untagged notes only."""
    test_md.write_text("""# 0 Foo

#test

[](#1)

# 1 Bar

# 2 Baz
""")
    sbox.process([test_md])
    result = list(isolated_notes(sbox))
    assert result == [(2, "Baz", "test.md")]

@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_unsourced_notes_empty_bibliography(sbox, test_md):
    """unsourced_notes must be empty if there is no bibliography."""
    test_md.write_text("# 0 Test\n\nTest.\n")
    sbox.process([test_md])
    result = list(unsourced_notes(sbox))
    assert not result

@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_unsourced_notes(sbox, test_md, test_bib):
    """unsourced_notes must include every note that has no citation."""
    config = sbox.config
    config["slipbox"]["content_options"] += " --bibliography " + str(test_bib.resolve())
    with open(sbox.dot.path/"config.cfg", "w") as configfile:
        config.write(configfile)
    test_md.write_text("""# 0 Foo

Foo.

# 1 Bar

Bar.

[@test_2020]
""")
    sbox.process([test_md])
    result = list(unsourced_notes(sbox))
    assert result == [(0, "Foo", "test.md")]
