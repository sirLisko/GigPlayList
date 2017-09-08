'use strict'

var test = require('tape')
var merger = require('../modules/merger.js')

test('Tracks are merged', function (t) {
  var setList = {
    tracks: [
      { title: 'foo' },
      { title: 'bar' },
      { title: 'foobar' }
    ]
  }

  var tracksToMerge = [
    { title: 'foo', link: 'asd' },
    { title: 'foobar', link: 'zxc' },
    { title: 'barfoo', link: 'qwe' }
  ]

  merger(setList, tracksToMerge)

  t.equal(setList.tracks.length, 3, 'only the tracks in setList are present')
  t.deepEqual(setList.tracks[0], { title: 'foo', link: 'asd' }, 'the first track is extended')
  t.deepEqual(setList.tracks[1], { title: 'bar' }, 'the second track is not extended')
  t.deepEqual(setList.tracks[2], { title: 'foobar', link: 'zxc' }, 'the third track is extended')

  t.end()
})

test('if no tracksToMerge presents nothing happens', function (t) {
  var setList = {
    tracks: [
      { title: 'foo' },
      { title: 'bar' },
      { title: 'foobar' }
    ]
  }

  merger(setList, undefined)

  t.equal(setList.tracks.length, 3, 'only the tracks in setList are present')
  t.deepEqual(setList.tracks[0], { title: 'foo' }, 'the first track is still present')
  t.deepEqual(setList.tracks[1], { title: 'bar' }, 'the second track is still present')
  t.deepEqual(setList.tracks[2], { title: 'foobar' }, 'the third track is still present')

  t.end()
})

test('if no tracks are present nothing happens', function (t) {
  var setList = { tracks: [] }
  var tracksToMerge = [
    { title: 'foo', link: 'asd' },
    { title: 'foobar', link: 'zxc' },
    { title: 'barfoo', link: 'qwe' }
  ]

  merger(setList, tracksToMerge)

  t.equal(setList.tracks.length, 0, 'the tracks to merge are ignored')

  t.end()
})
