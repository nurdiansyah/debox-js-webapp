import { getStore } from '@debox-client/core/redux/store';

import { registerAction, removeAction, removeAllAction } from './actions';


export var STORE_ID = 'styles';

/**
 * add style to html
 * @param {object} styles format styles {identifier: styles} or single style Object must identifier is string
 * @param {string} identifier if undefined styles is multiple style identifier is key object
 * @return {Map}
 */
export var register = function register(styles) {
  styles = Array.isArray(styles) ? styles : [styles];
  var action = registerAction(styles);
  var __store = getStore();
  __store.dispatch(action);
};

export var get = function get(identifier) {
  var __store = getStore();
  var state = __store.getState().get(STORE_ID);

  var _styles = void 0;
  if (Array.isArray(identifier)) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = identifier[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _identifier = _step.value;

        if (_identifier) {
          var dt = state.get(_identifier);
          if (dt && dt.style) {
            _styles = _styles || {};
            _styles = Object.assign(_styles, dt.style);
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  } else {
    var _dt = state.get(identifier);
    _styles = _dt ? _dt.style : _styles;
  }

  return _styles;
};

/**
 * add style to html
 * @param {string | Array} identifier single identifier or multiple identifier berupa array string
 * @return {Map}
 */
export var remove = function remove(identifier) {
  var action = removeAction(identifier);
  var __store = getStore();
  __store.dispatch(action);
};

export var removeAll = function removeAll() {
  var action = removeAllAction();
  var __store = getStore();
  __store.dispatch(action);
};