/* This is your "back-end" server.
It connects to Postgres and provides an API for your front-end.
*/


// 1. Import required libraries
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');


// 2. Setup
const app = express();
const port = 3000;


// 3. Middleware
app.use(cors()); // Allows your front-end (on a different port) to send requests
app.use(express.json()); // Allows server to read JSON from requests


// 4. ***** DATABASE CONNECTION *****
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'security_database',
    password: 'YOUR_PASSWORD',
    port: 5432,                
});


// Test database connection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        console.error('Error connecting to the database. Please check your `server.js` connection settings.', err.stack);
        console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    } else {
        console.log('Database connected successfully at', res.rows[0].now);
    }
});




// 5. DEFINE API ROUTES (THE "CRUD" OPERATIONS)
//    *** Using 'golfcart' (all lowercase) for Postgres ***


// --- READ (Get all carts) ---
app.get('/api/golfcarts', async (req, res) => {
    try {
        // Use all lowercase 'golfcart' as Postgres prefers
        const result = await pool.query('SELECT * FROM golfcart ORDER BY cart_no ASC');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error fetching carts from database' });
    }
});


// --- CREATE (Insert a new cart) ---
app.post('/api/golfcarts', async (req, res) => {
    const { capacity, pickup, droppoint } = req.body;
   
    // Use all lowercase 'golfcart'
    const query = 'INSERT INTO golfcart (capacity, pickup, droppoint) VALUES ($1, $2, $3) RETURNING *';
   
    try {
        const result = await pool.query(query, [capacity, pickup, droppoint]);
        res.status(201).json({
    message: "Golf cart added successfully!",
    cart: result.rows[0]
});

    } catch (err) {
        // **FIX START**: Corrected the typo from 'err..message' to 'err.message'
        console.error(err.message);
        // **FIX END**
        res.status(500).json({ error: 'Error inserting cart into database' });
    }
});


// --- UPDATE (Update a cart) ---
app.put('/api/golfcarts/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { capacity, pickup, droppoint } = req.body;
   
    // Use all lowercase 'golfcart'
    const query = 'UPDATE golfcart SET capacity = $1, pickup = $2, droppoint = $3 WHERE cart_no = $4 RETURNING *';
   
    try {
        const result = await pool.query(query, [capacity, pickup, droppoint, id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        res.json(result.rows[0]); // Send back the updated cart
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error updating cart in database' });
    }
});


// --- DELETE (Delete a cart) ---
app.delete('/api/golfcarts/:id', async (req, res) => {
    const id = parseInt(req.params.id);
   
    // Use all lowercase 'golfcart'
    const query = 'DELETE FROM golfcart WHERE cart_no = $1';
   
    try {
        const result = await pool.query(query, [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        res.status(200).json({ message: 'Cart deleted successfully' }); // Send success
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error deleting cart from database' });
    }
});




// 6. Start the server
app.listen(port, () => {
    console.log(`Back-end server is running at http://localhost:${port}`);
});