!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.nsloDeepPath=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var SPLIT_EXP = /\]\[|\]\.|\[|\.|\]/;
function safe(obj) {'use strict';
  if (obj.constructor === obj) {
    throw new Error("Access to function constructor not allowed");
  } else if ((obj.window === obj || obj.global === obj) && obj.setTimeout && obj.setInterval) {
    throw new Error("Access to global not allowed");
  } else if (obj.children && (obj.nodeName || (obj.prop && obj.attr && obj.find))) {
    throw new Error("Access to HTMLElement not allowed");
  } else if (obj === Object) {
    throw new Error("Access to Object constructor not allowed");
  }
  return obj;
}
function isPart(part) {'use strict'; return part; }
/**
 * Creates a deep path Object for getting and setting deep values
 * @module nslo-deep-path
 * @param {string} path
 */
function DeepPath(path) {'use strict';
  if(!this) return new DeepPath(path);
  var parts = path.split(SPLIT_EXP).filter(isPart);
  var length= parts.length;
  /**
   * gets a deep value from scope
   * @param {object} scope - scope for operation
   */
  this.get = function(scope) {
    var part;
    for(var i = 0; i < length; ++i) { 
      part = parts[i];
      if(!scope[part]) return;
      scope = safe(scope[part]);
    }
    return scope; 
  };
  /**
   * sets a deep value in scope
   * @param {object} scope - scope for operation
   * @param {*} value - value to set
   */
  this.set = function(scope, value) {
    var part, last = parts.length-1;
    for(var i = 0; i < last; ++i) { 
      part = parts[i];
      scope = scope[part] || (scope[part] = isNaN(parts[i+1]) ? {} : []);
    }
    return (scope[parts[last]] = value);
  };
}
module.exports = DeepPath;
},{}]},{},[1])(1)
});
//# sourceMappingURL=nslo-deep-path.js.map