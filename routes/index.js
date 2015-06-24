'use strict';

var express = require('express');
var router = express.Router();

var setList = require('setlistfm-parser');

router.get('/', function(req, res) {
	res.render('index');
});

router.get('/:artist', function(req, res) {
	var artist = req.params.artist;

	setList.getTracks(artist).then(function(setList){
		res.render('index', setList);
	}).catch(function (error) {
		res.render('index', { artist: artist, error: (error.statusCode === 404) ? 'not found' : 'an error occured' });
	}).done();

});

module.exports = router;
