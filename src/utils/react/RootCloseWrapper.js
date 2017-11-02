/* eslint react/no-find-dom-node:0 */
// @flow

import React, {Component} from 'react'

import contains from 'dom-helpers/query/contains'
import ReactDOM from 'react-dom'

import events from '../dom/events'
import owner from '../dom/owner'

type _Event = 'click' | 'mousedown'

type Props = {
  onRootClose: Function,
  children: React$ElementType,

  /**
   * Disable the the RootCloseWrapper, preventing it from triggering
   * `onRootClose`.
   */
  disabled: boolean,
  /**
   * Choose which document mouse event to bind to
   */
  event: _Event
}

type _EventListener = {
  remove: Function
}

const defaultProps = {
  event: 'click'
}

function isLeftClickEvent(event: MouseEvent): boolean {
  return event.button === 0
}

function isModifiedEvent(event: KeyboardEvent | MouseEvent): boolean {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
}
export default class RootCloseWrapper extends Component<Props> {
  preventMouseRootClose: boolean
  handleKeyUp: Function
  handleMouseCapture: Function
  documentMouseCaptureListener: _EventListener
  documentMouseListener: _EventListener
  documentKeyupListener: _EventListener
  mouseEvent: _EventListener

  static displayName = 'RootCloseWrapper'

  constructor(props: Props) {
    super(props)
    this.preventMouseRootClose = false
  }

  componentDidMount() {
    if (!this.props.disabled) {
      this.addEventListeners()
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (!this.props.disabled && prevProps.disabled) {
      this.addEventListeners()
    } else if (this.props.disabled && !prevProps.disabled) {
      this.removeEventListeners()
    }
  }

  componentWillUnmount() {
    if (!this.props.disabled) {
      this.removeEventListeners()
    }
  }

  addEventListeners() {
    const {event = defaultProps.event} = this.props
    const doc = owner(this)

    // Use capture for this listener so it fires before React's listener, to
    // avoid false positives in the contains() check below if the target DOM
    // element is removed in the React mouse callback.
    this.documentMouseCaptureListener = events.addEventListener(doc, event, this.handleMouseCapture, true)

    this.documentMouseListener = events.addEventListener(doc, event, this.handleMouse)

    this.documentKeyupListener = events.addEventListener(doc, 'keyup', this.handleKeyUp)
  }

  removeEventListeners() {
    if (this.documentMouseCaptureListener) {
      this.documentMouseCaptureListener.remove()
    }

    if (this.documentMouseListener) {
      this.documentMouseListener.remove()
    }

    if (this.documentKeyupListener) {
      this.documentKeyupListener.remove()
    }
  }

  handleMouseCapture(e: MouseEvent): void {
    this.preventMouseRootClose =
      isModifiedEvent(e) || !isLeftClickEvent(e) || contains(ReactDOM.findDOMNode(this), e.target)
  }

  handleMouse(): void {
    if (!this.preventMouseRootClose && this.props.onRootClose) {
      this.props.onRootClose()
    }
  }

  handleKeyUp(e: KeyboardEvent): void {
    if (e.keyCode === 27 && this.props.onRootClose) {
      this.props.onRootClose()
    }
  }

  render() {
    return React.Children.only(this.props.children)
  }
}
