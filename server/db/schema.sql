-- schema.sql
-- defines structure of database items.

-- =============================================================
-- === TABLES ===

-- TIMELINE

-- TODO
DROP TABLE IF EXISTS todos;
DROP TABLE IF EXISTS boards;

CREATE TABLE boards (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    board_id INTEGER NOT NULL REFERENCES boards(id) ON DELETE CASCADE,
    subject VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    checked_off BOOLEAN NOT NULL DEFAULT FALSE,
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