var Bucket = require('..')

function l(arg) {
  return console.log(arg), arg
}

require('tape')('test', function (t) {

  var bucket = Bucket('test')

  var range = l(bucket.range([]))
  var k = 
  t.notOk(range.within(l(bucket(['hello']))))
  t.ok(range.within(l(bucket([]))))
  

  t.end()

})
