# type: ignore
"""Test initializer.py."""

from argparse import Namespace

from .initializer import DotSlipbox

def test_initialize(tmp_path):
    """Must initialize .slipbox in the parent directory."""
    dot = DotSlipbox(tmp_path).path
    assert dot.is_dir()
    assert dot.joinpath("data.db").is_file()
    assert dot.joinpath("config.cfg").is_file()
    assert dot.joinpath("patterns").is_file()

def test_dot_slipbox_locate(tmp_path):
    """find_dot_slipbox must look for .slipbox in parent directories."""
    assert DotSlipbox.locate(tmp_path) is None

    dot = DotSlipbox(tmp_path)
    assert DotSlipbox.locate(tmp_path).path == dot.path

    child = tmp_path/"child"
    child.mkdir()
    assert DotSlipbox.locate(child).path == dot.path

    for file in dot.path.iterdir():
        file.unlink()
    dot.path.rmdir()
    assert DotSlipbox.locate(child) is None
    assert DotSlipbox.locate(tmp_path) is None

def test_dot_slipbox_patterns(tmp_path):
    """Test patterns property."""
    dot = DotSlipbox(tmp_path)
    assert sorted(dot.patterns) == ['*.markdown', '*.md']

    patterns = ['*.rst', '*.txt']
    dot.patterns = patterns
    assert dot.patterns == patterns

def test_dot_slipbox_check_config_new(tmp_path):
    """.check_config must delete newly initialized data with invalid config."""
    args = Namespace(content_options="--strip-comments")
    DotSlipbox(tmp_path, args, exit_=False)
    assert not tmp_path.joinpath(".slipbox").exists()

def test_dot_slipbox_check_config_existing(tmp_path):
    """.check_config must not delete existing data with invalid config."""
    dot = DotSlipbox(tmp_path)
    assert dot.path.exists()
    assert dot.path.joinpath("config.cfg").is_file()
    assert dot.check_config()

    config = dot.config
    config["slipbox"]["content_options"] = "--strip-comments"
    with open(dot.path.joinpath("config.cfg"), "w") as config_file:
        config.write(config_file)

    dot = DotSlipbox(tmp_path, exit_=False)
    assert not dot.check_config(False)
    assert dot.path.joinpath("config.cfg").is_file()
