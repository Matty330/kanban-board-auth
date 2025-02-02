const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables from .env file

// Create a new pool for database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,  // Use DATABASE_URL from .env file
  ssl: {
    rejectUnauthorized: false  // For cloud databases like Render, this is necessary
  }
});

// Example query to test the connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error executing query', err.stack);
  } else {
    console.log('Connection successful', res.rows);
  }
});

module.exports = pool;  // Export the pool so it can be used in other parts of the app
