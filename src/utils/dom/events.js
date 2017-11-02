import eventsOn from 'dom-helpers/events/on'
import eventsOff from 'dom-helpers/events/off'

export default {
  pauseEvent(event) {
    event.stopPropagation()
    event.preventDefault()
  },

  addEventsToDocument(eventMap) {
    for (const key in eventMap) {
      if ({}.hasOwnProperty.call(eventMap, key)) {
        document.addEventListener(key, eventMap[key], false)
      }
    }
  },

  removeEventsFromDocument(eventMap) {
    for (const key in eventMap) {
      if ({}.hasOwnProperty.call(eventMap, key)) {
        document.removeEventListener(key, eventMap[key], false)
      }
    }
  },

  targetIsDescendant(event, parent) {
    let node = event.target
    while (node !== null) {
      if (node === parent) return true
      node = node.parentNode
    }
    return false
  },

  addEventListenerOnTransitionEnded(element, fn) {
    const eventName = transitionEventNamesFor(element)
    if (!eventName) return false
    element.addEventListener(eventName, fn)
    return true
  },

  removeEventListenerOnTransitionEnded(element, fn) {
    const eventName = transitionEventNamesFor(element)
    if (!eventName) return false
    element.removeEventListener(eventName, fn)
    return true
  },

  addEventListener(node, event, handler, capture) {
    eventsOn(node, event, handler, capture)
    return {
      remove() {
        eventsOff(node, event, handler, capture)
      }
    }
  },

  /**
   * Firefox doesn't have a focusin event so using capture is easiest way to get bubbling
   * IE8 can't do addEventListener, but does have onfocusin, so we use that in ie8
   *
   * We only allow one Listener at a time to avoid stack overflows
   */
  addFocusListener(handler) {
    const useFocusin = !document.addEventListener
    let remove

    if (useFocusin) {
      document.attachEvent('onfocusin', handler)
      remove = () => document.detachEvent('onfocusin', handler)
    } else {
      document.addEventListener('focus', handler, true)
      remove = () => document.removeEventListener('focus', handler, true)
    }

    return {remove}
  }
}

const TRANSITIONS = {
  transition: 'transitionend',
  OTransition: 'oTransitionEnd',
  MozTransition: 'transitionend',
  WebkitTransition: 'webkitTransitionEnd'
}

function transitionEventNamesFor(element) {
  for (const transition in TRANSITIONS) {
    if (element && element.style[transition] !== undefined) {
      return TRANSITIONS[transition]
    }
  }
  return null
}
