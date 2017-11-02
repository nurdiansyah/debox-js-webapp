var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint react/no-find-dom-node:0 */
import React, { Component } from 'react';

import contains from 'dom-helpers/query/contains';
import ReactDOM from 'react-dom';

import events from '../dom/events';
import owner from '../dom/owner';

var defaultProps = {
  event: 'click'
};

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

var RootCloseWrapper = function (_Component) {
  _inherits(RootCloseWrapper, _Component);

  function RootCloseWrapper(props) {
    _classCallCheck(this, RootCloseWrapper);

    var _this = _possibleConstructorReturn(this, (RootCloseWrapper.__proto__ || Object.getPrototypeOf(RootCloseWrapper)).call(this, props));

    _this.preventMouseRootClose = false;
    return _this;
  }

  _createClass(RootCloseWrapper, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!this.props.disabled) {
        this.addEventListeners();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (!this.props.disabled && prevProps.disabled) {
        this.addEventListeners();
      } else if (this.props.disabled && !prevProps.disabled) {
        this.removeEventListeners();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (!this.props.disabled) {
        this.removeEventListeners();
      }
    }
  }, {
    key: 'addEventListeners',
    value: function addEventListeners() {
      var _props$event = this.props.event,
          event = _props$event === undefined ? defaultProps.event : _props$event;

      var doc = owner(this);

      // Use capture for this listener so it fires before React's listener, to
      // avoid false positives in the contains() check below if the target DOM
      // element is removed in the React mouse callback.
      this.documentMouseCaptureListener = events.addEventListener(doc, event, this.handleMouseCapture, true);

      this.documentMouseListener = events.addEventListener(doc, event, this.handleMouse);

      this.documentKeyupListener = events.addEventListener(doc, 'keyup', this.handleKeyUp);
    }
  }, {
    key: 'removeEventListeners',
    value: function removeEventListeners() {
      if (this.documentMouseCaptureListener) {
        this.documentMouseCaptureListener.remove();
      }

      if (this.documentMouseListener) {
        this.documentMouseListener.remove();
      }

      if (this.documentKeyupListener) {
        this.documentKeyupListener.remove();
      }
    }
  }, {
    key: 'handleMouseCapture',
    value: function handleMouseCapture(e) {
      this.preventMouseRootClose = isModifiedEvent(e) || !isLeftClickEvent(e) || contains(ReactDOM.findDOMNode(this), e.target);
    }
  }, {
    key: 'handleMouse',
    value: function handleMouse() {
      if (!this.preventMouseRootClose && this.props.onRootClose) {
        this.props.onRootClose();
      }
    }
  }, {
    key: 'handleKeyUp',
    value: function handleKeyUp(e) {
      if (e.keyCode === 27 && this.props.onRootClose) {
        this.props.onRootClose();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React.Children.only(this.props.children);
    }
  }]);

  return RootCloseWrapper;
}(Component);

RootCloseWrapper.displayName = 'RootCloseWrapper';
export default RootCloseWrapper;