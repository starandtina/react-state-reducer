import React from 'react'

import StateReducer from '../lib'

const combineReducers = reducers => (state, action) =>
  Object.entries(reducers).reduce(
    (newState, [reducerKey, reducer]) => ({
      ...newState,
      [reducerKey]: reducer(state[reducerKey], action),
    }),
    state,
  )

const initialState = {
  todos: [
    {
      title: 'Just Do It!',
      id: -1,
      complete: false,
    },
  ],
  filter: 'all',
  newTodoText: '',
}

let nextId = 0

const todosReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO': {
      return [
        ...state,
        {
          title: action.payload,
          id: nextId++,
          complete: false,
        },
      ]
    }
    case 'TOGGLE_TODO': {
      const findTodo = todo => todo.id === action.payload
      const todo = state.find(findTodo)

      return [
        ...state.filter(todoItem => !findTodo(todoItem)),
        {
          ...todo,
          complete: !todo.complete,
        },
      ]
    }
    default:
      return state
  }
}

const filterReducer = (state, action) => {
  switch (action.type) {
    case 'APPLY_FILTER':
      return action.payload
    default:
      return state
  }
}

const newTodoTextReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NEW_TODO_TEXT':
      return action.payload
    case 'ADD_TODO':
      return ''
    default:
      return state
  }
}

const rootReducer = combineReducers({
  todos: todosReducer,
  filter: filterReducer,
  newTodoText: newTodoTextReducer,
})

const applyFilter = (filter, todos) =>
  todos.filter(todo => {
    switch (filter) {
      case 'completed':
        return todo.complete
      case 'uncompleted':
        return !todo.complete
      default:
        return true
    }
  })

export default () => (
  <StateReducer state={initialState} reducer={rootReducer}>
    {({ state, dispatch }) => (
      <div>
        <div>
          <ul>
            {applyFilter(state.filter, state.todos).map(todo => (
              <li
                key={todo.id}
                onClick={() =>
                  dispatch({ type: 'TOGGLE_TODO', payload: todo.id })
                }
                style={{
                  textDecoration: todo.complete ? 'line-through' : 'none',
                }}
              >
                {todo.title}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <button
            type="button"
            onClick={() => dispatch({ type: 'APPLY_FILTER', payload: 'all' })}
          >
            All
          </button>
          <button
            type="button"
            onClick={() =>
              dispatch({ type: 'APPLY_FILTER', payload: 'completed' })
            }
          >
            Completed
          </button>
          <button
            type="button"
            onClick={() =>
              dispatch({ type: 'APPLY_FILTER', payload: 'uncompleted' })
            }
          >
            Uncompleted
          </button>
        </div>
        <div>
          <input
            value={state.newTodoText}
            onChange={e =>
              dispatch({ type: 'SET_NEW_TODO_TEXT', payload: e.target.value })
            }
            onKeyPress={e =>
              e.key === 'Enter' && state.newTodoText
                ? dispatch({ type: 'ADD_TODO', payload: state.newTodoText })
                : null
            }
          />
          <button
            type="button"
            onClick={() =>
              state.newTodoText &&
              dispatch({ type: 'ADD_TODO', payload: state.newTodoText })
            }
          >
            Add Todo
          </button>
        </div>
      </div>
    )}
  </StateReducer>
)
