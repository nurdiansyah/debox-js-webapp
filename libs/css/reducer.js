function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Map } from 'immutable';

import { registerActionType, removeAllActionType, removeActionType } from './actions';
import { STORE_ID } from './styles-manager';

var initialState = Map({});

export var optionsAddCss = {
  replace: true

  /**
   *
   * @param state
   * @param action
   * @return {*}
   */
};export var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case registerActionType:
      {
        var styles = action.styles;
        return state.withMutations(function (_state) {
          styles.forEach(function (style) {
            var id = style._id;
            var _dt = _state.get(id) || { style: style, count: 0 };
            if (_dt.count < 1) {
              style._removeCss = style._insertCss(optionsAddCss);
            }
            ++_dt.count;
            _state = _state.set(id, _dt);
          });
          return _state;
        });
      }

    case removeActionType:
      {
        // unregistered style from css browser => removeCss
        var dt = state.get(action.identifier);
        if (dt) {
          if (dt.count <= 1) {
            dt.style._removeCss();
            return state.withMutations(function (_state) {
              return _state.delete(action.identifier);
            });
          }
          --dt.count;
          return state.withMutations(function (_state) {
            return _state.set(action.identifier, dt);
          });
        }
        return state;
      }
    case removeAllActionType:
      {
        state.forEach(function (map) {
          if (map && typeof map._removeCss === 'function') {
            map._removeCss();
          }
        });
        return initialState;
      }
    default:
      return state;
  }
};

export default _defineProperty({}, STORE_ID, reducer);