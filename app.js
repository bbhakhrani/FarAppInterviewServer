const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const mysql = require('mysql')


const app = express();
const port = 3000;
app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/emails', (req, res) => {
	/*
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'dbuser',
		password : 's3kreee7',
		database : 'my_db'
	});

	connection.connect()

	connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
		if (err) throw err

		console.log('The solution is: ', rows[0].solution)
	});

	connection.end();
	*/

	fetch('https://jsonplaceholder.typicode.com/comments')
		.then(response => response.json())
		.then(json => {
			let emails = json.map( comment => comment.email);
			console.log(emails);
			res.json({emails: emails});
		})
		.catch((err) => {
			// next(err);
			res.sendStatus(400).json({
		      error: err
		    });
		});
});

app.listen(port, () => console.log(`app listening on port ${port}!`));