require('tape')('parse', function (t) {

  var bucket = require('..')

  var b = bucket('bucket')
  var k = b('hello')

  t.deepEqual(b.parse(b('hello')), {
    prefix: ['bucket'],
    key: 'hello'
  })

  t.deepEqual(b.parse(b(['hello', 'whatever'])), {
    prefix: ['bucket'],
    key: ['hello', 'whatever']
  })


  t.deepEqual(b.parse(b([])), {
    prefix: ['bucket'],
    key: []
  })

})

