export var registerActionType = 'css/registerStyle';
export var removeActionType = 'css/removeStyle';
export var removeAllActionType = 'css/removeAllStyle';

/**
 * register styles untuk disimpan di store redux dan didaftarkan ke link stylesheet browser.
 * @param styles {object} single style or map style {identifier: style}
 * @param identifier {string} identitas store redux, bila null dianggap identifier sudah ada di styles.
 * @return {{type: string, style: *, id: string}}
 */
export var registerAction = function registerAction(styles) {
  return {
    type: registerActionType,
    styles: styles
  };
};

export var removeAction = function removeAction(identifier) {
  return {
    type: removeActionType,
    identifier: identifier
  };
};

export var removeAllAction = function removeAllAction() {
  return {
    type: removeAllActionType
  };
};