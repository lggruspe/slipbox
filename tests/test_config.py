"""Test config.py."""

from pathlib import Path

from slipbox.config import Config


def test_config_paths(tmp_path: Path) -> None:
    """Paths shouldn't be resolved in config file."""
    file = tmp_path/"config.cfg"

    config = Config()
    config.output_directory = Path("public")
    config.write(file)

    result = Config.from_file(file)
    output_directory = Path(result.output_directory)
    assert str(output_directory) == "public"


def test_config_read() -> None:
    """note-patterns should be read correctly.

    Patterns that are not in the config file should be implicitly ignored.
    """
    Path("config.cfg").write_text("""
[note-patterns]
*.txt = True
notes/*.tex = True
""", encoding="utf-8")

    config = Config.from_file(Path("config.cfg"))

    assert not config.patterns.get("*.md")
    assert config.patterns.get("*.txt")
    assert config.patterns.get("notes/*.tex")


def test_config_from_file_note_patterns() -> None:
    """Config.from_file shouldn't overwrite defaults if empty."""
    path = Path("config.cfg")
    path.touch()
    config = Config.from_file(path)

    default = Config()
    assert config == default
