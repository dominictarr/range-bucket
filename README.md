# range-bucket

Generate string ranges that group into ranges,
suitable for use as database keys (recommended for [levelup](https://github.com/rvagg/node-levelup'))

``` js
var bucket = require('range-bucket')
//will create buckets that are prefixed with BUCKET.
var b = bucket('BUCKET')
var b2 = bucket('BUCKET2')

var keys = []

keys.push(b('hello'))
keys.push(b('goodbye'))

keys.push(b2('bonjour'))

//get the range defined by a bucket like this:
b.range()

//fiter a range like this:

console.log(
 keys.filter(b.range().within)
)

//optionally, pass in start and end keys to restrict the range.

console.log(
 keys.filter(b.range('', 'h').within)
)

```


## License

MIT
