CREATE TABLE IF NOT EXISTS Files (
    filename PRIMARY KEY,
    hash
);

CREATE TABLE IF NOT EXISTS Notes (
    id PRIMARY KEY,
    title NOT NULL,
    filename NOT NULL REFERENCES Files ON DELETE CASCADE,
    html
);

CREATE TABLE IF NOT EXISTS Links (
    src NOT NULL REFERENCES Notes ON DELETE CASCADE,
    dest NOT NULL,  -- not an fk to keep backlink when dest gets deleted
                    -- and to allow notes to get scanned incrementally
    tag,
    PRIMARY KEY(src, dest, tag)
);

CREATE TABLE IF NOT EXISTS Images (
    filename PRIMARY KEY,
    binary NOT NULL
);

CREATE TABLE IF NOT EXISTS ImageLinks (
    note NOT NULL REFERENCES Notes ON DELETE CASCADE,
    image NOT NULL REFERENCES Images ON DELETE CASCADE,
    PRIMARY KEY(note, image)
);

CREATE TABLE IF NOT EXISTS Bibliography (
    key PRIMARY KEY,
    text
);

CREATE TABLE IF NOT EXISTS Citations (
    note NOT NULL REFERENCES Notes ON DELETE CASCADE,
    reference NOT NULL REFERENCES Bibliography ON DELETE RESTRICT,
    PRIMARY KEY(note, reference)
);

CREATE TABLE IF NOT EXISTS Rescan (
    filename PRIMARY KEY REFERENCES Files
);

CREATE TABLE IF NOT EXISTS Meta (
    key PRIMARY KEY,
    value
);

INSERT OR IGNORE INTO Meta VALUES ('version', '0.0');

CREATE VIEW IF NOT EXISTS ValidLinks AS
SELECT * FROM Links WHERE dest IN (SELECT id FROM Notes);

CREATE VIEW IF NOT EXISTS Tags AS
SELECT * FROM (
    SELECT tag, src AS id FROM Links WHERE tag IS NOT NULL AND tag != ''
    UNION
    SELECT tag, dest AS id FROM Links WHERE tag IS NOT NULL AND tag != ''
)
WHERE id in (
    SELECT id FROM Notes
);

CREATE VIEW IF NOT EXISTS Untagged AS
SELECT id FROM Notes WHERE id NOT IN (
    SELECT id FROM Tags
);
