-- schema.sql
-- defines structure of database items.

-- =============================================================
-- === TABLES ===

-- TIMELINE

-- TODO
DROP TABLE IF EXISTS todos;

CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
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
INSERT INTO todos (title, checked_off)
VALUES ('sample todo', false);

-- CALENDAR

-- COURSES