BEGIN TRANSACTION;
PRAGMA user_version = 3;

CREATE TABLE LayoutCache (
    key PRIMARY KEY,    -- Serialized graph
    layout NOT NULL     -- JSON of layout
);

COMMIT;
