
const express = require('express');
const mysql2= require('mysql2');

const app = express();

const connection = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydatabase'
});

app.use(express.json());

// GET /jobs
app.get('/jobs', (req, res) => {
  connection.query('SELECT * FROM jobs', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error retrieving jobs from database');
      return;
    }

    res.json(results);
  });
});

// POST /jobs
app.post('/jobs', (req, res) => {
  const job = req.body;

  connection.query('INSERT INTO jobs SET ?', job, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error inserting job into database');
      return;
    }

    res.status(201).json({ id: result.insertId });
  });
});

// PUT /jobs/:id
app.put('/jobs/:id', (req, res) => {
  const { id } = req.params;
  const updatedjob = req.body;

  connection.query('UPDATE jobs SET ? WHERE id = ?', [updatedjob, id], (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error updating job in database');
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).send('job not found');
      return;
    }

    res.status(200).send('job updated successfully');
  });
});

// DELETE /jobs/:id
app.delete('/jobs/:id', (req, res) => {
  const { id } = req.params;

  connection.query('DELETE FROM jobs WHERE id = ?', id, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error deleting job from database');
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).send('job not found');
      return;
    }

    res.status(200).send('job deleted successfully');
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
