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