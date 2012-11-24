
var bucket = require('..')
//will create buckets that are prefixed with BUCKET.
var b = bucket('BUCKET')
var b2 = bucket('BUCKET2')

var keys = []

keys.push(b('hello'))
keys.push(b('goodbye'))

keys.push(b2('bonjour'))


//use b.range() to get an object which defines the range of that bucket.
console.log(
  b.range()
)

//fiter a range like this:

console.log(
 keys.filter(b.range().within)
)

//optionally, pass in start and end keys to restrict the range.

console.log(
 keys.filter(b.range('', 'h').within)
)

