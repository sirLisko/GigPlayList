'use strict';

var _ = require('lodash');

function parser(body){
	return _
		.chain(JSON.parse(body).tracks.items)
		.map(function (track) {
			return {
				artist: track.artists[0].name,
				title: track.name.toLowerCase(),
				link: track.uri
			};
		})
		.value();
}

module.exports = parser;
