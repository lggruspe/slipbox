from pathlib import Path
import re
import setuptools


def get_version() -> str:
    """Get version string from slipbox/__init__.py."""
    pattern = re.compile(r'__version__ = "(.+)"')
    init = Path(__file__).with_name("slipbox")/"__init__.py"
    result = pattern.search(init.read_text())

    assert result
    return result.groups()[0]


if __name__ == "__main__":
    setuptools.setup(
        name="slipbox",
        version=get_version(),
        author="Levi Gruspe",
        author_email="mail.levig@gmail.com",
        description="Static site generator for Zettelkasten notes",
        long_description=Path("README.md").read_text(),
        long_description_content_type="text/markdown",
        url="https://github.com/lggruspe/slipbox",
        packages=setuptools.find_packages(),
        package_data={
            "slipbox": [
                "data/*",
                "data/*/*",
                "data/*/*/*",
                "data/*/*/*/*",
                "data/*/*/*/*/*",
                "data/*/*/*/*/*/*",
                "migrations/*.sql",
                "templates/*",
            ]
        },
        classifiers=[
            "Environment :: Console",
            "License :: OSI Approved :: MIT License",
            "Programming Language :: Python :: 3.7",
            "Programming Language :: Python :: 3.8",
            "Programming Language :: Python :: 3.9",
            "Programming Language :: Python :: 3.10",
        ],
        install_requires=[
            "networkx>=2.5.1",
            "pydot>=1.4.2",
            "pyquery>=1.4.3",
        ],
        python_requires=">=3.7",
        entry_points={
            "console_scripts": [
                "slipbox=slipbox.__main__:main"
            ]
        }
    )
