// boards.js
// handles the routes for board items of the todos page.

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
        const result = await pool.query('SELECT * FROM boards ORDER BY position, created_at');
        res.json(result.rows);
    } 
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST
router.post('/', async (req, res) => {
    try {
        const { title, colour } = req.body;
        const result = await pool.query(
            `INSERT INTO boards (title, colour, position)
            VALUES ($1, COALESCE($2, '#808080'),
                (SELECT COALESCE(MAX(position), 0) + 1 FROM boards))
            RETURNING *`, [title, colour]);
        res.status(201).json(result.rows[0]);
    } 
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT
router.put('/:id', async (req, res) => {
    try {
        const { title, colour, position } = req.body;
        const result = await pool.query(
            `UPDATE boards 
            SET title = COALESCE($1, title),
                colour = COALESCE($2, colour),
                position = COALESCE($3, position)
            WHERE id = $4
            RETURNING *`, [title, colour, position, req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Board not found' });
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
            'DELETE FROM boards WHERE id = $1 RETURNING *',
            [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Board not found' });
        res.json(result.rows[0]);
    } 
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router; // allow other files to export this