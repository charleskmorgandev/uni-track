// import and install express
const express = require('express');
const app = express();
const PORT = 3000;

// test route
app.get('/', (req, res) => {
    res.send('OOGLY BOOGLY BOOGLY BOO MY SERVER IS UP AND SO ARE YOU');
});

// begin server
app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}/`)
});