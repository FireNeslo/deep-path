nslo-deep-path - v0.1.0
===
get and set deep values
## Install
### npm
```bash
$ npm install FireNeslo/deep-path --save
```
### bower
```bash
$ bower install FireNeslo/deep-path --save
```
## Usage
```js
var DeepPath = require('..');
var value = {};

var path = DeepPath('array[0].first');

path.set(value, true); // => true
path.get(value, true); // => true

path = DeepPath('array[1]');
path.set(value, {second: true});

console.log(value.array);
```
## Test
```bash
$ npm install -g mocha
$ npm test
```
##API

<!-- Start /home/fireneslo/Dropbox/nslo/deep-path/index.js -->

## DeepPath(path)

Creates a deep path Object for getting and setting deep values

### Params: 

* **string** *path* 

## get(scope)

gets a deep value from scope

### Params: 

* **object** *scope* - scope for operation

## set(scope, value)

sets a deep value in scope

### Params: 

* **object** *scope* - scope for operation
* ***** *value* - value to set

<!-- End /home/fireneslo/Dropbox/nslo/deep-path/index.js -->

