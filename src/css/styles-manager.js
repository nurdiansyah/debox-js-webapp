// @flow

import {getStore} from '@debox-client/core/redux/store'

import {registerAction, removeAction, removeAllAction} from './actions'
import type {StyleType} from './actions'

export const STORE_ID = 'styles'

/**
 * add style to html
 * @param {object} styles format styles {identifier: styles} or single style Object must identifier is string
 * @param {string} identifier if undefined styles is multiple style identifier is key object
 * @return {Map}
 */
export const register = (styles: StyleType | Array<StyleType>) => {
  styles = Array.isArray(styles) ? styles : [styles]
  const action = registerAction(styles)
  const __store = getStore()
  __store.dispatch(action)
}

export const get = (identifier: string | Array<?string>): Object | void => {
  const __store = getStore()
  const state = __store.getState().get(STORE_ID)

  let _styles
  if (Array.isArray(identifier)) {
    for (const _identifier of identifier) {
      if (_identifier) {
        const dt = state.get(_identifier)
        if (dt && dt.style) {
          _styles = _styles || {}
          _styles = Object.assign(_styles, dt.style)
        }
      }
    }
  } else {
    const dt = state.get(identifier)
    _styles = dt ? dt.style : _styles
  }

  return _styles
}

/**
 * add style to html
 * @param {string | Array} identifier single identifier or multiple identifier berupa array string
 * @return {Map}
 */
export const remove = (identifier: string | Array<?string>) => {
  const action = removeAction(identifier)
  const __store = getStore()
  __store.dispatch(action)
}

export const removeAll = () => {
  const action = removeAllAction()
  const __store = getStore()
  __store.dispatch(action)
}
