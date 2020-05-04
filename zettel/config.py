from dataclasses import dataclass

@dataclass
class Config:
    database: str = "zettel.db.sqlite3"
    host: str = "localhost"
    port: int = 5000
