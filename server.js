const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const app = express();
const port = 3000;

const pool = new Pool({
    user: 'postgres',          // Replace with your PostgreSQL username
    host: 'localhost',
    database: 'mapdb',         // Replace with your PostgreSQL database name
    password: '38038954',  // Replace with your PostgreSQL password
    port: 5432,
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/locations', async (req, res) => {
    try {
        const result = await pool.query('SELECT name, latitude, longitude FROM locations');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
