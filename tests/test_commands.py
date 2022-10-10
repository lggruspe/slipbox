"""Test commands.py."""

from pathlib import Path
import pytest

from slipbox import commands
from slipbox.app import App, RootlessApp, startup
from slipbox.build import build
from slipbox.config import Config
from slipbox.dependencies import check_requirements


def scan(app: App) -> None:
    """Run 'slipbox build --no-output'."""
    app.args["output"] = False
    build(app)


def test_show_info_missing_note(app: App) -> None:
    """show_info should print error message and exit with error code."""
    app.args = {"note_id": 0}

    with pytest.raises(SystemExit) as system_exit:
        commands.show_info(app)

    assert system_exit.value.code != 0
    assert "does not exist" in system_exit.value.args[0]


@pytest.mark.skipif(
    not check_requirements(startup({})),
    reason="missing requirements",
)
def test_show_info_in_stdout(
    app: App,
    capsys: pytest.CaptureFixture[str],
) -> None:
    """show_info should output note info in stdout."""
    Path("test.md").write_text("# 0 Test\n\nTest note.", encoding="utf-8")

    build(app)
    app.args = {"note_id": 0}
    commands.show_info(app)
    stdout, stderr = capsys.readouterr()
    assert stdout
    assert not stderr


def test_init_creates_config_file(app_without_root: RootlessApp) -> None:
    """init must create .slipbox/config.cfg."""
    app = app_without_root
    commands.init(app)
    assert app.root is not None

    hidden = app.root/".slipbox"
    assert hidden.is_dir()
    assert hidden.joinpath("config.cfg").is_file()


def test_init_quiet(
    app_without_root: App,
    capsys: pytest.CaptureFixture[str],
) -> None:
    """init must not print anything in quiet mode."""
    app = app_without_root
    app.args["quiet"] = True
    commands.init(app)
    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert not stderr


def test_init_root(app_without_root: RootlessApp) -> None:
    """init must set app.root."""
    app = app_without_root
    assert app.root is None
    commands.init(app)
    assert app.root is not None


def test_init_patterns(app_without_root: RootlessApp) -> None:
    """.slipbox/config.cfg must contain some glob patterns."""
    app = app_without_root
    commands.init(app)
    assert app.root is not None
    hidden = app.root/".slipbox"

    config = Config.from_file(hidden/"config.cfg")
    assert config.patterns["*.md"]
    assert config.patterns["*.rst"]


def test_init_already_initialized(app: App) -> None:
    """init must exit with error."""
    with pytest.raises(SystemExit) as system_exit:
        commands.init(app)

    assert system_exit.value.code != 0
    assert "has already been initialized" in system_exit.value.args[0]


def test_init_invalid_config(app_without_root: RootlessApp) -> None:
    """slipbox must not crash, but must exit with error instead."""
    Path("slipbox.cfg").write_text("invalid config file", encoding="utf-8")

    app = app_without_root
    app.args["config"] = "slipbox.cfg"

    with pytest.raises(SystemExit) as system_exit:
        commands.init(app)

    assert system_exit.value.code != 0
    assert "invalid config file" in system_exit.value.args[0]


@pytest.mark.skipif(
    not check_requirements(startup({})),
    reason="missing requirements",
)
class TestsWithRequirements:
    """Tests with external requirements (e.g. pandoc, graphviz, etc.)."""
    def test_check_notes_with_enabled_checks(
        self,
        app: App,
        capsys: pytest.CaptureFixture[str],
    ) -> None:
        """Only the enabled checks should be used.

        Checks that are enabled by default but aren't specified shouldn't be
        used.
        """
        Path("test.md").write_text("""
# 0 Foo

[Foo]().

# 1 Bar

Bar.

""", encoding="utf-8")
        app.args["enable"] = "missing-citations"
        build(app)
        capsys.readouterr()
        commands.check_notes(app)

        stdout, stderr = capsys.readouterr()
        assert not stdout
        assert not stderr

    def test_check_notes_with_disabled_checks(
        self,
        app: App,
        capsys: pytest.CaptureFixture[str],
    ) -> None:
        """Disabled checks shouldn't be used."""
        Path("test.md").write_text("""
# 0 Foo

[Foo]().

[Bar](#1).

# 1 Bar

Bar.
""", encoding="utf-8")
        build(app)
        capsys.readouterr()

        stdout, stderr = capsys.readouterr()
        assert not stdout
        assert not stderr

        app.args["disable"] = "empty-link-target"
        app.error_formatter.reset()
        commands.check_notes(app)

        stdout, stderr = capsys.readouterr()
        assert not stdout   # empty-link-target should be ignored.
        assert not stderr

    def test_check_notes_with_enabled_and_disabled_checks(
        self,
        app: App,
        capsys: pytest.CaptureFixture[str],
    ) -> None:
        """Only enabled checks that aren't disabled should be used."""
        Path("test.md").write_text("""
# 0 Foo

Foo. []()

# 1 Bar

Bar.

# 2 Baz.
""", encoding="utf-8")
        build(app)
        capsys.readouterr()

        stdout, stderr = capsys.readouterr()
        assert not stdout
        assert not stderr

        # Only empty-link-target should be used.
        app.args["enable"] = "isolated-note,empty-link-target"
        app.args["disable"] = "isolated-note"
        app.error_formatter.reset()
        commands.check_notes(app)

        stdout, stderr = capsys.readouterr()
        assert stdout
        assert not stderr

        assert "Empty link target" in stdout
        assert "#0" in stdout
        assert "Foo" in stdout
        assert "test.md" in stdout

        assert "#1" not in stdout
        assert "Bar" not in stdout

        assert "#2" not in stdout
        assert "Baz" not in stdout

    def test_check_notes_strict(
        self,
        app: App,
        capsys: pytest.CaptureFixture[str],
    ) -> None:
        """strict=True should turn warnings into errors."""
        Path("test.md").write_text("# 0 Test.", encoding="utf-8")
        app.args["strict"] = True
        scan(app)

        # isolated-note is normally a warning, but should be an error if
        # strict flag is turned on.
        with pytest.raises(SystemExit) as system_exit:
            commands.check_notes(app)

        assert system_exit.value.code != 0

        stdout, stderr = capsys.readouterr()
        assert stdout
        assert not stderr

        assert "Found errors :(" in stdout
        assert "error" in stdout
        assert "warning" not in stdout
