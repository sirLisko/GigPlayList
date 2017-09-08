'use strict'

var _ = require('lodash')
var request = require('request')
var NiceDate = require('nice-date')

var songKick = 'http://api.songkick.com/api/3.0/events.json?artist_name={{artist}}&location=ip:{{ip}}&apikey=VxBDtCiHtpcMb1cL'

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

    cb(err, body && _.map(resultsPage.results, function (result) {
      var date = new NiceDate(result[0].start.date)
      return {
        artist: result[0].performance[0].displayName,
        buyUrl: result[0].uri,
        date: {
          month: date.get('monthShort'),
          day: date.get('day')
        },
        venueName: result[0].venue.displayName,
        location: result[0].location.city
      }
    })[0])
  })
}

module.exports = getGig
