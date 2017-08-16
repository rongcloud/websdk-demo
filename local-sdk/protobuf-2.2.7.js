(function(b, a) {
    if (typeof define === "function" && define.amd) {
        define(a);
    } else {
        if (typeof require === "function" && typeof module === "object" && module && module.exports) {
            module.exports = a(true);
        } else {
            b.RongIMLib = b.RongIMLib || { RongIMClient: {}};
            b.RongIMLib.RongIMClient["Protobuf"] = a();
        }
    }
})(this, function(b){
    /*
     Copyright 2013 Daniel Wirtz <dcode@dcode.io>
     Copyright 2009 The Closure Library Authors. All Rights Reserved.

     Licensed under the Apache License, Version 2.0 (the "License");
     you may not use this file except in compliance with the License.
     You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

     Unless required by applicable law or agreed to in writing, software
     distributed under the License is distributed on an "AS-IS" BASIS,
     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     See the License for the specific language governing permissions and
     limitations under the License.
     */

    /**
     * @license long.js (c) 2013 Daniel Wirtz <dcode@dcode.io>
     * Released under the Apache License, Version 2.0
     * see: https://github.com/dcodeIO/long.js for details
     * 移除 AMD、CMD 
     */
    var Long = (function() {
        "use strict";

        /**
         * Constructs a 64 bit two's-complement integer, given its low and high 32 bit values as *signed* integers.
         *  See the from* functions below for more convenient ways of constructing Longs.
         * @exports Long
         * @class A Long class for representing a 64 bit two's-complement integer value.
         * @param {number} low The low (signed) 32 bits of the long
         * @param {number} high The high (signed) 32 bits of the long
         * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
         * @constructor
         */
        function Long(low, high, unsigned) {

            /**
             * The low 32 bits as a signed value.
             * @type {number}
             */
            this.low = low | 0;

            /**
             * The high 32 bits as a signed value.
             * @type {number}
             */
            this.high = high | 0;

            /**
             * Whether unsigned or not.
             * @type {boolean}
             */
            this.unsigned = !!unsigned;
        }

        // The internal representation of a long is the two given signed, 32-bit values.
        // We use 32-bit pieces because these are the size of integers on which
        // Javascript performs bit-operations.  For operations like addition and
        // multiplication, we split each number into 16 bit pieces, which can easily be
        // multiplied within Javascript's floating-point representation without overflow
        // or change in sign.
        //
        // In the algorithms below, we frequently reduce the negative case to the
        // positive case by negating the input(s) and then post-processing the result.
        // Note that we must ALWAYS check specially whether those values are MIN_VALUE
        // (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
        // a positive number, it overflows back into a negative).  Not handling this
        // case would often result in infinite recursion.
        //
        // Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the from*
        // methods on which they depend.

        /**
         * An indicator used to reliably determine if an object is a Long or not.
         * @type {boolean}
         * @const
         * @private
         */
        Long.prototype.__isLong__;

        Object.defineProperty(Long.prototype, "__isLong__", {
            value: true,
            enumerable: false,
            configurable: false
        });

        /**
         * @function
         * @param {*} obj Object
         * @returns {boolean}
         * @inner
         */
        function isLong(obj) {
            return (obj && obj["__isLong__"]) === true;
        }

        /**
         * Tests if the specified object is a Long.
         * @function
         * @param {*} obj Object
         * @returns {boolean}
         */
        Long.isLong = isLong;

        /**
         * A cache of the Long representations of small integer values.
         * @type {!Object}
         * @inner
         */
        var INT_CACHE = {};

        /**
         * A cache of the Long representations of small unsigned integer values.
         * @type {!Object}
         * @inner
         */
        var UINT_CACHE = {};

        /**
         * @param {number} value
         * @param {boolean=} unsigned
         * @returns {!Long}
         * @inner
         */
        function fromInt(value, unsigned) {
            var obj, cachedObj, cache;
            if (unsigned) {
                value >>>= 0;
                if (cache = (0 <= value && value < 256)) {
                    cachedObj = UINT_CACHE[value];
                    if (cachedObj)
                        return cachedObj;
                }
                obj = fromBits(value, (value | 0) < 0 ? -1 : 0, true);
                if (cache)
                    UINT_CACHE[value] = obj;
                return obj;
            } else {
                value |= 0;
                if (cache = (-128 <= value && value < 128)) {
                    cachedObj = INT_CACHE[value];
                    if (cachedObj)
                        return cachedObj;
                }
                obj = fromBits(value, value < 0 ? -1 : 0, false);
                if (cache)
                    INT_CACHE[value] = obj;
                return obj;
            }
        }

        /**
         * Returns a Long representing the given 32 bit integer value.
         * @function
         * @param {number} value The 32 bit integer in question
         * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
         * @returns {!Long} The corresponding Long value
         */
        Long.fromInt = fromInt;

        /**
         * @param {number} value
         * @param {boolean=} unsigned
         * @returns {!Long}
         * @inner
         */
        function fromNumber(value, unsigned) {
            if (isNaN(value) || !isFinite(value))
                return unsigned ? UZERO : ZERO;
            if (unsigned) {
                if (value < 0)
                    return UZERO;
                if (value >= TWO_PWR_64_DBL)
                    return MAX_UNSIGNED_VALUE;
            } else {
                if (value <= -TWO_PWR_63_DBL)
                    return MIN_VALUE;
                if (value + 1 >= TWO_PWR_63_DBL)
                    return MAX_VALUE;
            }
            if (value < 0)
                return fromNumber(-value, unsigned).neg();
            return fromBits((value % TWO_PWR_32_DBL) | 0, (value / TWO_PWR_32_DBL) | 0, unsigned);
        }

        /**
         * Returns a Long representing the given value, provided that it is a finite number. Otherwise, zero is returned.
         * @function
         * @param {number} value The number in question
         * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
         * @returns {!Long} The corresponding Long value
         */
        Long.fromNumber = fromNumber;

        /**
         * @param {number} lowBits
         * @param {number} highBits
         * @param {boolean=} unsigned
         * @returns {!Long}
         * @inner
         */
        function fromBits(lowBits, highBits, unsigned) {
            return new Long(lowBits, highBits, unsigned);
        }

        /**
         * Returns a Long representing the 64 bit integer that comes by concatenating the given low and high bits. Each is
         *  assumed to use 32 bits.
         * @function
         * @param {number} lowBits The low 32 bits
         * @param {number} highBits The high 32 bits
         * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
         * @returns {!Long} The corresponding Long value
         */
        Long.fromBits = fromBits;

        /**
         * @function
         * @param {number} base
         * @param {number} exponent
         * @returns {number}
         * @inner
         */
        var pow_dbl = Math.pow; // Used 4 times (4*8 to 15+4)

        /**
         * @param {string} str
         * @param {(boolean|number)=} unsigned
         * @param {number=} radix
         * @returns {!Long}
         * @inner
         */
        function fromString(str, unsigned, radix) {
            if (str.length === 0)
                throw Error('empty string');
            if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
                return ZERO;
            if (typeof unsigned === 'number') {
                // For goog.math.long compatibility
                radix = unsigned,
                unsigned = false;
            } else {
                unsigned = !! unsigned;
            }
            radix = radix || 10;
            if (radix < 2 || 36 < radix)
                throw RangeError('radix');

            var p;
            if ((p = str.indexOf('-')) > 0)
                throw Error('interior hyphen');
            else if (p === 0) {
                return fromString(str.substring(1), unsigned, radix).neg();
            }

            // Do several (8) digits each time through the loop, so as to
            // minimize the calls to the very expensive emulated div.
            var radixToPower = fromNumber(pow_dbl(radix, 8));

            var result = ZERO;
            for (var i = 0; i < str.length; i += 8) {
                var size = Math.min(8, str.length - i),
                    value = parseInt(str.substring(i, i + size), radix);
                if (size < 8) {
                    var power = fromNumber(pow_dbl(radix, size));
                    result = result.mul(power).add(fromNumber(value));
                } else {
                    result = result.mul(radixToPower);
                    result = result.add(fromNumber(value));
                }
            }
            result.unsigned = unsigned;
            return result;
        }

        /**
         * Returns a Long representation of the given string, written using the specified radix.
         * @function
         * @param {string} str The textual representation of the Long
         * @param {(boolean|number)=} unsigned Whether unsigned or not, defaults to `false` for signed
         * @param {number=} radix The radix in which the text is written (2-36), defaults to 10
         * @returns {!Long} The corresponding Long value
         */
        Long.fromString = fromString;

        /**
         * @function
         * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val
         * @returns {!Long}
         * @inner
         */
        function fromValue(val) {
            if (val /* is compatible */ instanceof Long)
                return val;
            if (typeof val === 'number')
                return fromNumber(val);
            if (typeof val === 'string')
                return fromString(val);
            // Throws for non-objects, converts non-instanceof Long:
            return fromBits(val.low, val.high, val.unsigned);
        }

        /**
         * Converts the specified value to a Long.
         * @function
         * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val Value
         * @returns {!Long}
         */
        Long.fromValue = fromValue;

        // NOTE: the compiler should inline these constant values below and then remove these variables, so there should be
        // no runtime penalty for these.

        /**
         * @type {number}
         * @const
         * @inner
         */
        var TWO_PWR_16_DBL = 1 << 16;

        /**
         * @type {number}
         * @const
         * @inner
         */
        var TWO_PWR_24_DBL = 1 << 24;

        /**
         * @type {number}
         * @const
         * @inner
         */
        var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;

        /**
         * @type {number}
         * @const
         * @inner
         */
        var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;

        /**
         * @type {number}
         * @const
         * @inner
         */
        var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;

        /**
         * @type {!Long}
         * @const
         * @inner
         */
        var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);

        /**
         * @type {!Long}
         * @inner
         */
        var ZERO = fromInt(0);

        /**
         * Signed zero.
         * @type {!Long}
         */
        Long.ZERO = ZERO;

        /**
         * @type {!Long}
         * @inner
         */
        var UZERO = fromInt(0, true);

        /**
         * Unsigned zero.
         * @type {!Long}
         */
        Long.UZERO = UZERO;

        /**
         * @type {!Long}
         * @inner
         */
        var ONE = fromInt(1);

        /**
         * Signed one.
         * @type {!Long}
         */
        Long.ONE = ONE;

        /**
         * @type {!Long}
         * @inner
         */
        var UONE = fromInt(1, true);

        /**
         * Unsigned one.
         * @type {!Long}
         */
        Long.UONE = UONE;

        /**
         * @type {!Long}
         * @inner
         */
        var NEG_ONE = fromInt(-1);

        /**
         * Signed negative one.
         * @type {!Long}
         */
        Long.NEG_ONE = NEG_ONE;

        /**
         * @type {!Long}
         * @inner
         */
        var MAX_VALUE = fromBits(0xFFFFFFFF|0, 0x7FFFFFFF|0, false);

        /**
         * Maximum signed value.
         * @type {!Long}
         */
        Long.MAX_VALUE = MAX_VALUE;

        /**
         * @type {!Long}
         * @inner
         */
        var MAX_UNSIGNED_VALUE = fromBits(0xFFFFFFFF|0, 0xFFFFFFFF|0, true);

        /**
         * Maximum unsigned value.
         * @type {!Long}
         */
        Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;

        /**
         * @type {!Long}
         * @inner
         */
        var MIN_VALUE = fromBits(0, 0x80000000|0, false);

        /**
         * Minimum signed value.
         * @type {!Long}
         */
        Long.MIN_VALUE = MIN_VALUE;

        /**
         * @alias Long.prototype
         * @inner
         */
        var LongPrototype = Long.prototype;

        /**
         * Converts the Long to a 32 bit integer, assuming it is a 32 bit integer.
         * @returns {number}
         */
        LongPrototype.toInt = function toInt() {
            return this.unsigned ? this.low >>> 0 : this.low;
        };

        /**
         * Converts the Long to a the nearest floating-point representation of this value (double, 53 bit mantissa).
         * @returns {number}
         */
        LongPrototype.toNumber = function toNumber() {
            if (this.unsigned)
                return ((this.high >>> 0) * TWO_PWR_32_DBL) + (this.low >>> 0);
            return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
        };

        /**
         * Converts the Long to a string written in the specified radix.
         * @param {number=} radix Radix (2-36), defaults to 10
         * @returns {string}
         * @override
         * @throws {RangeError} If `radix` is out of range
         */
        LongPrototype.toString = function toString(radix) {
            radix = radix || 10;
            if (radix < 2 || 36 < radix)
                throw RangeError('radix');
            if (this.isZero())
                return '0';
            if (this.isNegative()) { // Unsigned Longs are never negative
                if (this.eq(MIN_VALUE)) {
                    // We need to change the Long value before it can be negated, so we remove
                    // the bottom-most digit in this base and then recurse to do the rest.
                    var radixLong = fromNumber(radix),
                        div = this.div(radixLong),
                        rem1 = div.mul(radixLong).sub(this);
                    return div.toString(radix) + rem1.toInt().toString(radix);
                } else
                    return '-' + this.neg().toString(radix);
            }

            // Do several (6) digits each time through the loop, so as to
            // minimize the calls to the very expensive emulated div.
            var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned),
                rem = this;
            var result = '';
            while (true) {
                var remDiv = rem.div(radixToPower),
                    intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0,
                    digits = intval.toString(radix);
                rem = remDiv;
                if (rem.isZero())
                    return digits + result;
                else {
                    while (digits.length < 6)
                        digits = '0' + digits;
                    result = '' + digits + result;
                }
            }
        };

        /**
         * Gets the high 32 bits as a signed integer.
         * @returns {number} Signed high bits
         */
        LongPrototype.getHighBits = function getHighBits() {
            return this.high;
        };

        /**
         * Gets the high 32 bits as an unsigned integer.
         * @returns {number} Unsigned high bits
         */
        LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
            return this.high >>> 0;
        };

        /**
         * Gets the low 32 bits as a signed integer.
         * @returns {number} Signed low bits
         */
        LongPrototype.getLowBits = function getLowBits() {
            return this.low;
        };

        /**
         * Gets the low 32 bits as an unsigned integer.
         * @returns {number} Unsigned low bits
         */
        LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
            return this.low >>> 0;
        };

        /**
         * Gets the number of bits needed to represent the absolute value of this Long.
         * @returns {number}
         */
        LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
            if (this.isNegative()) // Unsigned Longs are never negative
                return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
            var val = this.high != 0 ? this.high : this.low;
            for (var bit = 31; bit > 0; bit--)
                if ((val & (1 << bit)) != 0)
                    break;
            return this.high != 0 ? bit + 33 : bit + 1;
        };

        /**
         * Tests if this Long's value equals zero.
         * @returns {boolean}
         */
        LongPrototype.isZero = function isZero() {
            return this.high === 0 && this.low === 0;
        };

        /**
         * Tests if this Long's value is negative.
         * @returns {boolean}
         */
        LongPrototype.isNegative = function isNegative() {
            return !this.unsigned && this.high < 0;
        };

        /**
         * Tests if this Long's value is positive.
         * @returns {boolean}
         */
        LongPrototype.isPositive = function isPositive() {
            return this.unsigned || this.high >= 0;
        };

        /**
         * Tests if this Long's value is odd.
         * @returns {boolean}
         */
        LongPrototype.isOdd = function isOdd() {
            return (this.low & 1) === 1;
        };

        /**
         * Tests if this Long's value is even.
         * @returns {boolean}
         */
        LongPrototype.isEven = function isEven() {
            return (this.low & 1) === 0;
        };

        /**
         * Tests if this Long's value equals the specified's.
         * @param {!Long|number|string} other Other value
         * @returns {boolean}
         */
        LongPrototype.equals = function equals(other) {
            if (!isLong(other))
                other = fromValue(other);
            if (this.unsigned !== other.unsigned && (this.high >>> 31) === 1 && (other.high >>> 31) === 1)
                return false;
            return this.high === other.high && this.low === other.low;
        };

        /**
         * Tests if this Long's value equals the specified's. This is an alias of {@link Long#equals}.
         * @function
         * @param {!Long|number|string} other Other value
         * @returns {boolean}
         */
        LongPrototype.eq = LongPrototype.equals;

        /**
         * Tests if this Long's value differs from the specified's.
         * @param {!Long|number|string} other Other value
         * @returns {boolean}
         */
        LongPrototype.notEquals = function notEquals(other) {
            return !this.eq(/* validates */ other);
        };

        /**
         * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
         * @function
         * @param {!Long|number|string} other Other value
         * @returns {boolean}
         */
        LongPrototype.neq = LongPrototype.notEquals;

        /**
         * Tests if this Long's value is less than the specified's.
         * @param {!Long|number|string} other Other value
         * @returns {boolean}
         */
        LongPrototype.lessThan = function lessThan(other) {
            return this.comp(/* validates */ other) < 0;
        };

        /**
         * Tests if this Long's value is less than the specified's. This is an alias of {@link Long#lessThan}.
         * @function
         * @param {!Long|number|string} other Other value
         * @returns {boolean}
         */
        LongPrototype.lt = LongPrototype.lessThan;

        /**
         * Tests if this Long's value is less than or equal the specified's.
         * @param {!Long|number|string} other Other value
         * @returns {boolean}
         */
        LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
            return this.comp(/* validates */ other) <= 0;
        };

        /**
         * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
         * @function
         * @param {!Long|number|string} other Other value
         * @returns {boolean}
         */
        LongPrototype.lte = LongPrototype.lessThanOrEqual;

        /**
         * Tests if this Long's value is greater than the specified's.
         * @param {!Long|number|string} other Other value
         * @returns {boolean}
         */
        LongPrototype.greaterThan = function greaterThan(other) {
            return this.comp(/* validates */ other) > 0;
        };

        /**
         * Tests if this Long's value is greater than the specified's. This is an alias of {@link Long#greaterThan}.
         * @function
         * @param {!Long|number|string} other Other value
         * @returns {boolean}
         */
        LongPrototype.gt = LongPrototype.greaterThan;

        /**
         * Tests if this Long's value is greater than or equal the specified's.
         * @param {!Long|number|string} other Other value
         * @returns {boolean}
         */
        LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
            return this.comp(/* validates */ other) >= 0;
        };

        /**
         * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
         * @function
         * @param {!Long|number|string} other Other value
         * @returns {boolean}
         */
        LongPrototype.gte = LongPrototype.greaterThanOrEqual;

        /**
         * Compares this Long's value with the specified's.
         * @param {!Long|number|string} other Other value
         * @returns {number} 0 if they are the same, 1 if the this is greater and -1
         *  if the given one is greater
         */
        LongPrototype.compare = function compare(other) {
            if (!isLong(other))
                other = fromValue(other);
            if (this.eq(other))
                return 0;
            var thisNeg = this.isNegative(),
                otherNeg = other.isNegative();
            if (thisNeg && !otherNeg)
                return -1;
            if (!thisNeg && otherNeg)
                return 1;
            // At this point the sign bits are the same
            if (!this.unsigned)
                return this.sub(other).isNegative() ? -1 : 1;
            // Both are positive if at least one is unsigned
            return (other.high >>> 0) > (this.high >>> 0) || (other.high === this.high && (other.low >>> 0) > (this.low >>> 0)) ? -1 : 1;
        };

        /**
         * Compares this Long's value with the specified's. This is an alias of {@link Long#compare}.
         * @function
         * @param {!Long|number|string} other Other value
         * @returns {number} 0 if they are the same, 1 if the this is greater and -1
         *  if the given one is greater
         */
        LongPrototype.comp = LongPrototype.compare;

        /**
         * Negates this Long's value.
         * @returns {!Long} Negated Long
         */
        LongPrototype.negate = function negate() {
            if (!this.unsigned && this.eq(MIN_VALUE))
                return MIN_VALUE;
            return this.not().add(ONE);
        };

        /**
         * Negates this Long's value. This is an alias of {@link Long#negate}.
         * @function
         * @returns {!Long} Negated Long
         */
        LongPrototype.neg = LongPrototype.negate;

        /**
         * Returns the sum of this and the specified Long.
         * @param {!Long|number|string} addend Addend
         * @returns {!Long} Sum
         */
        LongPrototype.add = function add(addend) {
            if (!isLong(addend))
                addend = fromValue(addend);

            // Divide each number into 4 chunks of 16 bits, and then sum the chunks.

            var a48 = this.high >>> 16;
            var a32 = this.high & 0xFFFF;
            var a16 = this.low >>> 16;
            var a00 = this.low & 0xFFFF;

            var b48 = addend.high >>> 16;
            var b32 = addend.high & 0xFFFF;
            var b16 = addend.low >>> 16;
            var b00 = addend.low & 0xFFFF;

            var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
            c00 += a00 + b00;
            c16 += c00 >>> 16;
            c00 &= 0xFFFF;
            c16 += a16 + b16;
            c32 += c16 >>> 16;
            c16 &= 0xFFFF;
            c32 += a32 + b32;
            c48 += c32 >>> 16;
            c32 &= 0xFFFF;
            c48 += a48 + b48;
            c48 &= 0xFFFF;
            return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
        };

        /**
         * Returns the difference of this and the specified Long.
         * @param {!Long|number|string} subtrahend Subtrahend
         * @returns {!Long} Difference
         */
        LongPrototype.subtract = function subtract(subtrahend) {
            if (!isLong(subtrahend))
                subtrahend = fromValue(subtrahend);
            return this.add(subtrahend.neg());
        };

        /**
         * Returns the difference of this and the specified Long. This is an alias of {@link Long#subtract}.
         * @function
         * @param {!Long|number|string} subtrahend Subtrahend
         * @returns {!Long} Difference
         */
        LongPrototype.sub = LongPrototype.subtract;

        /**
         * Returns the product of this and the specified Long.
         * @param {!Long|number|string} multiplier Multiplier
         * @returns {!Long} Product
         */
        LongPrototype.multiply = function multiply(multiplier) {
            if (this.isZero())
                return ZERO;
            if (!isLong(multiplier))
                multiplier = fromValue(multiplier);
            if (multiplier.isZero())
                return ZERO;
            if (this.eq(MIN_VALUE))
                return multiplier.isOdd() ? MIN_VALUE : ZERO;
            if (multiplier.eq(MIN_VALUE))
                return this.isOdd() ? MIN_VALUE : ZERO;

            if (this.isNegative()) {
                if (multiplier.isNegative())
                    return this.neg().mul(multiplier.neg());
                else
                    return this.neg().mul(multiplier).neg();
            } else if (multiplier.isNegative())
                return this.mul(multiplier.neg()).neg();

            // If both longs are small, use float multiplication
            if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24))
                return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);

            // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
            // We can skip products that would overflow.

            var a48 = this.high >>> 16;
            var a32 = this.high & 0xFFFF;
            var a16 = this.low >>> 16;
            var a00 = this.low & 0xFFFF;

            var b48 = multiplier.high >>> 16;
            var b32 = multiplier.high & 0xFFFF;
            var b16 = multiplier.low >>> 16;
            var b00 = multiplier.low & 0xFFFF;

            var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
            c00 += a00 * b00;
            c16 += c00 >>> 16;
            c00 &= 0xFFFF;
            c16 += a16 * b00;
            c32 += c16 >>> 16;
            c16 &= 0xFFFF;
            c16 += a00 * b16;
            c32 += c16 >>> 16;
            c16 &= 0xFFFF;
            c32 += a32 * b00;
            c48 += c32 >>> 16;
            c32 &= 0xFFFF;
            c32 += a16 * b16;
            c48 += c32 >>> 16;
            c32 &= 0xFFFF;
            c32 += a00 * b32;
            c48 += c32 >>> 16;
            c32 &= 0xFFFF;
            c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
            c48 &= 0xFFFF;
            return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
        };

        /**
         * Returns the product of this and the specified Long. This is an alias of {@link Long#multiply}.
         * @function
         * @param {!Long|number|string} multiplier Multiplier
         * @returns {!Long} Product
         */
        LongPrototype.mul = LongPrototype.multiply;

        /**
         * Returns this Long divided by the specified. The result is signed if this Long is signed or
         *  unsigned if this Long is unsigned.
         * @param {!Long|number|string} divisor Divisor
         * @returns {!Long} Quotient
         */
        LongPrototype.divide = function divide(divisor) {
            if (!isLong(divisor))
                divisor = fromValue(divisor);
            if (divisor.isZero())
                throw Error('division by zero');
            if (this.isZero())
                return this.unsigned ? UZERO : ZERO;
            var approx, rem, res;
            if (!this.unsigned) {
                // This section is only relevant for signed longs and is derived from the
                // closure library as a whole.
                if (this.eq(MIN_VALUE)) {
                    if (divisor.eq(ONE) || divisor.eq(NEG_ONE))
                        return MIN_VALUE;  // recall that -MIN_VALUE == MIN_VALUE
                    else if (divisor.eq(MIN_VALUE))
                        return ONE;
                    else {
                        // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
                        var halfThis = this.shr(1);
                        approx = halfThis.div(divisor).shl(1);
                        if (approx.eq(ZERO)) {
                            return divisor.isNegative() ? ONE : NEG_ONE;
                        } else {
                            rem = this.sub(divisor.mul(approx));
                            res = approx.add(rem.div(divisor));
                            return res;
                        }
                    }
                } else if (divisor.eq(MIN_VALUE))
                    return this.unsigned ? UZERO : ZERO;
                if (this.isNegative()) {
                    if (divisor.isNegative())
                        return this.neg().div(divisor.neg());
                    return this.neg().div(divisor).neg();
                } else if (divisor.isNegative())
                    return this.div(divisor.neg()).neg();
                res = ZERO;
            } else {
                // The algorithm below has not been made for unsigned longs. It's therefore
                // required to take special care of the MSB prior to running it.
                if (!divisor.unsigned)
                    divisor = divisor.toUnsigned();
                if (divisor.gt(this))
                    return UZERO;
                if (divisor.gt(this.shru(1))) // 15 >>> 1 = 7 ; with divisor = 8 ; true
                    return UONE;
                res = UZERO;
            }

            // Repeat the following until the remainder is less than other:  find a
            // floating-point that approximates remainder / other *from below*, add this
            // into the result, and subtract it from the remainder.  It is critical that
            // the approximate value is less than or equal to the real value so that the
            // remainder never becomes negative.
            rem = this;
            while (rem.gte(divisor)) {
                // Approximate the result of division. This may be a little greater or
                // smaller than the actual value.
                approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));

                // We will tweak the approximate result by changing it in the 48-th digit or
                // the smallest non-fractional digit, whichever is larger.
                var log2 = Math.ceil(Math.log(approx) / Math.LN2),
                    delta = (log2 <= 48) ? 1 : pow_dbl(2, log2 - 48),

                // Decrease the approximation until it is smaller than the remainder.  Note
                // that if it is too large, the product overflows and is negative.
                    approxRes = fromNumber(approx),
                    approxRem = approxRes.mul(divisor);
                while (approxRem.isNegative() || approxRem.gt(rem)) {
                    approx -= delta;
                    approxRes = fromNumber(approx, this.unsigned);
                    approxRem = approxRes.mul(divisor);
                }

                // We know the answer can't be zero... and actually, zero would cause
                // infinite recursion since we would make no progress.
                if (approxRes.isZero())
                    approxRes = ONE;

                res = res.add(approxRes);
                rem = rem.sub(approxRem);
            }
            return res;
        };

        /**
         * Returns this Long divided by the specified. This is an alias of {@link Long#divide}.
         * @function
         * @param {!Long|number|string} divisor Divisor
         * @returns {!Long} Quotient
         */
        LongPrototype.div = LongPrototype.divide;

        /**
         * Returns this Long modulo the specified.
         * @param {!Long|number|string} divisor Divisor
         * @returns {!Long} Remainder
         */
        LongPrototype.modulo = function modulo(divisor) {
            if (!isLong(divisor))
                divisor = fromValue(divisor);
            return this.sub(this.div(divisor).mul(divisor));
        };

        /**
         * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
         * @function
         * @param {!Long|number|string} divisor Divisor
         * @returns {!Long} Remainder
         */
        LongPrototype.mod = LongPrototype.modulo;

        /**
         * Returns the bitwise NOT of this Long.
         * @returns {!Long}
         */
        LongPrototype.not = function not() {
            return fromBits(~this.low, ~this.high, this.unsigned);
        };

        /**
         * Returns the bitwise AND of this Long and the specified.
         * @param {!Long|number|string} other Other Long
         * @returns {!Long}
         */
        LongPrototype.and = function and(other) {
            if (!isLong(other))
                other = fromValue(other);
            return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
        };

        /**
         * Returns the bitwise OR of this Long and the specified.
         * @param {!Long|number|string} other Other Long
         * @returns {!Long}
         */
        LongPrototype.or = function or(other) {
            if (!isLong(other))
                other = fromValue(other);
            return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
        };

        /**
         * Returns the bitwise XOR of this Long and the given one.
         * @param {!Long|number|string} other Other Long
         * @returns {!Long}
         */
        LongPrototype.xor = function xor(other) {
            if (!isLong(other))
                other = fromValue(other);
            return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
        };

        /**
         * Returns this Long with bits shifted to the left by the given amount.
         * @param {number|!Long} numBits Number of bits
         * @returns {!Long} Shifted Long
         */
        LongPrototype.shiftLeft = function shiftLeft(numBits) {
            if (isLong(numBits))
                numBits = numBits.toInt();
            if ((numBits &= 63) === 0)
                return this;
            else if (numBits < 32)
                return fromBits(this.low << numBits, (this.high << numBits) | (this.low >>> (32 - numBits)), this.unsigned);
            else
                return fromBits(0, this.low << (numBits - 32), this.unsigned);
        };

        /**
         * Returns this Long with bits shifted to the left by the given amount. This is an alias of {@link Long#shiftLeft}.
         * @function
         * @param {number|!Long} numBits Number of bits
         * @returns {!Long} Shifted Long
         */
        LongPrototype.shl = LongPrototype.shiftLeft;

        /**
         * Returns this Long with bits arithmetically shifted to the right by the given amount.
         * @param {number|!Long} numBits Number of bits
         * @returns {!Long} Shifted Long
         */
        LongPrototype.shiftRight = function shiftRight(numBits) {
            if (isLong(numBits))
                numBits = numBits.toInt();
            if ((numBits &= 63) === 0)
                return this;
            else if (numBits < 32)
                return fromBits((this.low >>> numBits) | (this.high << (32 - numBits)), this.high >> numBits, this.unsigned);
            else
                return fromBits(this.high >> (numBits - 32), this.high >= 0 ? 0 : -1, this.unsigned);
        };

        /**
         * Returns this Long with bits arithmetically shifted to the right by the given amount. This is an alias of {@link Long#shiftRight}.
         * @function
         * @param {number|!Long} numBits Number of bits
         * @returns {!Long} Shifted Long
         */
        LongPrototype.shr = LongPrototype.shiftRight;

        /**
         * Returns this Long with bits logically shifted to the right by the given amount.
         * @param {number|!Long} numBits Number of bits
         * @returns {!Long} Shifted Long
         */
        LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
            if (isLong(numBits))
                numBits = numBits.toInt();
            numBits &= 63;
            if (numBits === 0)
                return this;
            else {
                var high = this.high;
                if (numBits < 32) {
                    var low = this.low;
                    return fromBits((low >>> numBits) | (high << (32 - numBits)), high >>> numBits, this.unsigned);
                } else if (numBits === 32)
                    return fromBits(high, 0, this.unsigned);
                else
                    return fromBits(high >>> (numBits - 32), 0, this.unsigned);
            }
        };

        /**
         * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
         * @function
         * @param {number|!Long} numBits Number of bits
         * @returns {!Long} Shifted Long
         */
        LongPrototype.shru = LongPrototype.shiftRightUnsigned;

        /**
         * Converts this Long to signed.
         * @returns {!Long} Signed long
         */
        LongPrototype.toSigned = function toSigned() {
            if (!this.unsigned)
                return this;
            return fromBits(this.low, this.high, false);
        };

        /**
         * Converts this Long to unsigned.
         * @returns {!Long} Unsigned long
         */
        LongPrototype.toUnsigned = function toUnsigned() {
            if (this.unsigned)
                return this;
            return fromBits(this.low, this.high, true);
        };

        /**
         * Converts this Long to its byte representation.
         * @param {boolean=} le Whether little or big endian, defaults to big endian
         * @returns {!Array.<number>} Byte representation
         */
        LongPrototype.toBytes = function(le) {
            return le ? this.toBytesLE() : this.toBytesBE();
        }

        /**
         * Converts this Long to its little endian byte representation.
         * @returns {!Array.<number>} Little endian byte representation
         */
        LongPrototype.toBytesLE = function() {
            var hi = this.high,
                lo = this.low;
            return [
                 lo         & 0xff,
                (lo >>>  8) & 0xff,
                (lo >>> 16) & 0xff,
                (lo >>> 24) & 0xff,
                 hi         & 0xff,
                (hi >>>  8) & 0xff,
                (hi >>> 16) & 0xff,
                (hi >>> 24) & 0xff
            ];
        }

        /**
         * Converts this Long to its big endian byte representation.
         * @returns {!Array.<number>} Big endian byte representation
         */
        LongPrototype.toBytesBE = function() {
            var hi = this.high,
                lo = this.low;
            return [
                (hi >>> 24) & 0xff,
                (hi >>> 16) & 0xff,
                (hi >>>  8) & 0xff,
                 hi         & 0xff,
                (lo >>> 24) & 0xff,
                (lo >>> 16) & 0xff,
                (lo >>>  8) & 0xff,
                 lo         & 0xff
            ];
        }

        return Long;
    })();
    /**
     * @license bytebuffer.js (c) 2015 Daniel Wirtz <dcode@dcode.io>
     * Backing buffer: ArrayBuffer, Accessor: Uint8Array
     * Released under the Apache License, Version 2.0
     * see: https://github.com/dcodeIO/bytebuffer.js for details
     * 移除 AMD、CMD 
     */
    var ByteBuffer = (function(Long) {
        "use strict";

        /**
         * Constructs a new ByteBuffer.
         * @class The swiss army knife for binary data in JavaScript.
         * @exports ByteBuffer
         * @constructor
         * @param {number=} capacity Initial capacity. Defaults to {@link ByteBuffer.DEFAULT_CAPACITY}.
         * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
         *  {@link ByteBuffer.DEFAULT_ENDIAN}.
         * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
         *  {@link ByteBuffer.DEFAULT_NOASSERT}.
         * @expose
         */
        var ByteBuffer = function(capacity, littleEndian, noAssert) {
            if (typeof capacity === 'undefined')
                capacity = ByteBuffer.DEFAULT_CAPACITY;
            if (typeof littleEndian === 'undefined')
                littleEndian = ByteBuffer.DEFAULT_ENDIAN;
            if (typeof noAssert === 'undefined')
                noAssert = ByteBuffer.DEFAULT_NOASSERT;
            if (!noAssert) {
                capacity = capacity | 0;
                if (capacity < 0)
                    throw RangeError("Illegal capacity");
                littleEndian = !!littleEndian;
                noAssert = !!noAssert;
            }

            /**
             * Backing ArrayBuffer.
             * @type {!ArrayBuffer}
             * @expose
             */
            this.buffer = capacity === 0 ? EMPTY_BUFFER : new ArrayBuffer(capacity);

            /**
             * Uint8Array utilized to manipulate the backing buffer. Becomes `null` if the backing buffer has a capacity of `0`.
             * @type {?Uint8Array}
             * @expose
             */
            this.view = capacity === 0 ? null : new Uint8Array(this.buffer);

            /**
             * Absolute read/write offset.
             * @type {number}
             * @expose
             * @see ByteBuffer#flip
             * @see ByteBuffer#clear
             */
            this.offset = 0;

            /**
             * Marked offset.
             * @type {number}
             * @expose
             * @see ByteBuffer#mark
             * @see ByteBuffer#reset
             */
            this.markedOffset = -1;

            /**
             * Absolute limit of the contained data. Set to the backing buffer's capacity upon allocation.
             * @type {number}
             * @expose
             * @see ByteBuffer#flip
             * @see ByteBuffer#clear
             */
            this.limit = capacity;

            /**
             * Whether to use little endian byte order, defaults to `false` for big endian.
             * @type {boolean}
             * @expose
             */
            this.littleEndian = littleEndian;

            /**
             * Whether to skip assertions of offsets and values, defaults to `false`.
             * @type {boolean}
             * @expose
             */
            this.noAssert = noAssert;
        };

        /**
         * ByteBuffer version.
         * @type {string}
         * @const
         * @expose
         */
        ByteBuffer.VERSION = "5.0.1";

        /**
         * Little endian constant that can be used instead of its boolean value. Evaluates to `true`.
         * @type {boolean}
         * @const
         * @expose
         */
        ByteBuffer.LITTLE_ENDIAN = true;

        /**
         * Big endian constant that can be used instead of its boolean value. Evaluates to `false`.
         * @type {boolean}
         * @const
         * @expose
         */
        ByteBuffer.BIG_ENDIAN = false;

        /**
         * Default initial capacity of `16`.
         * @type {number}
         * @expose
         */
        ByteBuffer.DEFAULT_CAPACITY = 16;

        /**
         * Default endianess of `false` for big endian.
         * @type {boolean}
         * @expose
         */
        ByteBuffer.DEFAULT_ENDIAN = ByteBuffer.BIG_ENDIAN;

        /**
         * Default no assertions flag of `false`.
         * @type {boolean}
         * @expose
         */
        ByteBuffer.DEFAULT_NOASSERT = false;

        /**
         * A `Long` class for representing a 64-bit two's-complement integer value. May be `null` if Long.js has not been loaded
         *  and int64 support is not available.
         * @type {?Long}
         * @const
         * @see https://github.com/dcodeIO/long.js
         * @expose
         */
        ByteBuffer.Long = Long || null;

        /**
         * @alias ByteBuffer.prototype
         * @inner
         */
        var ByteBufferPrototype = ByteBuffer.prototype;

        /**
         * An indicator used to reliably determine if an object is a ByteBuffer or not.
         * @type {boolean}
         * @const
         * @expose
         * @private
         */
        ByteBufferPrototype.__isByteBuffer__;

        Object.defineProperty(ByteBufferPrototype, "__isByteBuffer__", {
            value: true,
            enumerable: false,
            configurable: false
        });

        // helpers

        /**
         * @type {!ArrayBuffer}
         * @inner
         */
        var EMPTY_BUFFER = new ArrayBuffer(0);

        /**
         * String.fromCharCode reference for compile-time renaming.
         * @type {function(...number):string}
         * @inner
         */
        var stringFromCharCode = String.fromCharCode;

        /**
         * Creates a source function for a string.
         * @param {string} s String to read from
         * @returns {function():number|null} Source function returning the next char code respectively `null` if there are
         *  no more characters left.
         * @throws {TypeError} If the argument is invalid
         * @inner
         */
        function stringSource(s) {
            var i=0; return function() {
                return i < s.length ? s.charCodeAt(i++) : null;
            };
        }

        /**
         * Creates a destination function for a string.
         * @returns {function(number=):undefined|string} Destination function successively called with the next char code.
         *  Returns the final string when called without arguments.
         * @inner
         */
        function stringDestination() {
            var cs = [], ps = []; return function() {
                if (arguments.length === 0)
                    return ps.join('')+stringFromCharCode.apply(String, cs);
                if (cs.length + arguments.length > 1024)
                    ps.push(stringFromCharCode.apply(String, cs)),
                        cs.length = 0;
                Array.prototype.push.apply(cs, arguments);
            };
        }

        /**
         * Gets the accessor type.
         * @returns {Function} `Buffer` under node.js, `Uint8Array` respectively `DataView` in the browser (classes)
         * @expose
         */
        ByteBuffer.accessor = function() {
            return Uint8Array;
        };
        /**
         * Allocates a new ByteBuffer backed by a buffer of the specified capacity.
         * @param {number=} capacity Initial capacity. Defaults to {@link ByteBuffer.DEFAULT_CAPACITY}.
         * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
         *  {@link ByteBuffer.DEFAULT_ENDIAN}.
         * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
         *  {@link ByteBuffer.DEFAULT_NOASSERT}.
         * @returns {!ByteBuffer}
         * @expose
         */
        ByteBuffer.allocate = function(capacity, littleEndian, noAssert) {
            return new ByteBuffer(capacity, littleEndian, noAssert);
        };

        /**
         * Concatenates multiple ByteBuffers into one.
         * @param {!Array.<!ByteBuffer|!ArrayBuffer|!Uint8Array|string>} buffers Buffers to concatenate
         * @param {(string|boolean)=} encoding String encoding if `buffers` contains a string ("base64", "hex", "binary",
         *  defaults to "utf8")
         * @param {boolean=} littleEndian Whether to use little or big endian byte order for the resulting ByteBuffer. Defaults
         *  to {@link ByteBuffer.DEFAULT_ENDIAN}.
         * @param {boolean=} noAssert Whether to skip assertions of offsets and values for the resulting ByteBuffer. Defaults to
         *  {@link ByteBuffer.DEFAULT_NOASSERT}.
         * @returns {!ByteBuffer} Concatenated ByteBuffer
         * @expose
         */
        ByteBuffer.concat = function(buffers, encoding, littleEndian, noAssert) {
            if (typeof encoding === 'boolean' || typeof encoding !== 'string') {
                noAssert = littleEndian;
                littleEndian = encoding;
                encoding = undefined;
            }
            var capacity = 0;
            for (var i=0, k=buffers.length, length; i<k; ++i) {
                if (!ByteBuffer.isByteBuffer(buffers[i]))
                    buffers[i] = ByteBuffer.wrap(buffers[i], encoding);
                length = buffers[i].limit - buffers[i].offset;
                if (length > 0) capacity += length;
            }
            if (capacity === 0)
                return new ByteBuffer(0, littleEndian, noAssert);
            var bb = new ByteBuffer(capacity, littleEndian, noAssert),
                bi;
            i=0; while (i<k) {
                bi = buffers[i++];
                length = bi.limit - bi.offset;
                if (length <= 0) continue;
                bb.view.set(bi.view.subarray(bi.offset, bi.limit), bb.offset);
                bb.offset += length;
            }
            bb.limit = bb.offset;
            bb.offset = 0;
            return bb;
        };

        /**
         * Tests if the specified type is a ByteBuffer.
         * @param {*} bb ByteBuffer to test
         * @returns {boolean} `true` if it is a ByteBuffer, otherwise `false`
         * @expose
         */
        ByteBuffer.isByteBuffer = function(bb) {
            return (bb && bb["__isByteBuffer__"]) === true;
        };
        /**
         * Gets the backing buffer type.
         * @returns {Function} `Buffer` under node.js, `ArrayBuffer` in the browser (classes)
         * @expose
         */
        ByteBuffer.type = function() {
            return ArrayBuffer;
        };
        /**
         * Wraps a buffer or a string. Sets the allocated ByteBuffer's {@link ByteBuffer#offset} to `0` and its
         *  {@link ByteBuffer#limit} to the length of the wrapped data.
         * @param {!ByteBuffer|!ArrayBuffer|!Uint8Array|string|!Array.<number>} buffer Anything that can be wrapped
         * @param {(string|boolean)=} encoding String encoding if `buffer` is a string ("base64", "hex", "binary", defaults to
         *  "utf8")
         * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
         *  {@link ByteBuffer.DEFAULT_ENDIAN}.
         * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
         *  {@link ByteBuffer.DEFAULT_NOASSERT}.
         * @returns {!ByteBuffer} A ByteBuffer wrapping `buffer`
         * @expose
         */
        ByteBuffer.wrap = function(buffer, encoding, littleEndian, noAssert) {
            if (typeof encoding !== 'string') {
                noAssert = littleEndian;
                littleEndian = encoding;
                encoding = undefined;
            }
            if (typeof buffer === 'string') {
                if (typeof encoding === 'undefined')
                    encoding = "utf8";
                switch (encoding) {
                    case "base64":
                        return ByteBuffer.fromBase64(buffer, littleEndian);
                    case "hex":
                        return ByteBuffer.fromHex(buffer, littleEndian);
                    case "binary":
                        return ByteBuffer.fromBinary(buffer, littleEndian);
                    case "utf8":
                        return ByteBuffer.fromUTF8(buffer, littleEndian);
                    case "debug":
                        return ByteBuffer.fromDebug(buffer, littleEndian);
                    default:
                        throw Error("Unsupported encoding: "+encoding);
                }
            }
            if (buffer === null || typeof buffer !== 'object')
                throw TypeError("Illegal buffer");
            var bb;
            if (ByteBuffer.isByteBuffer(buffer)) {
                bb = ByteBufferPrototype.clone.call(buffer);
                bb.markedOffset = -1;
                return bb;
            }
            if (buffer instanceof Uint8Array) { // Extract ArrayBuffer from Uint8Array
                bb = new ByteBuffer(0, littleEndian, noAssert);
                if (buffer.length > 0) { // Avoid references to more than one EMPTY_BUFFER
                    bb.buffer = buffer.buffer;
                    bb.offset = buffer.byteOffset;
                    bb.limit = buffer.byteOffset + buffer.byteLength;
                    bb.view = new Uint8Array(buffer.buffer);
                }
            } else if (buffer instanceof ArrayBuffer) { // Reuse ArrayBuffer
                bb = new ByteBuffer(0, littleEndian, noAssert);
                if (buffer.byteLength > 0) {
                    bb.buffer = buffer;
                    bb.offset = 0;
                    bb.limit = buffer.byteLength;
                    bb.view = buffer.byteLength > 0 ? new Uint8Array(buffer) : null;
                }
            } else if (Object.prototype.toString.call(buffer) === "[object Array]") { // Create from octets
                bb = new ByteBuffer(buffer.length, littleEndian, noAssert);
                bb.limit = buffer.length;
                for (var i=0; i<buffer.length; ++i)
                    bb.view[i] = buffer[i];
            } else
                throw TypeError("Illegal buffer"); // Otherwise fail
            return bb;
        };

        /**
         * Writes the array as a bitset.
         * @param {Array<boolean>} value Array of booleans to write
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `length` if omitted.
         * @returns {!ByteBuffer}
         * @expose
         */
        ByteBufferPrototype.writeBitSet = function(value, offset) {
          var relative = typeof offset === 'undefined';
          if (relative) offset = this.offset;
          if (!this.noAssert) {
            if (!(value instanceof Array))
              throw TypeError("Illegal BitSet: Not an array");
            if (typeof offset !== 'number' || offset % 1 !== 0)
                throw TypeError("Illegal offset: "+offset+" (not an integer)");
            offset >>>= 0;
            if (offset < 0 || offset + 0 > this.buffer.byteLength)
                throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
          }

          var start = offset,
              bits = value.length,
              bytes = (bits >> 3),
              bit = 0,
              k;

          offset += this.writeVarint32(bits,offset);

          while(bytes--) {
            k = (!!value[bit++] & 1) |
                ((!!value[bit++] & 1) << 1) |
                ((!!value[bit++] & 1) << 2) |
                ((!!value[bit++] & 1) << 3) |
                ((!!value[bit++] & 1) << 4) |
                ((!!value[bit++] & 1) << 5) |
                ((!!value[bit++] & 1) << 6) |
                ((!!value[bit++] & 1) << 7);
            this.writeByte(k,offset++);
          }

          if(bit < bits) {
            var m = 0; k = 0;
            while(bit < bits) k = k | ((!!value[bit++] & 1) << (m++));
            this.writeByte(k,offset++);
          }

          if (relative) {
            this.offset = offset;
            return this;
          }
          return offset - start;
        }

        /**
         * Reads a BitSet as an array of booleans.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `length` if omitted.
         * @returns {Array<boolean>
         * @expose
         */
        ByteBufferPrototype.readBitSet = function(offset) {
          var relative = typeof offset === 'undefined';
          if (relative) offset = this.offset;

          var ret = this.readVarint32(offset),
              bits = ret.value,
              bytes = (bits >> 3),
              bit = 0,
              value = [],
              k;

          offset += ret.length;

          while(bytes--) {
            k = this.readByte(offset++);
            value[bit++] = !!(k & 0x01);
            value[bit++] = !!(k & 0x02);
            value[bit++] = !!(k & 0x04);
            value[bit++] = !!(k & 0x08);
            value[bit++] = !!(k & 0x10);
            value[bit++] = !!(k & 0x20);
            value[bit++] = !!(k & 0x40);
            value[bit++] = !!(k & 0x80);
          }

          if(bit < bits) {
            var m = 0;
            k = this.readByte(offset++);
            while(bit < bits) value[bit++] = !!((k >> (m++)) & 1);
          }

          if (relative) {
            this.offset = offset;
          }
          return value;
        }
        /**
         * Reads the specified number of bytes.
         * @param {number} length Number of bytes to read
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `length` if omitted.
         * @returns {!ByteBuffer}
         * @expose
         */
        ByteBufferPrototype.readBytes = function(length, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + length > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+length+") <= "+this.buffer.byteLength);
            }
            var slice = this.slice(offset, offset + length);
            if (relative) this.offset += length;
            return slice;
        };

        /**
         * Writes a payload of bytes. This is an alias of {@link ByteBuffer#append}.
         * @function
         * @param {!ByteBuffer|!ArrayBuffer|!Uint8Array|string} source Data to write. If `source` is a ByteBuffer, its offsets
         *  will be modified according to the performed read operation.
         * @param {(string|number)=} encoding Encoding if `data` is a string ("base64", "hex", "binary", defaults to "utf8")
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  written if omitted.
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.writeBytes = ByteBufferPrototype.append;

        // types/ints/int8

        /**
         * Writes an 8bit signed integer.
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.writeInt8 = function(value, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof value !== 'number' || value % 1 !== 0)
                    throw TypeError("Illegal value: "+value+" (not an integer)");
                value |= 0;
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            offset += 1;
            var capacity0 = this.buffer.byteLength;
            if (offset > capacity0)
                this.resize((capacity0 *= 2) > offset ? capacity0 : offset);
            offset -= 1;
            this.view[offset] = value;
            if (relative) this.offset += 1;
            return this;
        };

        /**
         * Writes an 8bit signed integer. This is an alias of {@link ByteBuffer#writeInt8}.
         * @function
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.writeByte = ByteBufferPrototype.writeInt8;

        /**
         * Reads an 8bit signed integer.
         * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
         * @returns {number} Value read
         * @expose
         */
        ByteBufferPrototype.readInt8 = function(offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 1 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.byteLength);
            }
            var value = this.view[offset];
            if ((value & 0x80) === 0x80) value = -(0xFF - value + 1); // Cast to signed
            if (relative) this.offset += 1;
            return value;
        };

        /**
         * Reads an 8bit signed integer. This is an alias of {@link ByteBuffer#readInt8}.
         * @function
         * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
         * @returns {number} Value read
         * @expose
         */
        ByteBufferPrototype.readByte = ByteBufferPrototype.readInt8;

        /**
         * Writes an 8bit unsigned integer.
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.writeUint8 = function(value, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof value !== 'number' || value % 1 !== 0)
                    throw TypeError("Illegal value: "+value+" (not an integer)");
                value >>>= 0;
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            offset += 1;
            var capacity1 = this.buffer.byteLength;
            if (offset > capacity1)
                this.resize((capacity1 *= 2) > offset ? capacity1 : offset);
            offset -= 1;
            this.view[offset] = value;
            if (relative) this.offset += 1;
            return this;
        };

        /**
         * Writes an 8bit unsigned integer. This is an alias of {@link ByteBuffer#writeUint8}.
         * @function
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.writeUInt8 = ByteBufferPrototype.writeUint8;

        /**
         * Reads an 8bit unsigned integer.
         * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
         * @returns {number} Value read
         * @expose
         */
        ByteBufferPrototype.readUint8 = function(offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 1 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.byteLength);
            }
            var value = this.view[offset];
            if (relative) this.offset += 1;
            return value;
        };

        /**
         * Reads an 8bit unsigned integer. This is an alias of {@link ByteBuffer#readUint8}.
         * @function
         * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
         * @returns {number} Value read
         * @expose
         */
        ByteBufferPrototype.readUInt8 = ByteBufferPrototype.readUint8;

        // types/ints/int16

        /**
         * Writes a 16bit signed integer.
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
         * @throws {TypeError} If `offset` or `value` is not a valid number
         * @throws {RangeError} If `offset` is out of bounds
         * @expose
         */
        ByteBufferPrototype.writeInt16 = function(value, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof value !== 'number' || value % 1 !== 0)
                    throw TypeError("Illegal value: "+value+" (not an integer)");
                value |= 0;
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            offset += 2;
            var capacity2 = this.buffer.byteLength;
            if (offset > capacity2)
                this.resize((capacity2 *= 2) > offset ? capacity2 : offset);
            offset -= 2;
            if (this.littleEndian) {
                this.view[offset+1] = (value & 0xFF00) >>> 8;
                this.view[offset  ] =  value & 0x00FF;
            } else {
                this.view[offset]   = (value & 0xFF00) >>> 8;
                this.view[offset+1] =  value & 0x00FF;
            }
            if (relative) this.offset += 2;
            return this;
        };

        /**
         * Writes a 16bit signed integer. This is an alias of {@link ByteBuffer#writeInt16}.
         * @function
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
         * @throws {TypeError} If `offset` or `value` is not a valid number
         * @throws {RangeError} If `offset` is out of bounds
         * @expose
         */
        ByteBufferPrototype.writeShort = ByteBufferPrototype.writeInt16;

        /**
         * Reads a 16bit signed integer.
         * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
         * @returns {number} Value read
         * @throws {TypeError} If `offset` is not a valid number
         * @throws {RangeError} If `offset` is out of bounds
         * @expose
         */
        ByteBufferPrototype.readInt16 = function(offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 2 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+2+") <= "+this.buffer.byteLength);
            }
            var value = 0;
            if (this.littleEndian) {
                value  = this.view[offset  ];
                value |= this.view[offset+1] << 8;
            } else {
                value  = this.view[offset  ] << 8;
                value |= this.view[offset+1];
            }
            if ((value & 0x8000) === 0x8000) value = -(0xFFFF - value + 1); // Cast to signed
            if (relative) this.offset += 2;
            return value;
        };

        /**
         * Reads a 16bit signed integer. This is an alias of {@link ByteBuffer#readInt16}.
         * @function
         * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
         * @returns {number} Value read
         * @throws {TypeError} If `offset` is not a valid number
         * @throws {RangeError} If `offset` is out of bounds
         * @expose
         */
        ByteBufferPrototype.readShort = ByteBufferPrototype.readInt16;

        /**
         * Writes a 16bit unsigned integer.
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
         * @throws {TypeError} If `offset` or `value` is not a valid number
         * @throws {RangeError} If `offset` is out of bounds
         * @expose
         */
        ByteBufferPrototype.writeUint16 = function(value, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof value !== 'number' || value % 1 !== 0)
                    throw TypeError("Illegal value: "+value+" (not an integer)");
                value >>>= 0;
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            offset += 2;
            var capacity3 = this.buffer.byteLength;
            if (offset > capacity3)
                this.resize((capacity3 *= 2) > offset ? capacity3 : offset);
            offset -= 2;
            if (this.littleEndian) {
                this.view[offset+1] = (value & 0xFF00) >>> 8;
                this.view[offset  ] =  value & 0x00FF;
            } else {
                this.view[offset]   = (value & 0xFF00) >>> 8;
                this.view[offset+1] =  value & 0x00FF;
            }
            if (relative) this.offset += 2;
            return this;
        };

        /**
         * Writes a 16bit unsigned integer. This is an alias of {@link ByteBuffer#writeUint16}.
         * @function
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
         * @throws {TypeError} If `offset` or `value` is not a valid number
         * @throws {RangeError} If `offset` is out of bounds
         * @expose
         */
        ByteBufferPrototype.writeUInt16 = ByteBufferPrototype.writeUint16;

        /**
         * Reads a 16bit unsigned integer.
         * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
         * @returns {number} Value read
         * @throws {TypeError} If `offset` is not a valid number
         * @throws {RangeError} If `offset` is out of bounds
         * @expose
         */
        ByteBufferPrototype.readUint16 = function(offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 2 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+2+") <= "+this.buffer.byteLength);
            }
            var value = 0;
            if (this.littleEndian) {
                value  = this.view[offset  ];
                value |= this.view[offset+1] << 8;
            } else {
                value  = this.view[offset  ] << 8;
                value |= this.view[offset+1];
            }
            if (relative) this.offset += 2;
            return value;
        };

        /**
         * Reads a 16bit unsigned integer. This is an alias of {@link ByteBuffer#readUint16}.
         * @function
         * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
         * @returns {number} Value read
         * @throws {TypeError} If `offset` is not a valid number
         * @throws {RangeError} If `offset` is out of bounds
         * @expose
         */
        ByteBufferPrototype.readUInt16 = ByteBufferPrototype.readUint16;

        // types/ints/int32

        /**
         * Writes a 32bit signed integer.
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
         * @expose
         */
        ByteBufferPrototype.writeInt32 = function(value, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof value !== 'number' || value % 1 !== 0)
                    throw TypeError("Illegal value: "+value+" (not an integer)");
                value |= 0;
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            offset += 4;
            var capacity4 = this.buffer.byteLength;
            if (offset > capacity4)
                this.resize((capacity4 *= 2) > offset ? capacity4 : offset);
            offset -= 4;
            if (this.littleEndian) {
                this.view[offset+3] = (value >>> 24) & 0xFF;
                this.view[offset+2] = (value >>> 16) & 0xFF;
                this.view[offset+1] = (value >>>  8) & 0xFF;
                this.view[offset  ] =  value         & 0xFF;
            } else {
                this.view[offset  ] = (value >>> 24) & 0xFF;
                this.view[offset+1] = (value >>> 16) & 0xFF;
                this.view[offset+2] = (value >>>  8) & 0xFF;
                this.view[offset+3] =  value         & 0xFF;
            }
            if (relative) this.offset += 4;
            return this;
        };

        /**
         * Writes a 32bit signed integer. This is an alias of {@link ByteBuffer#writeInt32}.
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
         * @expose
         */
        ByteBufferPrototype.writeInt = ByteBufferPrototype.writeInt32;

        /**
         * Reads a 32bit signed integer.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
         * @returns {number} Value read
         * @expose
         */
        ByteBufferPrototype.readInt32 = function(offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 4 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+4+") <= "+this.buffer.byteLength);
            }
            var value = 0;
            if (this.littleEndian) {
                value  = this.view[offset+2] << 16;
                value |= this.view[offset+1] <<  8;
                value |= this.view[offset  ];
                value += this.view[offset+3] << 24 >>> 0;
            } else {
                value  = this.view[offset+1] << 16;
                value |= this.view[offset+2] <<  8;
                value |= this.view[offset+3];
                value += this.view[offset  ] << 24 >>> 0;
            }
            value |= 0; // Cast to signed
            if (relative) this.offset += 4;
            return value;
        };

        /**
         * Reads a 32bit signed integer. This is an alias of {@link ByteBuffer#readInt32}.
         * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `4` if omitted.
         * @returns {number} Value read
         * @expose
         */
        ByteBufferPrototype.readInt = ByteBufferPrototype.readInt32;

        /**
         * Writes a 32bit unsigned integer.
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
         * @expose
         */
        ByteBufferPrototype.writeUint32 = function(value, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof value !== 'number' || value % 1 !== 0)
                    throw TypeError("Illegal value: "+value+" (not an integer)");
                value >>>= 0;
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            offset += 4;
            var capacity5 = this.buffer.byteLength;
            if (offset > capacity5)
                this.resize((capacity5 *= 2) > offset ? capacity5 : offset);
            offset -= 4;
            if (this.littleEndian) {
                this.view[offset+3] = (value >>> 24) & 0xFF;
                this.view[offset+2] = (value >>> 16) & 0xFF;
                this.view[offset+1] = (value >>>  8) & 0xFF;
                this.view[offset  ] =  value         & 0xFF;
            } else {
                this.view[offset  ] = (value >>> 24) & 0xFF;
                this.view[offset+1] = (value >>> 16) & 0xFF;
                this.view[offset+2] = (value >>>  8) & 0xFF;
                this.view[offset+3] =  value         & 0xFF;
            }
            if (relative) this.offset += 4;
            return this;
        };

        /**
         * Writes a 32bit unsigned integer. This is an alias of {@link ByteBuffer#writeUint32}.
         * @function
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
         * @expose
         */
        ByteBufferPrototype.writeUInt32 = ByteBufferPrototype.writeUint32;

        /**
         * Reads a 32bit unsigned integer.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
         * @returns {number} Value read
         * @expose
         */
        ByteBufferPrototype.readUint32 = function(offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 4 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+4+") <= "+this.buffer.byteLength);
            }
            var value = 0;
            if (this.littleEndian) {
                value  = this.view[offset+2] << 16;
                value |= this.view[offset+1] <<  8;
                value |= this.view[offset  ];
                value += this.view[offset+3] << 24 >>> 0;
            } else {
                value  = this.view[offset+1] << 16;
                value |= this.view[offset+2] <<  8;
                value |= this.view[offset+3];
                value += this.view[offset  ] << 24 >>> 0;
            }
            if (relative) this.offset += 4;
            return value;
        };

        /**
         * Reads a 32bit unsigned integer. This is an alias of {@link ByteBuffer#readUint32}.
         * @function
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
         * @returns {number} Value read
         * @expose
         */
        ByteBufferPrototype.readUInt32 = ByteBufferPrototype.readUint32;

        // types/ints/int64

        if (Long) {

            /**
             * Writes a 64bit signed integer.
             * @param {number|!Long} value Value to write
             * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
             * @returns {!ByteBuffer} this
             * @expose
             */
            ByteBufferPrototype.writeInt64 = function(value, offset) {
                var relative = typeof offset === 'undefined';
                if (relative) offset = this.offset;
                if (!this.noAssert) {
                    if (typeof value === 'number')
                        value = Long.fromNumber(value);
                    else if (typeof value === 'string')
                        value = Long.fromString(value);
                    else if (!(value && value instanceof Long))
                        throw TypeError("Illegal value: "+value+" (not an integer or Long)");
                    if (typeof offset !== 'number' || offset % 1 !== 0)
                        throw TypeError("Illegal offset: "+offset+" (not an integer)");
                    offset >>>= 0;
                    if (offset < 0 || offset + 0 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
                }
                if (typeof value === 'number')
                    value = Long.fromNumber(value);
                else if (typeof value === 'string')
                    value = Long.fromString(value);
                offset += 8;
                var capacity6 = this.buffer.byteLength;
                if (offset > capacity6)
                    this.resize((capacity6 *= 2) > offset ? capacity6 : offset);
                offset -= 8;
                var lo = value.low,
                    hi = value.high;
                if (this.littleEndian) {
                    this.view[offset+3] = (lo >>> 24) & 0xFF;
                    this.view[offset+2] = (lo >>> 16) & 0xFF;
                    this.view[offset+1] = (lo >>>  8) & 0xFF;
                    this.view[offset  ] =  lo         & 0xFF;
                    offset += 4;
                    this.view[offset+3] = (hi >>> 24) & 0xFF;
                    this.view[offset+2] = (hi >>> 16) & 0xFF;
                    this.view[offset+1] = (hi >>>  8) & 0xFF;
                    this.view[offset  ] =  hi         & 0xFF;
                } else {
                    this.view[offset  ] = (hi >>> 24) & 0xFF;
                    this.view[offset+1] = (hi >>> 16) & 0xFF;
                    this.view[offset+2] = (hi >>>  8) & 0xFF;
                    this.view[offset+3] =  hi         & 0xFF;
                    offset += 4;
                    this.view[offset  ] = (lo >>> 24) & 0xFF;
                    this.view[offset+1] = (lo >>> 16) & 0xFF;
                    this.view[offset+2] = (lo >>>  8) & 0xFF;
                    this.view[offset+3] =  lo         & 0xFF;
                }
                if (relative) this.offset += 8;
                return this;
            };

            /**
             * Writes a 64bit signed integer. This is an alias of {@link ByteBuffer#writeInt64}.
             * @param {number|!Long} value Value to write
             * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
             * @returns {!ByteBuffer} this
             * @expose
             */
            ByteBufferPrototype.writeLong = ByteBufferPrototype.writeInt64;

            /**
             * Reads a 64bit signed integer.
             * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
             * @returns {!Long}
             * @expose
             */
            ByteBufferPrototype.readInt64 = function(offset) {
                var relative = typeof offset === 'undefined';
                if (relative) offset = this.offset;
                if (!this.noAssert) {
                    if (typeof offset !== 'number' || offset % 1 !== 0)
                        throw TypeError("Illegal offset: "+offset+" (not an integer)");
                    offset >>>= 0;
                    if (offset < 0 || offset + 8 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= "+offset+" (+"+8+") <= "+this.buffer.byteLength);
                }
                var lo = 0,
                    hi = 0;
                if (this.littleEndian) {
                    lo  = this.view[offset+2] << 16;
                    lo |= this.view[offset+1] <<  8;
                    lo |= this.view[offset  ];
                    lo += this.view[offset+3] << 24 >>> 0;
                    offset += 4;
                    hi  = this.view[offset+2] << 16;
                    hi |= this.view[offset+1] <<  8;
                    hi |= this.view[offset  ];
                    hi += this.view[offset+3] << 24 >>> 0;
                } else {
                    hi  = this.view[offset+1] << 16;
                    hi |= this.view[offset+2] <<  8;
                    hi |= this.view[offset+3];
                    hi += this.view[offset  ] << 24 >>> 0;
                    offset += 4;
                    lo  = this.view[offset+1] << 16;
                    lo |= this.view[offset+2] <<  8;
                    lo |= this.view[offset+3];
                    lo += this.view[offset  ] << 24 >>> 0;
                }
                var value = new Long(lo, hi, false);
                if (relative) this.offset += 8;
                return value;
            };

            /**
             * Reads a 64bit signed integer. This is an alias of {@link ByteBuffer#readInt64}.
             * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
             * @returns {!Long}
             * @expose
             */
            ByteBufferPrototype.readLong = ByteBufferPrototype.readInt64;

            /**
             * Writes a 64bit unsigned integer.
             * @param {number|!Long} value Value to write
             * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
             * @returns {!ByteBuffer} this
             * @expose
             */
            ByteBufferPrototype.writeUint64 = function(value, offset) {
                var relative = typeof offset === 'undefined';
                if (relative) offset = this.offset;
                if (!this.noAssert) {
                    if (typeof value === 'number')
                        value = Long.fromNumber(value);
                    else if (typeof value === 'string')
                        value = Long.fromString(value);
                    else if (!(value && value instanceof Long))
                        throw TypeError("Illegal value: "+value+" (not an integer or Long)");
                    if (typeof offset !== 'number' || offset % 1 !== 0)
                        throw TypeError("Illegal offset: "+offset+" (not an integer)");
                    offset >>>= 0;
                    if (offset < 0 || offset + 0 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
                }
                if (typeof value === 'number')
                    value = Long.fromNumber(value);
                else if (typeof value === 'string')
                    value = Long.fromString(value);
                offset += 8;
                var capacity7 = this.buffer.byteLength;
                if (offset > capacity7)
                    this.resize((capacity7 *= 2) > offset ? capacity7 : offset);
                offset -= 8;
                var lo = value.low,
                    hi = value.high;
                if (this.littleEndian) {
                    this.view[offset+3] = (lo >>> 24) & 0xFF;
                    this.view[offset+2] = (lo >>> 16) & 0xFF;
                    this.view[offset+1] = (lo >>>  8) & 0xFF;
                    this.view[offset  ] =  lo         & 0xFF;
                    offset += 4;
                    this.view[offset+3] = (hi >>> 24) & 0xFF;
                    this.view[offset+2] = (hi >>> 16) & 0xFF;
                    this.view[offset+1] = (hi >>>  8) & 0xFF;
                    this.view[offset  ] =  hi         & 0xFF;
                } else {
                    this.view[offset  ] = (hi >>> 24) & 0xFF;
                    this.view[offset+1] = (hi >>> 16) & 0xFF;
                    this.view[offset+2] = (hi >>>  8) & 0xFF;
                    this.view[offset+3] =  hi         & 0xFF;
                    offset += 4;
                    this.view[offset  ] = (lo >>> 24) & 0xFF;
                    this.view[offset+1] = (lo >>> 16) & 0xFF;
                    this.view[offset+2] = (lo >>>  8) & 0xFF;
                    this.view[offset+3] =  lo         & 0xFF;
                }
                if (relative) this.offset += 8;
                return this;
            };

            /**
             * Writes a 64bit unsigned integer. This is an alias of {@link ByteBuffer#writeUint64}.
             * @function
             * @param {number|!Long} value Value to write
             * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
             * @returns {!ByteBuffer} this
             * @expose
             */
            ByteBufferPrototype.writeUInt64 = ByteBufferPrototype.writeUint64;

            /**
             * Reads a 64bit unsigned integer.
             * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
             * @returns {!Long}
             * @expose
             */
            ByteBufferPrototype.readUint64 = function(offset) {
                var relative = typeof offset === 'undefined';
                if (relative) offset = this.offset;
                if (!this.noAssert) {
                    if (typeof offset !== 'number' || offset % 1 !== 0)
                        throw TypeError("Illegal offset: "+offset+" (not an integer)");
                    offset >>>= 0;
                    if (offset < 0 || offset + 8 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= "+offset+" (+"+8+") <= "+this.buffer.byteLength);
                }
                var lo = 0,
                    hi = 0;
                if (this.littleEndian) {
                    lo  = this.view[offset+2] << 16;
                    lo |= this.view[offset+1] <<  8;
                    lo |= this.view[offset  ];
                    lo += this.view[offset+3] << 24 >>> 0;
                    offset += 4;
                    hi  = this.view[offset+2] << 16;
                    hi |= this.view[offset+1] <<  8;
                    hi |= this.view[offset  ];
                    hi += this.view[offset+3] << 24 >>> 0;
                } else {
                    hi  = this.view[offset+1] << 16;
                    hi |= this.view[offset+2] <<  8;
                    hi |= this.view[offset+3];
                    hi += this.view[offset  ] << 24 >>> 0;
                    offset += 4;
                    lo  = this.view[offset+1] << 16;
                    lo |= this.view[offset+2] <<  8;
                    lo |= this.view[offset+3];
                    lo += this.view[offset  ] << 24 >>> 0;
                }
                var value = new Long(lo, hi, true);
                if (relative) this.offset += 8;
                return value;
            };

            /**
             * Reads a 64bit unsigned integer. This is an alias of {@link ByteBuffer#readUint64}.
             * @function
             * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
             * @returns {!Long}
             * @expose
             */
            ByteBufferPrototype.readUInt64 = ByteBufferPrototype.readUint64;

        } // Long


        // types/floats/float32

        /*
         ieee754 - https://github.com/feross/ieee754

         The MIT License (MIT)

         Copyright (c) Feross Aboukhadijeh

         Permission is hereby granted, free of charge, to any person obtaining a copy
         of this software and associated documentation files (the "Software"), to deal
         in the Software without restriction, including without limitation the rights
         to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
         copies of the Software, and to permit persons to whom the Software is
         furnished to do so, subject to the following conditions:

         The above copyright notice and this permission notice shall be included in
         all copies or substantial portions of the Software.

         THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
         IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
         FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
         AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
         LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
         OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
         THE SOFTWARE.
        */

        /**
         * Reads an IEEE754 float from a byte array.
         * @param {!Array} buffer
         * @param {number} offset
         * @param {boolean} isLE
         * @param {number} mLen
         * @param {number} nBytes
         * @returns {number}
         * @inner
         */
        function ieee754_read(buffer, offset, isLE, mLen, nBytes) {
            var e, m,
                eLen = nBytes * 8 - mLen - 1,
                eMax = (1 << eLen) - 1,
                eBias = eMax >> 1,
                nBits = -7,
                i = isLE ? (nBytes - 1) : 0,
                d = isLE ? -1 : 1,
                s = buffer[offset + i];

            i += d;

            e = s & ((1 << (-nBits)) - 1);
            s >>= (-nBits);
            nBits += eLen;
            for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

            m = e & ((1 << (-nBits)) - 1);
            e >>= (-nBits);
            nBits += mLen;
            for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

            if (e === 0) {
                e = 1 - eBias;
            } else if (e === eMax) {
                return m ? NaN : ((s ? -1 : 1) * Infinity);
            } else {
                m = m + Math.pow(2, mLen);
                e = e - eBias;
            }
            return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
        }

        /**
         * Writes an IEEE754 float to a byte array.
         * @param {!Array} buffer
         * @param {number} value
         * @param {number} offset
         * @param {boolean} isLE
         * @param {number} mLen
         * @param {number} nBytes
         * @inner
         */
        function ieee754_write(buffer, value, offset, isLE, mLen, nBytes) {
            var e, m, c,
                eLen = nBytes * 8 - mLen - 1,
                eMax = (1 << eLen) - 1,
                eBias = eMax >> 1,
                rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
                i = isLE ? 0 : (nBytes - 1),
                d = isLE ? 1 : -1,
                s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

            value = Math.abs(value);

            if (isNaN(value) || value === Infinity) {
                m = isNaN(value) ? 1 : 0;
                e = eMax;
            } else {
                e = Math.floor(Math.log(value) / Math.LN2);
                if (value * (c = Math.pow(2, -e)) < 1) {
                    e--;
                    c *= 2;
                }
                if (e + eBias >= 1) {
                    value += rt / c;
                } else {
                    value += rt * Math.pow(2, 1 - eBias);
                }
                if (value * c >= 2) {
                    e++;
                    c /= 2;
                }

                if (e + eBias >= eMax) {
                    m = 0;
                    e = eMax;
                } else if (e + eBias >= 1) {
                    m = (value * c - 1) * Math.pow(2, mLen);
                    e = e + eBias;
                } else {
                    m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
                    e = 0;
                }
            }

            for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

            e = (e << mLen) | m;
            eLen += mLen;
            for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

            buffer[offset + i - d] |= s * 128;
        }

        /**
         * Writes a 32bit float.
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.writeFloat32 = function(value, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof value !== 'number')
                    throw TypeError("Illegal value: "+value+" (not a number)");
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            offset += 4;
            var capacity8 = this.buffer.byteLength;
            if (offset > capacity8)
                this.resize((capacity8 *= 2) > offset ? capacity8 : offset);
            offset -= 4;
            ieee754_write(this.view, value, offset, this.littleEndian, 23, 4);
            if (relative) this.offset += 4;
            return this;
        };

        /**
         * Writes a 32bit float. This is an alias of {@link ByteBuffer#writeFloat32}.
         * @function
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.writeFloat = ByteBufferPrototype.writeFloat32;

        /**
         * Reads a 32bit float.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
         * @returns {number}
         * @expose
         */
        ByteBufferPrototype.readFloat32 = function(offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 4 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+4+") <= "+this.buffer.byteLength);
            }
            var value = ieee754_read(this.view, offset, this.littleEndian, 23, 4);
            if (relative) this.offset += 4;
            return value;
        };

        /**
         * Reads a 32bit float. This is an alias of {@link ByteBuffer#readFloat32}.
         * @function
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
         * @returns {number}
         * @expose
         */
        ByteBufferPrototype.readFloat = ByteBufferPrototype.readFloat32;

        // types/floats/float64

        /**
         * Writes a 64bit float.
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.writeFloat64 = function(value, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof value !== 'number')
                    throw TypeError("Illegal value: "+value+" (not a number)");
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            offset += 8;
            var capacity9 = this.buffer.byteLength;
            if (offset > capacity9)
                this.resize((capacity9 *= 2) > offset ? capacity9 : offset);
            offset -= 8;
            ieee754_write(this.view, value, offset, this.littleEndian, 52, 8);
            if (relative) this.offset += 8;
            return this;
        };

        /**
         * Writes a 64bit float. This is an alias of {@link ByteBuffer#writeFloat64}.
         * @function
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.writeDouble = ByteBufferPrototype.writeFloat64;

        /**
         * Reads a 64bit float.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
         * @returns {number}
         * @expose
         */
        ByteBufferPrototype.readFloat64 = function(offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 8 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+8+") <= "+this.buffer.byteLength);
            }
            var value = ieee754_read(this.view, offset, this.littleEndian, 52, 8);
            if (relative) this.offset += 8;
            return value;
        };

        /**
         * Reads a 64bit float. This is an alias of {@link ByteBuffer#readFloat64}.
         * @function
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
         * @returns {number}
         * @expose
         */
        ByteBufferPrototype.readDouble = ByteBufferPrototype.readFloat64;


        // types/varints/varint32

        /**
         * Maximum number of bytes required to store a 32bit base 128 variable-length integer.
         * @type {number}
         * @const
         * @expose
         */
        ByteBuffer.MAX_VARINT32_BYTES = 5;

        /**
         * Calculates the actual number of bytes required to store a 32bit base 128 variable-length integer.
         * @param {number} value Value to encode
         * @returns {number} Number of bytes required. Capped to {@link ByteBuffer.MAX_VARINT32_BYTES}
         * @expose
         */
        ByteBuffer.calculateVarint32 = function(value) {
            // ref: src/google/protobuf/io/coded_stream.cc
            value = value >>> 0;
                 if (value < 1 << 7 ) return 1;
            else if (value < 1 << 14) return 2;
            else if (value < 1 << 21) return 3;
            else if (value < 1 << 28) return 4;
            else                      return 5;
        };

        /**
         * Zigzag encodes a signed 32bit integer so that it can be effectively used with varint encoding.
         * @param {number} n Signed 32bit integer
         * @returns {number} Unsigned zigzag encoded 32bit integer
         * @expose
         */
        ByteBuffer.zigZagEncode32 = function(n) {
            return (((n |= 0) << 1) ^ (n >> 31)) >>> 0; // ref: src/google/protobuf/wire_format_lite.h
        };

        /**
         * Decodes a zigzag encoded signed 32bit integer.
         * @param {number} n Unsigned zigzag encoded 32bit integer
         * @returns {number} Signed 32bit integer
         * @expose
         */
        ByteBuffer.zigZagDecode32 = function(n) {
            return ((n >>> 1) ^ -(n & 1)) | 0; // // ref: src/google/protobuf/wire_format_lite.h
        };

        /**
         * Writes a 32bit base 128 variable-length integer.
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  written if omitted.
         * @returns {!ByteBuffer|number} this if `offset` is omitted, else the actual number of bytes written
         * @expose
         */
        ByteBufferPrototype.writeVarint32 = function(value, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof value !== 'number' || value % 1 !== 0)
                    throw TypeError("Illegal value: "+value+" (not an integer)");
                value |= 0;
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            var size = ByteBuffer.calculateVarint32(value),
                b;
            offset += size;
            var capacity10 = this.buffer.byteLength;
            if (offset > capacity10)
                this.resize((capacity10 *= 2) > offset ? capacity10 : offset);
            offset -= size;
            value >>>= 0;
            while (value >= 0x80) {
                b = (value & 0x7f) | 0x80;
                this.view[offset++] = b;
                value >>>= 7;
            }
            this.view[offset++] = value;
            if (relative) {
                this.offset = offset;
                return this;
            }
            return size;
        };

        /**
         * Writes a zig-zag encoded (signed) 32bit base 128 variable-length integer.
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  written if omitted.
         * @returns {!ByteBuffer|number} this if `offset` is omitted, else the actual number of bytes written
         * @expose
         */
        ByteBufferPrototype.writeVarint32ZigZag = function(value, offset) {
            return this.writeVarint32(ByteBuffer.zigZagEncode32(value), offset);
        };

        /**
         * Reads a 32bit base 128 variable-length integer.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  written if omitted.
         * @returns {number|!{value: number, length: number}} The value read if offset is omitted, else the value read
         *  and the actual number of bytes read.
         * @throws {Error} If it's not a valid varint. Has a property `truncated = true` if there is not enough data available
         *  to fully decode the varint.
         * @expose
         */
        ByteBufferPrototype.readVarint32 = function(offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 1 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.byteLength);
            }
            var c = 0,
                value = 0 >>> 0,
                b;
            do {
                if (!this.noAssert && offset > this.limit) {
                    var err = Error("Truncated");
                    err['truncated'] = true;
                    throw err;
                }
                b = this.view[offset++];
                if (c < 5)
                    value |= (b & 0x7f) << (7*c);
                ++c;
            } while ((b & 0x80) !== 0);
            value |= 0;
            if (relative) {
                this.offset = offset;
                return value;
            }
            return {
                "value": value,
                "length": c
            };
        };

        /**
         * Reads a zig-zag encoded (signed) 32bit base 128 variable-length integer.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  written if omitted.
         * @returns {number|!{value: number, length: number}} The value read if offset is omitted, else the value read
         *  and the actual number of bytes read.
         * @throws {Error} If it's not a valid varint
         * @expose
         */
        ByteBufferPrototype.readVarint32ZigZag = function(offset) {
            var val = this.readVarint32(offset);
            if (typeof val === 'object')
                val["value"] = ByteBuffer.zigZagDecode32(val["value"]);
            else
                val = ByteBuffer.zigZagDecode32(val);
            return val;
        };

        // types/varints/varint64

        if (Long) {

            /**
             * Maximum number of bytes required to store a 64bit base 128 variable-length integer.
             * @type {number}
             * @const
             * @expose
             */
            ByteBuffer.MAX_VARINT64_BYTES = 10;

            /**
             * Calculates the actual number of bytes required to store a 64bit base 128 variable-length integer.
             * @param {number|!Long} value Value to encode
             * @returns {number} Number of bytes required. Capped to {@link ByteBuffer.MAX_VARINT64_BYTES}
             * @expose
             */
            ByteBuffer.calculateVarint64 = function(value) {
                if (typeof value === 'number')
                    value = Long.fromNumber(value);
                else if (typeof value === 'string')
                    value = Long.fromString(value);
                // ref: src/google/protobuf/io/coded_stream.cc
                var part0 = value.toInt() >>> 0,
                    part1 = value.shiftRightUnsigned(28).toInt() >>> 0,
                    part2 = value.shiftRightUnsigned(56).toInt() >>> 0;
                if (part2 == 0) {
                    if (part1 == 0) {
                        if (part0 < 1 << 14)
                            return part0 < 1 << 7 ? 1 : 2;
                        else
                            return part0 < 1 << 21 ? 3 : 4;
                    } else {
                        if (part1 < 1 << 14)
                            return part1 < 1 << 7 ? 5 : 6;
                        else
                            return part1 < 1 << 21 ? 7 : 8;
                    }
                } else
                    return part2 < 1 << 7 ? 9 : 10;
            };

            /**
             * Zigzag encodes a signed 64bit integer so that it can be effectively used with varint encoding.
             * @param {number|!Long} value Signed long
             * @returns {!Long} Unsigned zigzag encoded long
             * @expose
             */
            ByteBuffer.zigZagEncode64 = function(value) {
                if (typeof value === 'number')
                    value = Long.fromNumber(value, false);
                else if (typeof value === 'string')
                    value = Long.fromString(value, false);
                else if (value.unsigned !== false) value = value.toSigned();
                // ref: src/google/protobuf/wire_format_lite.h
                return value.shiftLeft(1).xor(value.shiftRight(63)).toUnsigned();
            };

            /**
             * Decodes a zigzag encoded signed 64bit integer.
             * @param {!Long|number} value Unsigned zigzag encoded long or JavaScript number
             * @returns {!Long} Signed long
             * @expose
             */
            ByteBuffer.zigZagDecode64 = function(value) {
                if (typeof value === 'number')
                    value = Long.fromNumber(value, false);
                else if (typeof value === 'string')
                    value = Long.fromString(value, false);
                else if (value.unsigned !== false) value = value.toSigned();
                // ref: src/google/protobuf/wire_format_lite.h
                return value.shiftRightUnsigned(1).xor(value.and(Long.ONE).toSigned().negate()).toSigned();
            };

            /**
             * Writes a 64bit base 128 variable-length integer.
             * @param {number|Long} value Value to write
             * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
             *  written if omitted.
             * @returns {!ByteBuffer|number} `this` if offset is omitted, else the actual number of bytes written.
             * @expose
             */
            ByteBufferPrototype.writeVarint64 = function(value, offset) {
                var relative = typeof offset === 'undefined';
                if (relative) offset = this.offset;
                if (!this.noAssert) {
                    if (typeof value === 'number')
                        value = Long.fromNumber(value);
                    else if (typeof value === 'string')
                        value = Long.fromString(value);
                    else if (!(value && value instanceof Long))
                        throw TypeError("Illegal value: "+value+" (not an integer or Long)");
                    if (typeof offset !== 'number' || offset % 1 !== 0)
                        throw TypeError("Illegal offset: "+offset+" (not an integer)");
                    offset >>>= 0;
                    if (offset < 0 || offset + 0 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
                }
                if (typeof value === 'number')
                    value = Long.fromNumber(value, false);
                else if (typeof value === 'string')
                    value = Long.fromString(value, false);
                else if (value.unsigned !== false) value = value.toSigned();
                var size = ByteBuffer.calculateVarint64(value),
                    part0 = value.toInt() >>> 0,
                    part1 = value.shiftRightUnsigned(28).toInt() >>> 0,
                    part2 = value.shiftRightUnsigned(56).toInt() >>> 0;
                offset += size;
                var capacity11 = this.buffer.byteLength;
                if (offset > capacity11)
                    this.resize((capacity11 *= 2) > offset ? capacity11 : offset);
                offset -= size;
                switch (size) {
                    case 10: this.view[offset+9] = (part2 >>>  7) & 0x01;
                    case 9 : this.view[offset+8] = size !== 9 ? (part2       ) | 0x80 : (part2       ) & 0x7F;
                    case 8 : this.view[offset+7] = size !== 8 ? (part1 >>> 21) | 0x80 : (part1 >>> 21) & 0x7F;
                    case 7 : this.view[offset+6] = size !== 7 ? (part1 >>> 14) | 0x80 : (part1 >>> 14) & 0x7F;
                    case 6 : this.view[offset+5] = size !== 6 ? (part1 >>>  7) | 0x80 : (part1 >>>  7) & 0x7F;
                    case 5 : this.view[offset+4] = size !== 5 ? (part1       ) | 0x80 : (part1       ) & 0x7F;
                    case 4 : this.view[offset+3] = size !== 4 ? (part0 >>> 21) | 0x80 : (part0 >>> 21) & 0x7F;
                    case 3 : this.view[offset+2] = size !== 3 ? (part0 >>> 14) | 0x80 : (part0 >>> 14) & 0x7F;
                    case 2 : this.view[offset+1] = size !== 2 ? (part0 >>>  7) | 0x80 : (part0 >>>  7) & 0x7F;
                    case 1 : this.view[offset  ] = size !== 1 ? (part0       ) | 0x80 : (part0       ) & 0x7F;
                }
                if (relative) {
                    this.offset += size;
                    return this;
                } else {
                    return size;
                }
            };

            /**
             * Writes a zig-zag encoded 64bit base 128 variable-length integer.
             * @param {number|Long} value Value to write
             * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
             *  written if omitted.
             * @returns {!ByteBuffer|number} `this` if offset is omitted, else the actual number of bytes written.
             * @expose
             */
            ByteBufferPrototype.writeVarint64ZigZag = function(value, offset) {
                return this.writeVarint64(ByteBuffer.zigZagEncode64(value), offset);
            };

            /**
             * Reads a 64bit base 128 variable-length integer. Requires Long.js.
             * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
             *  read if omitted.
             * @returns {!Long|!{value: Long, length: number}} The value read if offset is omitted, else the value read and
             *  the actual number of bytes read.
             * @throws {Error} If it's not a valid varint
             * @expose
             */
            ByteBufferPrototype.readVarint64 = function(offset) {
                var relative = typeof offset === 'undefined';
                if (relative) offset = this.offset;
                if (!this.noAssert) {
                    if (typeof offset !== 'number' || offset % 1 !== 0)
                        throw TypeError("Illegal offset: "+offset+" (not an integer)");
                    offset >>>= 0;
                    if (offset < 0 || offset + 1 > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.byteLength);
                }
                // ref: src/google/protobuf/io/coded_stream.cc
                var start = offset,
                    part0 = 0,
                    part1 = 0,
                    part2 = 0,
                    b  = 0;
                b = this.view[offset++]; part0  = (b & 0x7F)      ; if ( b & 0x80                                                   ) {
                b = this.view[offset++]; part0 |= (b & 0x7F) <<  7; if ((b & 0x80) || (this.noAssert && typeof b === 'undefined')) {
                b = this.view[offset++]; part0 |= (b & 0x7F) << 14; if ((b & 0x80) || (this.noAssert && typeof b === 'undefined')) {
                b = this.view[offset++]; part0 |= (b & 0x7F) << 21; if ((b & 0x80) || (this.noAssert && typeof b === 'undefined')) {
                b = this.view[offset++]; part1  = (b & 0x7F)      ; if ((b & 0x80) || (this.noAssert && typeof b === 'undefined')) {
                b = this.view[offset++]; part1 |= (b & 0x7F) <<  7; if ((b & 0x80) || (this.noAssert && typeof b === 'undefined')) {
                b = this.view[offset++]; part1 |= (b & 0x7F) << 14; if ((b & 0x80) || (this.noAssert && typeof b === 'undefined')) {
                b = this.view[offset++]; part1 |= (b & 0x7F) << 21; if ((b & 0x80) || (this.noAssert && typeof b === 'undefined')) {
                b = this.view[offset++]; part2  = (b & 0x7F)      ; if ((b & 0x80) || (this.noAssert && typeof b === 'undefined')) {
                b = this.view[offset++]; part2 |= (b & 0x7F) <<  7; if ((b & 0x80) || (this.noAssert && typeof b === 'undefined')) {
                throw Error("Buffer overrun"); }}}}}}}}}}
                var value = Long.fromBits(part0 | (part1 << 28), (part1 >>> 4) | (part2) << 24, false);
                if (relative) {
                    this.offset = offset;
                    return value;
                } else {
                    return {
                        'value': value,
                        'length': offset-start
                    };
                }
            };

            /**
             * Reads a zig-zag encoded 64bit base 128 variable-length integer. Requires Long.js.
             * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
             *  read if omitted.
             * @returns {!Long|!{value: Long, length: number}} The value read if offset is omitted, else the value read and
             *  the actual number of bytes read.
             * @throws {Error} If it's not a valid varint
             * @expose
             */
            ByteBufferPrototype.readVarint64ZigZag = function(offset) {
                var val = this.readVarint64(offset);
                if (val && val['value'] instanceof Long)
                    val["value"] = ByteBuffer.zigZagDecode64(val["value"]);
                else
                    val = ByteBuffer.zigZagDecode64(val);
                return val;
            };

        } // Long


        // types/strings/cstring

        /**
         * Writes a NULL-terminated UTF8 encoded string. For this to work the specified string must not contain any NULL
         *  characters itself.
         * @param {string} str String to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  contained in `str` + 1 if omitted.
         * @returns {!ByteBuffer|number} this if offset is omitted, else the actual number of bytes written
         * @expose
         */
        ByteBufferPrototype.writeCString = function(str, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            var i,
                k = str.length;
            if (!this.noAssert) {
                if (typeof str !== 'string')
                    throw TypeError("Illegal str: Not a string");
                for (i=0; i<k; ++i) {
                    if (str.charCodeAt(i) === 0)
                        throw RangeError("Illegal str: Contains NULL-characters");
                }
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            // UTF8 strings do not contain zero bytes in between except for the zero character, so:
            k = utfx.calculateUTF16asUTF8(stringSource(str))[1];
            offset += k+1;
            var capacity12 = this.buffer.byteLength;
            if (offset > capacity12)
                this.resize((capacity12 *= 2) > offset ? capacity12 : offset);
            offset -= k+1;
            utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
                this.view[offset++] = b;
            }.bind(this));
            this.view[offset++] = 0;
            if (relative) {
                this.offset = offset;
                return this;
            }
            return k;
        };

        /**
         * Reads a NULL-terminated UTF8 encoded string. For this to work the string read must not contain any NULL characters
         *  itself.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  read if omitted.
         * @returns {string|!{string: string, length: number}} The string read if offset is omitted, else the string
         *  read and the actual number of bytes read.
         * @expose
         */
        ByteBufferPrototype.readCString = function(offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 1 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.byteLength);
            }
            var start = offset,
                temp;
            // UTF8 strings do not contain zero bytes in between except for the zero character itself, so:
            var sd, b = -1;
            utfx.decodeUTF8toUTF16(function() {
                if (b === 0) return null;
                if (offset >= this.limit)
                    throw RangeError("Illegal range: Truncated data, "+offset+" < "+this.limit);
                b = this.view[offset++];
                return b === 0 ? null : b;
            }.bind(this), sd = stringDestination(), true);
            if (relative) {
                this.offset = offset;
                return sd();
            } else {
                return {
                    "string": sd(),
                    "length": offset - start
                };
            }
        };

        // types/strings/istring

        /**
         * Writes a length as uint32 prefixed UTF8 encoded string.
         * @param {string} str String to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  written if omitted.
         * @returns {!ByteBuffer|number} `this` if `offset` is omitted, else the actual number of bytes written
         * @expose
         * @see ByteBuffer#writeVarint32
         */
        ByteBufferPrototype.writeIString = function(str, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof str !== 'string')
                    throw TypeError("Illegal str: Not a string");
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            var start = offset,
                k;
            k = utfx.calculateUTF16asUTF8(stringSource(str), this.noAssert)[1];
            offset += 4+k;
            var capacity13 = this.buffer.byteLength;
            if (offset > capacity13)
                this.resize((capacity13 *= 2) > offset ? capacity13 : offset);
            offset -= 4+k;
            if (this.littleEndian) {
                this.view[offset+3] = (k >>> 24) & 0xFF;
                this.view[offset+2] = (k >>> 16) & 0xFF;
                this.view[offset+1] = (k >>>  8) & 0xFF;
                this.view[offset  ] =  k         & 0xFF;
            } else {
                this.view[offset  ] = (k >>> 24) & 0xFF;
                this.view[offset+1] = (k >>> 16) & 0xFF;
                this.view[offset+2] = (k >>>  8) & 0xFF;
                this.view[offset+3] =  k         & 0xFF;
            }
            offset += 4;
            utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
                this.view[offset++] = b;
            }.bind(this));
            if (offset !== start + 4 + k)
                throw RangeError("Illegal range: Truncated data, "+offset+" == "+(offset+4+k));
            if (relative) {
                this.offset = offset;
                return this;
            }
            return offset - start;
        };

        /**
         * Reads a length as uint32 prefixed UTF8 encoded string.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  read if omitted.
         * @returns {string|!{string: string, length: number}} The string read if offset is omitted, else the string
         *  read and the actual number of bytes read.
         * @expose
         * @see ByteBuffer#readVarint32
         */
        ByteBufferPrototype.readIString = function(offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 4 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+4+") <= "+this.buffer.byteLength);
            }
            var start = offset;
            var len = this.readUint32(offset);
            var str = this.readUTF8String(len, ByteBuffer.METRICS_BYTES, offset += 4);
            offset += str['length'];
            if (relative) {
                this.offset = offset;
                return str['string'];
            } else {
                return {
                    'string': str['string'],
                    'length': offset - start
                };
            }
        };

        // types/strings/utf8string

        /**
         * Metrics representing number of UTF8 characters. Evaluates to `c`.
         * @type {string}
         * @const
         * @expose
         */
        ByteBuffer.METRICS_CHARS = 'c';

        /**
         * Metrics representing number of bytes. Evaluates to `b`.
         * @type {string}
         * @const
         * @expose
         */
        ByteBuffer.METRICS_BYTES = 'b';

        /**
         * Writes an UTF8 encoded string.
         * @param {string} str String to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} if omitted.
         * @returns {!ByteBuffer|number} this if offset is omitted, else the actual number of bytes written.
         * @expose
         */
        ByteBufferPrototype.writeUTF8String = function(str, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            var k;
            var start = offset;
            k = utfx.calculateUTF16asUTF8(stringSource(str))[1];
            offset += k;
            var capacity14 = this.buffer.byteLength;
            if (offset > capacity14)
                this.resize((capacity14 *= 2) > offset ? capacity14 : offset);
            offset -= k;
            utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
                this.view[offset++] = b;
            }.bind(this));
            if (relative) {
                this.offset = offset;
                return this;
            }
            return offset - start;
        };

        /**
         * Writes an UTF8 encoded string. This is an alias of {@link ByteBuffer#writeUTF8String}.
         * @function
         * @param {string} str String to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} if omitted.
         * @returns {!ByteBuffer|number} this if offset is omitted, else the actual number of bytes written.
         * @expose
         */
        ByteBufferPrototype.writeString = ByteBufferPrototype.writeUTF8String;

        /**
         * Calculates the number of UTF8 characters of a string. JavaScript itself uses UTF-16, so that a string's
         *  `length` property does not reflect its actual UTF8 size if it contains code points larger than 0xFFFF.
         * @param {string} str String to calculate
         * @returns {number} Number of UTF8 characters
         * @expose
         */
        ByteBuffer.calculateUTF8Chars = function(str) {
            return utfx.calculateUTF16asUTF8(stringSource(str))[0];
        };

        /**
         * Calculates the number of UTF8 bytes of a string.
         * @param {string} str String to calculate
         * @returns {number} Number of UTF8 bytes
         * @expose
         */
        ByteBuffer.calculateUTF8Bytes = function(str) {
            return utfx.calculateUTF16asUTF8(stringSource(str))[1];
        };

        /**
         * Calculates the number of UTF8 bytes of a string. This is an alias of {@link ByteBuffer.calculateUTF8Bytes}.
         * @function
         * @param {string} str String to calculate
         * @returns {number} Number of UTF8 bytes
         * @expose
         */
        ByteBuffer.calculateString = ByteBuffer.calculateUTF8Bytes;

        /**
         * Reads an UTF8 encoded string.
         * @param {number} length Number of characters or bytes to read.
         * @param {string=} metrics Metrics specifying what `length` is meant to count. Defaults to
         *  {@link ByteBuffer.METRICS_CHARS}.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  read if omitted.
         * @returns {string|!{string: string, length: number}} The string read if offset is omitted, else the string
         *  read and the actual number of bytes read.
         * @expose
         */
        ByteBufferPrototype.readUTF8String = function(length, metrics, offset) {
            if (typeof metrics === 'number') {
                offset = metrics;
                metrics = undefined;
            }
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (typeof metrics === 'undefined') metrics = ByteBuffer.METRICS_CHARS;
            if (!this.noAssert) {
                if (typeof length !== 'number' || length % 1 !== 0)
                    throw TypeError("Illegal length: "+length+" (not an integer)");
                length |= 0;
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            var i = 0,
                start = offset,
                sd;
            if (metrics === ByteBuffer.METRICS_CHARS) { // The same for node and the browser
                sd = stringDestination();
                utfx.decodeUTF8(function() {
                    return i < length && offset < this.limit ? this.view[offset++] : null;
                }.bind(this), function(cp) {
                    ++i; utfx.UTF8toUTF16(cp, sd);
                });
                if (i !== length)
                    throw RangeError("Illegal range: Truncated data, "+i+" == "+length);
                if (relative) {
                    this.offset = offset;
                    return sd();
                } else {
                    return {
                        "string": sd(),
                        "length": offset - start
                    };
                }
            } else if (metrics === ByteBuffer.METRICS_BYTES) {
                if (!this.noAssert) {
                    if (typeof offset !== 'number' || offset % 1 !== 0)
                        throw TypeError("Illegal offset: "+offset+" (not an integer)");
                    offset >>>= 0;
                    if (offset < 0 || offset + length > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= "+offset+" (+"+length+") <= "+this.buffer.byteLength);
                }
                var k = offset + length;
                utfx.decodeUTF8toUTF16(function() {
                    return offset < k ? this.view[offset++] : null;
                }.bind(this), sd = stringDestination(), this.noAssert);
                if (offset !== k)
                    throw RangeError("Illegal range: Truncated data, "+offset+" == "+k);
                if (relative) {
                    this.offset = offset;
                    return sd();
                } else {
                    return {
                        'string': sd(),
                        'length': offset - start
                    };
                }
            } else
                throw TypeError("Unsupported metrics: "+metrics);
        };

        /**
         * Reads an UTF8 encoded string. This is an alias of {@link ByteBuffer#readUTF8String}.
         * @function
         * @param {number} length Number of characters or bytes to read
         * @param {number=} metrics Metrics specifying what `n` is meant to count. Defaults to
         *  {@link ByteBuffer.METRICS_CHARS}.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  read if omitted.
         * @returns {string|!{string: string, length: number}} The string read if offset is omitted, else the string
         *  read and the actual number of bytes read.
         * @expose
         */
        ByteBufferPrototype.readString = ByteBufferPrototype.readUTF8String;

        // types/strings/vstring

        /**
         * Writes a length as varint32 prefixed UTF8 encoded string.
         * @param {string} str String to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  written if omitted.
         * @returns {!ByteBuffer|number} `this` if `offset` is omitted, else the actual number of bytes written
         * @expose
         * @see ByteBuffer#writeVarint32
         */
        ByteBufferPrototype.writeVString = function(str, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof str !== 'string')
                    throw TypeError("Illegal str: Not a string");
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            var start = offset,
                k, l;
            k = utfx.calculateUTF16asUTF8(stringSource(str), this.noAssert)[1];
            l = ByteBuffer.calculateVarint32(k);
            offset += l+k;
            var capacity15 = this.buffer.byteLength;
            if (offset > capacity15)
                this.resize((capacity15 *= 2) > offset ? capacity15 : offset);
            offset -= l+k;
            offset += this.writeVarint32(k, offset);
            utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
                this.view[offset++] = b;
            }.bind(this));
            if (offset !== start+k+l)
                throw RangeError("Illegal range: Truncated data, "+offset+" == "+(offset+k+l));
            if (relative) {
                this.offset = offset;
                return this;
            }
            return offset - start;
        };

        /**
         * Reads a length as varint32 prefixed UTF8 encoded string.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  read if omitted.
         * @returns {string|!{string: string, length: number}} The string read if offset is omitted, else the string
         *  read and the actual number of bytes read.
         * @expose
         * @see ByteBuffer#readVarint32
         */
        ByteBufferPrototype.readVString = function(offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 1 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.byteLength);
            }
            var start = offset;
            var len = this.readVarint32(offset);
            var str = this.readUTF8String(len['value'], ByteBuffer.METRICS_BYTES, offset += len['length']);
            offset += str['length'];
            if (relative) {
                this.offset = offset;
                return str['string'];
            } else {
                return {
                    'string': str['string'],
                    'length': offset - start
                };
            }
        };


        /**
         * Appends some data to this ByteBuffer. This will overwrite any contents behind the specified offset up to the appended
         *  data's length.
         * @param {!ByteBuffer|!ArrayBuffer|!Uint8Array|string} source Data to append. If `source` is a ByteBuffer, its offsets
         *  will be modified according to the performed read operation.
         * @param {(string|number)=} encoding Encoding if `data` is a string ("base64", "hex", "binary", defaults to "utf8")
         * @param {number=} offset Offset to append at. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  written if omitted.
         * @returns {!ByteBuffer} this
         * @expose
         * @example A relative `<01 02>03.append(<04 05>)` will result in `<01 02 04 05>, 04 05|`
         * @example An absolute `<01 02>03.append(04 05>, 1)` will result in `<01 04>05, 04 05|`
         */
        ByteBufferPrototype.append = function(source, encoding, offset) {
            if (typeof encoding === 'number' || typeof encoding !== 'string') {
                offset = encoding;
                encoding = undefined;
            }
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            if (!(source instanceof ByteBuffer))
                source = ByteBuffer.wrap(source, encoding);
            var length = source.limit - source.offset;
            if (length <= 0) return this; // Nothing to append
            offset += length;
            var capacity16 = this.buffer.byteLength;
            if (offset > capacity16)
                this.resize((capacity16 *= 2) > offset ? capacity16 : offset);
            offset -= length;
            this.view.set(source.view.subarray(source.offset, source.limit), offset);
            source.offset += length;
            if (relative) this.offset += length;
            return this;
        };

        /**
         * Appends this ByteBuffer's contents to another ByteBuffer. This will overwrite any contents at and after the
            specified offset up to the length of this ByteBuffer's data.
         * @param {!ByteBuffer} target Target ByteBuffer
         * @param {number=} offset Offset to append to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  read if omitted.
         * @returns {!ByteBuffer} this
         * @expose
         * @see ByteBuffer#append
         */
        ByteBufferPrototype.appendTo = function(target, offset) {
            target.append(this, offset);
            return this;
        };

        /**
         * Enables or disables assertions of argument types and offsets. Assertions are enabled by default but you can opt to
         *  disable them if your code already makes sure that everything is valid.
         * @param {boolean} assert `true` to enable assertions, otherwise `false`
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.assert = function(assert) {
            this.noAssert = !assert;
            return this;
        };

        /**
         * Gets the capacity of this ByteBuffer's backing buffer.
         * @returns {number} Capacity of the backing buffer
         * @expose
         */
        ByteBufferPrototype.capacity = function() {
            return this.buffer.byteLength;
        };
        /**
         * Clears this ByteBuffer's offsets by setting {@link ByteBuffer#offset} to `0` and {@link ByteBuffer#limit} to the
         *  backing buffer's capacity. Discards {@link ByteBuffer#markedOffset}.
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.clear = function() {
            this.offset = 0;
            this.limit = this.buffer.byteLength;
            this.markedOffset = -1;
            return this;
        };

        /**
         * Creates a cloned instance of this ByteBuffer, preset with this ByteBuffer's values for {@link ByteBuffer#offset},
         *  {@link ByteBuffer#markedOffset} and {@link ByteBuffer#limit}.
         * @param {boolean=} copy Whether to copy the backing buffer or to return another view on the same, defaults to `false`
         * @returns {!ByteBuffer} Cloned instance
         * @expose
         */
        ByteBufferPrototype.clone = function(copy) {
            var bb = new ByteBuffer(0, this.littleEndian, this.noAssert);
            if (copy) {
                bb.buffer = new ArrayBuffer(this.buffer.byteLength);
                bb.view = new Uint8Array(bb.buffer);
            } else {
                bb.buffer = this.buffer;
                bb.view = this.view;
            }
            bb.offset = this.offset;
            bb.markedOffset = this.markedOffset;
            bb.limit = this.limit;
            return bb;
        };

        /**
         * Compacts this ByteBuffer to be backed by a {@link ByteBuffer#buffer} of its contents' length. Contents are the bytes
         *  between {@link ByteBuffer#offset} and {@link ByteBuffer#limit}. Will set `offset = 0` and `limit = capacity` and
         *  adapt {@link ByteBuffer#markedOffset} to the same relative position if set.
         * @param {number=} begin Offset to start at, defaults to {@link ByteBuffer#offset}
         * @param {number=} end Offset to end at, defaults to {@link ByteBuffer#limit}
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.compact = function(begin, end) {
            if (typeof begin === 'undefined') begin = this.offset;
            if (typeof end === 'undefined') end = this.limit;
            if (!this.noAssert) {
                if (typeof begin !== 'number' || begin % 1 !== 0)
                    throw TypeError("Illegal begin: Not an integer");
                begin >>>= 0;
                if (typeof end !== 'number' || end % 1 !== 0)
                    throw TypeError("Illegal end: Not an integer");
                end >>>= 0;
                if (begin < 0 || begin > end || end > this.buffer.byteLength)
                    throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);
            }
            if (begin === 0 && end === this.buffer.byteLength)
                return this; // Already compacted
            var len = end - begin;
            if (len === 0) {
                this.buffer = EMPTY_BUFFER;
                this.view = null;
                if (this.markedOffset >= 0) this.markedOffset -= begin;
                this.offset = 0;
                this.limit = 0;
                return this;
            }
            var buffer = new ArrayBuffer(len);
            var view = new Uint8Array(buffer);
            view.set(this.view.subarray(begin, end));
            this.buffer = buffer;
            this.view = view;
            if (this.markedOffset >= 0) this.markedOffset -= begin;
            this.offset = 0;
            this.limit = len;
            return this;
        };

        /**
         * Creates a copy of this ByteBuffer's contents. Contents are the bytes between {@link ByteBuffer#offset} and
         *  {@link ByteBuffer#limit}.
         * @param {number=} begin Begin offset, defaults to {@link ByteBuffer#offset}.
         * @param {number=} end End offset, defaults to {@link ByteBuffer#limit}.
         * @returns {!ByteBuffer} Copy
         * @expose
         */
        ByteBufferPrototype.copy = function(begin, end) {
            if (typeof begin === 'undefined') begin = this.offset;
            if (typeof end === 'undefined') end = this.limit;
            if (!this.noAssert) {
                if (typeof begin !== 'number' || begin % 1 !== 0)
                    throw TypeError("Illegal begin: Not an integer");
                begin >>>= 0;
                if (typeof end !== 'number' || end % 1 !== 0)
                    throw TypeError("Illegal end: Not an integer");
                end >>>= 0;
                if (begin < 0 || begin > end || end > this.buffer.byteLength)
                    throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);
            }
            if (begin === end)
                return new ByteBuffer(0, this.littleEndian, this.noAssert);
            var capacity = end - begin,
                bb = new ByteBuffer(capacity, this.littleEndian, this.noAssert);
            bb.offset = 0;
            bb.limit = capacity;
            if (bb.markedOffset >= 0) bb.markedOffset -= begin;
            this.copyTo(bb, 0, begin, end);
            return bb;
        };

        /**
         * Copies this ByteBuffer's contents to another ByteBuffer. Contents are the bytes between {@link ByteBuffer#offset} and
         *  {@link ByteBuffer#limit}.
         * @param {!ByteBuffer} target Target ByteBuffer
         * @param {number=} targetOffset Offset to copy to. Will use and increase the target's {@link ByteBuffer#offset}
         *  by the number of bytes copied if omitted.
         * @param {number=} sourceOffset Offset to start copying from. Will use and increase {@link ByteBuffer#offset} by the
         *  number of bytes copied if omitted.
         * @param {number=} sourceLimit Offset to end copying from, defaults to {@link ByteBuffer#limit}
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.copyTo = function(target, targetOffset, sourceOffset, sourceLimit) {
            var relative,
                targetRelative;
            if (!this.noAssert) {
                if (!ByteBuffer.isByteBuffer(target))
                    throw TypeError("Illegal target: Not a ByteBuffer");
            }
            targetOffset = (targetRelative = typeof targetOffset === 'undefined') ? target.offset : targetOffset | 0;
            sourceOffset = (relative = typeof sourceOffset === 'undefined') ? this.offset : sourceOffset | 0;
            sourceLimit = typeof sourceLimit === 'undefined' ? this.limit : sourceLimit | 0;

            if (targetOffset < 0 || targetOffset > target.buffer.byteLength)
                throw RangeError("Illegal target range: 0 <= "+targetOffset+" <= "+target.buffer.byteLength);
            if (sourceOffset < 0 || sourceLimit > this.buffer.byteLength)
                throw RangeError("Illegal source range: 0 <= "+sourceOffset+" <= "+this.buffer.byteLength);

            var len = sourceLimit - sourceOffset;
            if (len === 0)
                return target; // Nothing to copy

            target.ensureCapacity(targetOffset + len);

            target.view.set(this.view.subarray(sourceOffset, sourceLimit), targetOffset);

            if (relative) this.offset += len;
            if (targetRelative) target.offset += len;

            return this;
        };

        /**
         * Makes sure that this ByteBuffer is backed by a {@link ByteBuffer#buffer} of at least the specified capacity. If the
         *  current capacity is exceeded, it will be doubled. If double the current capacity is less than the required capacity,
         *  the required capacity will be used instead.
         * @param {number} capacity Required capacity
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.ensureCapacity = function(capacity) {
            var current = this.buffer.byteLength;
            if (current < capacity)
                return this.resize((current *= 2) > capacity ? current : capacity);
            return this;
        };

        /**
         * Overwrites this ByteBuffer's contents with the specified value. Contents are the bytes between
         *  {@link ByteBuffer#offset} and {@link ByteBuffer#limit}.
         * @param {number|string} value Byte value to fill with. If given as a string, the first character is used.
         * @param {number=} begin Begin offset. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  written if omitted. defaults to {@link ByteBuffer#offset}.
         * @param {number=} end End offset, defaults to {@link ByteBuffer#limit}.
         * @returns {!ByteBuffer} this
         * @expose
         * @example `someByteBuffer.clear().fill(0)` fills the entire backing buffer with zeroes
         */
        ByteBufferPrototype.fill = function(value, begin, end) {
            var relative = typeof begin === 'undefined';
            if (relative) begin = this.offset;
            if (typeof value === 'string' && value.length > 0)
                value = value.charCodeAt(0);
            if (typeof begin === 'undefined') begin = this.offset;
            if (typeof end === 'undefined') end = this.limit;
            if (!this.noAssert) {
                if (typeof value !== 'number' || value % 1 !== 0)
                    throw TypeError("Illegal value: "+value+" (not an integer)");
                value |= 0;
                if (typeof begin !== 'number' || begin % 1 !== 0)
                    throw TypeError("Illegal begin: Not an integer");
                begin >>>= 0;
                if (typeof end !== 'number' || end % 1 !== 0)
                    throw TypeError("Illegal end: Not an integer");
                end >>>= 0;
                if (begin < 0 || begin > end || end > this.buffer.byteLength)
                    throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);
            }
            if (begin >= end)
                return this; // Nothing to fill
            while (begin < end) this.view[begin++] = value;
            if (relative) this.offset = begin;
            return this;
        };

        /**
         * Makes this ByteBuffer ready for a new sequence of write or relative read operations. Sets `limit = offset` and
         *  `offset = 0`. Make sure always to flip a ByteBuffer when all relative read or write operations are complete.
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.flip = function() {
            this.limit = this.offset;
            this.offset = 0;
            return this;
        };
        /**
         * Marks an offset on this ByteBuffer to be used later.
         * @param {number=} offset Offset to mark. Defaults to {@link ByteBuffer#offset}.
         * @returns {!ByteBuffer} this
         * @throws {TypeError} If `offset` is not a valid number
         * @throws {RangeError} If `offset` is out of bounds
         * @see ByteBuffer#reset
         * @expose
         */
        ByteBufferPrototype.mark = function(offset) {
            offset = typeof offset === 'undefined' ? this.offset : offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            this.markedOffset = offset;
            return this;
        };
        /**
         * Sets the byte order.
         * @param {boolean} littleEndian `true` for little endian byte order, `false` for big endian
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.order = function(littleEndian) {
            if (!this.noAssert) {
                if (typeof littleEndian !== 'boolean')
                    throw TypeError("Illegal littleEndian: Not a boolean");
            }
            this.littleEndian = !!littleEndian;
            return this;
        };

        /**
         * Switches (to) little endian byte order.
         * @param {boolean=} littleEndian Defaults to `true`, otherwise uses big endian
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.LE = function(littleEndian) {
            this.littleEndian = typeof littleEndian !== 'undefined' ? !!littleEndian : true;
            return this;
        };

        /**
         * Switches (to) big endian byte order.
         * @param {boolean=} bigEndian Defaults to `true`, otherwise uses little endian
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.BE = function(bigEndian) {
            this.littleEndian = typeof bigEndian !== 'undefined' ? !bigEndian : false;
            return this;
        };
        /**
         * Prepends some data to this ByteBuffer. This will overwrite any contents before the specified offset up to the
         *  prepended data's length. If there is not enough space available before the specified `offset`, the backing buffer
         *  will be resized and its contents moved accordingly.
         * @param {!ByteBuffer|string|!ArrayBuffer} source Data to prepend. If `source` is a ByteBuffer, its offset will be
         *  modified according to the performed read operation.
         * @param {(string|number)=} encoding Encoding if `data` is a string ("base64", "hex", "binary", defaults to "utf8")
         * @param {number=} offset Offset to prepend at. Will use and decrease {@link ByteBuffer#offset} by the number of bytes
         *  prepended if omitted.
         * @returns {!ByteBuffer} this
         * @expose
         * @example A relative `00<01 02 03>.prepend(<04 05>)` results in `<04 05 01 02 03>, 04 05|`
         * @example An absolute `00<01 02 03>.prepend(<04 05>, 2)` results in `04<05 02 03>, 04 05|`
         */
        ByteBufferPrototype.prepend = function(source, encoding, offset) {
            if (typeof encoding === 'number' || typeof encoding !== 'string') {
                offset = encoding;
                encoding = undefined;
            }
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            if (!(source instanceof ByteBuffer))
                source = ByteBuffer.wrap(source, encoding);
            var len = source.limit - source.offset;
            if (len <= 0) return this; // Nothing to prepend
            var diff = len - offset;
            if (diff > 0) { // Not enough space before offset, so resize + move
                var buffer = new ArrayBuffer(this.buffer.byteLength + diff);
                var view = new Uint8Array(buffer);
                view.set(this.view.subarray(offset, this.buffer.byteLength), len);
                this.buffer = buffer;
                this.view = view;
                this.offset += diff;
                if (this.markedOffset >= 0) this.markedOffset += diff;
                this.limit += diff;
                offset += diff;
            } else {
                var arrayView = new Uint8Array(this.buffer);
            }
            this.view.set(source.view.subarray(source.offset, source.limit), offset - len);

            source.offset = source.limit;
            if (relative)
                this.offset -= len;
            return this;
        };

        /**
         * Prepends this ByteBuffer to another ByteBuffer. This will overwrite any contents before the specified offset up to the
         *  prepended data's length. If there is not enough space available before the specified `offset`, the backing buffer
         *  will be resized and its contents moved accordingly.
         * @param {!ByteBuffer} target Target ByteBuffer
         * @param {number=} offset Offset to prepend at. Will use and decrease {@link ByteBuffer#offset} by the number of bytes
         *  prepended if omitted.
         * @returns {!ByteBuffer} this
         * @expose
         * @see ByteBuffer#prepend
         */
        ByteBufferPrototype.prependTo = function(target, offset) {
            target.prepend(this, offset);
            return this;
        };
        /**
         * Prints debug information about this ByteBuffer's contents.
         * @param {function(string)=} out Output function to call, defaults to console.log
         * @expose
         */
        ByteBufferPrototype.printDebug = function(out) {
            if (typeof out !== 'function') out = console.log.bind(console);
            out(
                this.toString()+"\n"+
                "-------------------------------------------------------------------\n"+
                this.toDebug(/* columns */ true)
            );
        };

        /**
         * Gets the number of remaining readable bytes. Contents are the bytes between {@link ByteBuffer#offset} and
         *  {@link ByteBuffer#limit}, so this returns `limit - offset`.
         * @returns {number} Remaining readable bytes. May be negative if `offset > limit`.
         * @expose
         */
        ByteBufferPrototype.remaining = function() {
            return this.limit - this.offset;
        };
        /**
         * Resets this ByteBuffer's {@link ByteBuffer#offset}. If an offset has been marked through {@link ByteBuffer#mark}
         *  before, `offset` will be set to {@link ByteBuffer#markedOffset}, which will then be discarded. If no offset has been
         *  marked, sets `offset = 0`.
         * @returns {!ByteBuffer} this
         * @see ByteBuffer#mark
         * @expose
         */
        ByteBufferPrototype.reset = function() {
            if (this.markedOffset >= 0) {
                this.offset = this.markedOffset;
                this.markedOffset = -1;
            } else {
                this.offset = 0;
            }
            return this;
        };
        /**
         * Resizes this ByteBuffer to be backed by a buffer of at least the given capacity. Will do nothing if already that
         *  large or larger.
         * @param {number} capacity Capacity required
         * @returns {!ByteBuffer} this
         * @throws {TypeError} If `capacity` is not a number
         * @throws {RangeError} If `capacity < 0`
         * @expose
         */
        ByteBufferPrototype.resize = function(capacity) {
            if (!this.noAssert) {
                if (typeof capacity !== 'number' || capacity % 1 !== 0)
                    throw TypeError("Illegal capacity: "+capacity+" (not an integer)");
                capacity |= 0;
                if (capacity < 0)
                    throw RangeError("Illegal capacity: 0 <= "+capacity);
            }
            if (this.buffer.byteLength < capacity) {
                var buffer = new ArrayBuffer(capacity);
                var view = new Uint8Array(buffer);
                view.set(this.view);
                this.buffer = buffer;
                this.view = view;
            }
            return this;
        };
        /**
         * Reverses this ByteBuffer's contents.
         * @param {number=} begin Offset to start at, defaults to {@link ByteBuffer#offset}
         * @param {number=} end Offset to end at, defaults to {@link ByteBuffer#limit}
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.reverse = function(begin, end) {
            if (typeof begin === 'undefined') begin = this.offset;
            if (typeof end === 'undefined') end = this.limit;
            if (!this.noAssert) {
                if (typeof begin !== 'number' || begin % 1 !== 0)
                    throw TypeError("Illegal begin: Not an integer");
                begin >>>= 0;
                if (typeof end !== 'number' || end % 1 !== 0)
                    throw TypeError("Illegal end: Not an integer");
                end >>>= 0;
                if (begin < 0 || begin > end || end > this.buffer.byteLength)
                    throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);
            }
            if (begin === end)
                return this; // Nothing to reverse
            Array.prototype.reverse.call(this.view.subarray(begin, end));
            return this;
        };
        /**
         * Skips the next `length` bytes. This will just advance
         * @param {number} length Number of bytes to skip. May also be negative to move the offset back.
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.skip = function(length) {
            if (!this.noAssert) {
                if (typeof length !== 'number' || length % 1 !== 0)
                    throw TypeError("Illegal length: "+length+" (not an integer)");
                length |= 0;
            }
            var offset = this.offset + length;
            if (!this.noAssert) {
                if (offset < 0 || offset > this.buffer.byteLength)
                    throw RangeError("Illegal length: 0 <= "+this.offset+" + "+length+" <= "+this.buffer.byteLength);
            }
            this.offset = offset;
            return this;
        };

        /**
         * Slices this ByteBuffer by creating a cloned instance with `offset = begin` and `limit = end`.
         * @param {number=} begin Begin offset, defaults to {@link ByteBuffer#offset}.
         * @param {number=} end End offset, defaults to {@link ByteBuffer#limit}.
         * @returns {!ByteBuffer} Clone of this ByteBuffer with slicing applied, backed by the same {@link ByteBuffer#buffer}
         * @expose
         */
        ByteBufferPrototype.slice = function(begin, end) {
            if (typeof begin === 'undefined') begin = this.offset;
            if (typeof end === 'undefined') end = this.limit;
            if (!this.noAssert) {
                if (typeof begin !== 'number' || begin % 1 !== 0)
                    throw TypeError("Illegal begin: Not an integer");
                begin >>>= 0;
                if (typeof end !== 'number' || end % 1 !== 0)
                    throw TypeError("Illegal end: Not an integer");
                end >>>= 0;
                if (begin < 0 || begin > end || end > this.buffer.byteLength)
                    throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);
            }
            var bb = this.clone();
            bb.offset = begin;
            bb.limit = end;
            return bb;
        };
        /**
         * Returns a copy of the backing buffer that contains this ByteBuffer's contents. Contents are the bytes between
         *  {@link ByteBuffer#offset} and {@link ByteBuffer#limit}.
         * @param {boolean=} forceCopy If `true` returns a copy, otherwise returns a view referencing the same memory if
         *  possible. Defaults to `false`
         * @returns {!ArrayBuffer} Contents as an ArrayBuffer
         * @expose
         */
        ByteBufferPrototype.toBuffer = function(forceCopy) {
            var offset = this.offset,
                limit = this.limit;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: Not an integer");
                offset >>>= 0;
                if (typeof limit !== 'number' || limit % 1 !== 0)
                    throw TypeError("Illegal limit: Not an integer");
                limit >>>= 0;
                if (offset < 0 || offset > limit || limit > this.buffer.byteLength)
                    throw RangeError("Illegal range: 0 <= "+offset+" <= "+limit+" <= "+this.buffer.byteLength);
            }
            // NOTE: It's not possible to have another ArrayBuffer reference the same memory as the backing buffer. This is
            // possible with Uint8Array#subarray only, but we have to return an ArrayBuffer by contract. So:
            if (!forceCopy && offset === 0 && limit === this.buffer.byteLength)
                return this.buffer;
            if (offset === limit)
                return EMPTY_BUFFER;
            var buffer = new ArrayBuffer(limit - offset);
            new Uint8Array(buffer).set(new Uint8Array(this.buffer).subarray(offset, limit), 0);
            return buffer;
        };

        /**
         * Returns a raw buffer compacted to contain this ByteBuffer's contents. Contents are the bytes between
         *  {@link ByteBuffer#offset} and {@link ByteBuffer#limit}. This is an alias of {@link ByteBuffer#toBuffer}.
         * @function
         * @param {boolean=} forceCopy If `true` returns a copy, otherwise returns a view referencing the same memory.
         *  Defaults to `false`
         * @returns {!ArrayBuffer} Contents as an ArrayBuffer
         * @expose
         */
        ByteBufferPrototype.toArrayBuffer = ByteBufferPrototype.toBuffer;

        /**
         * Converts the ByteBuffer's contents to a string.
         * @param {string=} encoding Output encoding. Returns an informative string representation if omitted but also allows
         *  direct conversion to "utf8", "hex", "base64" and "binary" encoding. "debug" returns a hex representation with
         *  highlighted offsets.
         * @param {number=} begin Offset to begin at, defaults to {@link ByteBuffer#offset}
         * @param {number=} end Offset to end at, defaults to {@link ByteBuffer#limit}
         * @returns {string} String representation
         * @throws {Error} If `encoding` is invalid
         * @expose
         */
        ByteBufferPrototype.toString = function(encoding, begin, end) {
            if (typeof encoding === 'undefined')
                return "ByteBufferAB(offset="+this.offset+",markedOffset="+this.markedOffset+",limit="+this.limit+",capacity="+this.capacity()+")";
            if (typeof encoding === 'number')
                encoding = "utf8",
                begin = encoding,
                end = begin;
            switch (encoding) {
                case "utf8":
                    return this.toUTF8(begin, end);
                case "base64":
                    return this.toBase64(begin, end);
                case "hex":
                    return this.toHex(begin, end);
                case "binary":
                    return this.toBinary(begin, end);
                case "debug":
                    return this.toDebug();
                case "columns":
                    return this.toColumns();
                default:
                    throw Error("Unsupported encoding: "+encoding);
            }
        };

        // lxiv-embeddable

        /**
         * lxiv-embeddable (c) 2014 Daniel Wirtz <dcode@dcode.io>
         * Released under the Apache License, Version 2.0
         * see: https://github.com/dcodeIO/lxiv for details
         */
        var lxiv = function() {
            "use strict";

            /**
             * lxiv namespace.
             * @type {!Object.<string,*>}
             * @exports lxiv
             */
            var lxiv = {};

            /**
             * Character codes for output.
             * @type {!Array.<number>}
             * @inner
             */
            var aout = [
                65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
                81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102,
                103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118,
                119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47
            ];

            /**
             * Character codes for input.
             * @type {!Array.<number>}
             * @inner
             */
            var ain = [];
            for (var i=0, k=aout.length; i<k; ++i)
                ain[aout[i]] = i;

            /**
             * Encodes bytes to base64 char codes.
             * @param {!function():number|null} src Bytes source as a function returning the next byte respectively `null` if
             *  there are no more bytes left.
             * @param {!function(number)} dst Characters destination as a function successively called with each encoded char
             *  code.
             */
            lxiv.encode = function(src, dst) {
                var b, t;
                while ((b = src()) !== null) {
                    dst(aout[(b>>2)&0x3f]);
                    t = (b&0x3)<<4;
                    if ((b = src()) !== null) {
                        t |= (b>>4)&0xf;
                        dst(aout[(t|((b>>4)&0xf))&0x3f]);
                        t = (b&0xf)<<2;
                        if ((b = src()) !== null)
                            dst(aout[(t|((b>>6)&0x3))&0x3f]),
                            dst(aout[b&0x3f]);
                        else
                            dst(aout[t&0x3f]),
                            dst(61);
                    } else
                        dst(aout[t&0x3f]),
                        dst(61),
                        dst(61);
                }
            };

            /**
             * Decodes base64 char codes to bytes.
             * @param {!function():number|null} src Characters source as a function returning the next char code respectively
             *  `null` if there are no more characters left.
             * @param {!function(number)} dst Bytes destination as a function successively called with the next byte.
             * @throws {Error} If a character code is invalid
             */
            lxiv.decode = function(src, dst) {
                var c, t1, t2;
                function fail(c) {
                    throw Error("Illegal character code: "+c);
                }
                while ((c = src()) !== null) {
                    t1 = ain[c];
                    if (typeof t1 === 'undefined') fail(c);
                    if ((c = src()) !== null) {
                        t2 = ain[c];
                        if (typeof t2 === 'undefined') fail(c);
                        dst((t1<<2)>>>0|(t2&0x30)>>4);
                        if ((c = src()) !== null) {
                            t1 = ain[c];
                            if (typeof t1 === 'undefined')
                                if (c === 61) break; else fail(c);
                            dst(((t2&0xf)<<4)>>>0|(t1&0x3c)>>2);
                            if ((c = src()) !== null) {
                                t2 = ain[c];
                                if (typeof t2 === 'undefined')
                                    if (c === 61) break; else fail(c);
                                dst(((t1&0x3)<<6)>>>0|t2);
                            }
                        }
                    }
                }
            };

            /**
             * Tests if a string is valid base64.
             * @param {string} str String to test
             * @returns {boolean} `true` if valid, otherwise `false`
             */
            lxiv.test = function(str) {
                return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(str);
            };

            return lxiv;
        }();

        // encodings/base64

        /**
         * Encodes this ByteBuffer's contents to a base64 encoded string.
         * @param {number=} begin Offset to begin at, defaults to {@link ByteBuffer#offset}.
         * @param {number=} end Offset to end at, defaults to {@link ByteBuffer#limit}.
         * @returns {string} Base64 encoded string
         * @throws {RangeError} If `begin` or `end` is out of bounds
         * @expose
         */
        ByteBufferPrototype.toBase64 = function(begin, end) {
            if (typeof begin === 'undefined')
                begin = this.offset;
            if (typeof end === 'undefined')
                end = this.limit;
            begin = begin | 0; end = end | 0;
            if (begin < 0 || end > this.capacity || begin > end)
                throw RangeError("begin, end");
            var sd; lxiv.encode(function() {
                return begin < end ? this.view[begin++] : null;
            }.bind(this), sd = stringDestination());
            return sd();
        };

        /**
         * Decodes a base64 encoded string to a ByteBuffer.
         * @param {string} str String to decode
         * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
         *  {@link ByteBuffer.DEFAULT_ENDIAN}.
         * @returns {!ByteBuffer} ByteBuffer
         * @expose
         */
        ByteBuffer.fromBase64 = function(str, littleEndian) {
            if (typeof str !== 'string')
                throw TypeError("str");
            var bb = new ByteBuffer(str.length/4*3, littleEndian),
                i = 0;
            lxiv.decode(stringSource(str), function(b) {
                bb.view[i++] = b;
            });
            bb.limit = i;
            return bb;
        };

        /**
         * Encodes a binary string to base64 like `window.btoa` does.
         * @param {string} str Binary string
         * @returns {string} Base64 encoded string
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Window.btoa
         * @expose
         */
        ByteBuffer.btoa = function(str) {
            return ByteBuffer.fromBinary(str).toBase64();
        };

        /**
         * Decodes a base64 encoded string to binary like `window.atob` does.
         * @param {string} b64 Base64 encoded string
         * @returns {string} Binary string
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Window.atob
         * @expose
         */
        ByteBuffer.atob = function(b64) {
            return ByteBuffer.fromBase64(b64).toBinary();
        };

        // encodings/binary

        /**
         * Encodes this ByteBuffer to a binary encoded string, that is using only characters 0x00-0xFF as bytes.
         * @param {number=} begin Offset to begin at. Defaults to {@link ByteBuffer#offset}.
         * @param {number=} end Offset to end at. Defaults to {@link ByteBuffer#limit}.
         * @returns {string} Binary encoded string
         * @throws {RangeError} If `offset > limit`
         * @expose
         */
        ByteBufferPrototype.toBinary = function(begin, end) {
            if (typeof begin === 'undefined')
                begin = this.offset;
            if (typeof end === 'undefined')
                end = this.limit;
            begin |= 0; end |= 0;
            if (begin < 0 || end > this.capacity() || begin > end)
                throw RangeError("begin, end");
            if (begin === end)
                return "";
            var chars = [],
                parts = [];
            while (begin < end) {
                chars.push(this.view[begin++]);
                if (chars.length >= 1024)
                    parts.push(String.fromCharCode.apply(String, chars)),
                    chars = [];
            }
            return parts.join('') + String.fromCharCode.apply(String, chars);
        };

        /**
         * Decodes a binary encoded string, that is using only characters 0x00-0xFF as bytes, to a ByteBuffer.
         * @param {string} str String to decode
         * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
         *  {@link ByteBuffer.DEFAULT_ENDIAN}.
         * @returns {!ByteBuffer} ByteBuffer
         * @expose
         */
        ByteBuffer.fromBinary = function(str, littleEndian) {
            if (typeof str !== 'string')
                throw TypeError("str");
            var i = 0,
                k = str.length,
                charCode,
                bb = new ByteBuffer(k, littleEndian);
            while (i<k) {
                charCode = str.charCodeAt(i);
                if (charCode > 0xff)
                    throw RangeError("illegal char code: "+charCode);
                bb.view[i++] = charCode;
            }
            bb.limit = k;
            return bb;
        };

        // encodings/debug

        /**
         * Encodes this ByteBuffer to a hex encoded string with marked offsets. Offset symbols are:
         * * `<` : offset,
         * * `'` : markedOffset,
         * * `>` : limit,
         * * `|` : offset and limit,
         * * `[` : offset and markedOffset,
         * * `]` : markedOffset and limit,
         * * `!` : offset, markedOffset and limit
         * @param {boolean=} columns If `true` returns two columns hex + ascii, defaults to `false`
         * @returns {string|!Array.<string>} Debug string or array of lines if `asArray = true`
         * @expose
         * @example `>00'01 02<03` contains four bytes with `limit=0, markedOffset=1, offset=3`
         * @example `00[01 02 03>` contains four bytes with `offset=markedOffset=1, limit=4`
         * @example `00|01 02 03` contains four bytes with `offset=limit=1, markedOffset=-1`
         * @example `|` contains zero bytes with `offset=limit=0, markedOffset=-1`
         */
        ByteBufferPrototype.toDebug = function(columns) {
            var i = -1,
                k = this.buffer.byteLength,
                b,
                hex = "",
                asc = "",
                out = "";
            while (i<k) {
                if (i !== -1) {
                    b = this.view[i];
                    if (b < 0x10) hex += "0"+b.toString(16).toUpperCase();
                    else hex += b.toString(16).toUpperCase();
                    if (columns)
                        asc += b > 32 && b < 127 ? String.fromCharCode(b) : '.';
                }
                ++i;
                if (columns) {
                    if (i > 0 && i % 16 === 0 && i !== k) {
                        while (hex.length < 3*16+3) hex += " ";
                        out += hex+asc+"\n";
                        hex = asc = "";
                    }
                }
                if (i === this.offset && i === this.limit)
                    hex += i === this.markedOffset ? "!" : "|";
                else if (i === this.offset)
                    hex += i === this.markedOffset ? "[" : "<";
                else if (i === this.limit)
                    hex += i === this.markedOffset ? "]" : ">";
                else
                    hex += i === this.markedOffset ? "'" : (columns || (i !== 0 && i !== k) ? " " : "");
            }
            if (columns && hex !== " ") {
                while (hex.length < 3*16+3)
                    hex += " ";
                out += hex + asc + "\n";
            }
            return columns ? out : hex;
        };

        /**
         * Decodes a hex encoded string with marked offsets to a ByteBuffer.
         * @param {string} str Debug string to decode (not be generated with `columns = true`)
         * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
         *  {@link ByteBuffer.DEFAULT_ENDIAN}.
         * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
         *  {@link ByteBuffer.DEFAULT_NOASSERT}.
         * @returns {!ByteBuffer} ByteBuffer
         * @expose
         * @see ByteBuffer#toDebug
         */
        ByteBuffer.fromDebug = function(str, littleEndian, noAssert) {
            var k = str.length,
                bb = new ByteBuffer(((k+1)/3)|0, littleEndian, noAssert);
            var i = 0, j = 0, ch, b,
                rs = false, // Require symbol next
                ho = false, hm = false, hl = false, // Already has offset (ho), markedOffset (hm), limit (hl)?
                fail = false;
            while (i<k) {
                switch (ch = str.charAt(i++)) {
                    case '!':
                        if (!noAssert) {
                            if (ho || hm || hl) {
                                fail = true;
                                break;
                            }
                            ho = hm = hl = true;
                        }
                        bb.offset = bb.markedOffset = bb.limit = j;
                        rs = false;
                        break;
                    case '|':
                        if (!noAssert) {
                            if (ho || hl) {
                                fail = true;
                                break;
                            }
                            ho = hl = true;
                        }
                        bb.offset = bb.limit = j;
                        rs = false;
                        break;
                    case '[':
                        if (!noAssert) {
                            if (ho || hm) {
                                fail = true;
                                break;
                            }
                            ho = hm = true;
                        }
                        bb.offset = bb.markedOffset = j;
                        rs = false;
                        break;
                    case '<':
                        if (!noAssert) {
                            if (ho) {
                                fail = true;
                                break;
                            }
                            ho = true;
                        }
                        bb.offset = j;
                        rs = false;
                        break;
                    case ']':
                        if (!noAssert) {
                            if (hl || hm) {
                                fail = true;
                                break;
                            }
                            hl = hm = true;
                        }
                        bb.limit = bb.markedOffset = j;
                        rs = false;
                        break;
                    case '>':
                        if (!noAssert) {
                            if (hl) {
                                fail = true;
                                break;
                            }
                            hl = true;
                        }
                        bb.limit = j;
                        rs = false;
                        break;
                    case "'":
                        if (!noAssert) {
                            if (hm) {
                                fail = true;
                                break;
                            }
                            hm = true;
                        }
                        bb.markedOffset = j;
                        rs = false;
                        break;
                    case ' ':
                        rs = false;
                        break;
                    default:
                        if (!noAssert) {
                            if (rs) {
                                fail = true;
                                break;
                            }
                        }
                        b = parseInt(ch+str.charAt(i++), 16);
                        if (!noAssert) {
                            if (isNaN(b) || b < 0 || b > 255)
                                throw TypeError("Illegal str: Not a debug encoded string");
                        }
                        bb.view[j++] = b;
                        rs = true;
                }
                if (fail)
                    throw TypeError("Illegal str: Invalid symbol at "+i);
            }
            if (!noAssert) {
                if (!ho || !hl)
                    throw TypeError("Illegal str: Missing offset or limit");
                if (j<bb.buffer.byteLength)
                    throw TypeError("Illegal str: Not a debug encoded string (is it hex?) "+j+" < "+k);
            }
            return bb;
        };

        // encodings/hex

        /**
         * Encodes this ByteBuffer's contents to a hex encoded string.
         * @param {number=} begin Offset to begin at. Defaults to {@link ByteBuffer#offset}.
         * @param {number=} end Offset to end at. Defaults to {@link ByteBuffer#limit}.
         * @returns {string} Hex encoded string
         * @expose
         */
        ByteBufferPrototype.toHex = function(begin, end) {
            begin = typeof begin === 'undefined' ? this.offset : begin;
            end = typeof end === 'undefined' ? this.limit : end;
            if (!this.noAssert) {
                if (typeof begin !== 'number' || begin % 1 !== 0)
                    throw TypeError("Illegal begin: Not an integer");
                begin >>>= 0;
                if (typeof end !== 'number' || end % 1 !== 0)
                    throw TypeError("Illegal end: Not an integer");
                end >>>= 0;
                if (begin < 0 || begin > end || end > this.buffer.byteLength)
                    throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);
            }
            var out = new Array(end - begin),
                b;
            while (begin < end) {
                b = this.view[begin++];
                if (b < 0x10)
                    out.push("0", b.toString(16));
                else out.push(b.toString(16));
            }
            return out.join('');
        };

        /**
         * Decodes a hex encoded string to a ByteBuffer.
         * @param {string} str String to decode
         * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
         *  {@link ByteBuffer.DEFAULT_ENDIAN}.
         * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
         *  {@link ByteBuffer.DEFAULT_NOASSERT}.
         * @returns {!ByteBuffer} ByteBuffer
         * @expose
         */
        ByteBuffer.fromHex = function(str, littleEndian, noAssert) {
            if (!noAssert) {
                if (typeof str !== 'string')
                    throw TypeError("Illegal str: Not a string");
                if (str.length % 2 !== 0)
                    throw TypeError("Illegal str: Length not a multiple of 2");
            }
            var k = str.length,
                bb = new ByteBuffer((k / 2) | 0, littleEndian),
                b;
            for (var i=0, j=0; i<k; i+=2) {
                b = parseInt(str.substring(i, i+2), 16);
                if (!noAssert)
                    if (!isFinite(b) || b < 0 || b > 255)
                        throw TypeError("Illegal str: Contains non-hex characters");
                bb.view[j++] = b;
            }
            bb.limit = j;
            return bb;
        };

        // utfx-embeddable

        /**
         * utfx-embeddable (c) 2014 Daniel Wirtz <dcode@dcode.io>
         * Released under the Apache License, Version 2.0
         * see: https://github.com/dcodeIO/utfx for details
         */
        var utfx = function() {
            "use strict";

            /**
             * utfx namespace.
             * @inner
             * @type {!Object.<string,*>}
             */
            var utfx = {};

            /**
             * Maximum valid code point.
             * @type {number}
             * @const
             */
            utfx.MAX_CODEPOINT = 0x10FFFF;

            /**
             * Encodes UTF8 code points to UTF8 bytes.
             * @param {(!function():number|null) | number} src Code points source, either as a function returning the next code point
             *  respectively `null` if there are no more code points left or a single numeric code point.
             * @param {!function(number)} dst Bytes destination as a function successively called with the next byte
             */
            utfx.encodeUTF8 = function(src, dst) {
                var cp = null;
                if (typeof src === 'number')
                    cp = src,
                    src = function() { return null; };
                while (cp !== null || (cp = src()) !== null) {
                    if (cp < 0x80)
                        dst(cp&0x7F);
                    else if (cp < 0x800)
                        dst(((cp>>6)&0x1F)|0xC0),
                        dst((cp&0x3F)|0x80);
                    else if (cp < 0x10000)
                        dst(((cp>>12)&0x0F)|0xE0),
                        dst(((cp>>6)&0x3F)|0x80),
                        dst((cp&0x3F)|0x80);
                    else
                        dst(((cp>>18)&0x07)|0xF0),
                        dst(((cp>>12)&0x3F)|0x80),
                        dst(((cp>>6)&0x3F)|0x80),
                        dst((cp&0x3F)|0x80);
                    cp = null;
                }
            };

            /**
             * Decodes UTF8 bytes to UTF8 code points.
             * @param {!function():number|null} src Bytes source as a function returning the next byte respectively `null` if there
             *  are no more bytes left.
             * @param {!function(number)} dst Code points destination as a function successively called with each decoded code point.
             * @throws {RangeError} If a starting byte is invalid in UTF8
             * @throws {Error} If the last sequence is truncated. Has an array property `bytes` holding the
             *  remaining bytes.
             */
            utfx.decodeUTF8 = function(src, dst) {
                var a, b, c, d, fail = function(b) {
                    b = b.slice(0, b.indexOf(null));
                    var err = Error(b.toString());
                    err.name = "TruncatedError";
                    err['bytes'] = b;
                    throw err;
                };
                while ((a = src()) !== null) {
                    if ((a&0x80) === 0)
                        dst(a);
                    else if ((a&0xE0) === 0xC0)
                        ((b = src()) === null) && fail([a, b]),
                        dst(((a&0x1F)<<6) | (b&0x3F));
                    else if ((a&0xF0) === 0xE0)
                        ((b=src()) === null || (c=src()) === null) && fail([a, b, c]),
                        dst(((a&0x0F)<<12) | ((b&0x3F)<<6) | (c&0x3F));
                    else if ((a&0xF8) === 0xF0)
                        ((b=src()) === null || (c=src()) === null || (d=src()) === null) && fail([a, b, c ,d]),
                        dst(((a&0x07)<<18) | ((b&0x3F)<<12) | ((c&0x3F)<<6) | (d&0x3F));
                    else throw RangeError("Illegal starting byte: "+a);
                }
            };

            /**
             * Converts UTF16 characters to UTF8 code points.
             * @param {!function():number|null} src Characters source as a function returning the next char code respectively
             *  `null` if there are no more characters left.
             * @param {!function(number)} dst Code points destination as a function successively called with each converted code
             *  point.
             */
            utfx.UTF16toUTF8 = function(src, dst) {
                var c1, c2 = null;
                while (true) {
                    if ((c1 = c2 !== null ? c2 : src()) === null)
                        break;
                    if (c1 >= 0xD800 && c1 <= 0xDFFF) {
                        if ((c2 = src()) !== null) {
                            if (c2 >= 0xDC00 && c2 <= 0xDFFF) {
                                dst((c1-0xD800)*0x400+c2-0xDC00+0x10000);
                                c2 = null; continue;
                            }
                        }
                    }
                    dst(c1);
                }
                if (c2 !== null) dst(c2);
            };

            /**
             * Converts UTF8 code points to UTF16 characters.
             * @param {(!function():number|null) | number} src Code points source, either as a function returning the next code point
             *  respectively `null` if there are no more code points left or a single numeric code point.
             * @param {!function(number)} dst Characters destination as a function successively called with each converted char code.
             * @throws {RangeError} If a code point is out of range
             */
            utfx.UTF8toUTF16 = function(src, dst) {
                var cp = null;
                if (typeof src === 'number')
                    cp = src, src = function() { return null; };
                while (cp !== null || (cp = src()) !== null) {
                    if (cp <= 0xFFFF)
                        dst(cp);
                    else
                        cp -= 0x10000,
                        dst((cp>>10)+0xD800),
                        dst((cp%0x400)+0xDC00);
                    cp = null;
                }
            };

            /**
             * Converts and encodes UTF16 characters to UTF8 bytes.
             * @param {!function():number|null} src Characters source as a function returning the next char code respectively `null`
             *  if there are no more characters left.
             * @param {!function(number)} dst Bytes destination as a function successively called with the next byte.
             */
            utfx.encodeUTF16toUTF8 = function(src, dst) {
                utfx.UTF16toUTF8(src, function(cp) {
                    utfx.encodeUTF8(cp, dst);
                });
            };

            /**
             * Decodes and converts UTF8 bytes to UTF16 characters.
             * @param {!function():number|null} src Bytes source as a function returning the next byte respectively `null` if there
             *  are no more bytes left.
             * @param {!function(number)} dst Characters destination as a function successively called with each converted char code.
             * @throws {RangeError} If a starting byte is invalid in UTF8
             * @throws {Error} If the last sequence is truncated. Has an array property `bytes` holding the remaining bytes.
             */
            utfx.decodeUTF8toUTF16 = function(src, dst) {
                utfx.decodeUTF8(src, function(cp) {
                    utfx.UTF8toUTF16(cp, dst);
                });
            };

            /**
             * Calculates the byte length of an UTF8 code point.
             * @param {number} cp UTF8 code point
             * @returns {number} Byte length
             */
            utfx.calculateCodePoint = function(cp) {
                return (cp < 0x80) ? 1 : (cp < 0x800) ? 2 : (cp < 0x10000) ? 3 : 4;
            };

            /**
             * Calculates the number of UTF8 bytes required to store UTF8 code points.
             * @param {(!function():number|null)} src Code points source as a function returning the next code point respectively
             *  `null` if there are no more code points left.
             * @returns {number} The number of UTF8 bytes required
             */
            utfx.calculateUTF8 = function(src) {
                var cp, l=0;
                while ((cp = src()) !== null)
                    l += (cp < 0x80) ? 1 : (cp < 0x800) ? 2 : (cp < 0x10000) ? 3 : 4;
                return l;
            };

            /**
             * Calculates the number of UTF8 code points respectively UTF8 bytes required to store UTF16 char codes.
             * @param {(!function():number|null)} src Characters source as a function returning the next char code respectively
             *  `null` if there are no more characters left.
             * @returns {!Array.<number>} The number of UTF8 code points at index 0 and the number of UTF8 bytes required at index 1.
             */
            utfx.calculateUTF16asUTF8 = function(src) {
                var n=0, l=0;
                utfx.UTF16toUTF8(src, function(cp) {
                    ++n; l += (cp < 0x80) ? 1 : (cp < 0x800) ? 2 : (cp < 0x10000) ? 3 : 4;
                });
                return [n,l];
            };

            return utfx;
        }();

        // encodings/utf8

        /**
         * Encodes this ByteBuffer's contents between {@link ByteBuffer#offset} and {@link ByteBuffer#limit} to an UTF8 encoded
         *  string.
         * @returns {string} Hex encoded string
         * @throws {RangeError} If `offset > limit`
         * @expose
         */
        ByteBufferPrototype.toUTF8 = function(begin, end) {
            if (typeof begin === 'undefined') begin = this.offset;
            if (typeof end === 'undefined') end = this.limit;
            if (!this.noAssert) {
                if (typeof begin !== 'number' || begin % 1 !== 0)
                    throw TypeError("Illegal begin: Not an integer");
                begin >>>= 0;
                if (typeof end !== 'number' || end % 1 !== 0)
                    throw TypeError("Illegal end: Not an integer");
                end >>>= 0;
                if (begin < 0 || begin > end || end > this.buffer.byteLength)
                    throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);
            }
            var sd; try {
                utfx.decodeUTF8toUTF16(function() {
                    return begin < end ? this.view[begin++] : null;
                }.bind(this), sd = stringDestination());
            } catch (e) {
                if (begin !== end)
                    throw RangeError("Illegal range: Truncated data, "+begin+" != "+end);
            }
            return sd();
        };

        /**
         * Decodes an UTF8 encoded string to a ByteBuffer.
         * @param {string} str String to decode
         * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
         *  {@link ByteBuffer.DEFAULT_ENDIAN}.
         * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
         *  {@link ByteBuffer.DEFAULT_NOASSERT}.
         * @returns {!ByteBuffer} ByteBuffer
         * @expose
         */
        ByteBuffer.fromUTF8 = function(str, littleEndian, noAssert) {
            if (!noAssert)
                if (typeof str !== 'string')
                    throw TypeError("Illegal str: Not a string");
            var bb = new ByteBuffer(utfx.calculateUTF16asUTF8(stringSource(str), true)[1], littleEndian, noAssert),
                i = 0;
            utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
                bb.view[i++] = b;
            });
            bb.limit = i;
            return bb;
        };

        return ByteBuffer;
    })(Long);

    // Protobuf
    var Protobuf = (function(ByteBuffer, Long, b) {
        var e = {};
        e.ByteBuffer = ByteBuffer;
        e.c = ByteBuffer;
        var c = ByteBuffer;
        e.Long = Long || null;
        e.VERSION = "5.0.1";
        e.WIRE_TYPES = {};
        e.WIRE_TYPES.VARINT = 0;
        e.WIRE_TYPES.BITS64 = 1;
        e.WIRE_TYPES.LDELIM = 2;
        e.WIRE_TYPES.STARTGROUP = 3;
        e.WIRE_TYPES.ENDGROUP = 4;
        e.WIRE_TYPES.BITS32 = 5;
        e.PACKABLE_WIRE_TYPES = [e.WIRE_TYPES.VARINT, e.WIRE_TYPES.BITS64, e.WIRE_TYPES.BITS32];
        e.TYPES = {
            int32: {
                name: "int32",
                wireType: e.WIRE_TYPES.VARINT,
                defaultValue: 0
            },
            uint32: {
                name: "uint32",
                wireType: e.WIRE_TYPES.VARINT,
                defaultValue: 0
            },
            sint32: {
                name: "sint32",
                wireType: e.WIRE_TYPES.VARINT,
                defaultValue: 0
            },
            int64: {
                name: "int64",
                wireType: e.WIRE_TYPES.VARINT,
                defaultValue: e.Long ? e.Long.ZERO : undefined
            },
            uint64: {
                name: "uint64",
                wireType: e.WIRE_TYPES.VARINT,
                defaultValue: e.Long ? e.Long.UZERO : undefined
            },
            sint64: {
                name: "sint64",
                wireType: e.WIRE_TYPES.VARINT,
                defaultValue: e.Long ? e.Long.ZERO : undefined
            },
            bool: {
                name: "bool",
                wireType: e.WIRE_TYPES.VARINT,
                defaultValue: false
            },
            "double": {
                name: "double",
                wireType: e.WIRE_TYPES.BITS64,
                defaultValue: 0
            },
            string: {
                name: "string",
                wireType: e.WIRE_TYPES.LDELIM,
                defaultValue: ""
            },
            bytes: {
                name: "bytes",
                wireType: e.WIRE_TYPES.LDELIM,
                defaultValue: null
            },
            fixed32: {
                name: "fixed32",
                wireType: e.WIRE_TYPES.BITS32,
                defaultValue: 0
            },
            sfixed32: {
                name: "sfixed32",
                wireType: e.WIRE_TYPES.BITS32,
                defaultValue: 0
            },
            fixed64: {
                name: "fixed64",
                wireType: e.WIRE_TYPES.BITS64,
                defaultValue: e.Long ? e.Long.UZERO : undefined
            },
            sfixed64: {
                name: "sfixed64",
                wireType: e.WIRE_TYPES.BITS64,
                defaultValue: e.Long ? e.Long.ZERO : undefined
            },
            "float": {
                name: "float",
                wireType: e.WIRE_TYPES.BITS32,
                defaultValue: 0
            },
            "enum": {
                name: "enum",
                wireType: e.WIRE_TYPES.VARINT,
                defaultValue: 0
            },
            message: {
                name: "message",
                wireType: e.WIRE_TYPES.LDELIM,
                defaultValue: null
            },
            group: {
                name: "group",
                wireType: e.WIRE_TYPES.STARTGROUP,
                defaultValue: null
            }
        };
        e.MAP_KEY_TYPES = [e.TYPES.int32, e.TYPES.sint32, e.TYPES.sfixed32, e.TYPES.uint32, e.TYPES.fixed32, e.TYPES.int64, e.TYPES.sint64, e.TYPES.sfixed64, e.TYPES.uint64, e.TYPES.fixed64, e.TYPES.bool, e.TYPES.string, e.TYPES.bytes];
        e.ID_MIN = 1;
        e.ID_MAX = 536870911;
        e.convertFieldsToCamelCase = false;
        e.populateAccessors = true;
        e.populateDefaults = true;
        e.Util = (function() {
            var f = {};
            f.IS_NODE = !!(typeof process === "object" && process + "" === "[object process]" && !process.browser);
            f.XHR = function() {
                var g = [function() {
                    return new XMLHttpRequest()
                }, function() {
                    return new ActiveXObject("Msxml2.XMLHTTP")
                }, function() {
                    return new ActiveXObject("Msxml3.XMLHTTP")
                }, function() {
                    return new ActiveXObject("Microsoft.XMLHTTP")
                }];
                var k = null;
                for (var h = 0; h < g.length; h++) {
                    try {
                        k = g[h]()
                    } catch (j) {
                        continue
                    }
                    break
                }
                if (!k) {
                    throw Error("XMLHttpRequest is not supported")
                }
                return k
            };
            f.fetch = function(i, k) {
                if (k && typeof k != "function") {
                    k = null
                }
                if (f.IS_NODE) {
                    //var g = require("fs");
                    if (k) {
                        g.readFile(i, function(l, m) {
                            if (l) {
                                k(null)
                            } else {
                                k("" + m)
                            }
                        })
                    } else {
                        try {
                            return g.readFileSync(i)
                        } catch (h) {
                            return null
                        }
                    }
                } else {
                    var j = f.XHR();
                    j.open("GET", i, k ? true : false);
                    j.setRequestHeader("Accept", "text/plain");
                    if (typeof j.overrideMimeType === "function") {
                        j.overrideMimeType("text/plain")
                    }
                    if (k) {
                        j.onreadystatechange = function() {
                            if (j.readyState != 4) {
                                return
                            }
                            if (j.status == 200 || (j.status == 0 && typeof j.responseText === "string")) {
                                k(j.responseText)
                            } else {
                                k(null)
                            }
                        };
                        if (j.readyState == 4) {
                            return
                        }
                        j.send(null)
                    } else {
                        j.send(null);
                        if (j.status == 200 || (j.status == 0 && typeof j.responseText === "string")) {
                            return j.responseText
                        }
                        return null
                    }
                }
            };
            f.toCamelCase = function(g) {
                return g.replace(/_([a-zA-Z])/g, function(i, h) {
                    return h.toUpperCase()
                })
            };
            return f
        })();
        e.Lang = {
            DELIM: /[\s\{\}=;:\[\],'"\(\)<>]/g,
            RULE: /^(?:required|optional|repeated|map)$/,
            TYPE: /^(?:double|float|int32|uint32|sint32|int64|uint64|sint64|fixed32|sfixed32|fixed64|sfixed64|bool|string|bytes)$/,
            NAME: /^[a-zA-Z_][a-zA-Z_0-9]*$/,
            TYPEDEF: /^[a-zA-Z][a-zA-Z_0-9]*$/,
            TYPEREF: /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)+$/,
            FQTYPEREF: /^(?:\.[a-zA-Z][a-zA-Z_0-9]*)+$/,
            NUMBER: /^-?(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+|([0-9]*(\.[0-9]*)?([Ee][+-]?[0-9]+)?)|inf|nan)$/,
            NUMBER_DEC: /^(?:[1-9][0-9]*|0)$/,
            NUMBER_HEX: /^0[xX][0-9a-fA-F]+$/,
            NUMBER_OCT: /^0[0-7]+$/,
            NUMBER_FLT: /^([0-9]*(\.[0-9]*)?([Ee][+-]?[0-9]+)?|inf|nan)$/,
            BOOL: /^(?:true|false)$/i,
            ID: /^(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+)$/,
            NEGID: /^\-?(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+)$/,
            WHITESPACE: /\s/,
            STRING: /(?:"([^"\\]*(?:\\.[^"\\]*)*)")|(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g,
            STRING_DQ: /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g,
            STRING_SQ: /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g
        };
        e.DotProto = (function(k, j) {
            var m = {};
            var l = function(p) {
                this.source = p + "";
                this.index = 0;
                this.line = 1;
                this.stack = [];
                this._stringOpen = null
            };
            var o = l.prototype;
            o._readString = function() {
                var q = this._stringOpen === '"' ? j.STRING_DQ : j.STRING_SQ;
                q.lastIndex = this.index - 1;
                var p = q.exec(this.source);
                if (!p) {
                    throw Error("unterminated string")
                }
                this.index = q.lastIndex;
                this.stack.push(this._stringOpen);
                this._stringOpen = null;
                return p[1]
            };
            o.next = function() {
                if (this.stack.length > 0) {
                    return this.stack.shift()
                }
                if (this.index >= this.source.length) {
                    return null
                }
                if (this._stringOpen !== null) {
                    return this._readString()
                }
                var t, s, r;
                do {
                    t = false;
                    while (j.WHITESPACE.test(r = this.source.charAt(this.index))) {
                        if (r === "\n") {
                            ++this.line
                        }
                        if (++this.index === this.source.length) {
                            return null
                        }
                    }
                    if (this.source.charAt(this.index) === "/") {
                        ++this.index;
                        if (this.source.charAt(this.index) === "/") {
                            while (this.source.charAt(++this.index) !== "\n") {
                                if (this.index == this.source.length) {
                                    return null
                                }
                            }++this.index;
                            ++this.line;
                            t = true
                        } else {
                            if ((r = this.source.charAt(this.index)) === "*") {
                                do {
                                    if (r === "\n") {
                                        ++this.line
                                    }
                                    if (++this.index === this.source.length) {
                                        return null
                                    }
                                    s = r;
                                    r = this.source.charAt(this.index)
                                } while (s !== "*" || r !== "/");
                                ++this.index;
                                t = true
                            } else {
                                return "/"
                            }
                        }
                    }
                } while (t);
                if (this.index === this.source.length) {
                    return null
                }
                var p = this.index;
                j.DELIM.lastIndex = 0;
                var u = j.DELIM.test(this.source.charAt(p++));
                if (!u) {
                    while (p < this.source.length && !j.DELIM.test(this.source.charAt(p))) {
                        ++p
                    }
                }
                var q = this.source.substring(this.index, this.index = p);
                if (q === '"' || q === "'") {
                    this._stringOpen = q
                }
                return q
            };
            o.peek = function() {
                if (this.stack.length === 0) {
                    var p = this.next();
                    if (p === null) {
                        return null
                    }
                    this.stack.push(p)
                }
                return this.stack[0]
            };
            o.skip = function(p) {
                var q = this.next();
                if (q !== p) {
                    throw Error("illegal '" + q + "', '" + p + "' expected")
                }
            };
            o.omit = function(p) {
                if (this.peek() === p) {
                    this.next();
                    return true
                }
                return false
            };
            o.toString = function() {
                return "Tokenizer (" + this.index + "/" + this.source.length + " at line " + this.line + ")"
            };
            m.Tokenizer = l;
            var i = function(p) {
                this.tn = new l(p);
                this.proto3 = false
            };
            var g = i.prototype;
            g.parse = function() {
                var p = {
                    name: "[ROOT]",
                    "package": null,
                    messages: [],
                    enums: [],
                    imports: [],
                    options: {},
                    services: []
                };
                var r, q = true;
                try {
                    while (r = this.tn.next()) {
                        switch (r) {
                            case "package":
                                if (!q || p["package"] !== null) {
                                    throw Error("unexpected 'package'")
                                }
                                r = this.tn.next();
                                if (!j.TYPEREF.test(r)) {
                                    throw Error("illegal package name: " + r)
                                }
                                this.tn.skip(";");
                                p["package"] = r;
                                break;
                            case "import":
                                if (!q) {
                                    throw Error("unexpected 'import'")
                                }
                                r = this.tn.peek();
                                if (r === "public") {
                                    this.tn.next()
                                }
                                r = this._readString();
                                this.tn.skip(";");
                                p.imports.push(r);
                                break;
                            case "syntax":
                                if (!q) {
                                    throw Error("unexpected 'syntax'")
                                }
                                this.tn.skip("=");
                                if ((p.syntax = this._readString()) === "proto3") {
                                    this.proto3 = true
                                }
                                this.tn.skip(";");
                                break;
                            case "message":
                                this._parseMessage(p, null);
                                q = false;
                                break;
                            case "enum":
                                this._parseEnum(p);
                                q = false;
                                break;
                            case "option":
                                this._parseOption(p);
                                break;
                            case "service":
                                this._parseService(p);
                                break;
                            case "extend":
                                this._parseExtend(p);
                                break;
                            default:
                                throw Error("unexpected '" + r + "'")
                        }
                    }
                } catch (s) {
                    s.message = "Parse error at line " + this.tn.line + ": " + s.message;
                    throw s
                }
                delete p.name;
                return p
            };
            i.parse = function(p) {
                return new i(p).parse()
            };

            function f(r, q) {
                var s = -1,
                    p = 1;
                if (r.charAt(0) == "-") {
                    p = -1;
                    r = r.substring(1)
                }
                if (j.NUMBER_DEC.test(r)) {
                    s = parseInt(r)
                } else {
                    if (j.NUMBER_HEX.test(r)) {
                        s = parseInt(r.substring(2), 16)
                    } else {
                        if (j.NUMBER_OCT.test(r)) {
                            s = parseInt(r.substring(1), 8)
                        } else {
                            throw Error("illegal id value: " + (p < 0 ? "-" : "") + r)
                        }
                    }
                }
                s = (p * s) | 0;
                if (!q && s < 0) {
                    throw Error("illegal id value: " + (p < 0 ? "-" : "") + r)
                }
                return s
            }

            function n(q) {
                var p = 1;
                if (q.charAt(0) == "-") {
                    p = -1;
                    q = q.substring(1)
                }
                if (j.NUMBER_DEC.test(q)) {
                    return p * parseInt(q, 10)
                } else {
                    if (j.NUMBER_HEX.test(q)) {
                        return p * parseInt(q.substring(2), 16)
                    } else {
                        if (j.NUMBER_OCT.test(q)) {
                            return p * parseInt(q.substring(1), 8)
                        } else {
                            if (q === "inf") {
                                return p * Infinity
                            } else {
                                if (q === "nan") {
                                    return NaN
                                } else {
                                    if (j.NUMBER_FLT.test(q)) {
                                        return p * parseFloat(q)
                                    }
                                }
                            }
                        }
                    }
                }
                throw Error("illegal number value: " + (p < 0 ? "-" : "") + q)
            }
            g._readString = function() {
                var q = "",
                    p, r;
                do {
                    r = this.tn.next();
                    if (r !== "'" && r !== '"') {
                        throw Error("illegal string delimiter: " + r)
                    }
                    q += this.tn.next();
                    this.tn.skip(r);
                    p = this.tn.peek()
                } while (p === '"' || p === '"');
                return q
            };
            g._readValue = function(p) {
                var q = this.tn.peek(),
                    r;
                if (q === '"' || q === "'") {
                    return this._readString()
                }
                this.tn.next();
                if (j.NUMBER.test(q)) {
                    return n(q)
                }
                if (j.BOOL.test(q)) {
                    return (q.toLowerCase() === "true")
                }
                if (p && j.TYPEREF.test(q)) {
                    return q
                }
                throw Error("illegal value: " + q)
            };
            g._parseOption = function(r, t) {
                var q = this.tn.next(),
                    s = false;
                if (q === "(") {
                    s = true;
                    q = this.tn.next()
                }
                if (!j.TYPEREF.test(q)) {
                    throw Error("illegal option name: " + q)
                }
                var p = q;
                if (s) {
                    this.tn.skip(")");
                    p = "(" + p + ")";
                    q = this.tn.peek();
                    if (j.FQTYPEREF.test(q)) {
                        p += q;
                        this.tn.next()
                    }
                }
                this.tn.skip("=");
                this._parseOptionValue(r, p);
                if (!t) {
                    this.tn.skip(";")
                }
            };

            function h(q, p, r) {
                if (typeof q[p] === "undefined") {
                    q[p] = r
                } else {
                    if (!Array.isArray(q[p])) {
                        q[p] = [q[p]]
                    }
                    q[p].push(r)
                }
            }
            g._parseOptionValue = function(r, p) {
                var q = this.tn.peek();
                if (q !== "{") {
                    h(r.options, p, this._readValue(true))
                } else {
                    this.tn.skip("{");
                    while ((q = this.tn.next()) !== "}") {
                        if (!j.NAME.test(q)) {
                            throw Error("illegal option name: " + p + "." + q)
                        }
                        if (this.tn.omit(":")) {
                            h(r.options, p + "." + q, this._readValue(true))
                        } else {
                            this._parseOptionValue(r, p + "." + q)
                        }
                    }
                }
            };
            g._parseService = function(r) {
                var q = this.tn.next();
                if (!j.NAME.test(q)) {
                    throw Error("illegal service name at line " + this.tn.line + ": " + q)
                }
                var p = q;
                var s = {
                    name: p,
                    rpc: {},
                    options: {}
                };
                this.tn.skip("{");
                while ((q = this.tn.next()) !== "}") {
                    if (q === "option") {
                        this._parseOption(s)
                    } else {
                        if (q === "rpc") {
                            this._parseServiceRPC(s)
                        } else {
                            throw Error("illegal service token: " + q)
                        }
                    }
                }
                this.tn.omit(";");
                r.services.push(s)
            };
            g._parseServiceRPC = function(s) {
                var r = "rpc",
                    q = this.tn.next();
                if (!j.NAME.test(q)) {
                    throw Error("illegal rpc service method name: " + q)
                }
                var p = q;
                var t = {
                    request: null,
                    response: null,
                    request_stream: false,
                    response_stream: false,
                    options: {}
                };
                this.tn.skip("(");
                q = this.tn.next();
                if (q.toLowerCase() === "stream") {
                    t.request_stream = true;
                    q = this.tn.next()
                }
                if (!j.TYPEREF.test(q)) {
                    throw Error("illegal rpc service request type: " + q)
                }
                t.request = q;
                this.tn.skip(")");
                q = this.tn.next();
                if (q.toLowerCase() !== "returns") {
                    throw Error("illegal rpc service request type delimiter: " + q)
                }
                this.tn.skip("(");
                q = this.tn.next();
                if (q.toLowerCase() === "stream") {
                    t.response_stream = true;
                    q = this.tn.next()
                }
                t.response = q;
                this.tn.skip(")");
                q = this.tn.peek();
                if (q === "{") {
                    this.tn.next();
                    while ((q = this.tn.next()) !== "}") {
                        if (q === "option") {
                            this._parseOption(t)
                        } else {
                            throw Error("illegal rpc service token: " + q)
                        }
                    }
                    this.tn.omit(";")
                } else {
                    this.tn.skip(";")
                }
                if (typeof s[r] === "undefined") {
                    s[r] = {}
                }
                s[r][p] = t
            };
            g._parseMessage = function(r, q) {
                var t = !!q,
                    p = this.tn.next();
                var s = {
                    name: "",
                    fields: [],
                    enums: [],
                    messages: [],
                    options: {},
                    services: [],
                    oneofs: {}
                };
                if (!j.NAME.test(p)) {
                    throw Error("illegal " + (t ? "group" : "message") + " name: " + p)
                }
                s.name = p;
                if (t) {
                    this.tn.skip("=");
                    q.id = f(this.tn.next());
                    s.isGroup = true
                }
                p = this.tn.peek();
                if (p === "[" && q) {
                    this._parseFieldOptions(q)
                }
                this.tn.skip("{");
                while ((p = this.tn.next()) !== "}") {
                    if (j.RULE.test(p)) {
                        this._parseMessageField(s, p)
                    } else {
                        if (p === "oneof") {
                            this._parseMessageOneOf(s)
                        } else {
                            if (p === "enum") {
                                this._parseEnum(s)
                            } else {
                                if (p === "message") {
                                    this._parseMessage(s)
                                } else {
                                    if (p === "option") {
                                        this._parseOption(s)
                                    } else {
                                        if (p === "service") {
                                            this._parseService(s)
                                        } else {
                                            if (p === "extensions") {
                                                s.extensions = this._parseExtensionRanges()
                                            } else {
                                                if (p === "reserved") {
                                                    this._parseIgnored()
                                                } else {
                                                    if (p === "extend") {
                                                        this._parseExtend(s)
                                                    } else {
                                                        if (j.TYPEREF.test(p)) {
                                                            if (!this.proto3) {
                                                                throw Error("illegal field rule: " + p)
                                                            }
                                                            this._parseMessageField(s, "optional", p)
                                                        } else {
                                                            throw Error("illegal message token: " + p)
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                this.tn.omit(";");
                r.messages.push(s);
                return s
            };
            g._parseIgnored = function() {
                while (this.tn.peek() !== ";") {
                    this.tn.next()
                }
                this.tn.skip(";")
            };
            g._parseMessageField = function(u, t, s) {
                if (!j.RULE.test(t)) {
                    throw Error("illegal message field rule: " + t)
                }
                var r = {
                    rule: t,
                    type: "",
                    name: "",
                    options: {},
                    id: 0
                };
                var q;
                if (t === "map") {
                    if (s) {
                        throw Error("illegal type: " + s)
                    }
                    this.tn.skip("<");
                    q = this.tn.next();
                    if (!j.TYPE.test(q) && !j.TYPEREF.test(q)) {
                        throw Error("illegal message field type: " + q)
                    }
                    r.keytype = q;
                    this.tn.skip(",");
                    q = this.tn.next();
                    if (!j.TYPE.test(q) && !j.TYPEREF.test(q)) {
                        throw Error("illegal message field: " + q)
                    }
                    r.type = q;
                    this.tn.skip(">");
                    q = this.tn.next();
                    if (!j.NAME.test(q)) {
                        throw Error("illegal message field name: " + q)
                    }
                    r.name = q;
                    this.tn.skip("=");
                    r.id = f(this.tn.next());
                    q = this.tn.peek();
                    if (q === "[") {
                        this._parseFieldOptions(r)
                    }
                    this.tn.skip(";")
                } else {
                    s = typeof s !== "undefined" ? s : this.tn.next();
                    if (s === "group") {
                        var p = this._parseMessage(u, r);
                        if (!/^[A-Z]/.test(p.name)) {
                            throw Error("illegal group name: " + p.name)
                        }
                        r.type = p.name;
                        r.name = p.name.toLowerCase();
                        this.tn.omit(";")
                    } else {
                        if (!j.TYPE.test(s) && !j.TYPEREF.test(s)) {
                            throw Error("illegal message field type: " + s)
                        }
                        r.type = s;
                        q = this.tn.next();
                        if (!j.NAME.test(q)) {
                            throw Error("illegal message field name: " + q)
                        }
                        r.name = q;
                        this.tn.skip("=");
                        r.id = f(this.tn.next());
                        q = this.tn.peek();
                        if (q === "[") {
                            this._parseFieldOptions(r)
                        }
                        this.tn.skip(";")
                    }
                }
                u.fields.push(r);
                return r
            };
            g._parseMessageOneOf = function(t) {
                var s = this.tn.next();
                if (!j.NAME.test(s)) {
                    throw Error("illegal oneof name: " + s)
                }
                var q = s,
                    r;
                var p = [];
                this.tn.skip("{");
                while ((s = this.tn.next()) !== "}") {
                    r = this._parseMessageField(t, "optional", s);
                    r.oneof = q;
                    p.push(r.id)
                }
                this.tn.omit(";");
                t.oneofs[q] = p
            };
            g._parseFieldOptions = function(q) {
                this.tn.skip("[");
                var p, r = true;
                while ((p = this.tn.peek()) !== "]") {
                    if (!r) {
                        this.tn.skip(",")
                    }
                    this._parseOption(q, true);
                    r = false
                }
                this.tn.next()
            };
            g._parseEnum = function(s) {
                var p = {
                    name: "",
                    values: [],
                    options: {}
                };
                var q = this.tn.next();
                if (!j.NAME.test(q)) {
                    throw Error("illegal name: " + q)
                }
                p.name = q;
                this.tn.skip("{");
                while ((q = this.tn.next()) !== "}") {
                    if (q === "option") {
                        this._parseOption(p)
                    } else {
                        if (!j.NAME.test(q)) {
                            throw Error("illegal name: " + q)
                        }
                        this.tn.skip("=");
                        var r = {
                            name: q,
                            id: f(this.tn.next(), true)
                        };
                        q = this.tn.peek();
                        if (q === "[") {
                            this._parseFieldOptions({
                                options: {}
                            })
                        }
                        this.tn.skip(";");
                        p.values.push(r)
                    }
                }
                this.tn.omit(";");
                s.enums.push(p)
            };
            g._parseExtensionRanges = function() {
                var p = [];
                var r, q, s;
                do {
                    q = [];
                    while (true) {
                        r = this.tn.next();
                        switch (r) {
                            case "min":
                                s = k.ID_MIN;
                                break;
                            case "max":
                                s = k.ID_MAX;
                                break;
                            default:
                                s = n(r);
                                break
                        }
                        q.push(s);
                        if (q.length === 2) {
                            break
                        }
                        if (this.tn.peek() !== "to") {
                            q.push(s);
                            break
                        }
                        this.tn.next()
                    }
                    p.push(q)
                } while (this.tn.omit(","));
                this.tn.skip(";");
                return p
            };
            g._parseExtend = function(r) {
                var p = this.tn.next();
                if (!j.TYPEREF.test(p)) {
                    throw Error("illegal extend reference: " + p)
                }
                var q = {
                    ref: p,
                    fields: []
                };
                this.tn.skip("{");
                while ((p = this.tn.next()) !== "}") {
                    if (j.RULE.test(p)) {
                        this._parseMessageField(q, p)
                    } else {
                        if (j.TYPEREF.test(p)) {
                            if (!this.proto3) {
                                throw Error("illegal field rule: " + p)
                            }
                            this._parseMessageField(q, "optional", p)
                        } else {
                            throw Error("illegal extend token: " + p)
                        }
                    }
                }
                this.tn.omit(";");
                r.messages.push(q);
                return q
            };
            g.toString = function() {
                return "Parser at line " + this.tn.line
            };
            m.Parser = i;
            return m
        })(e, e.Lang);
        e.Reflect = (function(n) {
            var i = {};
            var j = function(F, H, G) {
                this.builder = F;
                this.parent = H;
                this.name = G;
                this.className
            };
            var h = j.prototype;
            h.fqn = function() {
                var F = this.name,
                    G = this;
                do {
                    G = G.parent;
                    if (G == null) {
                        break
                    }
                    F = G.name + "." + F
                } while (true);
                return F
            };
            h.toString = function(F) {
                return (F ? this.className + " " : "") + this.fqn()
            };
            h.build = function() {
                throw Error(this.toString(true) + " cannot be built directly")
            };
            i.T = j;
            var r = function(G, J, I, H, F) {
                j.call(this, G, J, I);
                this.className = "Namespace";
                this.children = [];
                this.options = H || {};
                this.syntax = F || "proto2"
            };
            var w = r.prototype = Object.create(j.prototype);
            w.getChildren = function(I) {
                I = I || null;
                if (I == null) {
                    return this.children.slice()
                }
                var H = [];
                for (var G = 0, F = this.children.length; G < F; ++G) {
                    if (this.children[G] instanceof I) {
                        H.push(this.children[G])
                    }
                }
                return H
            };
            w.addChild = function(G) {
                var F;
                if (F = this.getChild(G.name)) {
                    if (F instanceof f.Field && F.name !== F.originalName && this.getChild(F.originalName) === null) {
                        F.name = F.originalName
                    } else {
                        if (G instanceof f.Field && G.name !== G.originalName && this.getChild(G.originalName) === null) {
                            G.name = G.originalName
                        } else {
                            throw Error("Duplicate name in namespace " + this.toString(true) + ": " + G.name)
                        }
                    }
                }
                this.children.push(G)
            };
            w.getChild = function(I) {
                var H = typeof I === "number" ? "id" : "name";
                for (var G = 0, F = this.children.length; G < F; ++G) {
                    if (this.children[G][H] === I) {
                        return this.children[G]
                    }
                }
                return null
            };
            w.resolve = function(I, F) {
                var G = typeof I === "string" ? I.split(".") : I,
                    K = this,
                    H = 0;
                if (G[H] === "") {
                    while (K.parent !== null) {
                        K = K.parent
                    }
                    H++
                }
                var J;
                do {
                    do {
                        if (!(K instanceof i.Namespace)) {
                            K = null;
                            break
                        }
                        J = K.getChild(G[H]);
                        if (!J || !(J instanceof i.T) || (F && !(J instanceof i.Namespace))) {
                            K = null;
                            break
                        }
                        K = J;
                        H++
                    } while (H < G.length);
                    if (K != null) {
                        break
                    }
                    if (this.parent !== null) {
                        return this.parent.resolve(I, F)
                    }
                } while (K != null);
                return K
            };
            w.qn = function(H) {
                var G = [],
                    J = H;
                do {
                    G.unshift(J.name);
                    J = J.parent
                } while (J !== null);
                for (var F = 1; F <= G.length; F++) {
                    var I = G.slice(G.length - F);
                    if (H === this.resolve(I, H instanceof i.Namespace)) {
                        return I.join(".")
                    }
                }
                return H.fqn()
            };
            w.build = function() {
                var I = {};
                var H = this.children;
                for (var G = 0, F = H.length, J; G < F; ++G) {
                    J = H[G];
                    if (J instanceof r) {
                        I[J.name] = J.build()
                    }
                }
                if (Object.defineProperty) {
                    Object.defineProperty(I, "$options", {
                        value: this.buildOpt()
                    })
                }
                return I
            };
            w.buildOpt = function() {
                var I = {},
                    J = Object.keys(this.options);
                for (var H = 0, F = J.length; H < F; ++H) {
                    var G = J[H],
                        K = this.options[J[H]];
                    I[G] = K
                }
                return I
            };
            w.getOption = function(F) {
                if (typeof F === "undefined") {
                    return this.options
                }
                return typeof this.options[F] !== "undefined" ? this.options[F] : null
            };
            i.Namespace = r;
            var u = function(I, G, H, F) {
                this.type = I;
                this.resolvedType = G;
                this.isMapKey = H;
                this.syntax = F;
                if (H && n.MAP_KEY_TYPES.indexOf(I) < 0) {
                    throw Error("Invalid map key type: " + I.name)
                }
            };
            var z = u.prototype;

            function y(F) {
                if (typeof F === "string") {
                    F = n.TYPES[F]
                }
                if (typeof F.defaultValue === "undefined") {
                    throw Error("default value for type " + F.name + " is not supported")
                }
                if (F == n.TYPES.bytes) {
                    return new c(0)
                }
                return F.defaultValue
            }
            u.defaultFieldValue = y;

            function m(G, F) {
                if (G && typeof G.low === "number" && typeof G.high === "number" && typeof G.unsigned === "boolean" && G.low === G.low && G.high === G.high) {
                    return new n.Long(G.low, G.high, typeof F === "undefined" ? G.unsigned : F)
                }
                if (typeof G === "string") {
                    return n.Long.fromString(G, F || false, 10)
                }
                if (typeof G === "number") {
                    return n.Long.fromNumber(G, F || false)
                }
                throw Error("not convertible to Long")
            }
            z.verifyValue = function(I) {
                var F = function(M, L) {
                    throw Error("Illegal value for " + this.toString(true) + " of type " + this.type.name + ": " + M + " (" + L + ")")
                }.bind(this);
                switch (this.type) {
                    case n.TYPES.int32:
                    case n.TYPES.sint32:
                    case n.TYPES.sfixed32:
                        if (typeof I !== "number" || (I === I && I % 1 !== 0)) {
                            F(typeof I, "not an integer")
                        }
                        return I > 4294967295 ? I | 0 : I;
                    case n.TYPES.uint32:
                    case n.TYPES.fixed32:
                        if (typeof I !== "number" || (I === I && I % 1 !== 0)) {
                            F(typeof I, "not an integer")
                        }
                        return I < 0 ? I >>> 0 : I;
                    case n.TYPES.int64:
                    case n.TYPES.sint64:
                    case n.TYPES.sfixed64:
                        if (n.Long) {
                            try {
                                return m(I, false)
                            } catch (K) {
                                F(typeof I, K.message)
                            }
                        } else {
                            F(typeof I, "requires Long.js")
                        }
                    case n.TYPES.uint64:
                    case n.TYPES.fixed64:
                        if (n.Long) {
                            try {
                                return m(I, true)
                            } catch (K) {
                                F(typeof I, K.message)
                            }
                        } else {
                            F(typeof I, "requires Long.js")
                        }
                    case n.TYPES.bool:
                        if (typeof I !== "boolean") {
                            F(typeof I, "not a boolean")
                        }
                        return I;
                    case n.TYPES["float"]:
                    case n.TYPES["double"]:
                        if (typeof I !== "number") {
                            F(typeof I, "not a number")
                        }
                        return I;
                    case n.TYPES.string:
                        if (typeof I !== "string" && !(I && I instanceof String)) {
                            F(typeof I, "not a string")
                        }
                        return "" + I;
                    case n.TYPES.bytes:
                        if (ByteBuffer.isByteBuffer(I)) {
                            return I
                        }
                        return ByteBuffer.wrap(I);
                    case n.TYPES["enum"]:
                        var G = this.resolvedType.getChildren(n.Reflect.Enum.Value);
                        for (H = 0; H < G.length; H++) {
                            if (G[H].name == I) {
                                return G[H].id
                            } else {
                                if (G[H].id == I) {
                                    return G[H].id
                                }
                            }
                        }
                        if (this.syntax === "proto3") {
                            if (typeof I !== "number" || (I === I && I % 1 !== 0)) {
                                F(typeof I, "not an integer")
                            }
                            if (I > 4294967295 || I < 0) {
                                F(typeof I, "not in range for uint32")
                            }
                            return I
                        } else {
                            F(I, "not a valid enum value")
                        }
                    case n.TYPES.group:
                    case n.TYPES.message:
                        if (!I || typeof I !== "object") {
                            F(typeof I, "object expected")
                        }
                        if (I instanceof this.resolvedType.clazz) {
                            return I
                        }
                        if (I instanceof n.Builder.Message) {
                            var J = {};
                            for (var H in I) {
                                if (I.hasOwnProperty(H)) {
                                    J[H] = I[H]
                                }
                            }
                            I = J
                        }
                        return new(this.resolvedType.clazz)(I)
                }
                throw Error("[INTERNAL] Illegal value for " + this.toString(true) + ": " + I + " (undefined type " + this.type + ")")
            };
            z.calculateLength = function(H, F) {
                if (F === null) {
                    return 0
                }
                var G;
                switch (this.type) {
                    case n.TYPES.int32:
                        return F < 0 ? c.calculateVarint64(F) : c.calculateVarint32(F);
                    case n.TYPES.uint32:
                        return c.calculateVarint32(F);
                    case n.TYPES.sint32:
                        return c.calculateVarint32(c.zigZagEncode32(F));
                    case n.TYPES.fixed32:
                    case n.TYPES.sfixed32:
                    case n.TYPES["float"]:
                        return 4;
                    case n.TYPES.int64:
                    case n.TYPES.uint64:
                        return c.calculateVarint64(F);
                    case n.TYPES.sint64:
                        return c.calculateVarint64(c.zigZagEncode64(F));
                    case n.TYPES.fixed64:
                    case n.TYPES.sfixed64:
                        return 8;
                    case n.TYPES.bool:
                        return 1;
                    case n.TYPES["enum"]:
                        return c.calculateVarint32(F);
                    case n.TYPES["double"]:
                        return 8;
                    case n.TYPES.string:
                        G = c.calculateUTF8Bytes(F);
                        return c.calculateVarint32(G) + G;
                    case n.TYPES.bytes:
                        if (F.remaining() < 0) {
                            throw Error("Illegal value for " + this.toString(true) + ": " + F.remaining() + " bytes remaining")
                        }
                        return c.calculateVarint32(F.remaining()) + F.remaining();
                    case n.TYPES.message:
                        G = this.resolvedType.calculate(F);
                        return c.calculateVarint32(G) + G;
                    case n.TYPES.group:
                        G = this.resolvedType.calculate(F);
                        return G + c.calculateVarint32((H << 3) | n.WIRE_TYPES.ENDGROUP)
                }
                throw Error("[INTERNAL] Illegal value to encode in " + this.toString(true) + ": " + F + " (unknown type)")
            };
            z.encodeValue = function(J, G, F) {
                if (G === null) {
                    return F
                }
                switch (this.type) {
                    case n.TYPES.int32:
                        if (G < 0) {
                            F.writeVarint64(G)
                        } else {
                            F.writeVarint32(G)
                        }
                        break;
                    case n.TYPES.uint32:
                        F.writeVarint32(G);
                        break;
                    case n.TYPES.sint32:
                        F.writeVarint32ZigZag(G);
                        break;
                    case n.TYPES.fixed32:
                        F.writeUint32(G);
                        break;
                    case n.TYPES.sfixed32:
                        F.writeInt32(G);
                        break;
                    case n.TYPES.int64:
                    case n.TYPES.uint64:
                        F.writeVarint64(G);
                        break;
                    case n.TYPES.sint64:
                        F.writeVarint64ZigZag(G);
                        break;
                    case n.TYPES.fixed64:
                        F.writeUint64(G);
                        break;
                    case n.TYPES.sfixed64:
                        F.writeInt64(G);
                        break;
                    case n.TYPES.bool:
                        if (typeof G === "string") {
                            F.writeVarint32(G.toLowerCase() === "false" ? 0 : !!G)
                        } else {
                            F.writeVarint32(G ? 1 : 0)
                        }
                        break;
                    case n.TYPES["enum"]:
                        F.writeVarint32(G);
                        break;
                    case n.TYPES["float"]:
                        F.writeFloat32(G);
                        break;
                    case n.TYPES["double"]:
                        F.writeFloat64(G);
                        break;
                    case n.TYPES.string:
                        F.writeVString(G);
                        break;
                    case n.TYPES.bytes:
                        if (G.remaining() < 0) {
                            throw Error("Illegal value for " + this.toString(true) + ": " + G.remaining() + " bytes remaining")
                        }
                        var H = G.offset;
                        F.writeVarint32(G.remaining());
                        F.append(G);
                        G.offset = H;
                        break;
                    case n.TYPES.message:
                        var I = new c().LE();
                        this.resolvedType.encode(G, I);
                        F.writeVarint32(I.offset);
                        F.append(I.flip());
                        break;
                    case n.TYPES.group:
                        this.resolvedType.encode(G, F);
                        F.writeVarint32((J << 3) | n.WIRE_TYPES.ENDGROUP);
                        break;
                    default:
                        throw Error("[INTERNAL] Illegal value to encode in " + this.toString(true) + ": " + G + " (unknown type)")
                }
                return F
            };
            z.decode = function(G, F, J) {
                if (F != this.type.wireType) {
                    throw Error("Unexpected wire type for element")
                }
                var H, I;
                switch (this.type) {
                    case n.TYPES.int32:
                        return G.readVarint32() | 0;
                    case n.TYPES.uint32:
                        return G.readVarint32() >>> 0;
                    case n.TYPES.sint32:
                        return G.readVarint32ZigZag() | 0;
                    case n.TYPES.fixed32:
                        return G.readUint32() >>> 0;
                    case n.TYPES.sfixed32:
                        return G.readInt32() | 0;
                    case n.TYPES.int64:
                        return G.readVarint64();
                    case n.TYPES.uint64:
                        return G.readVarint64().toUnsigned();
                    case n.TYPES.sint64:
                        return G.readVarint64ZigZag();
                    case n.TYPES.fixed64:
                        return G.readUint64();
                    case n.TYPES.sfixed64:
                        return G.readInt64();
                    case n.TYPES.bool:
                        return !!G.readVarint32();
                    case n.TYPES["enum"]:
                        return G.readVarint32();
                    case n.TYPES["float"]:
                        return G.readFloat();
                    case n.TYPES["double"]:
                        return G.readDouble();
                    case n.TYPES.string:
                        return G.readVString();
                    case n.TYPES.bytes:
                        I = G.readVarint32();
                        if (G.remaining() < I) {
                            throw Error("Illegal number of bytes for " + this.toString(true) + ": " + I + " required but got only " + G.remaining())
                        }
                        H = G.clone();
                        H.limit = H.offset + I;
                        G.offset += I;
                        return H;
                    case n.TYPES.message:
                        I = G.readVarint32();
                        return this.resolvedType.decode(G, I);
                    case n.TYPES.group:
                        return this.resolvedType.decode(G, -1, J)
                }
                throw Error("[INTERNAL] Illegal decode type")
            };
            z.valueFromString = function(F) {
                if (!this.isMapKey) {
                    throw Error("valueFromString() called on non-map-key element")
                }
                switch (this.type) {
                    case n.TYPES.int32:
                    case n.TYPES.sint32:
                    case n.TYPES.sfixed32:
                    case n.TYPES.uint32:
                    case n.TYPES.fixed32:
                        return this.verifyValue(parseInt(F));
                    case n.TYPES.int64:
                    case n.TYPES.sint64:
                    case n.TYPES.sfixed64:
                    case n.TYPES.uint64:
                    case n.TYPES.fixed64:
                        return this.verifyValue(F);
                    case n.TYPES.bool:
                        return F === "true";
                    case n.TYPES.string:
                        return this.verifyValue(F);
                    case n.TYPES.bytes:
                        return c.fromBinary(F)
                }
            };
            z.valueToString = function(F) {
                if (!this.isMapKey) {
                    throw Error("valueToString() called on non-map-key element")
                }
                if (this.type === n.TYPES.bytes) {
                    return F.toString("binary")
                } else {
                    return F.toString()
                }
            };
            i.Element = u;
            var f = function(G, J, I, H, K, F) {
                r.call(this, G, J, I, H, F);
                this.className = "Message";
                this.extensions = undefined;
                this.clazz = null;
                this.isGroup = !!K;
                this._fields = null;
                this._fieldsById = null;
                this._fieldsByName = null
            };
            var E = f.prototype = Object.create(r.prototype);
            E.build = function(F) {
                if (this.clazz && !F) {
                    return this.clazz
                }
                var H = (function(R, L) {
                    var P = L.getChildren(R.Reflect.Message.Field),
                        V = L.getChildren(R.Reflect.Message.OneOf);
                    var S = function(Y, ac) {
                        R.Builder.Message.call(this);
                        for (var Z = 0, T = V.length; Z < T; ++Z) {
                            this[V[Z].name] = null
                        }
                        for (Z = 0, T = P.length; Z < T; ++Z) {
                            var ab = P[Z];
                            this[ab.name] = ab.repeated ? [] : (ab.map ? new R.Map(ab) : null);
                            if ((ab.required || L.syntax === "proto3") && ab.defaultValue !== null) {
                                this[ab.name] = ab.defaultValue
                            }
                        }
                        if (arguments.length > 0) {
                            var aa;
                            if (arguments.length === 1 && Y !== null && typeof Y === "object" && (typeof Y.encode !== "function" || Y instanceof S) && !Array.isArray(Y) && !(Y instanceof R.Map) && !c.isByteBuffer(Y) && !(Y instanceof ArrayBuffer) && !(R.Long && Y instanceof R.Long)) {
                                this.$set(Y)
                            } else {
                                for (Z = 0, T = arguments.length; Z < T; ++Z) {
                                    if (typeof(aa = arguments[Z]) !== "undefined") {
                                        this.$set(P[Z].name, aa)
                                    }
                                }
                            }
                        }
                    };
                    var O = S.prototype = Object.create(R.Builder.Message.prototype);
                    O.add = function(T, Y, aa) {
                        var Z = L._fieldsByName[T];
                        if (!aa) {
                            if (!Z) {
                                throw Error(this + "#" + T + " is undefined")
                            }
                            if (!(Z instanceof R.Reflect.Message.Field)) {
                                throw Error(this + "#" + T + " is not a field: " + Z.toString(true))
                            }
                            if (!Z.repeated) {
                                throw Error(this + "#" + T + " is not a repeated field")
                            }
                            Y = Z.verifyValue(Y, true)
                        }
                        if (this[T] === null) {
                            this[T] = []
                        }
                        this[T].push(Y);
                        return this
                    };
                    O.$add = O.add;
                    O.set = function(ac, Y, ab) {
                        if (ac && typeof ac === "object") {
                            ab = Y;
                            for (var aa in ac) {
                                if (ac.hasOwnProperty(aa) && typeof(Y = ac[aa]) !== "undefined") {
                                    this.$set(aa, Y, ab)
                                }
                            }
                            return this
                        }
                        var Z = L._fieldsByName[ac];
                        if (!ab) {
                            if (!Z) {
                                throw Error(this + "#" + ac + " is not a field: undefined")
                            }
                            if (!(Z instanceof R.Reflect.Message.Field)) {
                                throw Error(this + "#" + ac + " is not a field: " + Z.toString(true))
                            }
                            this[Z.name] = (Y = Z.verifyValue(Y))
                        } else {
                            this[ac] = Y
                        }
                        if (Z && Z.oneof) {
                            var T = this[Z.oneof.name];
                            if (Y !== null) {
                                if (T !== null && T !== Z.name) {
                                    this[T] = null
                                }
                                this[Z.oneof.name] = Z.name
                            } else {
                                if (T === ac) {
                                    this[Z.oneof.name] = null
                                }
                            }
                        }
                        return this
                    };
                    O.$set = O.set;
                    O.get = function(T, Z) {
                        if (Z) {
                            return this[T]
                        }
                        var Y = L._fieldsByName[T];
                        if (!Y || !(Y instanceof R.Reflect.Message.Field)) {
                            throw Error(this + "#" + T + " is not a field: undefined")
                        }
                        if (!(Y instanceof R.Reflect.Message.Field)) {
                            throw Error(this + "#" + T + " is not a field: " + Y.toString(true))
                        }
                        return this[Y.name]
                    };
                    O.$get = O.get;
                    for (var M = 0; M < P.length; M++) {
                        var U = P[M];
                        if (U instanceof R.Reflect.Message.ExtensionField) {
                            continue
                        }
                        if (L.builder.options.populateAccessors) {
                            (function(aa) {
                                var Y = aa.originalName.replace(/(_[a-zA-Z])/g, function(ac) {
                                    return ac.toUpperCase().replace("_", "")
                                });
                                Y = Y.substring(0, 1).toUpperCase() + Y.substring(1);
                                var Z = aa.originalName.replace(/([A-Z])/g, function(ac) {
                                    return "_" + ac
                                });
                                var ab = function(ac, ad) {
                                    this[aa.name] = ad ? ac : aa.verifyValue(ac);
                                    return this
                                };
                                var T = function() {
                                    return this[aa.name]
                                };
                                if (L.getChild("set" + Y) === null) {
                                    O["set" + Y] = ab
                                }
                                if (L.getChild("set_" + Z) === null) {
                                    O["set_" + Z] = ab
                                }
                                if (L.getChild("get" + Y) === null) {
                                    O["get" + Y] = T
                                }
                                if (L.getChild("get_" + Z) === null) {
                                    O["get_" + Z] = T
                                }
                            })(U)
                        }
                    }
                    O.encode = function(Y, aa) {
                        if (typeof Y === "boolean") {
                            aa = Y, Y = undefined
                        }
                        var T = false;
                        if (!Y) {
                            Y = new ByteBuffer(), T = true
                        }
                        var Z = Y.littleEndian;
                        try {
                            L.encode(this, Y.LE(), aa);
                            return (T ? Y.flip() : Y).LE(Z)
                        } catch (ab) {
                            Y.LE(Z);
                            throw (ab)
                        }
                    };
                    S.encode = function(Z, T, Y) {
                        return new S(Z).encode(T, Y)
                    };
                    O.calculate = function() {
                        return L.calculate(this)
                    };
                    O.encodeDelimited = function(Y) {
                        var T = false;
                        if (!Y) {
                            Y = new c(), T = true
                        }
                        var Z = new c().LE();
                        L.encode(this, Z).flip();
                        Y.writeVarint32(Z.remaining());
                        Y.append(Z);
                        return T ? Y.flip() : Y
                    };
                    O.encodeAB = function() {
                        try {
                            return this.encode().toArrayBuffer()
                        } catch (T) {
                            if (T.encoded) {
                                T.encoded = T.encoded.toArrayBuffer()
                            }
                            throw (T)
                        }
                    };
                    O.toArrayBuffer = O.encodeAB;
                    O.encodeNB = function() {
                        try {
                            return this.encode().toBuffer()
                        } catch (T) {
                            if (T.encoded) {
                                T.encoded = T.encoded.toBuffer()
                            }
                            throw (T)
                        }
                    };
                    O.toBuffer = O.encodeNB;
                    O.encode64 = function() {
                        try {
                            return this.encode().toBase64()
                        } catch (T) {
                            if (T.encoded) {
                                T.encoded = T.encoded.toBase64()
                            }
                            throw (T)
                        }
                    };
                    O.toBase64 = O.encode64;
                    O.encodeHex = function() {
                        try {
                            return this.encode().toHex()
                        } catch (T) {
                            if (T.encoded) {
                                T.encoded = T.encoded.toHex()
                            }
                            throw (T)
                        }
                    };
                    O.toHex = O.encodeHex;

                    function W(Z, ad, ab, ah) {
                        if (Z === null || typeof Z !== "object") {
                            if (ah && ah instanceof R.Reflect.Enum) {
                                var T = R.Reflect.Enum.getName(ah.object, Z);
                                if (T !== null) {
                                    return T
                                }
                            }
                            return Z
                        }
                        if (c.isByteBuffer(Z)) {
                            return ad ? Z.toBase64() : Z.toBuffer()
                        }
                        if (R.Long.isLong(Z)) {
                            return ab ? Z.toString() : R.Long.fromValue(Z)
                        }
                        var af;
                        if (Array.isArray(Z)) {
                            af = [];
                            Z.forEach(function(aj, ai) {
                                af[ai] = W(aj, ad, ab, ah)
                            });
                            return af
                        }
                        af = {};
                        if (Z instanceof R.Map) {
                            var aa = Z.entries();
                            for (var ac = aa.next(); !ac.done; ac = aa.next()) {
                                af[Z.keyElem.valueToString(ac.value[0])] = W(ac.value[1], ad, ab, Z.valueElem.resolvedType)
                            }
                            return af
                        }
                        var ae = Z.$type,
                            ag = undefined;
                        for (var Y in Z) {
                            if (Z.hasOwnProperty(Y)) {
                                if (ae && (ag = ae.getChild(Y))) {
                                    af[Y] = W(Z[Y], ad, ab, ag.resolvedType)
                                } else {
                                    af[Y] = W(Z[Y], ad, ab)
                                }
                            }
                        }
                        return af
                    }
                    O.toRaw = function(T, Y) {
                        return W(this, !!T, !!Y, this.$type)
                    };
                    O.encodeJSON = function() {
                        return JSON.stringify(W(this, true, true, this.$type))
                    };
                    S.decode = function(T, Y) {
                        if (typeof T === "string") {
                            T = c.wrap(T, Y ? Y : "base64")
                        }
                        T = c.isByteBuffer(T) ? T : c.wrap(T);
                        var Z = T.littleEndian;
                        try {
                            var ab = L.decode(T.LE());
                            T.LE(Z);
                            return ab
                        } catch (aa) {
                            T.LE(Z);
                            throw (aa)
                        }
                    };
                    S.decodeDelimited = function(Y, Z) {
                        if (typeof Y === "string") {
                            Y = c.wrap(Y, Z ? Z : "base64")
                        }
                        Y = c.isByteBuffer(Y) ? Y : c.wrap(Y);
                        if (Y.remaining() < 1) {
                            return null
                        }
                        var ac = Y.offset,
                            T = Y.readVarint32();
                        if (Y.remaining() < T) {
                            Y.offset = ac;
                            return null
                        }
                        try {
                            var ab = L.decode(Y.slice(Y.offset, Y.offset + T).LE());
                            Y.offset += T;
                            return ab
                        } catch (aa) {
                            Y.offset += T;
                            throw aa
                        }
                    };
                    S.decode64 = function(T) {
                        return S.decode(T, "base64")
                    };
                    S.decodeHex = function(T) {
                        return S.decode(T, "hex")
                    };
                    S.decodeJSON = function(T) {
                        return new S(JSON.parse(T))
                    };
                    O.toString = function() {
                        return L.toString()
                    };
                    var K;
                    var N;
                    var X;
                    var Q;
                    if (Object.defineProperty) {
                        Object.defineProperty(S, "$options", {
                            value: L.buildOpt()
                        }), Object.defineProperty(O, "$options", {
                            value: S["$options"]
                        }), Object.defineProperty(S, "$type", {
                            value: L
                        }), Object.defineProperty(O, "$type", {
                            value: L
                        })
                    }
                    return S
                })(n, this);
                this._fields = [];
                this._fieldsById = {};
                this._fieldsByName = {};
                for (var I = 0, G = this.children.length, J; I < G; I++) {
                    J = this.children[I];
                    if (J instanceof s || J instanceof f || J instanceof q) {
                        if (H.hasOwnProperty(J.name)) {
                            throw Error("Illegal reflect child of " + this.toString(true) + ": " + J.toString(true) + " cannot override static property '" + J.name + "'")
                        }
                        H[J.name] = J.build()
                    } else {
                        if (J instanceof f.Field) {
                            J.build(), this._fields.push(J), this._fieldsById[J.id] = J, this._fieldsByName[J.name] = J
                        } else {
                            if (!(J instanceof f.OneOf) && !(J instanceof p)) {
                                throw Error("Illegal reflect child of " + this.toString(true) + ": " + this.children[I].toString(true))
                            }
                        }
                    }
                }
                return this.clazz = H
            };
            E.encode = function(N, J, K) {
                var F = null,
                    M;
                for (var L = 0, I = this._fields.length, G; L < I; ++L) {
                    M = this._fields[L];
                    G = N[M.name];
                    if (M.required && G === null) {
                        if (F === null) {
                            F = M
                        }
                    } else {
                        M.encode(K ? G : M.verifyValue(G), J, N)
                    }
                }
                if (F !== null) {
                    var H = Error("Missing at least one required field for " + this.toString(true) + ": " + F);
                    H.encoded = J;
                    throw (H)
                }
                return J
            };
            E.calculate = function(H) {
                for (var K = 0, G = 0, F = this._fields.length, I, J; G < F; ++G) {
                    I = this._fields[G];
                    J = H[I.name];
                    if (I.required && J === null) {
                        throw Error("Missing at least one required field for " + this.toString(true) + ": " + I)
                    } else {
                        K += I.calculate(J, H)
                    }
                }
                return K
            };

            function C(I, H) {
                var G = H.readVarint32(),
                    F = G & 7,
                    J = G >>> 3;
                switch (F) {
                    case n.WIRE_TYPES.VARINT:
                        do {
                            G = H.readUint8()
                        } while ((G & 128) === 128);
                        break;
                    case n.WIRE_TYPES.BITS64:
                        H.offset += 8;
                        break;
                    case n.WIRE_TYPES.LDELIM:
                        G = H.readVarint32();
                        H.offset += G;
                        break;
                    case n.WIRE_TYPES.STARTGROUP:
                        C(J, H);
                        break;
                    case n.WIRE_TYPES.ENDGROUP:
                        if (J === I) {
                            return false
                        } else {
                            throw Error("Illegal GROUPEND after unknown group: " + J + " (" + I + " expected)")
                        }
                    case n.WIRE_TYPES.BITS32:
                        H.offset += 4;
                        break;
                    default:
                        throw Error("Illegal wire type in unknown group " + I + ": " + F)
                }
                return true
            }
            E.decode = function(L, H, N) {
                H = typeof H === "number" ? H : -1;
                var F = L.offset,
                    I = new(this.clazz)(),
                    T, S, G, Q;
                while (L.offset < F + H || (H === -1 && L.remaining() > 0)) {
                    T = L.readVarint32();
                    S = T & 7;
                    G = T >>> 3;
                    if (S === n.WIRE_TYPES.ENDGROUP) {
                        if (G !== N) {
                            throw Error("Illegal group end indicator for " + this.toString(true) + ": " + G + " (" + (N ? N + " expected" : "not a group") + ")")
                        }
                        break
                    }
                    if (!(Q = this._fieldsById[G])) {
                        switch (S) {
                            case n.WIRE_TYPES.VARINT:
                                L.readVarint32();
                                break;
                            case n.WIRE_TYPES.BITS32:
                                L.offset += 4;
                                break;
                            case n.WIRE_TYPES.BITS64:
                                L.offset += 8;
                                break;
                            case n.WIRE_TYPES.LDELIM:
                                var O = L.readVarint32();
                                L.offset += O;
                                break;
                            case n.WIRE_TYPES.STARTGROUP:
                                while (C(G, L)) {}
                                break;
                            default:
                                throw Error("Illegal wire type for unknown field " + G + " in " + this.toString(true) + "#decode: " + S)
                        }
                        continue
                    }
                    if (Q.repeated && !Q.options.packed) {
                        I[Q.name].push(Q.decode(S, L))
                    } else {
                        if (Q.map) {
                            var P = Q.decode(S, L);
                            I[Q.name].set(P[0], P[1])
                        } else {
                            I[Q.name] = Q.decode(S, L);
                            if (Q.oneof) {
                                var R = I[Q.oneof.name];
                                if (R !== null && R !== Q.name) {
                                    I[R] = null
                                }
                                I[Q.oneof.name] = Q.name
                            }
                        }
                    }
                }
                for (var M = 0, K = this._fields.length; M < K; ++M) {
                    Q = this._fields[M];
                    if (I[Q.name] === null) {
                        if (this.syntax === "proto3") {
                            I[Q.name] = Q.defaultValue
                        } else {
                            if (Q.required) {
                                var J = Error("Missing at least one required field for " + this.toString(true) + ": " + Q.name);
                                J.decoded = I;
                                throw (J)
                            } else {
                                if (n.populateDefaults && Q.defaultValue !== null) {
                                    I[Q.name] = Q.defaultValue
                                }
                            }
                        }
                    }
                }
                return I
            };
            i.Message = f;
            var l = function(J, N, M, H, L, F, G, O, K, I) {
                j.call(this, J, N, F);
                this.className = "Message.Field";
                this.required = M === "required";
                this.repeated = M === "repeated";
                this.map = M === "map";
                this.keyType = H || null;
                this.type = L;
                this.resolvedType = null;
                this.id = G;
                this.options = O || {};
                this.defaultValue = null;
                this.oneof = K || null;
                this.syntax = I || "proto2";
                this.originalName = this.name;
                this.element = null;
                this.keyElement = null;
                if (this.builder.options.convertFieldsToCamelCase && !(this instanceof f.ExtensionField)) {
                    this.name = n.Util.toCamelCase(this.name)
                }
            };
            var D = l.prototype = Object.create(j.prototype);
            D.build = function() {
                this.element = new u(this.type, this.resolvedType, false, this.syntax);
                if (this.map) {
                    this.keyElement = new u(this.keyType, undefined, true, this.syntax)
                }
                if (this.syntax === "proto3" && !this.repeated && !this.map) {
                    this.defaultValue = u.defaultFieldValue(this.type)
                } else {
                    if (typeof this.options["default"] !== "undefined") {
                        this.defaultValue = this.verifyValue(this.options["default"])
                    }
                }
            };
            D.verifyValue = function(J, G) {
                G = G || false;
                var F = function(L, K) {
                    throw Error("Illegal value for " + this.toString(true) + " of type " + this.type.name + ": " + L + " (" + K + ")")
                }.bind(this);
                if (J === null) {
                    if (this.required) {
                        F(typeof J, "required")
                    }
                    if (this.syntax === "proto3" && this.type !== n.TYPES.message) {
                        F(typeof J, "proto3 field without field presence cannot be null")
                    }
                    return null
                }
                var I;
                if (this.repeated && !G) {
                    if (!Array.isArray(J)) {
                        J = [J]
                    }
                    var H = [];
                    for (I = 0; I < J.length; I++) {
                        H.push(this.element.verifyValue(J[I]))
                    }
                    return H
                }
                if (this.map && !G) {
                    if (!(J instanceof n.Map)) {
                        if (!(J instanceof Object)) {
                            F(typeof J, "expected ProtoBuf.Map or raw object for map field")
                        }
                        return new n.Map(this, J)
                    } else {
                        return J
                    }
                }
                if (!this.repeated && Array.isArray(J)) {
                    F(typeof J, "no array expected")
                }
                return this.element.verifyValue(J)
            };
            D.hasWirePresence = function(G, F) {
                if (this.syntax !== "proto3") {
                    return (G !== null)
                }
                if (this.oneof && F[this.oneof.name] === this.name) {
                    return true
                }
                switch (this.type) {
                    case n.TYPES.int32:
                    case n.TYPES.sint32:
                    case n.TYPES.sfixed32:
                    case n.TYPES.uint32:
                    case n.TYPES.fixed32:
                        return G !== 0;
                    case n.TYPES.int64:
                    case n.TYPES.sint64:
                    case n.TYPES.sfixed64:
                    case n.TYPES.uint64:
                    case n.TYPES.fixed64:
                        return G.low !== 0 || G.high !== 0;
                    case n.TYPES.bool:
                        return G;
                    case n.TYPES["float"]:
                    case n.TYPES["double"]:
                        return G !== 0;
                    case n.TYPES.string:
                        return G.length > 0;
                    case n.TYPES.bytes:
                        return G.remaining() > 0;
                    case n.TYPES["enum"]:
                        return G !== 0;
                    case n.TYPES.message:
                        return G !== null;
                    default:
                        return true
                }
            };
            D.encode = function(M, I, N) {
                if (this.type === null || typeof this.type !== "object") {
                    throw Error("[INTERNAL] Unresolved type in " + this.toString(true) + ": " + this.type)
                }
                if (M === null || (this.repeated && M.length == 0)) {
                    return I
                }
                try {
                    if (this.repeated) {
                        var J;
                        if (this.options.packed && n.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0) {
                            I.writeVarint32((this.id << 3) | n.WIRE_TYPES.LDELIM);
                            I.ensureCapacity(I.offset += 1);
                            var F = I.offset;
                            for (J = 0; J < M.length; J++) {
                                this.element.encodeValue(this.id, M[J], I)
                            }
                            var K = I.offset - F,
                                H = c.calculateVarint32(K);
                            if (H > 1) {
                                var G = I.slice(F, I.offset);
                                F += H - 1;
                                I.offset = F;
                                I.append(G)
                            }
                            I.writeVarint32(K, F - H)
                        } else {
                            for (J = 0; J < M.length; J++) {
                                I.writeVarint32((this.id << 3) | this.type.wireType), this.element.encodeValue(this.id, M[J], I)
                            }
                        }
                    } else {
                        if (this.map) {
                            M.forEach(function(R, P, O) {
                                var Q = c.calculateVarint32((1 << 3) | this.keyType.wireType) + this.keyElement.calculateLength(1, P) + c.calculateVarint32((2 << 3) | this.type.wireType) + this.element.calculateLength(2, R);
                                I.writeVarint32((this.id << 3) | n.WIRE_TYPES.LDELIM);
                                I.writeVarint32(Q);
                                I.writeVarint32((1 << 3) | this.keyType.wireType);
                                this.keyElement.encodeValue(1, P, I);
                                I.writeVarint32((2 << 3) | this.type.wireType);
                                this.element.encodeValue(2, R, I)
                            }, this)
                        } else {
                            if (this.hasWirePresence(M, N)) {
                                I.writeVarint32((this.id << 3) | this.type.wireType);
                                this.element.encodeValue(this.id, M, I)
                            }
                        }
                    }
                } catch (L) {
                    throw Error("Illegal value for " + this.toString(true) + ": " + M + " (" + L + ")")
                }
                return I
            };
            D.calculate = function(I, H) {
                I = this.verifyValue(I);
                if (this.type === null || typeof this.type !== "object") {
                    throw Error("[INTERNAL] Unresolved type in " + this.toString(true) + ": " + this.type)
                }
                if (I === null || (this.repeated && I.length == 0)) {
                    return 0
                }
                var K = 0;
                try {
                    if (this.repeated) {
                        var G, F;
                        if (this.options.packed && n.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0) {
                            K += c.calculateVarint32((this.id << 3) | n.WIRE_TYPES.LDELIM);
                            F = 0;
                            for (G = 0; G < I.length; G++) {
                                F += this.element.calculateLength(this.id, I[G])
                            }
                            K += c.calculateVarint32(F);
                            K += F
                        } else {
                            for (G = 0; G < I.length; G++) {
                                K += c.calculateVarint32((this.id << 3) | this.type.wireType), K += this.element.calculateLength(this.id, I[G])
                            }
                        }
                    } else {
                        if (this.map) {
                            I.forEach(function(O, M, L) {
                                var N = c.calculateVarint32((1 << 3) | this.keyType.wireType) + this.keyElement.calculateLength(1, M) + c.calculateVarint32((2 << 3) | this.type.wireType) + this.element.calculateLength(2, O);
                                K += c.calculateVarint32((this.id << 3) | n.WIRE_TYPES.LDELIM);
                                K += c.calculateVarint32(N);
                                K += N
                            }, this)
                        } else {
                            if (this.hasWirePresence(I, H)) {
                                K += c.calculateVarint32((this.id << 3) | this.type.wireType);
                                K += this.element.calculateLength(this.id, I)
                            }
                        }
                    }
                } catch (J) {
                    throw Error("Illegal value for " + this.toString(true) + ": " + I + " (" + J + ")")
                }
                return K
            };
            D.decode = function(L, G, I) {
                var K, H;
                var O = (!this.map && L == this.type.wireType) || (!I && this.repeated && this.options.packed && L == n.WIRE_TYPES.LDELIM) || (this.map && L == n.WIRE_TYPES.LDELIM);
                if (!O) {
                    throw Error("Illegal wire type for field " + this.toString(true) + ": " + L + " (" + this.type.wireType + " expected)")
                }
                if (L == n.WIRE_TYPES.LDELIM && this.repeated && this.options.packed && n.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0) {
                    if (!I) {
                        H = G.readVarint32();
                        H = G.offset + H;
                        var N = [];
                        while (G.offset < H) {
                            N.push(this.decode(this.type.wireType, G, true))
                        }
                        return N
                    }
                }
                if (this.map) {
                    var M = u.defaultFieldValue(this.keyType);
                    K = u.defaultFieldValue(this.type);
                    H = G.readVarint32();
                    if (G.remaining() < H) {
                        throw Error("Illegal number of bytes for " + this.toString(true) + ": " + H + " required but got only " + G.remaining())
                    }
                    var J = G.clone();
                    J.limit = J.offset + H;
                    G.offset += H;
                    while (J.remaining() > 0) {
                        var P = J.readVarint32();
                        L = P & 7;
                        var F = P >>> 3;
                        if (F === 1) {
                            M = this.keyElement.decode(J, L, F)
                        } else {
                            if (F === 2) {
                                K = this.element.decode(J, L, F)
                            } else {
                                throw Error("Unexpected tag in map field key/value submessage")
                            }
                        }
                    }
                    return [M, K]
                }
                return this.element.decode(G, L, this.id)
            };
            i.Message.Field = l;
            var v = function(F, J, K, I, H, L, G) {
                l.call(this, F, J, K, null, I, H, L, G);
                this.extension
            };
            v.prototype = Object.create(l.prototype);
            i.Message.ExtensionField = v;
            var x = function(F, H, G) {
                j.call(this, F, H, G);
                this.fields = []
            };
            i.Message.OneOf = x;
            var s = function(G, J, I, H, F) {
                r.call(this, G, J, I, H, F);
                this.className = "Enum";
                this.object = null
            };
            s.getName = function(F, J) {
                var I = Object.keys(F);
                for (var H = 0, G; H < I.length; ++H) {
                    if (F[G = I[H]] === J) {
                        return G
                    }
                }
                return null
            };
            var k = s.prototype = Object.create(r.prototype);
            k.build = function(F) {
                if (this.object && !F) {
                    return this.object
                }
                var I = new n.Builder.Enum(),
                    H = this.getChildren(s.Value);
                for (var J = 0, G = H.length; J < G; ++J) {
                    I[H[J]["name"]] = H[J]["id"]
                }
                if (Object.defineProperty) {
                    Object.defineProperty(I, "$options", {
                        value: this.buildOpt(),
                        enumerable: false
                    })
                }
                return this.object = I
            };
            i.Enum = s;
            var B = function(F, H, G, I) {
                j.call(this, F, H, G);
                this.className = "Enum.Value";
                this.id = I
            };
            B.prototype = Object.create(j.prototype);
            i.Enum.Value = B;
            var p = function(F, H, G, I) {
                j.call(this, F, H, G);
                this.field = I
            };
            p.prototype = Object.create(j.prototype);
            i.Extension = p;
            var q = function(G, F, I, H) {
                r.call(this, G, F, I, H);
                this.className = "Service";
                this.clazz = null
            };
            var A = q.prototype = Object.create(r.prototype);
            A.build = function(F) {
                if (this.clazz && !F) {
                    return this.clazz
                }
                return this.clazz = (function(N, I) {
                    var H = function(Q) {
                        N.Builder.Service.call(this);
                        this.rpcImpl = Q || function(R, S, T) {
                            setTimeout(T.bind(this, Error("Not implemented, see: https://github.com/dcodeIO/ProtoBuf.js/wiki/Services")), 0)
                        }
                    };
                    var O = H.prototype = Object.create(N.Builder.Service.prototype);
                    var L = I.getChildren(N.Reflect.Service.RPCMethod);
                    for (var J = 0; J < L.length; J++) {
                        (function(Q) {
                            O[Q.name] = function(S, T) {
                                try {
                                    try {
                                        S = Q.resolvedRequestType.clazz.decode(c.wrap(S))
                                    } catch (R) {
                                        if (!(R instanceof TypeError)) {
                                            throw R
                                        }
                                    }
                                    if (S === null || typeof S !== "object") {
                                        throw Error("Illegal arguments")
                                    }
                                    if (!(S instanceof Q.resolvedRequestType.clazz)) {
                                        S = new Q.resolvedRequestType.clazz(S)
                                    }
                                    this.rpcImpl(Q.fqn(), S, function(V, U) {
                                        if (V) {
                                            T(V);
                                            return
                                        }
                                        try {
                                            U = Q.resolvedResponseType.clazz.decode(U)
                                        } catch (W) {}
                                        if (!U || !(U instanceof Q.resolvedResponseType.clazz)) {
                                            T(Error("Illegal response type received in service method " + I.name + "#" + Q.name));
                                            return
                                        }
                                        T(null, U)
                                    })
                                } catch (R) {
                                    setTimeout(T.bind(this, R), 0)
                                }
                            };
                            H[Q.name] = function(R, S, T) {
                                new H(R)[Q.name](S, T)
                            };
                            if (Object.defineProperty) {
                                Object.defineProperty(H[Q.name], "$options", {
                                    value: Q.buildOpt()
                                }), Object.defineProperty(O[Q.name], "$options", {
                                    value: H[Q.name]["$options"]
                                })
                            }
                        })(L[J])
                    }
                    var G;
                    var K;
                    var P;
                    var M;
                    if (Object.defineProperty) {
                        Object.defineProperty(H, "$options", {
                            value: I.buildOpt()
                        }), Object.defineProperty(O, "$options", {
                            value: H["$options"]
                        }), Object.defineProperty(H, "$type", {
                            value: I
                        }), Object.defineProperty(O, "$type", {
                            value: I
                        })
                    }
                    return H
                })(n, this)
            };
            i.Service = q;
            var g = function(F, I, H, G) {
                j.call(this, F, I, H);
                this.className = "Service.Method";
                this.options = G || {}
            };
            var o = g.prototype = Object.create(j.prototype);
            o.buildOpt = w.buildOpt;
            i.Service.Method = g;
            var t = function(H, M, K, L, G, J, F, I) {
                g.call(this, H, M, K, I);
                this.className = "Service.RPCMethod";
                this.requestName = L;
                this.responseName = G;
                this.requestStream = J;
                this.responseStream = F;
                this.resolvedRequestType = null;
                this.resolvedResponseType = null
            };
            t.prototype = Object.create(g.prototype);
            i.Service.RPCMethod = t;
            return i
        })(e);
        e.Builder = (function(i, h, k) {
            var j = function(l) {
                this.ns = new k.Namespace(this, null, "");
                this.ptr = this.ns;
                this.resolved = false;
                this.result = null;
                this.files = {};
                this.importRoot = null;
                this.options = l || {}
            };
            var f = j.prototype;
            j.isMessage = function(l) {
                if (typeof l.name !== "string") {
                    return false
                }
                if (typeof l.values !== "undefined" || typeof l.rpc !== "undefined") {
                    return false
                }
                return true
            };
            j.isMessageField = function(l) {
                if (typeof l.rule !== "string" || typeof l.name !== "string" || typeof l.type !== "string" || typeof l.id === "undefined") {
                    return false
                }
                return true
            };
            j.isEnum = function(l) {
                if (typeof l.name !== "string") {
                    return false
                }
                if (typeof l.values === "undefined" || !Array.isArray(l.values) || l.values.length === 0) {
                    return false
                }
                return true
            };
            j.isService = function(l) {
                if (typeof l.name !== "string" || typeof l.rpc !== "object" || !l.rpc) {
                    return false
                }
                return true
            };
            j.isExtend = function(l) {
                if (typeof l.ref !== "string") {
                    return false
                }
                return true
            };
            f.reset = function() {
                this.ptr = this.ns;
                return this
            };
            f.define = function(l) {
                if (typeof l !== "string" || !h.TYPEREF.test(l)) {
                    throw Error("illegal namespace: " + l)
                }
                l.split(".").forEach(function(m) {
                    var n = this.ptr.getChild(m);
                    if (n === null) {
                        this.ptr.addChild(n = new k.Namespace(this, this.ptr, m))
                    }
                    this.ptr = n
                }, this);
                return this
            };
            f.create = function(m) {
                if (!m) {
                    return this
                }
                if (!Array.isArray(m)) {
                    m = [m]
                } else {
                    if (m.length === 0) {
                        return this
                    }
                    m = m.slice()
                }
                var l = [m];
                while (l.length > 0) {
                    m = l.pop();
                    if (!Array.isArray(m)) {
                        throw Error("not a valid namespace: " + JSON.stringify(m))
                    }
                    while (m.length > 0) {
                        var p = m.shift();
                        if (j.isMessage(p)) {
                            var q = new k.Message(this, this.ptr, p.name, p.options, p.isGroup, p.syntax);
                            var o = {};
                            if (p.oneofs) {
                                Object.keys(p.oneofs).forEach(function(r) {
                                    q.addChild(o[r] = new k.Message.OneOf(this, q, r))
                                }, this)
                            }
                            if (p.fields) {
                                p.fields.forEach(function(r) {
                                    if (q.getChild(r.id | 0) !== null) {
                                        throw Error("duplicate or invalid field id in " + q.name + ": " + r.id)
                                    }
                                    if (r.options && typeof r.options !== "object") {
                                        throw Error("illegal field options in " + q.name + "#" + r.name)
                                    }
                                    var s = null;
                                    if (typeof r.oneof === "string" && !(s = o[r.oneof])) {
                                        throw Error("illegal oneof in " + q.name + "#" + r.name + ": " + r.oneof)
                                    }
                                    r = new k.Message.Field(this, q, r.rule, r.keytype, r.type, r.name, r.id, r.options, s, p.syntax);
                                    if (s) {
                                        s.fields.push(r)
                                    }
                                    q.addChild(r)
                                }, this)
                            }
                            var n = [];
                            if (p.enums) {
                                p.enums.forEach(function(r) {
                                    n.push(r)
                                })
                            }
                            if (p.messages) {
                                p.messages.forEach(function(r) {
                                    n.push(r)
                                })
                            }
                            if (p.services) {
                                p.services.forEach(function(r) {
                                    n.push(r)
                                })
                            }
                            if (p.extensions) {
                                if (typeof p.extensions[0] === "number") {
                                    q.extensions = [p.extensions]
                                } else {
                                    q.extensions = p.extensions
                                }
                            }
                            this.ptr.addChild(q);
                            if (n.length > 0) {
                                l.push(m);
                                m = n;
                                n = null;
                                this.ptr = q;
                                q = null;
                                continue
                            }
                            n = null
                        } else {
                            if (j.isEnum(p)) {
                                q = new k.Enum(this, this.ptr, p.name, p.options, p.syntax);
                                p.values.forEach(function(r) {
                                    q.addChild(new k.Enum.Value(this, q, r.name, r.id))
                                }, this);
                                this.ptr.addChild(q)
                            } else {
                                if (j.isService(p)) {
                                    q = new k.Service(this, this.ptr, p.name, p.options);
                                    Object.keys(p.rpc).forEach(function(s) {
                                        var r = p.rpc[s];
                                        q.addChild(new k.Service.RPCMethod(this, q, s, r.request, r.response, !!r.request_stream, !!r.response_stream, r.options))
                                    }, this);
                                    this.ptr.addChild(q)
                                } else {
                                    if (j.isExtend(p)) {
                                        q = this.ptr.resolve(p.ref, true);
                                        if (q) {
                                            p.fields.forEach(function(s) {
                                                if (q.getChild(s.id | 0) !== null) {
                                                    throw Error("duplicate extended field id in " + q.name + ": " + s.id)
                                                }
                                                if (q.extensions) {
                                                    var u = false;
                                                    q.extensions.forEach(function(w) {
                                                        if (s.id >= w[0] && s.id <= w[1]) {
                                                            u = true
                                                        }
                                                    });
                                                    if (!u) {
                                                        throw Error("illegal extended field id in " + q.name + ": " + s.id + " (not within valid ranges)")
                                                    }
                                                }
                                                var r = s.name;
                                                if (this.options.convertFieldsToCamelCase) {
                                                    r = i.Util.toCamelCase(r)
                                                }
                                                var v = new k.Message.ExtensionField(this, q, s.rule, s.type, this.ptr.fqn() + "." + r, s.id, s.options);
                                                var t = new k.Extension(this, this.ptr, s.name, v);
                                                v.extension = t;
                                                this.ptr.addChild(t);
                                                q.addChild(v)
                                            }, this)
                                        } else {
                                            if (!/\.?google\.protobuf\./.test(p.ref)) {
                                                throw Error("extended message " + p.ref + " is not defined")
                                            }
                                        }
                                    } else {
                                        throw Error("not a valid definition: " + JSON.stringify(p))
                                    }
                                }
                            }
                        }
                        p = null;
                        q = null
                    }
                    m = null;
                    this.ptr = this.ptr.parent
                }
                this.resolved = false;
                this.result = null;
                return this
            };

            function g(l) {
                if (l.messages) {
                    l.messages.forEach(function(m) {
                        m.syntax = l.syntax;
                        g(m)
                    })
                }
                if (l.enums) {
                    l.enums.forEach(function(m) {
                        m.syntax = l.syntax
                    })
                }
            }
            f["import"] = function(v, l) {
                var n = "/";
                if (typeof l === "string") {
                    if (i.Util.IS_NODE) {
                       // l = require("path")["resolve"](l)
                    }
                    if (this.files[l] === true) {
                        return this.reset()
                    }
                    this.files[l] = true
                } else {
                    if (typeof l === "object") {
                        var t = l.root;
                        if (i.Util.IS_NODE) {
                          //  t = require("path")["resolve"](t)
                        }
                        if (t.indexOf("\\") >= 0 || l.file.indexOf("\\") >= 0) {
                            n = "\\"
                        }
                        var o = t + n + l.file;
                        if (this.files[o] === true) {
                            return this.reset()
                        }
                        this.files[o] = true
                    }
                }
                if (v.imports && v.imports.length > 0) {
                    var q, s = false;
                    if (typeof l === "object") {
                        this.importRoot = l.root;
                        s = true;
                        q = this.importRoot;
                        l = l.file;
                        if (q.indexOf("\\") >= 0 || l.indexOf("\\") >= 0) {
                            n = "\\"
                        }
                    } else {
                        if (typeof l === "string") {
                            if (this.importRoot) {
                                q = this.importRoot
                            } else {
                                if (l.indexOf("/") >= 0) {
                                    q = l.replace(/\/[^\/]*$/, "");
                                    if (q === "") {
                                        q = "/"
                                    }
                                } else {
                                    if (l.indexOf("\\") >= 0) {
                                        q = l.replace(/\\[^\\]*$/, "");
                                        n = "\\"
                                    } else {
                                        q = "."
                                    }
                                }
                            }
                        } else {
                            q = null
                        }
                    }
                    for (var r = 0; r < v.imports.length; r++) {
                        if (typeof v.imports[r] === "string") {
                            if (!q) {
                                throw Error("cannot determine import root")
                            }
                            var u = v.imports[r];
                            if (u === "google/protobuf/descriptor.proto") {
                                continue
                            }
                            u = q + n + u;
                            if (this.files[u] === true) {
                                continue
                            }
                            if (/\.proto$/i.test(u) && !i.DotProto) {
                                u = u.replace(/\.proto$/, ".json")
                            }
                            var p = i.Util.fetch(u);
                            if (p === null) {
                                throw Error("failed to import '" + u + "' in '" + l + "': file not found")
                            }
                            if (/\.json$/i.test(u)) {
                                this["import"](JSON.parse(p + ""), u)
                            } else {
                                this["import"](i.DotProto.Parser.parse(p), u)
                            }
                        } else {
                            if (!l) {
                                this["import"](v.imports[r])
                            } else {
                                if (/\.(\w+)$/.test(l)) {
                                    this["import"](v.imports[r], l.replace(/^(.+)\.(\w+)$/, function(x, w, y) {
                                        return w + "_import" + r + "." + y
                                    }))
                                } else {
                                    this["import"](v.imports[r], l + "_import" + r)
                                }
                            }
                        }
                    }
                    if (s) {
                        this.importRoot = null
                    }
                }
                if (v["package"]) {
                    this.define(v["package"])
                }
                if (v.syntax) {
                    g(v)
                }
                var m = this.ptr;
                if (v.options) {
                    Object.keys(v.options).forEach(function(w) {
                        m.options[w] = v.options[w]
                    })
                }
                if (v.messages) {
                    this.create(v.messages), this.ptr = m
                }
                if (v.enums) {
                    this.create(v.enums), this.ptr = m
                }
                if (v.services) {
                    this.create(v.services), this.ptr = m
                }
                if (v["extends"]) {
                    this.create(v["extends"])
                }
                return this.reset()
            };
            f.resolveAll = function() {
                var l;
                if (this.ptr == null || typeof this.ptr.type === "object") {
                    return this
                }
                if (this.ptr instanceof k.Namespace) {
                    this.ptr.children.forEach(function(m) {
                        this.ptr = m;
                        this.resolveAll()
                    }, this)
                } else {
                    if (this.ptr instanceof k.Message.Field) {
                        if (!h.TYPE.test(this.ptr.type)) {
                            if (!h.TYPEREF.test(this.ptr.type)) {
                                throw Error("illegal type reference in " + this.ptr.toString(true) + ": " + this.ptr.type)
                            }
                            l = (this.ptr instanceof k.Message.ExtensionField ? this.ptr.extension.parent : this.ptr.parent).resolve(this.ptr.type, true);
                            if (!l) {
                                throw Error("unresolvable type reference in " + this.ptr.toString(true) + ": " + this.ptr.type)
                            }
                            this.ptr.resolvedType = l;
                            if (l instanceof k.Enum) {
                                this.ptr.type = i.TYPES["enum"];
                                if (this.ptr.syntax === "proto3" && l.syntax !== "proto3") {
                                    throw Error("proto3 message cannot reference proto2 enum")
                                }
                            } else {
                                if (l instanceof k.Message) {
                                    this.ptr.type = l.isGroup ? i.TYPES.group : i.TYPES.message
                                } else {
                                    throw Error("illegal type reference in " + this.ptr.toString(true) + ": " + this.ptr.type)
                                }
                            }
                        } else {
                            this.ptr.type = i.TYPES[this.ptr.type]
                        }
                        if (this.ptr.map) {
                            if (!h.TYPE.test(this.ptr.keyType)) {
                                throw Error("illegal key type for map field in " + this.ptr.toString(true) + ": " + this.ptr.keyType)
                            }
                            this.ptr.keyType = i.TYPES[this.ptr.keyType]
                        }
                    } else {
                        if (this.ptr instanceof i.Reflect.Service.Method) {
                            if (this.ptr instanceof i.Reflect.Service.RPCMethod) {
                                l = this.ptr.parent.resolve(this.ptr.requestName, true);
                                if (!l || !(l instanceof i.Reflect.Message)) {
                                    throw Error("Illegal type reference in " + this.ptr.toString(true) + ": " + this.ptr.requestName)
                                }
                                this.ptr.resolvedRequestType = l;
                                l = this.ptr.parent.resolve(this.ptr.responseName, true);
                                if (!l || !(l instanceof i.Reflect.Message)) {
                                    throw Error("Illegal type reference in " + this.ptr.toString(true) + ": " + this.ptr.responseName)
                                }
                                this.ptr.resolvedResponseType = l
                            } else {
                                throw Error("illegal service type in " + this.ptr.toString(true))
                            }
                        } else {
                            if (!(this.ptr instanceof i.Reflect.Message.OneOf) && !(this.ptr instanceof i.Reflect.Extension) && !(this.ptr instanceof i.Reflect.Enum.Value)) {
                                throw Error("illegal object in namespace: " + typeof(this.ptr) + ": " + this.ptr)
                            }
                        }
                    }
                }
                return this.reset()
            };
            f.build = function(n) {
                this.reset();
                if (!this.resolved) {
                    this.resolveAll(), this.resolved = true, this.result = null
                }
                if (this.result === null) {
                    this.result = this.ns.build()
                }
                if (!n) {
                    return this.result
                }
                var l = typeof n === "string" ? n.split(".") : n,
                    o = this.result;
                for (var m = 0; m < l.length; m++) {
                    if (o[l[m]]) {
                        o = o[l[m]]
                    } else {
                        o = null;
                        break
                    }
                }
                return o
            };
            f.lookup = function(m, l) {
                return m ? this.ns.resolve(m, l) : this.ns
            };
            f.toString = function() {
                return "Builder"
            };
            j.Message = function() {};
            j.Enum = function() {};
            j.Service = function() {};
            return j
        })(e, e.Lang, e.Reflect);
        e.Map = (function(g, j) {
            var f = function(o, n) {
                if (!o.map) {
                    throw Error("field is not a map")
                }
                this.field = o;
                this.keyElem = new j.Element(o.keyType, null, true, o.syntax);
                this.valueElem = new j.Element(o.type, o.resolvedType, false, o.syntax);
                this.map = {};
                Object.defineProperty(this, "size", {
                    get: function() {
                        return Object.keys(this.map).length
                    }
                });
                if (n) {
                    var m = Object.keys(n);
                    for (var l = 0; l < m.length; l++) {
                        var k = this.keyElem.valueFromString(m[l]);
                        var p = this.valueElem.verifyValue(n[m[l]]);
                        this.map[this.keyElem.valueToString(k)] = {
                            key: k,
                            value: p
                        }
                    }
                }
            };
            var h = f.prototype;

            function i(l) {
                var k = 0;
                return {
                    next: function() {
                        if (k < l.length) {
                            return {
                                done: false,
                                value: l[k++]
                            }
                        }
                        return {
                            done: true
                        }
                    }
                }
            }
            h.clear = function() {
                this.map = {}
            };
            h["delete"] = function(l) {
                var m = this.keyElem.valueToString(this.keyElem.verifyValue(l));
                var k = m in this.map;
                delete this.map[m];
                return k
            };
            h.entries = function() {
                var k = [];
                var n = Object.keys(this.map);
                for (var l = 0, m; l < n.length; l++) {
                    k.push([(m = this.map[n[l]]).key, m.value])
                }
                return i(k)
            };
            h.keys = function() {
                var l = [];
                var m = Object.keys(this.map);
                for (var k = 0; k < m.length; k++) {
                    l.push(this.map[m[k]].key)
                }
                return i(l)
            };
            h.values = function() {
                var k = [];
                var m = Object.keys(this.map);
                for (var l = 0; l < m.length; l++) {
                    k.push(this.map[m[l]].value)
                }
                return i(k)
            };
            h.forEach = function(k, l) {
                var o = Object.keys(this.map);
                for (var m = 0, n; m < o.length; m++) {
                    k.call(l, (n = this.map[o[m]]).value, n.key, this)
                }
            };
            h.set = function(k, m) {
                var n = this.keyElem.verifyValue(k);
                var l = this.valueElem.verifyValue(m);
                this.map[this.keyElem.valueToString(n)] = {
                    key: n,
                    value: l
                };
                return this
            };
            h.get = function(k) {
                var l = this.keyElem.valueToString(this.keyElem.verifyValue(k));
                if (!(l in this.map)) {
                    return undefined
                }
                return this.map[l].value
            };
            h.has = function(k) {
                var l = this.keyElem.valueToString(this.keyElem.verifyValue(k));
                return (l in this.map)
            };
            return f
        })(e, e.Reflect);
        e.loadProto = function(h, g, f) {
            if (typeof g === "string" || (g && typeof g.file === "string" && typeof g.root === "string")) {
                f = g, g = undefined
            }
            return e.loadJson(e.DotProto.Parser.parse(h), g, f)
        };
        e.protoFromString = e.loadProto;
        e.loadProtoFile = function(g, i, f) {
            if (i && typeof i === "object") {
                f = i, i = null
            } else {
                if (!i || typeof i !== "function") {
                    i = null
                }
            }
            if (i) {
                return e.Util.fetch(typeof g === "string" ? g : g.root + "/" + g.file, function(j) {
                    if (j === null) {
                        i(Error("Failed to fetch file"));
                        return
                    }
                    try {
                        i(null, e.loadProto(j, f, g))
                    } catch (k) {
                        i(k)
                    }
                })
            }
            var h = e.Util.fetch(typeof g === "object" ? g.root + "/" + g.file : g);
            return h === null ? null : e.loadProto(h, f, g)
        };
        e.protoFromFile = e.loadProtoFile;
        e.newBuilder = function(f) {
            f = f || {};
            if (typeof f.convertFieldsToCamelCase === "undefined") {
                f.convertFieldsToCamelCase = e.convertFieldsToCamelCase
            }
            if (typeof f.populateAccessors === "undefined") {
                f.populateAccessors = e.populateAccessors
            }
            return new e.Builder(f)
        };
        e.loadJson = function(h, g, f) {
            if (typeof g === "string" || (g && typeof g.file === "string" && typeof g.root === "string")) {
                f = g, g = null
            }
            if (!g || typeof g !== "object") {
                g = e.newBuilder()
            }
            if (typeof h === "string") {
                h = JSON.parse(h)
            }
            g["import"](h, f);
            g.resolveAll();
            return g
        };
        e.loadJsonFile = function(g, i, f) {
            if (i && typeof i === "object") {
                f = i, i = null
            } else {
                if (!i || typeof i !== "function") {
                    i = null
                }
            }
            if (i) {
                return e.Util.fetch(typeof g === "string" ? g : g.root + "/" + g.file, function(j) {
                    if (j === null) {
                        i(Error("Failed to fetch file"));
                        return
                    }
                    try {
                        i(null, e.loadJson(JSON.parse(j), f, g))
                    } catch (k) {
                        i(k)
                    }
                })
            }
            var h = e.Util.fetch(typeof g === "object" ? g.root + "/" + g.file : g);
            return h === null ? null : e.loadJson(JSON.parse(h), f, g)
        };
        var d = function(o) {
            var k, h, g, f, l, n, j, m = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
            n = o.length;
            l = 0;
            j = "";
            while (l < n) {
                do {
                    k = m[o.charCodeAt(l++) & 255]
                } while (l < n && k == -1);
                if (k == -1) {
                    break
                }
                do {
                    h = m[o.charCodeAt(l++) & 255]
                } while (l < n && h == -1);
                if (h == -1) {
                    break
                }
                j += String.fromCharCode((k << 2) | ((h & 48) >> 4));
                do {
                    g = o.charCodeAt(l++) & 255;
                    if (g == 61) {
                        return j
                    }
                    g = m[g]
                } while (l < n && g == -1);
                if (g == -1) {
                    break
                }
                j += String.fromCharCode(((h & 15) << 4) | ((g & 60) >> 2));
                do {
                    f = o.charCodeAt(l++) & 255;
                    if (f == 61) {
                        return j
                    }
                    f = m[f]
                } while (l < n && f == -1);
                if (f == -1) {
                    break
                }
                j += String.fromCharCode(((g & 3) << 6) | f)
            }
            return j
        };
        var a = d("cGFja2FnZSBNb2R1bGVzOwptZXNzYWdlIHByb2J1ZiB7CgltZXNzYWdlIFZvaXBEeW5hbWljSW5wdXQKCXsKCQlyZXF1aXJlZCBpbnQzMiAgZW5naW5lVHlwZSA9IDE7CgkJcmVxdWlyZWQgc3RyaW5nIGNoYW5uZWxOYW1lID0gMjsKCQlvcHRpb25hbCBzdHJpbmcgY2hhbm5lbEV4dHJhID0gMzsKCX0KCgltZXNzYWdlIFZvaXBEeW5hbWljT3V0cHV0Cgl7CgkJIHJlcXVpcmVkIHN0cmluZyBkeW5hbWljS2V5PTE7Cgl9CiAgICBtZXNzYWdlIE5vdGlmeU1zZyB7CiAgICAgICAgcmVxdWlyZWQgaW50MzIgdHlwZSA9IDE7CiAgICAgICAgb3B0aW9uYWwgaW50NjQgdGltZSA9IDI7CgkJb3B0aW9uYWwgc3RyaW5nIGNocm1JZD0zOwogICAgfQogICAgbWVzc2FnZSBTeW5jUmVxdWVzdE1zZyB7CiAgICAgICAgcmVxdWlyZWQgaW50NjQgc3luY1RpbWUgPSAxOwogICAgICAgIHJlcXVpcmVkIGJvb2wgaXNwb2xsaW5nID0gMjsKICAgICAgICBvcHRpb25hbCBib29sIGlzd2ViPTM7CgkJb3B0aW9uYWwgYm9vbCBpc1B1bGxTZW5kPTQ7Ly/mmK/lkKbpnIDopoHmi4nlj5blj5Hku7bnrrHvvIxmYWxzZeS4jeimge+8jHRydWXpnIDopoEKICAgIH0KICAgIG1lc3NhZ2UgVXBTdHJlYW1NZXNzYWdlIHsKICAgICAgICByZXF1aXJlZCBpbnQzMiBzZXNzaW9uSWQgPSAxOwogICAgICAgIHJlcXVpcmVkIHN0cmluZyBjbGFzc25hbWUgPSAyOwogICAgICAgIHJlcXVpcmVkIGJ5dGVzIGNvbnRlbnQgPSAzOwogICAgICAgIG9wdGlvbmFsIHN0cmluZyBwdXNoVGV4dCA9IDQ7CiAgICAgICAgb3B0aW9uYWwgc3RyaW5nIGFwcERhdGEgPSA1OwoJCXJlcGVhdGVkIHN0cmluZyB1c2VySWQgPSA2OwogICAgfQogICAgbWVzc2FnZSBEb3duU3RyZWFtTWVzc2FnZXMgewogICAgICAgIHJlcGVhdGVkIERvd25TdHJlYW1NZXNzYWdlIGxpc3QgPSAxOwogICAgICAgIHJlcXVpcmVkIGludDY0IHN5bmNUaW1lID0gMjsKICAgIH0KICAgIG1lc3NhZ2UgRG93blN0cmVhbU1lc3NhZ2UgewogICAgICAgIHJlcXVpcmVkIHN0cmluZyBmcm9tVXNlcklkID0gMTsKICAgICAgICByZXF1aXJlZCBDaGFubmVsVHlwZSB0eXBlID0gMjsKICAgICAgICBvcHRpb25hbCBzdHJpbmcgZ3JvdXBJZCA9IDM7CiAgICAgICAgcmVxdWlyZWQgc3RyaW5nIGNsYXNzbmFtZSA9IDQ7CiAgICAgICAgcmVxdWlyZWQgYnl0ZXMgY29udGVudCA9IDU7CiAgICAgICAgcmVxdWlyZWQgaW50NjQgZGF0YVRpbWUgPSA2OwogICAgICAgIHJlcXVpcmVkIGludDY0IHN0YXR1cyA9IDc7CiAgICAgICAgb3B0aW9uYWwgaW50NjQgZXh0cmEgPSA4OwogICAgICAgIG9wdGlvbmFsIHN0cmluZyBtc2dJZCA9IDk7CgkJb3B0aW9uYWwgaW50MzIgZGlyZWN0aW9uID0gMTA7IAogICAgfQogICAgZW51bSBDaGFubmVsVHlwZSB7CiAgICAgICAgUEVSU09OID0gMTsKICAgICAgICBQRVJTT05TID0gMjsKICAgICAgICBHUk9VUCA9IDM7CiAgICAgICAgVEVNUEdST1VQID0gNDsKICAgICAgICBDVVNUT01FUlNFUlZJQ0UgPSA1OwogICAgICAgIE5PVElGWSA9IDY7CiAgICAgICAgTUM9NzsKICAgICAgICBNUD04OwogICAgfQogICAgbWVzc2FnZSBDcmVhdGVEaXNjdXNzaW9uSW5wdXQgewogICAgICAgIG9wdGlvbmFsIHN0cmluZyBuYW1lID0gMTsKICAgIH0KICAgIG1lc3NhZ2UgQ3JlYXRlRGlzY3Vzc2lvbk91dHB1dCB7CiAgICAgICAgcmVxdWlyZWQgc3RyaW5nIGlkID0gMTsKICAgIH0KICAgIG1lc3NhZ2UgQ2hhbm5lbEludml0YXRpb25JbnB1dCB7CiAgICAgICAgcmVwZWF0ZWQgc3RyaW5nIHVzZXJzID0gMTsKICAgIH0KICAgIG1lc3NhZ2UgTGVhdmVDaGFubmVsSW5wdXQgewogICAgICAgIHJlcXVpcmVkIGludDMyIG5vdGhpbmcgPSAxOwogICAgfQogICAgbWVzc2FnZSBDaGFubmVsRXZpY3Rpb25JbnB1dCB7CiAgICAgICAgcmVxdWlyZWQgc3RyaW5nIHVzZXIgPSAxOwogICAgfQogICAgbWVzc2FnZSBSZW5hbWVDaGFubmVsSW5wdXQgewogICAgICAgIHJlcXVpcmVkIHN0cmluZyBuYW1lID0gMTsKICAgIH0KICAgIG1lc3NhZ2UgQ2hhbm5lbEluZm9JbnB1dCB7CiAgICAgICAgcmVxdWlyZWQgaW50MzIgbm90aGluZyA9IDE7CiAgICB9CiAgICBtZXNzYWdlIENoYW5uZWxJbmZvT3V0cHV0IHsKICAgICAgICByZXF1aXJlZCBDaGFubmVsVHlwZSB0eXBlID0gMTsKICAgICAgICByZXF1aXJlZCBzdHJpbmcgY2hhbm5lbElkID0gMjsKICAgICAgICByZXF1aXJlZCBzdHJpbmcgY2hhbm5lbE5hbWUgPSAzOwogICAgICAgIHJlcXVpcmVkIHN0cmluZyBhZG1pblVzZXJJZCA9IDQ7CiAgICAgICAgcmVwZWF0ZWQgc3RyaW5nIGZpcnN0VGVuVXNlcklkcyA9IDU7CiAgICAgICAgcmVxdWlyZWQgaW50MzIgb3BlblN0YXR1cyA9IDY7CiAgICB9CiAgICBtZXNzYWdlIENoYW5uZWxJbmZvc0lucHV0IHsKICAgICAgICByZXF1aXJlZCBpbnQzMiBwYWdlID0gMTsKICAgICAgICBvcHRpb25hbCBpbnQzMiBudW1iZXIgPSAyOwogICAgfQogICAgbWVzc2FnZSBDaGFubmVsSW5mb3NPdXRwdXQgewogICAgICAgIHJlcGVhdGVkIENoYW5uZWxJbmZvT3V0cHV0IGNoYW5uZWxzID0gMTsKICAgICAgICByZXF1aXJlZCBpbnQzMiB0b3RhbCA9IDI7CiAgICB9CiAgICBtZXNzYWdlIE1lbWJlckluZm8gewogICAgICAgIHJlcXVpcmVkIHN0cmluZyB1c2VySWQgPSAxOwogICAgICAgIHJlcXVpcmVkIHN0cmluZyB1c2VyTmFtZSA9IDI7CiAgICAgICAgcmVxdWlyZWQgc3RyaW5nIHVzZXJQb3J0cmFpdCA9IDM7CiAgICAgICAgcmVxdWlyZWQgc3RyaW5nIGV4dGVuc2lvbiA9IDQ7CiAgICB9CiAgICBtZXNzYWdlIEdyb3VwTWVtYmVyc0lucHV0IHsKICAgICAgICByZXF1aXJlZCBpbnQzMiBwYWdlID0gMTsKICAgICAgICBvcHRpb25hbCBpbnQzMiBudW1iZXIgPSAyOwogICAgfQogICAgbWVzc2FnZSBHcm91cE1lbWJlcnNPdXRwdXQgewogICAgICAgIHJlcGVhdGVkIE1lbWJlckluZm8gbWVtYmVycyA9IDE7CiAgICAgICAgcmVxdWlyZWQgaW50MzIgdG90YWwgPSAyOwogICAgfQogICAgbWVzc2FnZSBHZXRVc2VySW5mb0lucHV0IHsKICAgICAgICByZXF1aXJlZCBpbnQzMiBub3RoaW5nID0gMTsKICAgIH0KICAgIG1lc3NhZ2UgR2V0VXNlckluZm9PdXRwdXQgewogICAgICAgIHJlcXVpcmVkIHN0cmluZyB1c2VySWQgPSAxOwogICAgICAgIHJlcXVpcmVkIHN0cmluZyB1c2VyTmFtZSA9IDI7CiAgICAgICAgcmVxdWlyZWQgc3RyaW5nIHVzZXJQb3J0cmFpdCA9IDM7CiAgICB9CiAgICBtZXNzYWdlIEdldFNlc3Npb25JZElucHV0IHsKICAgICAgICByZXF1aXJlZCBpbnQzMiBub3RoaW5nID0gMTsKICAgIH0KICAgIG1lc3NhZ2UgR2V0U2Vzc2lvbklkT3V0cHV0IHsKICAgICAgICByZXF1aXJlZCBpbnQzMiBzZXNzaW9uSWQgPSAxOwogICAgfQogICAgZW51bSBGaWxlVHlwZSB7CiAgICAgICAgaW1hZ2UgPSAxOwogICAgICAgIGF1ZGlvID0gMjsKICAgICAgICB2aWRlbyA9IDM7CgkJZmlsZSA9IDQ7CiAgICB9CiAgICBtZXNzYWdlIEdldFFOdXBUb2tlbklucHV0IHsKICAgICAgICByZXF1aXJlZCBGaWxlVHlwZSB0eXBlID0gMTsKICAgIH0KICAgIG1lc3NhZ2UgR2V0UU5kb3dubG9hZFVybElucHV0IHsKICAgICAgICByZXF1aXJlZCBGaWxlVHlwZSB0eXBlID0gMTsKICAgICAgICByZXF1aXJlZCBzdHJpbmcga2V5ID0gMjsKCQlvcHRpb25hbCBzdHJpbmcgIGZpbGVOYW1lID0gMzsKICAgIH0KICAgIG1lc3NhZ2UgR2V0UU51cFRva2VuT3V0cHV0IHsKICAgICAgICByZXF1aXJlZCBpbnQ2NCBkZWFkbGluZSA9IDE7CiAgICAgICAgcmVxdWlyZWQgc3RyaW5nIHRva2VuID0gMjsKICAgIH0KICAgIG1lc3NhZ2UgR2V0UU5kb3dubG9hZFVybE91dHB1dCB7CiAgICAgICAgcmVxdWlyZWQgc3RyaW5nIGRvd25sb2FkVXJsID0gMTsKICAgIH0KICAgIG1lc3NhZ2UgQWRkMkJsYWNrTGlzdElucHV0IHsKICAgICAgICByZXF1aXJlZCBzdHJpbmcgdXNlcklkID0gMTsKICAgIH0KICAgIG1lc3NhZ2UgUmVtb3ZlRnJvbUJsYWNrTGlzdElucHV0IHsKICAgICAgICByZXF1aXJlZCBzdHJpbmcgdXNlcklkID0gMTsKICAgIH0KICAgIG1lc3NhZ2UgUXVlcnlCbGFja0xpc3RJbnB1dCB7CiAgICAgICAgcmVxdWlyZWQgaW50MzIgbm90aGluZyA9IDE7CiAgICB9CiAgICBtZXNzYWdlIFF1ZXJ5QmxhY2tMaXN0T3V0cHV0IHsKICAgICAgICByZXBlYXRlZCBzdHJpbmcgdXNlcklkcyA9IDE7CiAgICB9CiAgICBtZXNzYWdlIEJsYWNrTGlzdFN0YXR1c0lucHV0IHsKICAgICAgICByZXF1aXJlZCBzdHJpbmcgdXNlcklkID0gMTsKICAgIH0KICAgIG1lc3NhZ2UgQmxvY2tQdXNoSW5wdXQgewogICAgICAgIHJlcXVpcmVkIHN0cmluZyBibG9ja2VlSWQgPSAxOwogICAgfQogICAgbWVzc2FnZSBNb2RpZnlQZXJtaXNzaW9uSW5wdXQgewogICAgICAgIHJlcXVpcmVkIGludDMyIG9wZW5TdGF0dXMgPSAxOwogICAgfQogICAgbWVzc2FnZSBHcm91cElucHV0IHsKICAgICAgICByZXBlYXRlZCBHcm91cEluZm8gZ3JvdXBJbmZvID0gMTsKICAgIH0KICAgIG1lc3NhZ2UgR3JvdXBPdXRwdXQgewogICAgICAgIHJlcXVpcmVkIGludDMyIG5vdGhpbmcgPSAxOwogICAgfQogICAgbWVzc2FnZSBHcm91cEluZm8gewogICAgICAgIHJlcXVpcmVkIHN0cmluZyBpZCA9IDE7CiAgICAgICAgcmVxdWlyZWQgc3RyaW5nIG5hbWUgPSAyOwogICAgfQogICAgbWVzc2FnZSBHcm91cEhhc2hJbnB1dCB7CiAgICAgICAgcmVxdWlyZWQgc3RyaW5nIHVzZXJJZCA9IDE7CiAgICAgICAgcmVxdWlyZWQgc3RyaW5nIGdyb3VwSGFzaENvZGUgPSAyOwogICAgfQogICAgbWVzc2FnZSBHcm91cEhhc2hPdXRwdXQgewogICAgICAgIHJlcXVpcmVkIEdyb3VwSGFzaFR5cGUgcmVzdWx0ID0gMTsKICAgIH0KICAgIGVudW0gR3JvdXBIYXNoVHlwZSB7CiAgICAgICAgZ3JvdXBfc3VjY2VzcyA9IDB4MDA7CiAgICAgICAgZ3JvdXBfZmFpbHVyZSA9IDB4MDE7CiAgICB9CiAgICBtZXNzYWdlIENocm1JbnB1dCB7CiAgICAgICAgcmVxdWlyZWQgaW50MzIgbm90aGluZyA9IDE7CiAgICB9CiAgICBtZXNzYWdlIENocm1PdXRwdXQgewogICAgICAgIHJlcXVpcmVkIGludDMyIG5vdGhpbmcgPSAxOwogICAgfQogICAgbWVzc2FnZSBDaHJtUHVsbE1zZyB7CiAgICAgICAgcmVxdWlyZWQgaW50NjQgc3luY1RpbWUgPSAxOwogICAgICAgIHJlcXVpcmVkIGludDMyIGNvdW50ID0gMjsKICAgIH0KCQoJbWVzc2FnZSBDaHJtUHVsbE1zZ05ldyAgLy/lrqLmiLfnq6/mlrDnmoTmi4nlj5bogYrlpKnlrqTmtojmga8KCXsKCSByZXF1aXJlZCBpbnQzMiBjb3VudCA9IDE7Ly/mi4nlj5bmnaHmlbAgICAwOumAmuefpeaLieWPliAgIOmdnjDvvJrkuLvliqjmi4nlj5bljoblj7Lmtojmga/mnaHmlbAKCSByZXF1aXJlZCBpbnQ2NCBzeW5jVGltZSA9IDI7Ly/lkIzmraXmi4nlj5bml7bpl7QKCSBvcHRpb25hbCBzdHJpbmcgY2hybUlkPTM7Ly/ogYrlpKnlrqRJRAoJfQoJCiAgICBtZXNzYWdlIFJlbGF0aW9uc0lucHV0CiAgICB7CiAgICAgICAgcmVxdWlyZWQgQ2hhbm5lbFR5cGUgdHlwZSA9IDE7CiAgICAgICAgb3B0aW9uYWwgRG93blN0cmVhbU1lc3NhZ2UgbXNnID0yOwoJCW9wdGlvbmFsIGludDMyIGNvdW50ID0gMzsgLy8g5ouJ5Y+W5p2h5pWwLOm7mOiupDA6YWxsCiAgICB9CiAgICBtZXNzYWdlIFJlbGF0aW9uc091dHB1dAogICAgewogICAgICAgIHJlcGVhdGVkIFJlbGF0aW9uSW5mbyBpbmZvID0gMTsKICAgIH0KICAgIG1lc3NhZ2UgUmVsYXRpb25JbmZvCiAgICB7CiAgICAgICAgcmVxdWlyZWQgQ2hhbm5lbFR5cGUgdHlwZSA9IDE7CiAgICAgICAgcmVxdWlyZWQgc3RyaW5nIHVzZXJJZCA9IDI7CiAgICAgICAgb3B0aW9uYWwgRG93blN0cmVhbU1lc3NhZ2UgbXNnID0zOwogICAgfQogICAgbWVzc2FnZSBIaXN0b3J5TWVzc2FnZUlucHV0CiAgICB7CiAgICAgICAgcmVxdWlyZWQgc3RyaW5nIHRhcmdldElkID0gMTsKICAgICAgICByZXF1aXJlZCBpbnQ2NCBkYXRhVGltZSA9MjsKICAgICAgICByZXF1aXJlZCBpbnQzMiBzaXplICA9IDM7CiAgICB9CgogICAgbWVzc2FnZSBIaXN0b3J5TWVzc2FnZXNPdXB1dAogICAgewogICAgICAgIHJlcGVhdGVkIERvd25TdHJlYW1NZXNzYWdlIGxpc3QgPSAxOwogICAgICAgIHJlcXVpcmVkIGludDY0IHN5bmNUaW1lID0gMjsKICAgICAgICByZXF1aXJlZCBpbnQzMiBoYXNNc2cgPSAzOwogICAgfQoJbWVzc2FnZSBRdWVyeUNoYXRyb29tSW5mb0lucHV0Cgl7CgkgcmVxdWlyZWQgaW50MzIgY291bnQ9IDE7Ly/mnJ/mnJvojrflj5bogYrlpKnlrqTnlKjmiLfnmoTkurrmlbDvvIzojIPlm7TkuLowfjIwCgkgb3B0aW9uYWwgaW50MzIgb3JkZXI9IDI7Ly/mjInml7bpl7TmjpLluo/vvIzojIPlm7TvvJow77yMMe+8jDIu77yIMDrkuI3ov5Tlm57vvJsxOuato+W6jyjmnIDml6nliqDlhaUp77ybMjrlgJLluo8o5pyA5pma5Yqg5YWlKe+8iQoJfQoKCW1lc3NhZ2UgUXVlcnlDaGF0cm9vbUluZm9PdXRwdXQKCXsKCSBvcHRpb25hbCBpbnQzMiB1c2VyVG90YWxOdW1zID0gMTsvL+W9k+WJjeiBiuWkqeWupOS4reeahOaAu+S6uuaVsAoJIHJlcGVhdGVkIENocm1NZW1iZXIgdXNlckluZm9zID0gMjsvL+i/lOWbnumDqOWIhueUqOaIt+S/oeaBr+WIl+ihqO+8iOWPquWMheWQq3VzZXJJZOWSjGpvaW5UaW1l5bGe5oCn77yJCgl9CgltZXNzYWdlIENocm1NZW1iZXIKCXsKCSByZXF1aXJlZCBpbnQ2NCB0aW1lID0gMTsvL01lbWJlcueahGpvaW5UaW1lCgkgcmVxdWlyZWQgc3RyaW5nIGlkID0gMjsvL01lbWJlcueahHVzZXJJZAoJfQoJbWVzc2FnZSBNUEZvbGxvd0lucHV0ICAvL21w5YWz5rOoL+WPlua2iOWFs+azqAoJewoJCXJlcXVpcmVkIHN0cmluZyBpZCA9IDE7Ly9tcGlkCgl9CgoJbWVzc2FnZSBNUEZvbGxvd091dHB1dAoJewoJCXJlcXVpcmVkIGludDMyIG5vdGhpbmcgPSAxOy8v5Y2g5L2N5a2X5q61CgkJb3B0aW9uYWwgTXBJbmZvIGluZm8gPTI7Ly/lhbPms6jnmoRtcGluZm8KCX0KCgltZXNzYWdlIE1DRm9sbG93SW5wdXQgICAvL21j5YWz5rOoL+WPlua2iOWFs+azqAoJewoJCXJlcXVpcmVkIHN0cmluZyBpZCA9IDE7Ly9tY2lkCgl9CgoJbWVzc2FnZSBNQ0ZvbGxvd091dHB1dAoJewoJCXJlcXVpcmVkIGludDMyIG5vdGhpbmcgPSAxOy8v5Y2g5L2N5a2X5q61CgkJb3B0aW9uYWwgTXBJbmZvIGluZm8gPTI7Ly/lhbPms6jnmoRtcGluZm8KCX0KCgltZXNzYWdlIE1wSW5mbyAgLy9tcOWfuuacrOS/oeaBrwoJewoJCXJlcXVpcmVkIHN0cmluZyBtcGlkPTE7Ly9tcC9tY2lkCgkJcmVxdWlyZWQgc3RyaW5nIG5hbWUgPSAyOy8vZGlzcGxheU5hbWUKCQlyZXF1aXJlZCBzdHJpbmcgdHlwZSA9IDM7Ly9tcC9tYwoJCXJlcXVpcmVkIGludDY0IHRpbWU9NDsvL+WFrOS8l+W4kOWPt+S/ruaUueaXtumXtAoJCW9wdGlvbmFsIHN0cmluZyBwb3J0cmFpdFVybD01Oy8v5aS05YOPCgkJb3B0aW9uYWwgc3RyaW5nIGV4dHJhID02Oy8v5YW25LuW5L+h5oGvKGpzb24p77yM5ouJ5Y+W55qE5pe25YCZ5YyF5ZCr6I+c5Y2V44CB566A5LuL562J5L+h5oGv44CCCgl9CgoJbWVzc2FnZSBTZWFyY2hNcElucHV0IC8v5qC55o2u5YWs5LyX5biQ5Y+3aWTlrozlhajljLnphY3mn6Xmib4KCXsKCQlyZXF1aXJlZCBpbnQzMiB0eXBlPTE7Ly/moIflv5fkvY0s5pel5ZCO5oyJ5L2N5p2l5YGa5omp5bGVCgkJcmVxdWlyZWQgc3RyaW5nIGlkPTI7Ly9tcGlkL21jaWQvZGlzcGxheU5hbWUKCX0KCgltZXNzYWdlIFNlYXJjaE1wT3V0cHV0Cgl7CgkJcmVxdWlyZWQgaW50MzIgbm90aGluZz0xOy8v5Y2g5L2N56ymCgkJcmVwZWF0ZWQgTXBJbmZvIGluZm8gPSAyOy8v5YWs5LyX5biQ5Y+3Cgl9CgoJbWVzc2FnZSBQdWxsTXBJbnB1dCAvL+err+S4iuaLieWPluWFrOS8l+i0puWPt+S/oeaBrwoJewoJCXJlcXVpcmVkIGludDY0IHRpbWU9MTsvL+WFrOS8l+W4kOWPt+S/ruaUueaXtumXtAoJCXJlcXVpcmVkIHN0cmluZyBtcGlkPTI7Ly/nq6/kuIrnvJPlrZjlhazkvJfluJDlj7fnmoRpZOeahG1kNeS4sgoJfQoKCW1lc3NhZ2UgUHVsbE1wT3V0cHV0Cgl7CgkJcmVxdWlyZWQgaW50MzIgc3RhdHVzPTE7Ly/mmK/lkKbmnInmt7vliqDlkozliKDpmaTvvIzlpoLmnpzmnInlj5jljJbliJnov5Tlm57lhajpg6jvvIzlkKbliJnov5Tlm57mm7TmlrDnmoQKCQlyZXBlYXRlZCBNcEluZm8gaW5mbyA9IDI7Ly/lhazkvJfluJDlj7cKCX0KCW1lc3NhZ2UgSGlzdG9yeU1zZ0lucHV0ICAKCXsKCQlvcHRpb25hbCBzdHJpbmcgdGFyZ2V0SWQgPSAxOy8v6IGK5aSp5a6kSUQKCQlvcHRpb25hbCBpbnQ2NCB0aW1lID0gMjsvL+afpeivouaXtumXtOeCuQoJCW9wdGlvbmFsIGludDMyIGNvdW50ICA9IDM7Ly/mi4nlj5bmnaHmlbAKCQlvcHRpb25hbCBpbnQzMiBvcmRlciA9IDQ7Ly/mi4nlj5bpobrluo8gKDHvvJrmraPluo/vvJsw77ya5YCS5bqPKQoJfQoKCW1lc3NhZ2UgSGlzdG9yeU1zZ091cHV0ICAvL+i/lOWbnuiBiuWkqeWupOWOhuWPsua2iOaBrwoJewoJCXJlcGVhdGVkIERvd25TdHJlYW1NZXNzYWdlIGxpc3QgPSAxOy8v5omA5oul5pyJ55qE5raI5oGv77yIbGlzdOWkjeexu+Wei++8iQoJCXJlcXVpcmVkIGludDY0IHN5bmNUaW1lID0gMjsvL+WQjOatpeaXtumXtAoJCXJlcXVpcmVkIGludDMyIGhhc01zZyA9IDM7IC8v5piv5ZCm6L+Y5pyJ5ZCO57ut5Y6G5Y+y5raI5oGvCgl9Cn0=");
        var probuf = e.loadProto(a, undefined, "").build("Modules").probuf;
        return probuf;
    })(ByteBuffer, Long, b);
    return Protobuf;
});
