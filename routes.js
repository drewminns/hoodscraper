'use strict';

let x = require('x-ray')(),
		Promise = require('bluebird');

let routes = {};

routes.home = (req, res) => {
	res.sendfile(__dirname + '/public/index.html');
}

let getInfo = Promise.promisify(x('http://toronto.craigslist.ca/search/tor/apa#list', 'p.row', [{
  title: 'span.txt span.pl a.hdrlnk',
  posted: 'span.txt span.pl time@datetime',
  price: 'span.txt span.l2 span.price',
  rooms: 'span.txt span.l2 span.housing',
  link: 'span.txt span.pl a.hdrlnk@href',
  details: x('span.txt span.pl a.hdrlnk', 'html' [{
  	title: 'title'
  }])
}]));

routes.craigslist = (req, res) => {
	res.contentType('application/json');
	getInfo().then(function(item) {
		res.send(item);
	});
}

// Ship it!
module.exports = routes;
