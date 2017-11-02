// @flow

import React, {Component} from 'react'
import hoistStatics from 'hoist-non-react-statics'
import PropTypes from 'prop-types'

type contextTypes = {
  insertCss: Function
}

function componentWithStyles(...styles: Array<*>) {
  return function wrapWithStyles(ComposedComponent: React$ComponentType<any>) {
    const displayName: string =
      ComposedComponent.displayName || ComposedComponent.name || 'Component'
    class WithStyles extends Component<{}, contextTypes> {
      removeCss: Function

      static ComposedComponent: React$ComponentType<any> = ComposedComponent
      static contextTypes = {
        insertCss: PropTypes.Function
      }
      static displayName = `RenderWithStyles(${displayName})`

      componentWillMount(): void {
        if (typeof this.context.insertCss === 'function') {
          this.removeCss = this.context.insertCss.apply(undefined, styles)
        }
      }

      componentWillUnmount() {
        setTimeout(this.removeCss, 0)
      }

      render() {
        return <ComposedComponent {...this.props} />
      }
    }

    return hoistStatics(WithStyles, ComposedComponent)
  }
}

export default componentWithStyles
