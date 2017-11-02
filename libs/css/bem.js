var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable no-console */
var isDev = process.env.NODE_ENV !== 'production';

/*
 Format bem <block>__<element>--<modifierKey>[_<modValue>] is_<states>
*/
var Bem = function () {
  function Bem(cssModule, settings) {
    var _this = this;

    _classCallCheck(this, Bem);

    this.settings = { throwOnError: false, suppressWarning: true };

    this.extractModuleName = function () {
      if (isDev) {
        if (!_this.cssModule || _typeof(_this.cssModule) !== 'object' || Array.isArray(_this.cssModule)) {
          var message = 'cssModule object should be a Object with keys';
          if (_this.settings.throwOnError) {
            throw Error(message);
          } else {
            _this.settings.suppressWarning || console.warn(message);
            return '';
          }
        }
      }

      var _Object$keys = Object.keys(_this.cssModule),
          _Object$keys2 = _slicedToArray(_Object$keys, 1),
          name = _Object$keys2[0];

      if (isDev) {
        if (!name) {
          var _message = 'cssModule has no keys';

          if (_this.settings.throwOnError) {
            throw Error(_message);
          } else {
            _this.settings.suppressWarning || console.warn(_message);
            return '';
          }
        }
      }

      return name.replace(Bem.regExpClearBEM, '');
    };

    this.setSettings = function (newSettings) {
      _this.settings = Object.assign(_this.settings, newSettings);
    };

    this.cssModule = cssModule;
    settings && this.setSettings(settings);
  }
  /**
   * Base function for bem naming with css modules
   * @param {Object} cssModule. Imported css module
   * @param {String} name. BEM name
   * @param {String} [element]
   * @param {Object} [mods]
   * @param {Object} [states]
   * @return {String}
   */


  _createClass(Bem, [{
    key: 'block',
    value: function block() {
      var _this2 = this;

      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.extractModuleName();

      return {
        name: name,
        className: function className(elementParam, modsParam, statesParam) {
          var mods = void 0,
              states = void 0,
              element = void 0;
          if (elementParam && (typeof elementParam === 'undefined' ? 'undefined' : _typeof(elementParam)) === 'object') {
            mods = elementParam;
            states = modsParam;
          } else {
            mods = modsParam;
            states = statesParam;
            element = elementParam;
          }
          var baseBlock = element ? name + '__' + element : name;
          var result = _this2.cssModule[baseBlock];
          if (!result) {
            if (isDev && !_this2.settings.ignoreError) {
              var message = 'Tidak ada className ' + baseBlock + ' di cssModule';
              if (_this2.settings.throwOnError) {
                throw Error(message);
              } else {
                _this2.settings.suppressWarning || console.warn(message);
              }
            }
            result = baseBlock;
          }

          if (mods) {
            result = Object.keys(mods).reduce(function (acc, next) {
              var modValue = mods && mods[next];

              var mod = void 0;

              if (typeof modValue === 'boolean') {
                var cn = baseBlock + '--' + next;
                if (isDev && !_this2.settings.ignoreError) {
                  if (!(cn in _this2.cssModule)) {
                    var _message2 = 'Tidak ada className ' + cn + ' di cssModule';

                    if (_this2.settings.throwOnError) {
                      throw Error(_message2);
                    } else {
                      _this2.settings.suppressWarning || console.warn(_message2);
                    }
                  }
                }

                if (modValue) {
                  mod = _this2.cssModule[cn] || cn;
                } else {
                  return acc;
                }
              } else {
                var _cn = modValue && baseBlock + '--' + next + '_' + modValue;
                if (isDev && !_this2.settings.ignoreError) {
                  if (modValue && !(_cn && _cn in _this2.cssModule)) {
                    var _message3 = 'Tidak ada className ' + (_cn || '') + ' di cssModule';

                    if (_this2.settings.throwOnError) {
                      throw Error(_message3);
                    } else {
                      _this2.settings.suppressWarning || console.warn(_message3);
                    }
                  }
                }
                mod = _cn && _this2.cssModule[_cn] || _cn || '';
              }

              return acc + ' ' + mod;
            }, result);
          }

          if (states) {
            result = Object.keys(states).reduce(function (acc, next) {
              var stateValue = states && states[next];
              if (!stateValue) {
                return acc;
              }
              var cn = 'is_' + next;
              var state = _this2.cssModule[cn];
              if (!state) {
                if (isDev && !_this2.settings.ignoreError) {
                  var _message4 = 'There is no ' + cn + ' in cssModule';

                  if (_this2.settings.throwOnError) {
                    throw Error(_message4);
                  } else {
                    _this2.settings.suppressWarning || console.warn(_message4);
                  }
                }
              }
              return acc + ' ' + state;
            }, result);
          }
          return result;
        }
      };
    }
  }, {
    key: 'setCssModule',
    value: function setCssModule(cssModule) {
      this.cssModule = cssModule;
    }
  }, {
    key: 'getCssModule',
    value: function getCssModule() {
      return this.cssModule;
    }
  }]);

  return Bem;
}();

Bem.regExpClearBEM = /__.*/g;

export default Bem;