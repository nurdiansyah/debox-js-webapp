import _ownerDocument from 'dom-helpers/ownerDocument'
import _ownerWindow from 'dom-helpers/ownerWindow'

export function ownerDocument(componentOrElement) {
  return _ownerDocument(componentOrElement)
}

export function ownerWindow(componentOrElement) {
  return _ownerWindow(componentOrElement)
}
