import _ from 'lodash';
import { assert } from 'chai';

const getType = data => {
  let str = Object.prototype.toString.call(data);
  str = str.replace(/[\[\]]+/g, '');
  str = str.replace(/^object\s?/g, '');
  return str.toLowerCase();
};

const isBuffer = (value, msg) => {
  if (!_.isBuffer(value)) {
    throw new Error(`${msg}: expected ${value} to be a buffer`);
  }
};

// const notEmpty = (value, msg) => {
  // if (_.isEmpty(value)) {
    // throw new Error(`${msg}: expected ${value} not to be a empty`);
  // }
// };

class Assert {
  constructor() {
    this.value = null;
  }
  execute(fun, ...args) {
    let argument;
    if (_.isNil(this.value)) {
      this.value = args[0];
      argument = args;
    } else {
      args.unshift(this.value);
      argument = args;
    }
    switch (fun) {
      case assert.deepInclude: {
        const swop = argument[0];
        argument[0] = argument[1];
        argument[1] = swop;
        fun(...argument);
        break;
      }
      default: {
        fun(...argument);
        break;
      }
    }
    return this;
  }
  include(...args) {
    return this.execute(assert.deepInclude, ...args);
  }
  gt(...args) {
    return this.execute(assert.isAbove, ...args);
  }
  gte(...args) {
    return this.execute(assert.isAtLeast, ...args);
  }
  lt(...args) {
    return this.execute(assert.isBelow, ...args);
  }
  lte(...args) {
    return this.execute(assert.isAtMost, ...args);
  }
  true(...args) {
    return this.execute(assert.isTrue, ...args);
  }
  equal(...args) {
    return this.execute(assert.deepEqual, ...args);
  }
  unequal(...args) {
    return this.execute(assert.notDeepEqual, ...args);
  }
  false(...args) {
    return this.execute(assert.isFalse, ...args);
  }
  exists(...args) {
    return this.execute(assert.exists, ...args);
  }
  notEmpty(...args) {
    return this.execute(assert.isNotEmpty, ...args);
  }
  function(...args) {
    return this.execute(assert.isFunction, ...args);
  }
  object(...args) {
    return this.execute(assert.isObject, ...args);
  }
  array(...args) {
    return this.execute(assert.isArray, ...args);
  }
  number(...args) {
    return this.execute(assert.isNumber, ...args);
  }
  bool(...args) {
    return this.execute(assert.isBoolean, ...args);
  }
  null(...args) {
    return this.execute(assert.isNull, ...args);
  }
  string(...args) {
    return this.execute(assert.isString, ...args);
  }
  undefined(...args) {
    return this.execute(assert.isUndefined, ...args);
  }
  match(...args) {
    if (_.isNil(this.value)) {
      args[1] = getType(args[1]) === 'string' ? new RegExp(args[1], 'g') : args[1];
    } else {
      args[0] = getType(args[0]) === 'string' ? new RegExp(args[0], 'g') : args[0];
    }
    return this.execute(assert.match, ...args);
  }
  buffer(...args) {
    return this.execute(isBuffer, ...args);
  }
  date(...args) {
    if (_.isNil(this.value)) {
      args.splice(1, 0, 'date');
    } else {
      args.unshift('date');
    }
    return this.execute(assert.typeOf, ...args);
  }
  regexp(...args) {
    if (_.isNil(this.value)) {
      args.splice(1, 0, 'regexp');
    } else {
      args.unshift('regexp');
    }
    return this.execute(assert.typeOf, ...args);
  }
}
export default new Assert();
