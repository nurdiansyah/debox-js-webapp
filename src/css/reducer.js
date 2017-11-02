// @flow

import {Map} from 'immutable'

import {registerActionType, removeAllActionType, removeActionType} from './actions'
import {STORE_ID} from './styles-manager'

const initialState: Map<string, *> = Map({})

export const optionsAddCss: Object = {
  replace: true
}

/**
 *
 * @param state
 * @param action
 * @return {*}
 */
export const reducer = (state: Map<string, *> = initialState, action: Object): any => {
  switch (action.type) {
    case registerActionType: {
      const styles = action.styles
      return state.withMutations(_state => {
        styles.forEach(style => {
          const id = style._id
          const _dt = _state.get(id) || {style, count: 0}
          if (_dt.count < 1) {
            style._removeCss = style._insertCss(optionsAddCss)
          }
          ++_dt.count
          _state = _state.set(id, _dt)
        })
        return _state
      })
    }

    case removeActionType: {
      // unregistered style from css browser => removeCss
      const dt: ?Object = state.get(action.identifier)
      if (dt) {
        if (dt.count <= 1) {
          dt.style._removeCss()
          return state.withMutations(_state => _state.delete(action.identifier))
        }
        --dt.count
        return state.withMutations(_state => _state.set(action.identifier, dt))
      }
      return state
    }
    case removeAllActionType: {
      state.forEach(map => {
        if (map && typeof map._removeCss === 'function') {
          map._removeCss()
        }
      })
      return initialState
    }
    default:
      return state
  }
}

export default {[STORE_ID]: reducer}
