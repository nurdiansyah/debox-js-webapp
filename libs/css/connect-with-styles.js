import connect from '@debox-client/core/redux/connect';

import { register, get, remove } from './styles-manager';

import themeable from './themeable';

var optionsConnect = {
  getDisplayName: function getDisplayName(name) {
    return 'ConnectStyles(' + name + ')';
  }
  /**
   * create connect to redux
   * @param {string|Object} styles|styles string is identifier or Object for styles with key object is identifier
   * @param {Object} themes
   * @param {Object} options
   */
};var createConnect = function createConnect(styles, themes) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  styles = Array.isArray(styles) ? styles : [styles];
  var _ids = styles.map(function (st) {
    return st._id;
  });
  var _idThemes = void 0;

  register(styles);
  if (themes) {
    themes = Array.isArray(themes) ? themes : [themes];
    _idThemes = themes.map(function (th) {
      return th._id;
    });
    register(themes);
  }

  options.onComponentWillUnmount = function () {
    remove(_ids);
    _idThemes && remove(_idThemes);
  };

  var selectorFactory = function selectorFactory() {
    return function (state, props) {
      var _styles = get(_ids) || {};
      var _themes = _idThemes ? get(_idThemes) : {};
      var addProps = {
        cssModule: themeable(_styles, _themes)
      };
      return Object.assign({}, props, addProps);
    };
  };
  return function (Component) {
    return connect(selectorFactory, Object.assign(options, optionsConnect))(Component);
  };
};

export default createConnect;