var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'gauravgupta.cibdf9ei6wiz.us-east-1.rds.amazonaws.com',
    user: 'gauravGupta',
    password: 'gauravGupta',
    port: '3306'
});

connection.connect(function (err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }

    console.log('Connected to database.');
});

connection.end();