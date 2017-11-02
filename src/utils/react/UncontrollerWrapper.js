// @flow

import React, {PureComponent} from 'react'

type Props = {}

type State = {
  isOpen: boolean
}

const Wrapper = (Tag: React$ElementType, defaultIsOpen: boolean = false) => {
  class Uncontrolled extends PureComponent<Props, State> {
    toggle: Function

    constructor(props: Props) {
      super(props)

      this.state = {isOpen: defaultIsOpen}

      this.toggle = this.toggle.bind(this)
    }

    toggle() {
      this.setState({isOpen: !this.state.isOpen})
    }

    render() {
      return <Tag isOpen={this.state.isOpen} toggle={this.toggle} {...this.props} />
    }
  }

  return Uncontrolled
}

export default Wrapper
