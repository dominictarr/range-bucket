var test = require('tape')

var bucket = require('..')
var assert = require('assert')

var alphabet = 'AOEUIDHTNSQJKXBMWVZPYFGCRLpyfgcrlaoeuidhtnszvwmbxkjq7531902468_-'

function random(n) {
  var a = alphabet[~~(Math.random()*alphabet.length)]
  return ( n ? a + random(n - 1) : a )
}

test('simple', function (t) {
  var b = bucket('BUCKET')
  t.equal(typeof b, 'function')
  t.equal(typeof b.range, 'function')
  t.end()
})

function within(range, key) {
  return range.start <= key && key < range.end
}

function times (n, iter) {
  while(n-- > 0) iter(n)
}

test('range.within', function (t) {
  times(10, function () {
    var b  = bucket(random(6))
    var _b = bucket(random(6))
    var K  = random(6)
    var k  = b (K)
    var _k = _b(K)

    console.log(b.parse(k))

    t.ok( b.range().within(k),   'within')
    //keys for a different bucket *must* fall outside the range.
    t.ok( !_b.range().within(k), '!within')
    t.ok( _b.range().within(_k), 'within')
  })
})

test('range.within 2', function (t) {
  times(10, function () {
    var b  = bucket(random(6))
    var _b = bucket(random(6))
    var K  = random(6)
    var K2  = random(6)
    var k  = b (K, K2)
    var _k = _b(K, K2)

    t.ok( within(b.range(), k), 'within')
    //keys for a different bucket *must* fall outside the range.
    t.ok( !within(_b.range(),  k), '!within')
    t.ok(  within(_b.range(), _k), 'within')
    t.end()
  })
})

test('range.within [groups]', function (t) {
  times(10, function () {
    var b  = bucket(random(6))
    var big = random(4), little = random(4), _little = random(4)

    assert(within(b.range([big, true]), b([big, little])))
    assert(within(b.range([big, little]), b([big, little])))
    assert(within(b.range([true, true]), b([big, little])))

    console.log(b.parse(b([big, little])))

    t.ok(!within(b.range([big, little]), b([big, _little])))
    t.ok(within(b.range([big, true]), b([big, _little])))
    t.ok(within(b.range([true, true]), b([big, _little])))
    t.end()
  })
})

test('range.within [groups, true]', function (t) {
  times(10, function () {
    var b  = bucket(random(6), 'sub')
    var big = random(4), little = random(4), _little = random(4)

    //console.log(b.range([big, true]) )
  //  console.log(b([big, little]))

    console.log(b.parse(b([big, little])))

    t.ok(b.range([big, true]).within(b([big, little])))
    t.ok(b.range([big, little]).within(b([big, little])))
    t.ok(b.range([true, true]).within(b([big, little])))

    t.ok(!b.range([big, little]).within(b([big, _little])))
    t.ok(b.range([big, true])   .within( b([big, _little])))
    t.ok(b.range([true, true])  .within(b([big, _little])))
    t.end()
  })
})
