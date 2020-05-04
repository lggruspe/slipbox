from dataclasses import dataclass
from os.path import abspath, curdir, dirname, join, pardir

@dataclass
class UserConfig:
    pandoc: str = "pandoc"
    python: str = "python3"
    bib: str = "zettel.bib"
    css: str = "zettel.css"
    database: str = "zettel.db.sqlite3"
    options: str = "--mathjax --strip-comments"
    basedir: str = abspath(curdir)  #
    filters: str = "--lua-filter={} -Pandoc-citeproc".format(
        abspath(join(dirname(__file__), pardir, "filters", "zettel-compile.lua"))
    )

@dataclass
class Config:
    user: UserConfig = UserConfig()
    host: str = "localhost"
    port: int = 5000
