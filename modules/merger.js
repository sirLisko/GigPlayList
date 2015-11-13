'use strict';

var _ = require('lodash');

function merger(setList, tracks){
	_.map(setList.tracks, function (track) {
		return _.assign(track, _.filter(tracks, function(tr){
			return track.title === tr.title;
		})[0]);
	});
}

module.exports = merger;
