import isWindow from 'dom-helpers/query/isWindow';
import ownerDocument from 'dom-helpers/ownerDocument';

function isBody(node) {
  return node && node.tagName.toLowerCase() === 'body';
}

function bodyIsOverflowing(node) {
  var doc = ownerDocument(node);
  var win = isWindow(doc);
  var fullWidth = win.innerWidth;

  // Support: ie8, no innerWidth
  if (!fullWidth) {
    if (doc.documentElement !== null) {
      var documentElementRect = doc.documentElement.getBoundingClientRect();
      fullWidth = documentElementRect.right - Math.abs(documentElementRect.left);
    }
  }

  return doc.body ? doc.body.clientWidth < fullWidth : false;
}

export var isOverflowing = function isOverflowing(container) {
  var win = isWindow(container);

  return win || isBody(container) ? bodyIsOverflowing(container) : container.scrollHeight > container.clientHeight;
};

export var setScrollbarWidth = function setScrollbarWidth(padding) {
  if (document.body) {
    document.body.style.paddingRight = padding > 0 ? padding + 'px' : '';
  }
};

export var getScrollbarWidth = function getScrollbarWidth() {
  var scrollDiv = document.createElement('div');
  // .modal-scrollbar-measure styles // https://github.com/twbs/bootstrap/blob/v4.0.0-alpha.4/scss/_modal.scss#L106-L113
  scrollDiv.style.position = 'absolute';
  scrollDiv.style.top = '-9999px';
  scrollDiv.style.width = '50px';
  scrollDiv.style.height = '50px';
  scrollDiv.style.overflow = 'scroll';
  if (document.body) {
    var body = document.body;
    body.appendChild(scrollDiv);
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    body.removeChild(scrollDiv);
    return scrollbarWidth;
  }
  return NaN;
};

export var getOriginalPadding = function getOriginalPadding() {
  return parseInt(window.getComputedStyle(document.body, null).getPropertyValue('padding-right') || 0, 10);
};

export var conditionallyUpdateScrollbar = function conditionallyUpdateScrollbar(node) {
  var scrollbarWidth = getScrollbarWidth();
  // https://github.com/twbs/bootstrap/blob/v4.0.0-alpha.4/js/src/modal.js#L420
  var fixedContent = document.querySelectorAll('.navbar-fixed-top, .navbar-fixed-bottom, .is-fixed')[0];
  var bodyPadding = fixedContent ? parseInt(fixedContent.style.paddingRight || 0, 10) : 0;

  if (bodyIsOverflowing(node)) {
    setScrollbarWidth(bodyPadding + scrollbarWidth);
  }
};