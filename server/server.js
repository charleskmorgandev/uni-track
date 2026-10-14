require('dotenv').config(); // .env requirement

const pool = require('./db');

// import and install express
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // user PORT, defualts to 3000

// test route - hello world
app.get('/', (req, res) => {
    res.send('OOGLY BOOGLY BOOGLY BOO MY SERVER IS UP AND SO ARE YOU');
});

// test route - postgreSQL (visit ./db-test to see)
app.get('/db-test', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Database error');
    }
});

// begin server
app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}/`)
});