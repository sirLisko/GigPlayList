'use strict'

var _ = require('lodash')
var request = require('request')
var NiceDate = require('nice-date')

var songKick = 'http://api.songkick.com/api/3.0/events.json?artist_name={{artist}}&location=ip:{{ip}}&apikey=' + process.env.SKAPI

function getGig (artist, ip, cb) {
  var url = songKick.replace('{{artist}}', artist).replace('{{ip}}', ip)
  request(url, function (err, resp, body, resultsPage) {
    if (err) { return cb(err) }
    if (resp.statusCode !== 200) return cb(new Error('Status code is not 200'))

    try {
      resultsPage = JSON.parse(body).resultsPage
    } catch (err) {
      return cb(new Error('Error parsing JSON response from Songkick API'))
    }

    cb(err, body && _.map(resultsPage.results.event, function (result) {
      var date = new NiceDate(result.start.date)
      return {
        artist: result.performance[0].artist.displayName,
        buyUrl: result.uri,
        date: {
          month: date.get('monthShort'),
          day: date.get('day')
        },
        venueName: result.venue.displayName,
        location: result.location.city
      }
    })[0])
  })
}

module.exports = getGig
