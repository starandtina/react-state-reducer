import React, { PureComponent } from 'react'
import { object, func, node } from 'prop-types'

const isEmptyChildren = children => React.Children.count(children) === 0

export default class StateReducer extends PureComponent {
  static propTypes = {
    children: func,
    render: func,
    reducer: func,
    component: node,
    state: object, // eslint-disable-line
  }

  constructor(props) {
    super(props)

    this.state = props.state || {}
  }

  getElementProps() {
    return {
      state: this.state,
      dispatch: this.dispatch,
    }
  }

  dispatch = action => {
    this.setState(state => this.props.reducer(state, action))
  }

  render() {
    const { render, component, children } = this.props

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
