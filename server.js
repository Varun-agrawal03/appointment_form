require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log('✅ Connected to MySQL Database');
});

// Handle form POST
app.post('/submit', (req, res) => {
  const { fname, lname, email, password, mobile, age, gender, feedback } = req.body;

  const sql = `INSERT INTO registrations 
    (first_name, last_name, email, password, mobile, age, gender, feedback) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [fname, lname, email, password, mobile, age, gender, feedback], (err, result) => {
    if (err) {
      console.error('❌ Error inserting data:', err);
      return res.status(500).send('Server Error');
    }

    console.log('✅ Data inserted:', result.insertId);
    res.redirect('/success.html');
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
