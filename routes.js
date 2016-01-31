'use strict';

const x = require('x-ray')(),
		Promise = require('bluebird');

const routes = {};


routes.home = (req, res) => {
	res.sendfile(__dirname + '/public/index.html');
}



routes.craigslist = (req, res) => {
	res.contentType('application/json');
	const query = {
		rooms: req.query.rooms || 1,
		city: req.query.city || 'toronto',
		minPrice: req.query.minPrice || 0,
		maxPrice: req.query.maxPrice || 5000,
		query: req.query.query || ''
	};
	const getInfo = Promise.promisify(x(`http://${query.city}.craigslist.com/search/apa?is_paid=all&hasPic=1&bedrooms=${query.rooms}&min_price=${query.minPrice}&max_price=${query.maxPrice}&query=${query.query}#grid`, 'p.row', [{
	  title: 'span.txt span.pl a.hdrlnk',
	  posted: 'span.txt span.pl time@title',
	  price: 'span.txt span.l2 span.price',
	  rooms: 'span.txt span.l2 span.housing',
	  link: 'span.txt span.pl a.hdrlnk@href',
	  image: 'a@data-ids'
	}]));
	getInfo().then(function(item) {
		res.send(item);
	});
}

module.exports = routes;
