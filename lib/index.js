"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _chai = require("chai");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var getType = function getType(data) {
  var str = Object.prototype.toString.call(data);
  str = str.replace(/[\[\]]+/g, '');
  str = str.replace(/^object\s?/g, '');
  return str.toLowerCase();
};

var isBuffer = function isBuffer(value, msg) {
  if (!_lodash.default.isBuffer(value)) {
    throw new Error("".concat(msg, ": expected ").concat(value, " to be a buffer"));
  }
}; // const notEmpty = (value, msg) => {
// if (_.isEmpty(value)) {
// throw new Error(`${msg}: expected ${value} not to be a empty`);
// }
// };


var Assert =
/*#__PURE__*/
function () {
  function Assert() {
    _classCallCheck(this, Assert);

    this.value = null;
  }

  _createClass(Assert, [{
    key: "execute",
    value: function execute(fun) {
      var argument;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (_lodash.default.isNil(this.value)) {
        this.value = args[0];
        argument = args;
      } else {
        args.unshift(this.value);
        argument = args;
      }

      switch (fun) {
        case _chai.assert.deepInclude:
          {
            var swop = argument[0];
            argument[0] = argument[1];
            argument[1] = swop;
            fun.apply(void 0, _toConsumableArray(argument));
            break;
          }

        default:
          {
            fun.apply(void 0, _toConsumableArray(argument));
            break;
          }
      }

      return this;
    }
  }, {
    key: "include",
    value: function include() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return this.execute.apply(this, [_chai.assert.deepInclude].concat(args));
    }
  }, {
    key: "gt",
    value: function gt() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return this.execute.apply(this, [_chai.assert.isAbove].concat(args));
    }
  }, {
    key: "gte",
    value: function gte() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return this.execute.apply(this, [_chai.assert.isAtLeast].concat(args));
    }
  }, {
    key: "lt",
    value: function lt() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      return this.execute.apply(this, [_chai.assert.isBelow].concat(args));
    }
  }, {
    key: "lte",
    value: function lte() {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      return this.execute.apply(this, [_chai.assert.isAtMost].concat(args));
    }
  }, {
    key: "true",
    value: function _true() {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      return this.execute.apply(this, [_chai.assert.isTrue].concat(args));
    }
  }, {
    key: "equal",
    value: function equal() {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }

      return this.execute.apply(this, [_chai.assert.deepEqual].concat(args));
    }
  }, {
    key: "unequal",
    value: function unequal() {
      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }

      return this.execute.apply(this, [_chai.assert.notDeepEqual].concat(args));
    }
  }, {
    key: "false",
    value: function _false() {
      for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        args[_key10] = arguments[_key10];
      }

      return this.execute.apply(this, [_chai.assert.isFalse].concat(args));
    }
  }, {
    key: "exists",
    value: function exists() {
      for (var _len11 = arguments.length, args = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
        args[_key11] = arguments[_key11];
      }

      return this.execute.apply(this, [_chai.assert.exists].concat(args));
    }
  }, {
    key: "notEmpty",
    value: function notEmpty() {
      for (var _len12 = arguments.length, args = new Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
        args[_key12] = arguments[_key12];
      }

      return this.execute.apply(this, [_chai.assert.isNotEmpty].concat(args));
    }
  }, {
    key: "function",
    value: function _function() {
      for (var _len13 = arguments.length, args = new Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
        args[_key13] = arguments[_key13];
      }

      return this.execute.apply(this, [_chai.assert.isFunction].concat(args));
    }
  }, {
    key: "object",
    value: function object() {
      for (var _len14 = arguments.length, args = new Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
        args[_key14] = arguments[_key14];
      }

      return this.execute.apply(this, [_chai.assert.isObject].concat(args));
    }
  }, {
    key: "array",
    value: function array() {
      for (var _len15 = arguments.length, args = new Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
        args[_key15] = arguments[_key15];
      }

      return this.execute.apply(this, [_chai.assert.isArray].concat(args));
    }
  }, {
    key: "number",
    value: function number() {
      for (var _len16 = arguments.length, args = new Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {
        args[_key16] = arguments[_key16];
      }

      return this.execute.apply(this, [_chai.assert.isNumber].concat(args));
    }
  }, {
    key: "bool",
    value: function bool() {
      for (var _len17 = arguments.length, args = new Array(_len17), _key17 = 0; _key17 < _len17; _key17++) {
        args[_key17] = arguments[_key17];
      }

      return this.execute.apply(this, [_chai.assert.isBoolean].concat(args));
    }
  }, {
    key: "null",
    value: function _null() {
      for (var _len18 = arguments.length, args = new Array(_len18), _key18 = 0; _key18 < _len18; _key18++) {
        args[_key18] = arguments[_key18];
      }

      return this.execute.apply(this, [_chai.assert.isNull].concat(args));
    }
  }, {
    key: "string",
    value: function string() {
      for (var _len19 = arguments.length, args = new Array(_len19), _key19 = 0; _key19 < _len19; _key19++) {
        args[_key19] = arguments[_key19];
      }

      return this.execute.apply(this, [_chai.assert.isString].concat(args));
    }
  }, {
    key: "undefined",
    value: function undefined() {
      for (var _len20 = arguments.length, args = new Array(_len20), _key20 = 0; _key20 < _len20; _key20++) {
        args[_key20] = arguments[_key20];
      }

      return this.execute.apply(this, [_chai.assert.isUndefined].concat(args));
    }
  }, {
    key: "match",
    value: function match() {
      for (var _len21 = arguments.length, args = new Array(_len21), _key21 = 0; _key21 < _len21; _key21++) {
        args[_key21] = arguments[_key21];
      }

      if (_lodash.default.isNil(this.value)) {
        args[1] = getType(args[1]) === 'string' ? new RegExp(args[1], 'g') : args[1];
      } else {
        args[0] = getType(args[0]) === 'string' ? new RegExp(args[0], 'g') : args[0];
      }

      return this.execute.apply(this, [_chai.assert.match].concat(args));
    }
  }, {
    key: "buffer",
    value: function buffer() {
      for (var _len22 = arguments.length, args = new Array(_len22), _key22 = 0; _key22 < _len22; _key22++) {
        args[_key22] = arguments[_key22];
      }

      return this.execute.apply(this, [isBuffer].concat(args));
    }
  }, {
    key: "date",
    value: function date() {
      for (var _len23 = arguments.length, args = new Array(_len23), _key23 = 0; _key23 < _len23; _key23++) {
        args[_key23] = arguments[_key23];
      }

      if (_lodash.default.isNil(this.value)) {
        args.splice(1, 0, 'date');
      } else {
        args.unshift('date');
      }

      return this.execute.apply(this, [_chai.assert.typeOf].concat(args));
    }
  }, {
    key: "regexp",
    value: function regexp() {
      for (var _len24 = arguments.length, args = new Array(_len24), _key24 = 0; _key24 < _len24; _key24++) {
        args[_key24] = arguments[_key24];
      }

      if (_lodash.default.isNil(this.value)) {
        args.splice(1, 0, 'regexp');
      } else {
        args.unshift('regexp');
      }

      return this.execute.apply(this, [_chai.assert.typeOf].concat(args));
    }
  }]);

  return Assert;
}();

var _default = new Assert();

exports.default = _default;