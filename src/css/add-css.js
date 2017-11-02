// @flow

/**
 * add style to html
 * @return {function()}
 * @param {array|object} styles
 */
export default (styles: *, options: *): Function => {
  if (!Array.isArray(styles)) {
    if (typeof styles === 'object' && typeof styles._insertCss !== 'function') {
      styles = Object.keys(styles).map(t => styles[t])
    } else {
      styles = [styles]
    }
  }
  // utk testing
  if (process.env.NODE_ENV === 'test') {
    if (
      typeof options === 'object' &&
      typeof options.injectReturnStyles === 'function'
    ) {
      options.injectReturnStyles(styles)
    }
  }

  const removeStyle = styles.map(x => {
    x.removeCss = x._insertCss(options)
    return x.removeCss
  })
  return () => removeStyle.forEach(rm => rm())
}
