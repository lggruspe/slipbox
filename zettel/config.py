from dataclasses import dataclass

@dataclass
class UserConfig:
    database: str = "zettel.db.sqlite3"

@dataclass
class Config:
    user: UserConfig = UserConfig()
    host: str = "localhost"
    port: int = 5000
