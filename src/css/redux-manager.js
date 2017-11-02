// @flow

export const registerStyleActionType: string = 'css/registerStyle'
export const removeStyleActionType: string = 'css/removeStyle'
export const removeAllStyleActionType: string = 'css/removeAllStyle'

/**
 * register styles untuk disimpan di store redux dan didaftarkan ke link stylesheet browser.
 * @param styles {object|array}
 * @param identifier {string} identitas store redux, bila null dianggap identifier sudah ada di styles.
 * @return {{type: string, styles: *}}
 */
export const registerStyle = (styles: Object, identifier: ?string = null) => {
  let resourceStyle
  if (identifier && typeof identifier === 'string') {
    resourceStyle = {
      [identifier]: styles
    }
  } else {
    resourceStyle = styles
  }
  return {
    type: registerStyleActionType,
    styles: resourceStyle
  }
}

export const removeStyle: Function = (identifier: string) => ({
  type: removeStyleActionType,
  identifier
})

export const removeAllStyle: Function = () => ({
  type: removeAllStyleActionType
})
