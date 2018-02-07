// @flow
import {PureComponent} from 'react'
import PropTypes from 'prop-types'

export class FormControl$Component<ControlProps, State> extends PureComponent<ControlProps, State> {
  i: number
  autoFocus: boolean
  enableAutoFocus: boolean
  validations: Object
  requiredValidations: Object
  isValidValue: boolean
  RefComponent: ?React$Component<*>
  getLayout: Function
  getValidatePristine: Function
  getId: Function
  setValidations: Function
  setValue: Function
  setEnableAutoFocus: Function
  getErrorMessage: Function
  getErrorMessages: Function
  isFormDisabled: Function
  isValid: Function
  isPristine: Function
  isFormSubmitted: Function
  isRequired: Function
  showRequired: Function
  showErrors: Function
  resetValue: Function
  hasValue: Function
}

export type ControlProps = {
  autoFocus?: ?boolean,
  className?: string,
  classNames?: Function,
  controlClassName?: string,
  disabled?: boolean,
  formControl?: Object,
  help?: React$Node,
  id?: string,
  iconLeft?: React$Node,
  iconRight?: React$Node,
  name: string,
  onChange?: Function,
  required?: ?boolean,
  styles?: Object,
  type?: string,
  validatePristine?: ?boolean,
  validationError?: Function,
  validationErrors?: Function,
  getRef?: Function,
  validations?: *,
  value?: any
}

export type State = {
  value?: *,
  isRequired?: boolean,
  isValid?: boolean,
  isPristine?: boolean,
  pristineValue?: *,
  validationError?: ?Array<*>,
  externalError?: ?Array<*>,
  formSubmitted?: boolean
}

export type FormControlType = FormControl$Component<ControlProps, State>

export type Context = {
  layout: string,
  validatePristine: boolean,
  formBlockCN: any,
  formManager: {
    attachToForm: Function,
    detachFromForm: Function,
    validate: Function,
    isFormDisabled: Function,
    isValidValue: Function
  }
}

export const contextTypes = {
  layout: PropTypes.string,
  validatePristine: PropTypes.bool,
  formBlockCN: PropTypes.func,
  formManager: PropTypes.shape({
    attachToForm: PropTypes.func,
    detachFromForm: PropTypes.func,
    validate: PropTypes.func,
    isFormDisabled: PropTypes.func,
    isValidValue: PropTypes.func
  })
}
