import isNull from 'lodash/isNull'
import connect from '@debox-client/core/libs/redux/connect'
import {registerStyle, removeStyle} from './redux-manager'

const optionsConnect = {
  getDisplayName: name => `ConnectTheme(${name})`
}

const createConnect = (identifier, styles = null, options = {}) => {
  if (!isNull(styles)) {
    options.onComponentWillMount = () => {
      this.store.dispatch(registerStyle(styles, identifier))
    }
    options.onComponentWillMount = () => {
      this.store.dispatch(removeStyle(identifier))
    }
  }

  const selectorFactory = () => (state, props) => {
    let theme = {}
    if (Array.isArray(identifier)) {
      for (const _identifier of identifier) {
        theme = state.getIn(['theme'], _identifier)
      }
    } else {
      state.getIn(['theme', identifier])
    }
    const addProps = {
      theme
    }
    return {...props, ...addProps}
  }
  return Component =>
    connect(selectorFactory, Object.assign(options, optionsConnect))(Component)
}

export default createConnect
