'use strict';

var _ = require('lodash');
var request = require('request');

var spotifyUrl = 'https://api.spotify.com/v1/search?q={{artist}}&type=track&limit=50';

function parser(artist, cb){
	request(spotifyUrl.replace('{{artist}}', artist), function(err, resp, body){
		cb(err, _.map(JSON.parse(body).tracks.items, function (track) {
			return {
				artist: track.artists[0].name,
				title: track.name.toLowerCase(),
				link: track.uri
			};
		}));
	});
}

module.exports = parser;
