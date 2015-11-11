'use strict';

var express = require('express');
var async = require('async');

var setList = require('setlistfm-parser');
var spotifyParser = require('./modules/spotify');
var trackMerger = require('./modules/merger');
var songkick = require('./modules/songkick');

var router = express.Router();

router.get('/', function(req, res) {
	res.render('index');
});

router.get('/:artist', function(req, res) {
	var artist = req.params.artist;
	var clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

	setList.getTracks(artist).then(function(setList){
		async.parallel({
			spotify: function(cb){
				spotifyParser(artist, cb);
			},
			songkick: function(cb){
				songkick(artist, clientIp, cb);
			}
		}, function(err, results) {
			trackMerger(setList, results.spotify);
			setList.events = results.songkick;
			res.render('result', setList);
		});
	}).catch(function (error) {
		res.render('result', {
			artist: artist,
			error: (error.statusCode === 404) ? 'not found' : 'an error occured'
		});
	}).done();

});

module.exports = router;
