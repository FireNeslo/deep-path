var DeepPath = require('..');
var value = {};

var path = DeepPath('array[0].first');

path.set(value, true); // => true
path.get(value, true); // => true

path = DeepPath('array[1]');
path.set(value, {second: true});

console.log(value.array);