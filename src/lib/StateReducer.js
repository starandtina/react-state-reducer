import React, { PureComponent } from 'react'

const isEmptyChildren = children => React.Children.count(children) === 0

export default class StateReducer extends PureComponent {
  constructor(props) {
    super(props)

    this.state = props.state || {}
  }

  dispatch = action => {
    this.setState(state => this.props.reducer(state, action))
  }

  getElementProps() {
    return {
      state: this.state,
      dispatch: this.dispatch,
    }
  }

  render() {
    const { render, component, children } = this.props
    const args = {}

    return component
      ? React.createElement(component, this.getElementProps())
      : render
        ? render(this.getElementProps())
        : children
          ? typeof children === 'function'
            ? children(this.getElementProps())
            : !isEmptyChildren(children)
              ? React.Children.only(children)
              : null
          : null
  }
}
