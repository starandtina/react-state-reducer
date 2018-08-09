import React from 'react'
import { render } from 'react-dom'

import './style.css'

import Counter from './Counter'
import TodoApp from './TodoApp'

render(<Counter />, document.getElementById('root'))

render(<TodoApp />, document.getElementById('todo-app'))
