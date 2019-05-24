const express = require('express');
const mysql = require('mysql2');
var bodyParser = require('body-parser');

const app = express();
const port = 3000;

const eventRoutes = require('./routes/event.route');

var con = mysql.createConnection({
  host: process.env.mysql_host,
  port: process.env.mysql_port,
  user: process.env.mysql_user,
  password: process.env.mysql_password
});

con.connect(function(err) {
  if (err) throw err;
  con.query('CREATE DATABASE IF NOT EXISTS juven_test', function(err, result) {
    if (err) throw err;
    console.log('Database created');
  });
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT,DELETE, OPTIONS');
  next();
});

app.use('/api/event', eventRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
