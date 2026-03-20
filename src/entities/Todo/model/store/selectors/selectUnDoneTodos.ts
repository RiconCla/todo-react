import { createSelector } from '@reduxjs/toolkit'
import { todoApiRTK } from '../../../api/todoApi.ts'

//@ts-ignore
export const selectUnDoneTodos = createSelector([todoApiRTK.endpoints.getTodos.select('filter')], (todos) =>
	todos.data?.filter((todo) => !todo.completed)
)
export const selectUnDoneTodosLength = createSelector([selectUnDoneTodos], (todos) => todos?.length)
