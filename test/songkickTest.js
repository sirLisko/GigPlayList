'use strict'

var test = require('tape')
var nock = require('nock')
var songkick = require('../modules/songkick.js')

test('A gig has been found', function (t) {
  var fixture = require('./fixtures/songkick__result.json')

  var apiSongkick = nock('http://api.songkick.com')
    .get('/api/3.0/events.json?artist_name=calibro_35&location=ip:1.1.1.1&apikey=' + process.env.SKAPI)
    .reply(200, fixture)

  songkick('calibro_35', '1.1.1.1', function (err, gig) {
    if (err) return false
    t.equal(gig.artist, 'Calibro 35', 'the artist is present')
    t.equal(gig.date.day, 26, 'the day is present')
    t.equal(gig.date.month, 'Feb', 'the month is present')
    t.equal(gig.venueName, '100 Club', 'the venue is present')
    t.equal(gig.location, 'London, UK', 'the location is present')

    apiSongkick.done()
    t.end()
  })
})

test('More than one gig has been found', function (t) {
  var fixture = require('./fixtures/songkick__multipleresults.json')

  var apiSongkick = nock('http://api.songkick.com')
    .get('/api/3.0/events.json?artist_name=ludovico_einaudi&location=ip:1.1.1.1&apikey=' + process.env.SKAPI)
    .reply(200, fixture)

  songkick('ludovico_einaudi', '1.1.1.1', function (err, gig) {
    if (err) return false
    t.equal(gig.artist, 'Ludovico Einaudi', 'the artist is present')
    t.equal(gig.date.day, 16, 'the first day is present')

    apiSongkick.done()
    t.end()
  })
})

test('Gig not found', function (t) {
  var fixture = require('./fixtures/songkick__notfound.json')

  var apiSongkick = nock('http://api.songkick.com')
    .get('/api/3.0/events.json?artist_name=the_strokes&location=ip:1.1.1.1&apikey=' + process.env.SKAPI)
    .reply(200, fixture)

  songkick('the_strokes', '1.1.1.1', function (err, gig) {
    if (err) return false
    t.equal(gig, undefined, 'if not gig are found returns undefined')

    apiSongkick.done()
    t.end()
  })
})

test('On Songkick API error', function (t) {
  var fixture = require('./fixtures/songkick__error.json')

  var apiSongkick = nock('http://api.songkick.com')
    .get('/api/3.0/events.json?artist_name=foo&location=ip:1.1.1.1&apikey=' + process.env.SKAPI)
    .reply(400, fixture)

  songkick('foo', '1.1.1.1', function (err, gig) {
    if (err) { console.log(err) }
    t.equal(gig, undefined, 'if not gig are found returns undefined')

    apiSongkick.done()
    t.end()
  })
})
