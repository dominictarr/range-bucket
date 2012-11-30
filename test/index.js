
var bucket = require('..')
var assert = require('assert')

var alphabet = 'AOEUIDHTNSQJKXBMWVZPYFGCRLpyfgcrlaoeuidhtnszvwmbxkjq7531902468_-'

function random(n) {
  var a = alphabet[~~(Math.random()*alphabet.length)]
  return ( n ? a + random(n - 1) : a )
}

var b = bucket('BUCKET')

assert.equal(typeof b, 'function')
assert.equal(typeof b.range, 'function')

function within(range, key) {
  return range.start <= key && key < range.end
}

function times (n, iter) {
  while(n-- > 0) iter(n)
}

times(100, function () {
  var b  = bucket(random(6))
  var _b = bucket(random(6))
  var K  = random(6)
  var k  = b (K)
  var _k = _b(K)

  console.log(b.parse(k))

  assert( b.range().within(k))
  //keys for a different bucket *must* fall outside the range.
  assert( !_b.range().within(k) )
  assert( _b.range().within(_k) )
})

times(100, function () {
  var b  = bucket(random(6))
  var _b = bucket(random(6))
  var K  = random(6)
  var K2  = random(6)
  var k  = b (K, K2)
  var _k = _b(K, K2)

  assert( within(b.range(), k) )
  //keys for a different bucket *must* fall outside the range.
  assert( !within(_b.range(),  k) )
  assert(  within(_b.range(), _k) )
})


times(100, function () {
  var b  = bucket(random(6))
  var big = random(4), little = random(4), _little = random(4)

  assert(within(b.range([big, true]), b([big, little])))
  assert(within(b.range([big, little]), b([big, little])))
  assert(within(b.range([true, true]), b([big, little])))

  console.log(b.parse(b([big, little])))


  assert(!within(b.range([big, little]), b([big, _little])))
  assert(within(b.range([big, true]), b([big, _little])))
  assert(within(b.range([true, true]), b([big, _little])))
})

times(10, function () {
  var b  = bucket(random(6), 'sub')
  var big = random(4), little = random(4), _little = random(4)

  //console.log(b.range([big, true]) )
//  console.log(b([big, little]))

  console.log(b.parse(b([big, little])))

  assert(b.range([big, true]).within(b([big, little])))
  assert(b.range([big, little]).within(b([big, little])))
  assert(b.range([true, true]).within(b([big, little])))

  assert(!b.range([big, little]).within(b([big, _little])))
  assert(b.range([big, true])   .within( b([big, _little])))
  assert(b.range([true, true])  .within(b([big, _little])))
})

