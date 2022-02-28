"""Test commands.py."""

from configparser import ConfigParser
from pathlib import Path
import pytest

from slipbox import commands
from slipbox.app import App, startup
from slipbox.build import build
from slipbox.dependencies import check_requirements


def test_show_info_missing_note(capsys: pytest.CaptureFixture[str],
                                test_app_with_root: App,
                                ) -> None:
    """show_info should print error message and exit with error code."""
    app = test_app_with_root
    app.args = {"note_id": 0}

    with pytest.raises(SystemExit) as system_exit:
        commands.show_info(app)
        stdout, stderr = capsys.readouterr()
        assert not stdout
        assert stderr

    assert system_exit.value.code != 0


@pytest.mark.skipif(not check_requirements(startup({})),
                    reason="missing requirements")
def test_show_info_in_stdout(capsys: pytest.CaptureFixture[str],
                             _test_note: Path,
                             test_app_with_root: App,
                             ) -> None:
    """show_info should output note info in stdout."""
    app = test_app_with_root

    build(app)
    app.args = {"note_id": 0}
    commands.show_info(app)
    stdout, stderr = capsys.readouterr()
    assert stdout
    assert not stderr


def test_init_creates_config_file(test_app: App) -> None:
    """init must create .slipbox/config.cfg."""
    commands.init(test_app)
    assert test_app.root is not None

    hidden = test_app.root/".slipbox"
    assert hidden.is_dir()
    assert hidden.joinpath("config.cfg").is_file()


def test_init_quiet(test_app: App,
                    capsys: pytest.CaptureFixture[str],
                    ) -> None:
    """init must not print anything in quiet mode."""
    test_app.args["quiet"] = True
    commands.init(test_app)
    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert not stderr


def test_init_root(test_app: App) -> None:
    """init must set app.root."""
    assert test_app.root is None
    commands.init(test_app)
    assert test_app.root is not None


def test_init_patterns(test_app: App) -> None:
    """.slipbox/config.cfg must contain some glob patterns."""
    commands.init(test_app)
    assert test_app.root is not None
    hidden = test_app.root/".slipbox"

    parser = ConfigParser()
    parser.read(hidden/"config.cfg")

    assert parser.getboolean("note-patterns", "*.md")
    assert parser.getboolean("note-patterns", "*.rst")
