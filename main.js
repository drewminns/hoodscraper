'use strict';
let express = require('express'),
		app = express(),
		port = process.env.port || 5000,
		morgan = require('morgan'),
		path = require('path'),
		routes = require('./routes.js');


app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
  	res.header('Access-Control-Allow-Methods', 'GET');
    next();
});

app.get('/', (req,res) => {
	res.send('home page');
});
app.get('/api', routes.craigslist);
app.listen(port);
