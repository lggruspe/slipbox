"""Test processor.py."""

from hashlib import sha256
from pathlib import Path
import typing as t

import pytest

from slipbox.processor import build_command, preprocess, MARKDOWN_TEMPLATE


def test_preprocess_markdown_with_sources(files_abc: t.List[Path],
                                          tmp_path: Path,
                                          ) -> None:
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
hash={}
```
"""

    assert template.format(
        str(sources[0].relative_to(tmp_path)),
        sha256(b"B").hexdigest()
    ) in content
    assert template.format(
        str(sources[1].relative_to(tmp_path)),
        sha256(b"C").hexdigest()
    ) in content


def test_preprocess_markdown_with_no_sources(tmp_path: Path) -> None:
    """It must return an empty string."""
    content = preprocess(MARKDOWN_TEMPLATE, basedir=tmp_path)
    assert not content


def test_build_command(tmp_path: Path) -> None:
    """Sanity check for build_command."""
    input_file = tmp_path/"input.md"
    output = "output.html"
    options = "--mathml"
    input_file.touch()

    cmd = build_command(input_file, output, tmp_path, options)
    assert str(input_file) in cmd
    assert f"-o {output}" in cmd
    assert options in cmd


@pytest.mark.xfail
def test_build_command_when_input_file_does_not_exist(tmp_path: Path) -> None:
    """build_command must fail if input file does not exist."""
    input_file = tmp_path/"input.md"
    build_command(input_file, "output.html", tmp_path, "")
