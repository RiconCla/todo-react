import { createSelector } from '@reduxjs/toolkit'
import { selectTodos } from '../todosStore.ts'

export const selectDoneTodos = createSelector([selectTodos], (todos) => todos.filter((todo) => todo.completed))
export const selectDoneTodosLength = createSelector([selectDoneTodos], (todos) => todos.length)
