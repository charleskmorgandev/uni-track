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
        const result = await pool.query('SELECT * FROM boards ORDER BY created_at');
        res.json(result.rows);
    } 
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST
router.post('/', async (req, res) => {
    try {
        const { title } = req.body;
        const result = await pool.query(
            'INSERT INTO boards (title) VALUES ($1) RETURNING *', [title]);
        res.status(201).json(result.rows[0]);
    } 
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT
router.put('/:id', async (req, res) => {
    try {
        const { title } = req.body;
        const result = await pool.query(
            `UPDATE boards SET title = COALESCE($1, title) WHERE id = $2
            RETURNING *`, [title, req.params.id]);
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