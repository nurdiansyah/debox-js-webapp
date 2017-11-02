// @flow

import {Map} from 'immutable'
import {
  registerStyleActionType,
  removeAllStyleActionType,
  removeStyleActionType
} from './redux-manager'
import addCss from './add-css'

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
export const reducer = (
  state: Map<string, *> = initialState,
  action: Object
): any => {
  switch (action.type) {
    case registerStyleActionType: {
      const styles = action.styles
      addCss(styles, optionsAddCss)
      return state.withMutations(_state => {
        Object.keys(styles).forEach(key => _state.set(key, styles[key]))
        return _state
      })
    }

    case removeStyleActionType: {
      // unregistered style from css browser => removeCss
      const styles = state.get(action.identifier)
      styles.removeCss()
      return state.withMutations(_state => _state.delete(action.identifier))
    }
    case removeAllStyleActionType: {
      // unregistered style from css browser => removeCss
      state.forEach(map => {
        map.removeCss()
      })
      return initialState
    }
    default:
      return state
  }
}
