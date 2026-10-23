// events.js
// handles the routes for event items of the timeline page.

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
        const result = await pool.query('SELECT * FROM events ORDER BY due_date, created_at');
        res.json(result.rows);
    } 
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST
router.post('/', async (req, res) => {
    try {
        const { subject, title, body, colour, due_date } = req.body;
        const result = await pool.query(
            `INSERT INTO events (subject, title, body, colour, due_date) 
            VALUES ($1, $2, COALESCE($3, ''), COALESCE($4, '#808080'),
                COALESCE($5, CURRENT_TIMESTAMP))
            RETURNING *`,
            [subject, title, body, colour, due_date]);
        res.status(201).json(result.rows[0]);
    } 
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT
router.put('/:id', async (req, res) => {
    try {
        const { subject, title, body, colour, due_date } = req.body;
        const result = await pool.query(
            `UPDATE events
            SET subject = COALESCE($1, subject),
                title = COALESCE($2, title),
                body = COALESCE($3, body),
                colour = COALESCE($4, colour),
                due_date = COALESCE($5, due_date)
            WHERE id = $6
            RETURNING *`,
            [subject, title, body, colour, due_date, req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Event not found' });
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
            'DELETE FROM events WHERE id = $1 RETURNING *',
            [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Event not found' });
        res.json(result.rows[0]);
    } 
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router; // allow other files to export this