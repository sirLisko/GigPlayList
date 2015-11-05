'use strict';

var _ = require('lodash');

function merger(setList, tracks){
	setList.tracks = _
		.chain(setList.tracks)
		.map(function (track) {
			return _.assign(track, _.filter(tracks, function(tr){
				return track.title === tr.title;
			})[0])
		})
		.value();

	return setList;
}

module.exports = merger;
