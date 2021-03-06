// @flow

import React, {Component} from 'react'
import Bem from './bem'
import hoistStatics from 'hoist-non-react-statics'

function componentWithStyles(...styles: Array<*>) {
  return function wrapWithStyles(
    ComposedComponent: React$ComponentType<any>,
    options: Object = {isBem: false}
  ) {
    const displayName: string = ComposedComponent.displayName || ComposedComponent.name || 'Component'
    class WithStyles extends Component<{}> {
      removeCss: Array<Function>

      static ComposedComponent: React$ComponentType<any> = ComposedComponent
      static displayName = `RenderWithStyles(${displayName})`

      componentWillMount(): void {
        this.removeCss = []
        styles.forEach((style: Object) => {
          this.removeCss.push(style._insertCss())
        })
      }

      componentWillUnmount() {
        this.removeCss.forEach(_removeCss => {
          setTimeout(_removeCss, 0)
        })
      }

      render(): React$Node {
        const _styles = Object.assign({}, ...styles)
        const _addProps: Object | Bem = {styles: options.isBem ? new Bem(_styles, options) : _styles}
        return <ComposedComponent {...this.props} {..._addProps} />
      }
    }

    return hoistStatics(WithStyles, ComposedComponent)
  }
}

export default componentWithStyles
