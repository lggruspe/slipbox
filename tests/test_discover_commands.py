# pylint: disable=no-self-use,unused-argument
"""Test discover_commands.py."""

from pathlib import Path
import typing as t
import uuid

import pytest
from slipbox.discover_commands import discover_commands as discover


def custom_cli_file() -> str:
    """Generate custom CLI file."""
    return f"slipbox_cli_{uuid.uuid4().hex}.py"


def test_discover_with_no_custom_commands() -> None:
    """Result should be empty."""
    assert list(discover()) == []


class TestDiscoverWithoutCustomCommands:
    """Test discover_commands."""
    code_with_empty_exports = "exports = []"
    code_with_invalid_exports = "exports = 33"
    code_with_non_cli_exports = "exports = '5000'"
    code_with_no_exports = ""

    @pytest.fixture
    def module(self, tmp_path: Path) -> t.Iterator[None]:
        """Setup custom modules."""
        (tmp_path/custom_cli_file()).write_text(self.code_with_empty_exports)
        (tmp_path/custom_cli_file()).write_text(self.code_with_invalid_exports)
        (tmp_path/custom_cli_file()).write_text(self.code_with_non_cli_exports)
        (tmp_path/custom_cli_file()).write_text(self.code_with_no_exports)
        with pytest.MonkeyPatch.context() as monkeypatch:
            monkeypatch.syspath_prepend(tmp_path)
            yield

    def test_yields_nothing(self, module: None) -> None:
        """discover() should yield nothing."""
        assert list(discover()) == []


class TestDiscoverWithCustomCommands:
    """Test discover_commands."""
    code = """from genbu import Genbu
exports = [Genbu(lambda: "foo"), Genbu(lambda: "bar")]"""

    @pytest.fixture
    def module(self, tmp_path: Path) -> t.Iterator[None]:
        """Module with custom command."""
        custom_py = tmp_path/custom_cli_file()
        custom_py.write_text(self.code)
        with pytest.MonkeyPatch.context() as monkeypatch:
            monkeypatch.syspath_prepend(tmp_path)
            yield

    def test_with_custom_commands(self, module: None) -> None:
        """Result should contain custom commands."""
        result = list(discover())
        assert len(result) == 2
        custom_foo, custom_bar = result

        assert custom_foo.run([]) == "foo"
        assert custom_bar.run([]) == "bar"
