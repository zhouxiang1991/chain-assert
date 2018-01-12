import _ from 'lodash';
import deline from 'deline';
import { assert } from 'chai';

const getType = data => {
  let str = Object.prototype.toString.call(data);
  str = str.replace(/[\[\]]+/g, '');
  str = str.replace(/^object\s?/g, '');
  return str.toLowerCase();
};

const format = value => {
  const type = getType(value);
  if (type === 'string') {
    return `'${value}'`;
  }

  if (type === 'array') {
    return `[${value}]`;
  }

  if (type === 'object') {
    return `${JSON.stringify(value)}`;
  }

  return String(value);
};

const isBuffer = (value, msg = '') => {
  if (!_.isBuffer(value)) {
    throw new Error(`${msg}: expected ${format(value)} to be buffer`);
  }
};
const isInteger = (value, msg = '') => {
  if (!Number.isInteger(value)) {
    throw new Error(`${msg}: expected ${format(value)} to be integer`);
  }
};
const size = (value, count ,msg = '') => {
  const type = getType(value);
  if (type === 'object') {
    const size = Object.keys(value).length;
    if (size !== count) {
      throw new Error(`${msg}: expected ${format(value)} length to be ${count}`);
    }
  } else if (!_.isNil(value.length)) {
    if (value.length !== count) {
      throw new Error(`${msg}: expected ${format(value)} length to be ${count}`);
    }
  } else {
    throw new Error(`assert is not suppert to handle [${type}] type`);
  }
}
const isZreo = (value, msg = '') => {
  if (value !== 0) {
    throw new Error(`${msg}: expected ${format(value)} to be zreo`);
  }
};
const isPositive = (value, msg = '') => {
  if (value < 0) {
    throw new Error(`${msg}: expected ${format(value)} to be positive number`);
  }
};
const isNegative = (value, msg = '') => {
  if (value > 0) {
    throw new Error(`${msg}: expected ${format(value)} to be negative number`);
  }
};
const decimal = (value, decimal, msg = '') => {
  const d = String(value).split('.')[1].length;
  if (d !== decimal) {
    throw new Error(`${msg}: expected ${format(value)} decimal to be ${decimal}`);
  }
};
const isDigital = (value, msg = '') => {
  if (isNaN(value)) {
    throw new Error(`${msg}: expected ${format(value)} to be digital`);
  }
};
const hasValue = (value, msg = '') => {
  const type  = getType(value);
  if (
    type === 'string'
    || type === 'number'
  ) {
    if (!value) {
      throw new Error(`${msg}: expected ${format(value)} to have value`);
    }
  } else if (type === 'boolean') {
  } else {
    if (_.isEmpty(value)) {
      throw new Error(`${msg}: expected ${format(value)} to have value`);
    }
  }
};
const isUrl = (value, msg = '') => {
  const regexpStr = deline`
    (https?|ftp|file)://\
    [-A-Za-z0-9+&@#/%?=~_|!:,.;]+\
    [-A-Za-z0-9+&@#/%=~_|]`;
  const reg = new RegExp(regexpStr, 'g');
  assert.match(value, reg, msg)
};
const matchCount = (value, reg, count, msg = '') => {
  const result = value.match(reg)
  if (!result || result.length !== count) {
    throw new Error(`${msg}: expected ${format(value)} match ${reg} to be ${count} result`);
  }
};
const isNotEmpty = (value, msg = '') => {
  const type = getType(value)
  if (
    type === 'null'
    || type === 'undefined'
  ) {
    assert.exists(value, msg);
  } else {
    assert.notEmpty(value, msg);
  }
};
class Assert {
  constructor(first) {
    this.first = first;
    this._value = null;
  }
  execute(fun, ...args) {
    let argument;
    if (_.isNil(this._value)) {
      this._value = args[0];
      argument = args;
    } else {
      args.unshift(this._value);
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
      case 'typeOfIn': {
        for (const _value of argument[1]) {
          try {
            assert.typeOf(argument[0], _value);
            return this;
          } catch {
          }
        }
        throw new Error(`${argument[2] || ''}: expected ${getType(argument[0])} in [${argument[1]}]`);
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
    if (this.first) {
      return new Assert().include(...args);
    }
    return this.execute(assert.deepInclude, ...args);
  }
  gt(...args) {
    if (this.first) {
      return new Assert().gt(...args);
    }
    return this.execute(assert.isAbove, ...args);
  }
  gte(...args) {
    if (this.first) {
      return new Assert().gte(...args);
    }
    return this.execute(assert.isAtLeast, ...args);
  }
  lt(...args) {
    if (this.first) {
      return new Assert().lt(...args);
    }
    return this.execute(assert.isBelow, ...args);
  }
  lte(...args) {
    if (this.first) {
      return new Assert().lte(...args);
    }
    return this.execute(assert.isAtMost, ...args);
  }
  true(...args) {
    if (this.first) {
      return new Assert().true(...args);
    }
    return this.execute(assert.isTrue, ...args);
  }
  equal(...args) {
    if (this.first) {
      return new Assert().equal(...args);
    }
    return this.execute(assert.deepEqual, ...args);
  }
  unequal(...args) {
    if (this.first) {
      return new Assert().unequal(...args);
    }
    return this.execute(assert.notDeepEqual, ...args);
  }
  false(...args) {
    if (this.first) {
      return new Assert().false(...args);
    }
    return this.execute(assert.isFalse, ...args);
  }
  exists(...args) {
    if (this.first) {
      return new Assert().exists(...args);
    }
    return this.execute(assert.exists, ...args);
  }
  notEmpty(...args) {
    if (this.first) {
      return new Assert().notEmpty(...args);
    }
    return this.execute(isNotEmpty, ...args);
    // return this.execute(assert.isNotEmpty, ...args);
  }
  function(...args) {
    if (this.first) {
      return new Assert().function(...args);
    }
    return this.execute(assert.isFunction, ...args);
  }
  object(...args) {
    if (this.first) {
      return new Assert().object(...args);
    }
    return this.execute(assert.isObject, ...args);
  }
  array(...args) {
    if (this.first) {
      return new Assert().array(...args);
    }
    return this.execute(assert.isArray, ...args);
  }
  number(...args) {
    if (this.first) {
      return new Assert().number(...args);
    }
    return this.execute(assert.isNumber, ...args);
  }
  bool(...args) {
    if (this.first) {
      return new Assert().bool(...args);
    }
    return this.execute(assert.isBoolean, ...args);
  }
  null(...args) {
    if (this.first) {
      return new Assert().null(...args);
    }
    return this.execute(assert.isNull, ...args);
  }
  string(...args) {
    if (this.first) {
      return new Assert().string(...args);
    }
    return this.execute(assert.isString, ...args);
  }
  undefined(...args) {
    if (this.first) {
      return new Assert().undefined(...args);
    }
    return this.execute(assert.isUndefined, ...args);
  }
  match(...args) {
    if (this.first) {
      return new Assert().match(...args);
    }
    if (_.isNil(this._value)) {
      args[1] = getType(args[1]) === 'string' ? new RegExp(args[1], 'g') : args[1];
    } else {
      args[0] = getType(args[0]) === 'string' ? new RegExp(args[0], 'g') : args[0];
    }
    return this.execute(assert.match, ...args);
  }
  buffer(...args) {
    if (this.first) {
      return new Assert().buffer(...args);
    }
    return this.execute(isBuffer, ...args);
  }
  date(...args) {
    if (this.first) {
      return new Assert().date(...args);
    }
    if (_.isNil(this._value)) {
      args.splice(1, 0, 'date');
    } else {
      args.unshift('date');
    }
    return this.execute(assert.typeOf, ...args);
  }
  regexp(...args) {
    if (this.first) {
      return new Assert().regexp(...args);
    }
    if (_.isNil(this._value)) {
      args.splice(1, 0, 'regexp');
    } else {
      args.unshift('regexp');
    }
    return this.execute(assert.typeOf, ...args);
  }
  integer(...args) {
    if (this.first) {
      return new Assert().integer(...args);
    }
    return this.execute(isInteger, ...args);
  }
  zreo(...args) {
    if (this.first) {
      return new Assert().zreo(...args);
    }
    return this.execute(isZreo, ...args);
  }
  positive(...args) {
    if (this.first) {
      return new Assert().positive(...args);
    }
    return this.execute(isPositive, ...args);
  }
  negative(...args) {
    if (this.first) {
      return new Assert().negative(...args);
    }
    return this.execute(isNegative, ...args);
  }
  typein(...args) {
    if (this.first) {
      return new Assert().typein(...args);
    }
    return this.execute('typeOfIn', ...args);
  }
  digital(...args) {
    if (this.first) {
      return new Assert().digital(...args);
    }
    return this.execute(isDigital, ...args);
  }
  decimal(...args) {
    if (this.first) {
      return new Assert().decimal(...args);
    }
    return this.execute(decimal, ...args);
  }
  notMatch(...args) {
    if (this.first) {
      return new Assert().notMatch(...args);
    }
    if (_.isNil(this._value)) {
      args[1] = getType(args[1]) === 'string' ? new RegExp(args[1], 'g') : args[1];
    } else {
      args[0] = getType(args[0]) === 'string' ? new RegExp(args[0], 'g') : args[0];
    }
    return this.execute(assert.notMatch, ...args);
  }
  matchCount(...args) {
    if (this.first) {
      return new Assert().matchCount(...args);
    }
    if (_.isNil(this._value)) {
      args[1] = getType(args[1]) === 'string' ? new RegExp(args[1], 'g') : args[1];
    } else {
      args[0] = getType(args[0]) === 'string' ? new RegExp(args[0], 'g') : args[0];
    }
    return this.execute(matchCount, ...args);
  }
  url(...args) {
    if (this.first) {
      return new Assert().url(...args);
    }
    return this.execute(isUrl, ...args);
  }
  value(...args) {
    if (this.first) {
      return new Assert().value(...args);
    }
    return this.execute(hasValue, ...args);
  }
  size(...args) {
    if (this.first) {
      return new Assert().size(...args);
    }
    return this.execute(size, ...args);
  }
}
const ret =  new Assert(true);
export default ret;
