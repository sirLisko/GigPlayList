'use strict';

var request = require('request');
var express = require('express');
var spotifyParser = require('./spotify.js');
var trackMerger = require('./merger.js');
var router = express.Router();

var setList = require('setlistfm-parser');

var url = 'https://api.spotify.com/v1/search?q={{artist}}&type=track&limit=50';

router.get('/', function(req, res) {
	res.render('index');
});

router.get('/:artist', function(req, res) {
	var artist = req.params.artist;

	setList.getTracks(artist).then(function(setList){
		request(url.replace('{{artist}}', artist), function(err, resp, body){
			res.render('result', trackMerger(setList, spotifyParser(body)));
		});

	}).catch(function (error) {
		res.render('result', {
			artist: artist,
			error: (error.statusCode === 404) ? 'not found' : 'an error occured'
		});
	}).done();

});

module.exports = router;
