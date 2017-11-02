// @flow

import connect from '@debox-client/core/redux/connect'

import {register, get, remove} from './styles-manager'
import type {StyleType} from './actions'
import themeable from './themeable'

type hoc = (component: React$ComponentType<*>) => React$ComponentType<*>

const optionsConnect = {
  getDisplayName: name => `ConnectStyles(${name})`
}
/**
 * create connect to redux
 * @param {string|Object} styles|styles string is identifier or Object for styles with key object is identifier
 * @param {Object} themes
 * @param {Object} options
 */
const createConnect = (
  styles: StyleType | Array<StyleType>,
  themes?: StyleType | Array<StyleType>,
  options: Object = {}
): hoc => {
  styles = Array.isArray(styles) ? styles : [styles]
  const _ids: Array<?string> = styles.map((st: StyleType) => st._id)
  let _idThemes: Array<?string>

  register(styles)
  if (themes) {
    themes = Array.isArray(themes) ? themes : [themes]
    _idThemes = themes.map((th: StyleType) => th._id)
    register(themes)
  }

  options.onComponentWillUnmount = () => {
    remove(_ids)
    _idThemes && remove(_idThemes)
  }

  const selectorFactory = () => (state, props) => {
    const _styles = get(_ids) || {}
    const _themes = _idThemes ? get(_idThemes) : {}
    const addProps = {
      cssModule: themeable(_styles, _themes)
    }
    return {...props, ...addProps}
  }
  return (Component: React$ComponentType<*>) =>
    connect(selectorFactory, Object.assign(options, optionsConnect))(Component)
}

export type Style = StyleType
export default createConnect
