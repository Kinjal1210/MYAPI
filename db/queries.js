const mysql = require('mysql');

const connection = mysql.createConnection({
  port: 3000,
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydatabase'
});

function getAlljobs(callback) {
  connection.query('SELECT * FROM jobs', (error, results) => {
    if (error) {
      return callback(error);
    }

    return callback(null, results);
  });
}

module.exports = {
  getAlljobs,
};
