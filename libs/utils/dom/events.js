import eventsOn from 'dom-helpers/events/on';
import eventsOff from 'dom-helpers/events/off';

export default {
  pauseEvent: function pauseEvent(event) {
    event.stopPropagation();
    event.preventDefault();
  },
  addEventsToDocument: function addEventsToDocument(eventMap) {
    for (var _key in eventMap) {
      if ({}.hasOwnProperty.call(eventMap, _key)) {
        document.addEventListener(_key, eventMap[_key], false);
      }
    }
  },
  removeEventsFromDocument: function removeEventsFromDocument(eventMap) {
    for (var _key2 in eventMap) {
      if ({}.hasOwnProperty.call(eventMap, _key2)) {
        document.removeEventListener(_key2, eventMap[_key2], false);
      }
    }
  },
  targetIsDescendant: function targetIsDescendant(event, parent) {
    var node = event.target;
    while (node !== null) {
      if (node === parent) return true;
      if (node instanceof Node) {
        node = node.parentNode;
      }
    }
    return false;
  },
  addEventListenerOnTransitionEnded: function addEventListenerOnTransitionEnded(element, fn) {
    var eventName = transitionEventNamesFor(element);
    if (!eventName) return false;
    element.addEventListener(eventName, fn);
    return true;
  },
  removeEventListenerOnTransitionEnded: function removeEventListenerOnTransitionEnded(element, fn) {
    var eventName = transitionEventNamesFor(element);
    if (!eventName) return false;
    element.removeEventListener(eventName, fn);
    return true;
  },
  addEventListener: function addEventListener(node, event, handler, capture) {
    eventsOn(node, event, handler, capture);
    return {
      remove: function remove() {
        eventsOff(node, event, handler, capture);
      }
    };
  },


  /**
   * Firefox doesn't have a focusin event so using capture is easiest way to get bubbling
   * IE8 can't do addEventListener, but does have onfocusin, so we use that in ie8
   *
   * We only allow one Listener at a time to avoid stack overflows
   */
  addFocusListener: function addFocusListener(handler) {
    var useFocusin = !document.addEventListener;
    var remove = void 0;

    if (useFocusin) {
      document.attachEvent && document.attachEvent('onfocusin', handler);
      remove = function remove() {
        return document.detachEvent && document.detachEvent('onfocusin', handler);
      };
    } else {
      document.addEventListener('focus', handler, true);
      remove = function remove() {
        return document.removeEventListener('focus', handler, true);
      };
    }

    return { remove: remove };
  }
};

var TRANSITIONS = {
  transition: 'transitionend',
  OTransition: 'oTransitionEnd',
  MozTransition: 'transitionend',
  WebkitTransition: 'webkitTransitionEnd'
};

function transitionEventNamesFor(element) {
  for (var transition in TRANSITIONS) {
    if (element) {
      var nodeStyle = element.style;
      if (nodeStyle[transition] !== undefined) {
        return TRANSITIONS[transition];
      }
    }
  }
  return null;
}