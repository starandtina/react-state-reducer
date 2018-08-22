import React from 'react'

import StateReducer from '../lib'

const initialState = { counter: 0 }

const rootReducer = (state, action) => {
  switch (action.type) {
    case 'INC':
      return { ...state, counter: state.counter + 1 }
    case 'DEC':
      return { ...state, counter: state.counter - 1 }
    default:
      return state
  }
}

export default () => (
  <StateReducer state={initialState} reducer={rootReducer}>
    {({ state: { counter }, dispatch }) => (
      <div>
        {counter}
        <br />
        <button type="button" onClick={() => dispatch({ type: 'INC' })}>
          +
        </button>
        <button type="button" onClick={() => dispatch({ type: 'DEC' })}>
          -
        </button>
      </div>
    )}
  </StateReducer>
)
