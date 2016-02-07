'use strict';
const x = require('x-ray')(),
		Promise = require('bluebird');

const routes = {};

routes.home = (req, res) => {
	res.sendfile(__dirname + '/public/index.html');
};


routes.scrape = (req, res) => {

	const queryParams = {
		rooms: req.query.rooms || 1,
		city: req.query.city || 'toronto',
		minPrice: req.query.minPrice || 0,
		maxPrice: req.query.maxPrice || 5000,
		query: req.query.query || '',
		kjCode : 'c37l1700273'
	};

	let codes = {
		'toronto' : 'c37l1700273',
		'halifax' : 'c37l1700321',
		'vancouver' : 'c37l1700287',
		'hamilton' : 'c37l80014',
		'edmonton' : 'c37l1700203',
		'montreal' : 'c37l1700281',
		'victoria' : 'c37l1700173',
		'ottawa' : 'c37l1700185'
	}

	queryParams.kjCode = codes[queryParams.city];

	const getCL = Promise.promisify(x(`http://${queryParams.city}.craigslist.com/search/apa?is_paid=all&hasPic=1&bedrooms=${queryParams.rooms}&min_price=${queryParams.minPrice}&max_price=${queryParams.maxPrice}&query=${queryParams.query}#grid`, 'p.row', [{
	  title: 'span.txt span.pl a.hdrlnk',
	  posted: 'span.txt span.pl time@title',
	  price: 'span.txt span.l2 span.price',
	  rooms: 'span.txt span.l2 span.housing',
	  link: 'span.txt span.pl a.hdrlnk@href',
	  image: 'a@data-ids'
	}]));
	
	const getKJ = Promise.promisify(x(`http://www.kijiji.ca/b-${queryParams.rooms}-bedroom-apartments-condos/city-of-${queryParams.city}/${queryParams.query}/${queryParams.kjCode}?price=${queryParams.minPrice}__${queryParams.maxPrice}&gpTopAds=y`, 'table.regular-ad', [{
	  title: 'td.description a',
	  price: 'td.price',
	  posted: 'td.posted',
	  link: 'td.description a@href',
	  image: 'td.image img@src'
	}]));

	res.contentType('application/json');
	Promise.join( getCL(), getKJ(), (cl, kj) => { 
		console.log(cl);
		res.send(cl.concat(kj));
	});
};

module.exports = routes;
