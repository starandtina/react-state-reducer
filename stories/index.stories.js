import React from 'react'

import { storiesOf } from '@storybook/react'

import StateReducer from '../src/lib'
import Counter from '../src/docs/Counter'
import TodoApp from '../src/docs/TodoApp'

storiesOf('StateReducer', module)
  .add('Counter', () => <Counter />)
  .add('Todo', () => <TodoApp />)
