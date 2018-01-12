"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _deline = _interopRequireDefault(require("deline"));

var _chai = require("chai");

var _templateObject = /*#__PURE__*/ _taggedTemplateLiteral(["\n    (https?|ftp|file)://    [-A-Za-z0-9+&@#/%?=~_|!:,.;]+    [-A-Za-z0-9+&@#/%=~_|]"], ["\n    (https?|ftp|file)://\\\n    [-A-Za-z0-9+&@#/%?=~_|!:,.;]+\\\n    [-A-Za-z0-9+&@#/%=~_|]"]);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var getType = function getType(data) {
  var str = Object.prototype.toString.call(data);
  str = str.replace(/[\[\]]+/g, '');
  str = str.replace(/^object\s?/g, '');
  return str.toLowerCase();
};

var format = function format(value) {
  var type = getType(value);

  if (type === 'string') {
    return "'".concat(value, "'");
  }

  if (type === 'array') {
    return "[".concat(value, "]");
  }

  if (type === 'object') {
    return "".concat(JSON.stringify(value));
  }

  return String(value);
};

var isBuffer = function isBuffer(value) {
  var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (!_lodash.default.isBuffer(value)) {
    throw new Error("".concat(msg, ": expected ").concat(format(value), " to be buffer"));
  }
};

var isInteger = function isInteger(value) {
  var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (!Number.isInteger(value)) {
    throw new Error("".concat(msg, ": expected ").concat(format(value), " to be integer"));
  }
};

var _size2 = function _size2(value, count) {
  var msg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var type = getType(value);

  if (type === 'object') {
    var _size = Object.keys(value).length;

    if (_size !== count) {
      throw new Error("".concat(msg, ": expected ").concat(format(value), " length to be ").concat(count));
    }
  } else if (!_lodash.default.isNil(value.length)) {
    if (value.length !== count) {
      throw new Error("".concat(msg, ": expected ").concat(format(value), " length to be ").concat(count));
    }
  } else {
    throw new Error("assert is not suppert to handle [".concat(type, "] type"));
  }
};

var isZreo = function isZreo(value) {
  var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (value !== 0) {
    throw new Error("".concat(msg, ": expected ").concat(format(value), " to be zreo"));
  }
};

var isPositive = function isPositive(value) {
  var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (value < 0) {
    throw new Error("".concat(msg, ": expected ").concat(format(value), " to be positive number"));
  }
};

var isNegative = function isNegative(value) {
  var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (value > 0) {
    throw new Error("".concat(msg, ": expected ").concat(format(value), " to be negative number"));
  }
};

var _decimal2 = function decimal(value, _decimal) {
  var msg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var d = String(value).split('.')[1].length;

  if (d !== _decimal) {
    throw new Error("".concat(msg, ": expected ").concat(format(value), " decimal to be ").concat(_decimal));
  }
};

var isDigital = function isDigital(value) {
  var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (isNaN(value)) {
    throw new Error("".concat(msg, ": expected ").concat(format(value), " to be digital"));
  }
};

var hasValue = function hasValue(value) {
  var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var type = getType(value);

  if (type === 'string' || type === 'number') {
    if (!value) {
      throw new Error("".concat(msg, ": expected ").concat(format(value), " to have value"));
    }
  } else if (type === 'boolean') {} else {
    if (_lodash.default.isEmpty(value)) {
      throw new Error("".concat(msg, ": expected ").concat(format(value), " to have value"));
    }
  }
};

var isUrl = function isUrl(value) {
  var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var regexpStr = (0, _deline.default)(_templateObject);
  var reg = new RegExp(regexpStr, 'g');

  _chai.assert.match(value, reg, msg);
};

var _matchCount = function _matchCount(value, reg, count) {
  var msg = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var result = value.match(reg);

  if (!result || result.length !== count) {
    throw new Error("".concat(msg, ": expected ").concat(format(value), " match ").concat(reg, " to be ").concat(count, " result"));
  }
};

var isNotEmpty = function isNotEmpty(value) {
  var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var type = getType(value);

  if (type === 'null' || type === 'undefined') {
    _chai.assert.exists(value, msg);
  } else {
    _chai.assert.notEmpty(value, msg);
  }
};

var Assert =
/*#__PURE__*/
function () {
  function Assert(first) {
    _classCallCheck(this, Assert);

    this.first = first;
    this._value = null;
  }

  _createClass(Assert, [{
    key: "execute",
    value: function execute(fun) {
      var argument;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (_lodash.default.isNil(this._value)) {
        this._value = args[0];
        argument = args;
      } else {
        args.unshift(this._value);
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

        case 'typeOfIn':
          {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = argument[1][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _value2 = _step.value;

                try {
                  _chai.assert.typeOf(argument[0], _value2);

                  return this;
                } catch (_unused) {}
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }

            throw new Error("".concat(argument[2] || '', ": expected ").concat(getType(argument[0]), " in [").concat(argument[1], "]"));
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

      if (this.first) {
        var _ref;

        return (_ref = new Assert()).include.apply(_ref, args);
      }

      return this.execute.apply(this, [_chai.assert.deepInclude].concat(args));
    }
  }, {
    key: "gt",
    value: function gt() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      if (this.first) {
        var _ref2;

        return (_ref2 = new Assert()).gt.apply(_ref2, args);
      }

      return this.execute.apply(this, [_chai.assert.isAbove].concat(args));
    }
  }, {
    key: "gte",
    value: function gte() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      if (this.first) {
        var _ref3;

        return (_ref3 = new Assert()).gte.apply(_ref3, args);
      }

      return this.execute.apply(this, [_chai.assert.isAtLeast].concat(args));
    }
  }, {
    key: "lt",
    value: function lt() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      if (this.first) {
        var _ref4;

        return (_ref4 = new Assert()).lt.apply(_ref4, args);
      }

      return this.execute.apply(this, [_chai.assert.isBelow].concat(args));
    }
  }, {
    key: "lte",
    value: function lte() {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      if (this.first) {
        var _ref5;

        return (_ref5 = new Assert()).lte.apply(_ref5, args);
      }

      return this.execute.apply(this, [_chai.assert.isAtMost].concat(args));
    }
  }, {
    key: "true",
    value: function _true() {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      if (this.first) {
        var _ref6;

        return (_ref6 = new Assert()).true.apply(_ref6, args);
      }

      return this.execute.apply(this, [_chai.assert.isTrue].concat(args));
    }
  }, {
    key: "equal",
    value: function equal() {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }

      if (this.first) {
        var _ref7;

        return (_ref7 = new Assert()).equal.apply(_ref7, args);
      }

      return this.execute.apply(this, [_chai.assert.deepEqual].concat(args));
    }
  }, {
    key: "unequal",
    value: function unequal() {
      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }

      if (this.first) {
        var _ref8;

        return (_ref8 = new Assert()).unequal.apply(_ref8, args);
      }

      return this.execute.apply(this, [_chai.assert.notDeepEqual].concat(args));
    }
  }, {
    key: "false",
    value: function _false() {
      for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        args[_key10] = arguments[_key10];
      }

      if (this.first) {
        var _ref9;

        return (_ref9 = new Assert()).false.apply(_ref9, args);
      }

      return this.execute.apply(this, [_chai.assert.isFalse].concat(args));
    }
  }, {
    key: "exists",
    value: function exists() {
      for (var _len11 = arguments.length, args = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
        args[_key11] = arguments[_key11];
      }

      if (this.first) {
        var _ref10;

        return (_ref10 = new Assert()).exists.apply(_ref10, args);
      }

      return this.execute.apply(this, [_chai.assert.exists].concat(args));
    }
  }, {
    key: "notEmpty",
    value: function notEmpty() {
      for (var _len12 = arguments.length, args = new Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
        args[_key12] = arguments[_key12];
      }

      if (this.first) {
        var _ref11;

        return (_ref11 = new Assert()).notEmpty.apply(_ref11, args);
      }

      return this.execute.apply(this, [isNotEmpty].concat(args)); // return this.execute(assert.isNotEmpty, ...args);
    }
  }, {
    key: "function",
    value: function _function() {
      for (var _len13 = arguments.length, args = new Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
        args[_key13] = arguments[_key13];
      }

      if (this.first) {
        var _ref12;

        return (_ref12 = new Assert()).function.apply(_ref12, args);
      }

      return this.execute.apply(this, [_chai.assert.isFunction].concat(args));
    }
  }, {
    key: "object",
    value: function object() {
      for (var _len14 = arguments.length, args = new Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
        args[_key14] = arguments[_key14];
      }

      if (this.first) {
        var _ref13;

        return (_ref13 = new Assert()).object.apply(_ref13, args);
      }

      return this.execute.apply(this, [_chai.assert.isObject].concat(args));
    }
  }, {
    key: "array",
    value: function array() {
      for (var _len15 = arguments.length, args = new Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
        args[_key15] = arguments[_key15];
      }

      if (this.first) {
        var _ref14;

        return (_ref14 = new Assert()).array.apply(_ref14, args);
      }

      return this.execute.apply(this, [_chai.assert.isArray].concat(args));
    }
  }, {
    key: "number",
    value: function number() {
      for (var _len16 = arguments.length, args = new Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {
        args[_key16] = arguments[_key16];
      }

      if (this.first) {
        var _ref15;

        return (_ref15 = new Assert()).number.apply(_ref15, args);
      }

      return this.execute.apply(this, [_chai.assert.isNumber].concat(args));
    }
  }, {
    key: "bool",
    value: function bool() {
      for (var _len17 = arguments.length, args = new Array(_len17), _key17 = 0; _key17 < _len17; _key17++) {
        args[_key17] = arguments[_key17];
      }

      if (this.first) {
        var _ref16;

        return (_ref16 = new Assert()).bool.apply(_ref16, args);
      }

      return this.execute.apply(this, [_chai.assert.isBoolean].concat(args));
    }
  }, {
    key: "null",
    value: function _null() {
      for (var _len18 = arguments.length, args = new Array(_len18), _key18 = 0; _key18 < _len18; _key18++) {
        args[_key18] = arguments[_key18];
      }

      if (this.first) {
        var _ref17;

        return (_ref17 = new Assert()).null.apply(_ref17, args);
      }

      return this.execute.apply(this, [_chai.assert.isNull].concat(args));
    }
  }, {
    key: "string",
    value: function string() {
      for (var _len19 = arguments.length, args = new Array(_len19), _key19 = 0; _key19 < _len19; _key19++) {
        args[_key19] = arguments[_key19];
      }

      if (this.first) {
        var _ref18;

        return (_ref18 = new Assert()).string.apply(_ref18, args);
      }

      return this.execute.apply(this, [_chai.assert.isString].concat(args));
    }
  }, {
    key: "undefined",
    value: function undefined() {
      for (var _len20 = arguments.length, args = new Array(_len20), _key20 = 0; _key20 < _len20; _key20++) {
        args[_key20] = arguments[_key20];
      }

      if (this.first) {
        var _ref19;

        return (_ref19 = new Assert()).undefined.apply(_ref19, args);
      }

      return this.execute.apply(this, [_chai.assert.isUndefined].concat(args));
    }
  }, {
    key: "match",
    value: function match() {
      for (var _len21 = arguments.length, args = new Array(_len21), _key21 = 0; _key21 < _len21; _key21++) {
        args[_key21] = arguments[_key21];
      }

      if (this.first) {
        var _ref20;

        return (_ref20 = new Assert()).match.apply(_ref20, args);
      }

      if (_lodash.default.isNil(this._value)) {
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

      if (this.first) {
        var _ref21;

        return (_ref21 = new Assert()).buffer.apply(_ref21, args);
      }

      return this.execute.apply(this, [isBuffer].concat(args));
    }
  }, {
    key: "date",
    value: function date() {
      for (var _len23 = arguments.length, args = new Array(_len23), _key23 = 0; _key23 < _len23; _key23++) {
        args[_key23] = arguments[_key23];
      }

      if (this.first) {
        var _ref22;

        return (_ref22 = new Assert()).date.apply(_ref22, args);
      }

      if (_lodash.default.isNil(this._value)) {
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

      if (this.first) {
        var _ref23;

        return (_ref23 = new Assert()).regexp.apply(_ref23, args);
      }

      if (_lodash.default.isNil(this._value)) {
        args.splice(1, 0, 'regexp');
      } else {
        args.unshift('regexp');
      }

      return this.execute.apply(this, [_chai.assert.typeOf].concat(args));
    }
  }, {
    key: "integer",
    value: function integer() {
      for (var _len25 = arguments.length, args = new Array(_len25), _key25 = 0; _key25 < _len25; _key25++) {
        args[_key25] = arguments[_key25];
      }

      if (this.first) {
        var _ref24;

        return (_ref24 = new Assert()).integer.apply(_ref24, args);
      }

      return this.execute.apply(this, [isInteger].concat(args));
    }
  }, {
    key: "zreo",
    value: function zreo() {
      for (var _len26 = arguments.length, args = new Array(_len26), _key26 = 0; _key26 < _len26; _key26++) {
        args[_key26] = arguments[_key26];
      }

      if (this.first) {
        var _ref25;

        return (_ref25 = new Assert()).zreo.apply(_ref25, args);
      }

      return this.execute.apply(this, [isZreo].concat(args));
    }
  }, {
    key: "positive",
    value: function positive() {
      for (var _len27 = arguments.length, args = new Array(_len27), _key27 = 0; _key27 < _len27; _key27++) {
        args[_key27] = arguments[_key27];
      }

      if (this.first) {
        var _ref26;

        return (_ref26 = new Assert()).positive.apply(_ref26, args);
      }

      return this.execute.apply(this, [isPositive].concat(args));
    }
  }, {
    key: "negative",
    value: function negative() {
      for (var _len28 = arguments.length, args = new Array(_len28), _key28 = 0; _key28 < _len28; _key28++) {
        args[_key28] = arguments[_key28];
      }

      if (this.first) {
        var _ref27;

        return (_ref27 = new Assert()).negative.apply(_ref27, args);
      }

      return this.execute.apply(this, [isNegative].concat(args));
    }
  }, {
    key: "typein",
    value: function typein() {
      for (var _len29 = arguments.length, args = new Array(_len29), _key29 = 0; _key29 < _len29; _key29++) {
        args[_key29] = arguments[_key29];
      }

      if (this.first) {
        var _ref28;

        return (_ref28 = new Assert()).typein.apply(_ref28, args);
      }

      return this.execute.apply(this, ['typeOfIn'].concat(args));
    }
  }, {
    key: "digital",
    value: function digital() {
      for (var _len30 = arguments.length, args = new Array(_len30), _key30 = 0; _key30 < _len30; _key30++) {
        args[_key30] = arguments[_key30];
      }

      if (this.first) {
        var _ref29;

        return (_ref29 = new Assert()).digital.apply(_ref29, args);
      }

      return this.execute.apply(this, [isDigital].concat(args));
    }
  }, {
    key: "decimal",
    value: function decimal() {
      for (var _len31 = arguments.length, args = new Array(_len31), _key31 = 0; _key31 < _len31; _key31++) {
        args[_key31] = arguments[_key31];
      }

      if (this.first) {
        var _ref30;

        return (_ref30 = new Assert()).decimal.apply(_ref30, args);
      }

      return this.execute.apply(this, [_decimal2].concat(args));
    }
  }, {
    key: "notMatch",
    value: function notMatch() {
      for (var _len32 = arguments.length, args = new Array(_len32), _key32 = 0; _key32 < _len32; _key32++) {
        args[_key32] = arguments[_key32];
      }

      if (this.first) {
        var _ref31;

        return (_ref31 = new Assert()).notMatch.apply(_ref31, args);
      }

      if (_lodash.default.isNil(this._value)) {
        args[1] = getType(args[1]) === 'string' ? new RegExp(args[1], 'g') : args[1];
      } else {
        args[0] = getType(args[0]) === 'string' ? new RegExp(args[0], 'g') : args[0];
      }

      return this.execute.apply(this, [_chai.assert.notMatch].concat(args));
    }
  }, {
    key: "matchCount",
    value: function matchCount() {
      for (var _len33 = arguments.length, args = new Array(_len33), _key33 = 0; _key33 < _len33; _key33++) {
        args[_key33] = arguments[_key33];
      }

      if (this.first) {
        var _ref32;

        return (_ref32 = new Assert()).matchCount.apply(_ref32, args);
      }

      if (_lodash.default.isNil(this._value)) {
        args[1] = getType(args[1]) === 'string' ? new RegExp(args[1], 'g') : args[1];
      } else {
        args[0] = getType(args[0]) === 'string' ? new RegExp(args[0], 'g') : args[0];
      }

      return this.execute.apply(this, [_matchCount].concat(args));
    }
  }, {
    key: "url",
    value: function url() {
      for (var _len34 = arguments.length, args = new Array(_len34), _key34 = 0; _key34 < _len34; _key34++) {
        args[_key34] = arguments[_key34];
      }

      if (this.first) {
        var _ref33;

        return (_ref33 = new Assert()).url.apply(_ref33, args);
      }

      return this.execute.apply(this, [isUrl].concat(args));
    }
  }, {
    key: "value",
    value: function value() {
      for (var _len35 = arguments.length, args = new Array(_len35), _key35 = 0; _key35 < _len35; _key35++) {
        args[_key35] = arguments[_key35];
      }

      if (this.first) {
        var _ref34;

        return (_ref34 = new Assert()).value.apply(_ref34, args);
      }

      return this.execute.apply(this, [hasValue].concat(args));
    }
  }, {
    key: "size",
    value: function size() {
      for (var _len36 = arguments.length, args = new Array(_len36), _key36 = 0; _key36 < _len36; _key36++) {
        args[_key36] = arguments[_key36];
      }

      if (this.first) {
        var _ref35;

        return (_ref35 = new Assert()).size.apply(_ref35, args);
      }

      return this.execute.apply(this, [_size2].concat(args));
    }
  }]);

  return Assert;
}();

var ret = new Assert(true);
var _default = ret;
exports.default = _default;