import getOffset from 'dom-helpers/query/offset'
import getPosition from 'dom-helpers/query/position'
import getScrollTop from 'dom-helpers/query/scrollTop'
import * as Math from 'lodash/math'

import ownerDocument from './owner'

function getContainerDimensions(containerNode) {
  let width
  let height
  let scroll

  if (containerNode.tagName === 'BODY') {
    width = window.innerWidth
    height = window.innerHeight

    scroll =
      getScrollTop(ownerDocument(containerNode).documentElement) ||
      getScrollTop(containerNode)
  } else {
    ;({width, height} = getOffset(containerNode))
    scroll = getScrollTop(containerNode)
  }

  return {width, height, scroll}
}

function getTopDelta(top, overlayHeight, container, padding) {
  const containerDimensions = getContainerDimensions(container)
  const containerScroll = containerDimensions.scroll
  const containerHeight = containerDimensions.height

  const topEdgeOffset = top - padding - containerScroll
  const bottomEdgeOffset = top + padding - containerScroll + overlayHeight

  if (topEdgeOffset < 0) {
    return -topEdgeOffset
  } else if (bottomEdgeOffset > containerHeight) {
    return containerHeight - bottomEdgeOffset
  }
  return 0
}

function getLeftDelta(left, overlayWidth, container, padding) {
  const containerDimensions = getContainerDimensions(container)
  const containerWidth = containerDimensions.width

  const leftEdgeOffset = left - padding
  const rightEdgeOffset = left + padding + overlayWidth

  if (leftEdgeOffset < 0) {
    return -leftEdgeOffset
  } else if (rightEdgeOffset > containerWidth) {
    return containerWidth - rightEdgeOffset
  }

  return 0
}

function calculatePosition(placement, overlayNode, target, container, padding) {
  const childOffset =
    container.tagName === 'BODY'
      ? getOffset(target)
      : getPosition(target, container)

  const {height: overlayHeight, width: overlayWidth} = getOffset(overlayNode)

  let positionLeft
  let positionTop
  let arrowOffsetLeft
  let arrowOffsetTop

  if (placement === 'left' || placement === 'right') {
    positionTop = childOffset.top + (childOffset.height - overlayHeight) / 2

    if (placement === 'left') {
      positionLeft = childOffset.left - overlayWidth
    } else {
      positionLeft = childOffset.left + childOffset.width
    }

    const topDelta = getTopDelta(positionTop, overlayHeight, container, padding)

    positionTop += topDelta
    arrowOffsetTop = `${50 * (1 - 2 * topDelta / overlayHeight)}%`
    arrowOffsetLeft = undefined
  } else if (placement === 'top' || placement === 'bottom') {
    positionLeft = childOffset.left + (childOffset.width - overlayWidth) / 2

    if (placement === 'top') {
      positionTop = childOffset.top - overlayHeight
    } else {
      positionTop = childOffset.top + childOffset.height
    }

    const leftDelta = getLeftDelta(
      positionLeft,
      overlayWidth,
      container,
      padding
    )

    positionLeft += leftDelta
    arrowOffsetLeft = `${50 * (1 - 2 * leftDelta / overlayWidth)}%`
    arrowOffsetTop = undefined
  } else {
    throw new Error(
      `calcOverlayPosition(): No such placement of "${placement}" found.`
    )
  }

  return {positionLeft, positionTop, arrowOffsetLeft, arrowOffsetTop}
}

/**
 * Get the height of the document
 *
 * @return
 */
function documentHeight(doc) {
  return Math.max(
    doc.documentElement.offsetHeight || 0,
    doc.height || 0,
    doc.body.scrollHeight || 0,
    doc.body.offsetHeight || 0
  )
}

export default {
  getMousePosition(event) {
    return {
      x: event.pageX - (window.scrollX || window.pageXOffset),
      y: event.pageY - (window.scrollY || window.pageYOffset)
    }
  },

  getTouchPosition(event) {
    return {
      x: event.touches[0].pageX - (window.scrollX || window.pageXOffset),
      y: event.touches[0].pageY - (window.scrollY || window.pageYOffset)
    }
  },

  documentHeight,
  calculatePosition
}
