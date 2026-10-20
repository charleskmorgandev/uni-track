// todos.js
// handles the routes for todo items of the todos page.

// =============================================================
// === CONFIG ===
const express = require('express');
const pool = require('../db/db');
const router = express.Router();

// =============================================================
// === ROUTES ===

// GET
router.get('/', async (req, res) => {
    try {
        const { board_id } = req.query;

        // if given board_id, give todos from that board
        const result = board_id
            ? await pool.query('SELECT * FROM todos WHERE board_id = $1 ORDER BY position, created_at', [board_id])
            : await pool.query('SELECT * FROM todos ORDER BY position, created_at');
        res.json(result.rows);
    } 
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST
router.post('/', async (req, res) => {
    try {
        const { board_id, subject, title } = req.body;
        const result = await pool.query(
            `INSERT INTO todos (board_id, subject, title, position) 
            VALUES ($1, $2, $3, 
                (SELECT COALESCE(MAX(position), 0) + 1 FROM todos WHERE board_id = $1)) 
            RETURNING *`,
            [board_id, subject, title]);
        res.status(201).json(result.rows[0]);
    } 
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT
router.put('/:id', async (req, res) => {
    try {
        const { board_id, subject, title, checked_off, position } = req.body;
        const result = await pool.query(
            `UPDATE todos
            SET board_id = COALESCE($1, board_id),
                subject = COALESCE($2, subject),
                title = COALESCE($3, title),
                checked_off = COALESCE($4, checked_off),
                position = COALESCE($5, position)
            WHERE id = $6
            RETURNING *`,
            [board_id, subject, title, checked_off, position, req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Todo not found' });
        res.json(result.rows[0]);
    } 
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const result = await pool.query(
            'DELETE FROM todos WHERE id = $1 RETURNING *',
            [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Todo not found' });
        res.json(result.rows[0]);
    } 
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router; // allow other files to export this