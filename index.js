const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const college_connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'college',
});

college_connection.connect((err) => {
  if (err) {
    console.log('error');
  } else {
    console.log('Connected to the college database!');
  }
});

app.post('/check', (req, res) => {
  const college_code = req.body.college_code;
  const sql = 'SELECT * FROM college_list WHERE college_code = ?';
  college_connection.query(sql, [college_code], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'College code not found!' });
    } else {
      if (results[0].college_code === college_code) {
        console.log('successfully run');
      } else {
        res.status(403).json({ error: 'College code is not valid!' });
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
