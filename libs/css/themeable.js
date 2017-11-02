var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Merges two theme by concatenating values with the same keys
 * @param {object} [original] - Original theme object
 * @param {object} [mixin] - Mixing theme object
 * @returns {object} - Merged resulting theme
 */
var themeable = function themeable() {
  var original = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var mixin = arguments[1];

  // don't merge if no mixin is passed
  if (!mixin) return original;

  // merge theme by concatenating values with the same keys
  return Object.keys(mixin).reduce(
  // merging reducer
  function (result, key) {
    var originalValue = original[key];
    var mixinValue = mixin[key];

    var newValue = void 0;

    // check if values are nested objects
    if ((typeof originalValue === 'undefined' ? 'undefined' : _typeof(originalValue)) === 'object' && (typeof mixinValue === 'undefined' ? 'undefined' : _typeof(mixinValue)) === 'object') {
      // go recursive
      newValue = themeable(originalValue, mixinValue);
    } else {
      // either concat or take mixin value
      newValue = originalValue ? originalValue + ' ' + mixinValue : mixinValue;
    }

    return Object.assign({}, result, _defineProperty({}, key, newValue));
  },

  // use original theme as an acc
  original);
};

export default themeable;