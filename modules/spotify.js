'use strict'

var _ = require('lodash')
var request = require('request')

var spotifyUrl = 'https://api.spotify.com/v1/search?q={{artist}}&type=track&limit=50'

function parser (artist, cb) {
  request(spotifyUrl.replace('{{artist}}', artist), function (err, resp, body, tracks) {
    if (err) return cb(new Error('Unable to connect to the Spotify API endpoint'))
    if (resp.statusCode !== 200) return cb(new Error('Status code is not 200'))

    try {
      tracks = JSON.parse(body).tracks
    } catch (err) {
      return cb(new Error('Error parsing JSON response from Spotify API'))
    }

    cb(err, _.map(tracks.items, function (track) {
      return {
        artist: track.artists[0].name,
        title: track.name.toLowerCase(),
        link: track.uri
      }
    }))
  })
}

module.exports = parser
