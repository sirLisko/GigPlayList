'use strict';

var test = require('tape');
var nock = require('nock');
var spotify = require('../modules/spotify.js');

test('Tracks have been found', function(t){
	var fixture = require('./fixtures/spotify__found.json');

	var apiSpotify = nock('https://api.spotify.com')
		.get('/v1/search?q=Calibro%2035&type=track&limit=50')
		.reply(200, fixture);

	spotify('Calibro 35', function(err, tracks){
		t.equal(tracks.length, 50, 'there are 50 tracks');
		t.equal(tracks[0].artist, 'Calibro 35', 'the artist is Calibro 35');
		t.equal(tracks[0].title, 'notte in bovisa', 'the title is notte in bovisa');
		t.equal(tracks[0].link, 'spotify:track:6IELxA0VjPNUCQDHPA3P1g', 'the link is the Spotify Uri' );

		apiSpotify.done();
		t.end();
	});
});

test('Tracks not found', function(t){
	var fixture = require('./fixtures/spotify__notfound.json');

	var apiSpotify = nock('https://api.spotify.com')
		.get('/v1/search?q=calibro_35&type=track&limit=50')
		.reply(200, fixture);

	spotify('calibro_35', function(err, tracks){
		t.ok(tracks instanceof Array, 'tracks is an array');
		t.equal(tracks.length, 0, 'no tracks found');

		apiSpotify.done();
		t.end();
	});
});

test('on Spotify API error', function(t){
	var apiSpotify = nock('https://api.spotify.com')
		.get('/v1/search?q=calibro_35&type=track&limit=50')
		.reply(400);

	spotify('calibro_35', function(err, tracks){
		t.notOk(tracks, 'tracks is not returned');
		t.ok(err, 'an error is returned');

		apiSpotify.done();
		t.end();
	});
});
