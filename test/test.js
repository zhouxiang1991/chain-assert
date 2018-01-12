import _ from 'lodash';
// import { assert } from 'chai';
import assert from '../src/index.js';

// assert.matchCount('a1.00', '[0]', 2);
// assert.notEmpty([]);
// console.log(assert.value);
const a = new Buffer([1,2,3]);
assert.size(new Buffer([1,2,3]), 3);
