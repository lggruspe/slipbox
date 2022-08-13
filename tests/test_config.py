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
