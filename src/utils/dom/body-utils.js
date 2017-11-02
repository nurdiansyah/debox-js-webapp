// @flow

import isWindow from 'dom-helpers/query/isWindow'
import ownerDocument from 'dom-helpers/ownerDocument'

function isBody(node: Element): boolean {
  return node && node.tagName.toLowerCase() === 'body'
}

function bodyIsOverflowing(node: HTMLElement): boolean {
  const doc: Document = ownerDocument(node)
  const win: * = isWindow(doc)
  let fullWidth: number = win.innerWidth

  // Support: ie8, no innerWidth
  if (!fullWidth) {
    if (doc.documentElement !== null) {
      const documentElementRect: ClientRect = doc.documentElement.getBoundingClientRect()
      fullWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
  }

  return doc.body ? doc.body.clientWidth < fullWidth : false
}

export const isOverflowing: Function = (container: HTMLElement): boolean => {
  const win = isWindow(container)

  return win || isBody(container)
    ? bodyIsOverflowing(container)
    : container.scrollHeight > container.clientHeight
}

export const setScrollbarWidth: Function = (padding: number): void => {
  if (document.body) {
    document.body.style.paddingRight = padding > 0 ? `${padding}px` : ''
  }
}

export const getScrollbarWidth: Function = (): number => {
  const scrollDiv: HTMLDivElement = document.createElement('div')
  // .modal-scrollbar-measure styles // https://github.com/twbs/bootstrap/blob/v4.0.0-alpha.4/scss/_modal.scss#L106-L113
  scrollDiv.style.position = 'absolute'
  scrollDiv.style.top = '-9999px'
  scrollDiv.style.width = '50px'
  scrollDiv.style.height = '50px'
  scrollDiv.style.overflow = 'scroll'
  if (document.body) {
    const body: Node = document.body
    body.appendChild(scrollDiv)
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    body.removeChild(scrollDiv)
    return scrollbarWidth
  }
  return NaN
}

export const getOriginalPadding: Function = (): number =>
  parseInt(
    window
      .getComputedStyle(document.body, null)
      .getPropertyValue('padding-right') || 0,
    10
  )

export const conditionallyUpdateScrollbar: Function = (
  node: HTMLElement
): void => {
  const scrollbarWidth = getScrollbarWidth()
  // https://github.com/twbs/bootstrap/blob/v4.0.0-alpha.4/js/src/modal.js#L420
  const fixedContent = document.querySelectorAll(
    '.navbar-fixed-top, .navbar-fixed-bottom, .is-fixed'
  )[0]
  const bodyPadding = fixedContent
    ? parseInt(fixedContent.style.paddingRight || 0, 10)
    : 0

  if (bodyIsOverflowing(node)) {
    setScrollbarWidth(bodyPadding + scrollbarWidth)
  }
}
