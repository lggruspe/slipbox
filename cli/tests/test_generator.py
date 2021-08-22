# pylint: disable=missing-function-docstring
"""Test generator.py."""

from pathlib import Path

from slipbox.generator import output_directory_proxy as proxy


def test_proxy_rolls_back_changes_on_error(tmp_path: Path) -> None:
    present = tmp_path/"present.txt"
    present.write_text("present")

    try:
        with proxy(tmp_path):
            assert False
    except AssertionError:
        pass

    assert present in tmp_path.iterdir()
    assert present.read_text() == "present"


def test_proxy_only_applies_changes_after_block(tmp_path: Path) -> None:
    with proxy(tmp_path) as path:
        (path/"hello.txt").write_text("hello")
        assert not list(tmp_path.iterdir())

    hello = tmp_path/"hello.txt"
    assert hello in tmp_path.iterdir()
    assert hello.read_text() == "hello"


def test_proxy_clears_previous_contents(tmp_path: Path) -> None:
    (tmp_path/"foo").touch()
    (tmp_path/"bar").mkdir()

    with proxy(tmp_path) as path:
        (path/"present.txt").write_text("present")

    present = tmp_path/"present.txt"
    assert list(tmp_path.iterdir()) == [present]
    assert present.read_text() == "present"
