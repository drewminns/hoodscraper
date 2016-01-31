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

	switch (queryParams.city) {
		case 'toronto':
				queryParams.kjCode = 'c37l1700273';
			break;
		case 'halifax':
				queryParams.kjCode = 'c37l1700321';
			break;
		case 'vancouver':
				queryParams.kjCode = 'c37l1700287';
			break;
		case 'hamilton':
				queryParams.kjCode = 'c37l80014';
			break;
		case 'edmonton' :
				queryParams.kjCode = 'c37l1700203';
			break;
		case 'montreal' :
				queryParams.kjCode = 'c37l1700281';
			break;
		case 'victoria' :
			queryParams.kjCode = 'c37l1700173';
			break;
		case 'ottawa' :
			queryParams.kjCode = 'c37l1700185';
			break;
	}



	const getCL = Promise.promisify(x(`http://${queryParams.city}.craigslist.com/search/apa?is_paid=all&hasPic=1&bedrooms=${queryParams.rooms}&min_price=${queryParams.minPrice}&max_price=${queryParams.maxPrice}&query=${queryParams.query}#grid`, 'p.row', [{
	  title: 'span.txt span.pl a.hdrlnk',
	  posted: 'span.txt span.pl time@title',
	  price: 'span.txt span.l2 span.price',
	  rooms: 'span.txt span.l2 span.housing',
	  link: 'span.txt span.pl a.hdrlnk@href',
	  image: 'a@data-ids'
	}]));
	
	const getKJ = Promise.promisify(x(`http://www.kijiji.ca/b-${queryParams.rooms}-bedroom-apartments-condos/city-of-${queryParams.city}/${queryParams.query}/${queryParams.kjCode}?gpTopAds=y&price=${queryParams.minPrice}__${queryParams.maxPrice}`, 'table.regular-ad', [{
	  title: 'td.description a',
	  price: 'td.price',
	  posted: 'td.posted',
	  link: 'td.description a@href',
	  image: 'td.image img@src'
	}]));

	console.log(`http://www.kijiji.ca/b-${queryParams.rooms}-bedroom-apartments-condos/city-of-${queryParams.city}/${queryParams.query}/${queryParams.kjCode}?gpTopAds=y&price=${queryParams.minPrice}__${queryParams.maxPrice}`)

	res.contentType('application/json');
	Promise.join( getCL(), getKJ(), (cl, kj) => res.send(cl.concat(kj)) );
};

module.exports = routes;
