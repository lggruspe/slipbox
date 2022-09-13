"""Test config.py."""

from pathlib import Path

from slipbox.config import Config


def test_config_paths(tmp_path: Path) -> None:
    """Paths shouldn't be resolved in config file."""
    file = tmp_path/"config.cfg"

    config = Config()
    config.output_directory = Path("public")
    config.write(file)

    config.read_file(file)

    output_directory = Path(config.output_directory)
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

    config = Config()
    config.read_file(Path("config.cfg"))

    assert not config.patterns.get("*.md")
    assert config.patterns.get("*.txt")
    assert config.patterns.get("notes/*.tex")
