import { createSelector } from '@reduxjs/toolkit'
import { selectTodos } from '../todosStore.ts'

export const selectUnDoneTodos = createSelector([selectTodos], (todos) => todos.filter((todo) => !todo.completed))
export const selectUnDoneTodosLength = createSelector([selectUnDoneTodos], (todos) => todos.length)
