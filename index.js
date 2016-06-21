const express = require('express');
const mongojs = require('mongojs');
const bodyParser = require('body-parser');

const port = 9000;
const app = express();

let db = mongojs('test', ['users']);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
	console.log('body:', req.body);
	console.log('params:', req.query);
	next();
});
///////////////////////////

app.get('/', function (req, res, next) {
	res.send('OK!!!');
});

app.get('/users', function (req, res, next) {
	db.users.find(function (err, users) {
		if (err) {
			return res.send(err, 500);
		}
		return res.send(users, 200);
	});
});

app.post('/', function (req, res, next) {
	res.send('Posted...')
});

app.post('/users', function (req, res, next) {
	db.users.insert(req.body, function (err, user) {
		if (err) {
			return res.send(err);
		}
		return res.send(user);
	});
});

app.put('/users/:userId', (req, res, next) =>{
	var id = req.params.userId;
	var name = req.body.name;
	db.users.update(id, {name: name}, (err, res)=>{
		if (err) {
			return res.send(err);
		}
		return res.send(user);
	})
})






///////////////////////////
app.listen(port, ()=>{
	console.log(`App listening on ${port}`);
});