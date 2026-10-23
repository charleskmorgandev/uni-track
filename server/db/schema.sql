-- schema.sql
-- defines structure of database items.

-- =============================================================
-- === TABLES ===

-- TIMELINE
DROP TABLE IF EXISTS events;

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    subject VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL DEFAULT '',
    colour VARCHAR(7) NOT NULL DEFAULT '#808080',
    due_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- TODO
DROP TABLE IF EXISTS todos;
DROP TABLE IF EXISTS boards;

CREATE TABLE boards (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    colour VARCHAR(7) NOT NULL DEFAULT '#808080',
    position INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    board_id INTEGER NOT NULL REFERENCES boards(id) ON DELETE CASCADE,
    subject VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    colour VARCHAR(7) NOT NULL DEFAULT '#808080',
    checked_off BOOLEAN NOT NULL DEFAULT FALSE,
    position INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CALENDAR

-- COURSES

-- =============================================================
-- === TESTS ===

-- TIMELINE

-- TODOS
INSERT INTO boards (title) 
    VALUES ('sample board');

INSERT INTO todos (board_id, subject, title) 
    VALUES (1, 'sample_subject', 'sample todo');

-- CALENDAR

-- COURSES