'use strict';

const x = require('x-ray')().limit(3),
		Promise = require('bluebird');

const routes = {};

routes.home = (req, res) => {
	res.sendfile(__dirname + '/public/index.html');
}

const getInfo = Promise.promisify(x('http://toronto.craigslist.ca/search/tor/apa?is_paid=all&hasPic=1#grid', 'p.row', [{
  title: 'span.txt span.pl a.hdrlnk',
  posted: 'span.txt span.pl time@datetime',
  price: 'span.txt span.l2 span.price',
  rooms: 'span.txt span.l2 span.housing',
  link: 'span.txt span.pl a.hdrlnk@href',
  image: 'a@data-ids'
}]));

routes.craigslist = (req, res) => {
	res.contentType('application/json');
	getInfo().then(function(item) {
		res.send(item);
	});
}

module.exports = routes;
