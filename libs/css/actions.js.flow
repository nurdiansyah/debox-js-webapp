// @flow

export const registerActionType: string = 'css/registerStyle'
export const removeActionType: string = 'css/removeStyle'
export const removeAllActionType: string = 'css/removeAllStyle'

export type StyleType = {
  [key: string]: any,
  _getContent: any,
  _getCss: any,
  _insertCss: any,
  _id?: string
}

type RegisterActionType = {
  type: string,
  styles: StyleType | Array<StyleType>
}

/**
 * register styles untuk disimpan di store redux dan didaftarkan ke link stylesheet browser.
 * @param styles {object} single style or map style {identifier: style}
 * @param identifier {string} identitas store redux, bila null dianggap identifier sudah ada di styles.
 * @return {{type: string, style: *, id: string}}
 */
export const registerAction = (styles: Array<StyleType>): RegisterActionType => ({
  type: registerActionType,
  styles
})

export const removeAction: Function = (identifier: string | Array<string>) => ({
  type: removeActionType,
  identifier
})

export const removeAllAction: Function = () => ({
  type: removeAllActionType
})
