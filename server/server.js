// server.js 
// handles configuration, booting the server, and handling incoming
// http requests and data.

// =============================================================
// === CONFIG ===

require('dotenv').config();

const pool = require('./db/db');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/todos', require('./routes/todos'));
app.use('/boards', require('./routes/boards'));

// =============================================================
// === ROUTES ===

// BEGIN SERVER
app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}/`)
});

// HOME PAGE
app.get('/', (req, res) => {
    res.send('home page');
});

// POSTGRESQL TEST (visit ./db-test to see)
app.get('/db-test', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Database error');
    }
});