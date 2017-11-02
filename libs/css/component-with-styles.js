var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import Bem from './bem';
import hoistStatics from 'hoist-non-react-statics';

function componentWithStyles() {
  for (var _len = arguments.length, styles = Array(_len), _key = 0; _key < _len; _key++) {
    styles[_key] = arguments[_key];
  }

  return function wrapWithStyles(ComposedComponent) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { isBem: false };

    var displayName = ComposedComponent.displayName || ComposedComponent.name || 'Component';

    var WithStyles = function (_Component) {
      _inherits(WithStyles, _Component);

      function WithStyles() {
        _classCallCheck(this, WithStyles);

        return _possibleConstructorReturn(this, (WithStyles.__proto__ || Object.getPrototypeOf(WithStyles)).apply(this, arguments));
      }

      _createClass(WithStyles, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
          var _this2 = this;

          this.removeCss = [];
          styles.forEach(function (style) {
            _this2.removeCss.push(style._insertCss());
          });
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this.removeCss.forEach(function (_removeCss) {
            setTimeout(_removeCss, 0);
          });
        }
      }, {
        key: 'render',
        value: function render() {
          var _styles = Object.assign.apply(Object, [{}].concat(styles));
          var _addProps = { styles: options.isBem ? new Bem(_styles, options) : _styles };
          return React.createElement(ComposedComponent, _extends({}, this.props, _addProps));
        }
      }]);

      return WithStyles;
    }(Component);

    WithStyles.ComposedComponent = ComposedComponent;
    WithStyles.displayName = 'RenderWithStyles(' + displayName + ')';


    return hoistStatics(WithStyles, ComposedComponent);
  };
}

export default componentWithStyles;