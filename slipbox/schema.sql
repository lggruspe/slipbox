CREATE TABLE IF NOT EXISTS Files (
    filename PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS Notes (
    id PRIMARY KEY,
    title NOT NULL,
    filename NOT NULL REFERENCES Files ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Tags (
    id NOT NULL REFERENCES Notes ON DELETE CASCADE,
    tag NOT NULL,
    PRIMARY KEY(id, tag)
);

CREATE TABLE IF NOT EXISTS Links (
    src NOT NULL REFERENCES Notes ON DELETE CASCADE,
    dest NOT NULL,  -- not an fk to keep backlink when dest gets deleted
                    -- and to allow notes to get scanned incrementally
    annotation,
    PRIMARY KEY(src, dest, annotation)
);

CREATE TABLE IF NOT EXISTS Aliases (
    id NOT NULL,    -- references notes
    owner NOT NULL REFERENCES Notes ON DELETE CASCADE,
    alias PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS Sequences (
    prev NOT NULL REFERENCES Aliases ON DELETE CASCADE,
    next NOT NULL REFERENCES Aliases ON DELETE CASCADE,
    PRIMARY KEY(prev, next)
);

CREATE TABLE IF NOT EXISTS Html (
    id INTEGER PRIMARY KEY,
    body DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS Sections (
    note PRIMARY KEY REFERENCES Notes ON DELETE CASCADE,
    html NOT NULL REFERENCES Html ON DELETE CASCADE
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

-- respects foreign key constraints
CREATE VIEW IF NOT EXISTS ValidAliases AS
SELECT * FROM Aliases WHERE id IN (SELECT id FROM Notes);

-- respects foreign key constraints
CREATE VIEW IF NOT EXISTS ValidLinks AS
SELECT * FROM Links WHERE dest IN (SELECT id FROM Notes);
