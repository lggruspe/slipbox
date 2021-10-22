from pathlib import Path
import setuptools

setuptools.setup(
    name="slipbox",
    version="0.18.0",
    author="Levi Gruspe",
    author_email="mail.levig@gmail.com",
    description="Static site generator for Zettelkasten notes",
    long_description=Path("README.md").read_text(),
    long_description_content_type="text/markdown",
    url="https://github.com/lggruspe/slipbox",
    packages=setuptools.find_packages(),
    package_data={
        "slipbox": ["data/*", "*.sql", "templates/*"]
    },
    classifiers=[
        "Environment :: Console",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
    ],
    install_requires=[
        "genbu==0.2.1",
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
