// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create connection to database
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'comments'
});

connection.connect(function(err) {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as id ' + connection.threadId);
});

// Get all comments
app.get('/comments', function(req, res) {
  connection.query('SELECT * FROM comments', function (error, results, fields) {
    if (error) {
      console.error('Error: ' + error);
      return;
    }
    res.json(results);
  });
});

// Get comment by id
app.get('/comments/:id', function(req, res) {
  connection.query('SELECT * FROM comments WHERE id = ?', [req.params.id], function (error, results, fields) {
    if (error) {
      console.error('Error: ' + error);
      return;
    }
    res.json(results);
  });
});

// Add new comment
app.post('/comments', function(req, res) {
  connection.query('INSERT INTO comments (comment) VALUES (?)', [req.body.comment], function (error, results, fields) {
    if (error) {
      console.error('Error: ' + error);
      return;
    }
    res.json(results);
  });
});

// Update comment by id
app.put('/comments/:id', function(req, res) {
  connection.query('UPDATE comments SET comment = ? WHERE id = ?', [req.body.comment, req.params.id], function (error, results, fields) {
    if (error) {
      console.error('Error: ' + error);
      return;
    }
    res.json(results);
  });
});

// Delete comment by id
app.delete('/comments/:id', function(req, res) {
  connection.query('DELETE FROM comments WHERE id = ?', [req.params.id], function (error, results, fields) {
    if (error) {
      console.error('Error: ' + error);
      return;
    }
    res.json(results);
  });
});

// Start server
app.listen(3000, function() {
  console
