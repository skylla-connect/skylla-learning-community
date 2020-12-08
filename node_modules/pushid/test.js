var test = require('tape')
var pushid = require('./')

test('check length of ID', function(t) {
  t.plan(1)

  var id = pushid()
  t.equal(id.length, 20, 'The new ID is of the correct length')

  t.end()
})

test('check we get an increment for IDs in the same ms', function(t) {
  t.plan(3)

  var id1 = pushid()
  var id2 = pushid()
  t.equal(id1.length, 20, 'The new ID is of the correct length')
  t.equal(id2.length, 20, 'The new ID is of the correct length')

  t.equal(id1.substr(0, 19), id2.substr(0, 19), 'The IDs are the same except the last char')

  t.end()
})
