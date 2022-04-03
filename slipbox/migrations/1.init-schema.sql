BEGIN TRANSACTION;
PRAGMA user_version = 1;

CREATE TABLE Files (
    filename PRIMARY KEY,
    hash
);

CREATE TABLE Notes (
    id PRIMARY KEY,
    title NOT NULL,
    filename NOT NULL REFERENCES Files ON DELETE CASCADE,
    html
);

CREATE TABLE Tags (
    tag NOT NULL,
    id NOT NULL REFERENCES Notes ON DELETE CASCADE
);

CREATE TABLE Links (
    src NOT NULL REFERENCES Notes ON DELETE CASCADE,
    dest NOT NULL,  -- not an fk to keep backlink when dest gets deleted
                    -- and to allow notes to get scanned incrementally
                    -- ValidLinks gets subset with valid dest
    direction
);

CREATE TABLE Images (
    filename PRIMARY KEY,
    binary NOT NULL
);

CREATE TABLE ImageLinks (
    note NOT NULL REFERENCES Notes ON DELETE CASCADE,
    image NOT NULL REFERENCES Images ON DELETE CASCADE,
    PRIMARY KEY(note, image)
);

CREATE TABLE Bibliography (
    key PRIMARY KEY,
    html
);

CREATE TABLE Citations (
    note NOT NULL REFERENCES Notes ON DELETE CASCADE,
    reference NOT NULL REFERENCES Bibliography ON DELETE RESTRICT,
    PRIMARY KEY(note, reference)
);

CREATE TABLE Rescan (
    filename PRIMARY KEY REFERENCES Files
);

CREATE TABLE Meta (
    key PRIMARY KEY,
    value
);

INSERT OR IGNORE INTO Meta VALUES ('version', '0.0');

CREATE VIEW ValidLinks AS
SELECT * FROM Links WHERE dest IN (SELECT id FROM Notes);

CREATE VIEW StronglyTagged AS
SELECT * FROM Notes WHERE id IN (
    SELECT id FROM Tags
);

CREATE VIEW InTagged AS
SELECT id, title, filename, html FROM Notes JOIN Links ON Notes.id = Links.dest WHERE Links.src IN (
    SELECT id FROM StronglyTagged
);

CREATE VIEW OutTagged AS
SELECT id, title, filename, html FROM Notes JOIN Links ON Notes.id = Links.src WHERE Links.dest IN (
    SELECT id FROM StronglyTagged
);

CREATE VIEW WeaklyTagged AS
SELECT * FROM InTagged UNION SELECT * FROM OutTagged;

CREATE VIEW Untagged AS
SELECT * FROM Notes WHERE id NOT IN (
    SELECT id FROM StronglyTagged UNION SELECT id FROM WeaklyTagged
);

COMMIT;
