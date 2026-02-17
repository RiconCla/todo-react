import { createSlice } from '@reduxjs/toolkit'
import type { TodoType } from '../todoType.ts'
import { mockTodos } from '../mockTodos.ts'

type TodosStore = {
	todos: TodoType[]
}

const initialState: TodosStore = {
	todos: mockTodos,
}

export const todosStore = createSlice({
	name: 'todosSlice',
	initialState,
	reducers: {
		setTodos: (state, action) => {
			state.todos = action.payload
		},
		addTodos: (state, action) => {
			state.todos = [action.payload, ...state.todos]
		},
	},
	selectors: {
		selectTodos: (state: TodosStore) => state.todos,
	},
})

export const { setTodos, addTodos } = todosStore.actions
export const { selectTodos } = todosStore.selectors

export default todosStore.reducer
