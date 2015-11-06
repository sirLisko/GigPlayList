'use strict';

var _ = require('lodash');
var request = require('request');
var NiceDate = require('nice-date');

var songKick = 'http://api.songkick.com/api/3.0/events.json?artist_name={{artist}}&location=ip:{{ip}}&apikey=' + process.env.SKAPI;

function getGig(artist, ip, cb){
	request(songKick.replace('{{artist}}', artist).replace('{{ip}}', ip), function(err, resp, body){
		cb(_.map(JSON.parse(body).resultsPage.results, function(result){
			var date = new NiceDate(result[0].start.date);
			return {
				artist: result[0].performance[0].displayName,
				buyUrl: result[0].uri,
				date: {
					month: date.get('monthShort'),
					day: date.get('day')
				},
				venueName: result[0].venue.displayName,
				location: result[0].location.city
			};
		})[0]);
	});
}

module.exports = getGig;
