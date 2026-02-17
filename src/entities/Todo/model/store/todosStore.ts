import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
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
		setTodos: (state, action: PayloadAction<TodoType[]>) => {
			state.todos = action.payload
		},
		addTodos: (state, action: PayloadAction<TodoType>) => {
			state.todos = [action.payload, ...state.todos]
		},
		deleteTodos: (state, action: PayloadAction<string>) => {
			state.todos = state.todos.filter((item) => item._id !== action.payload)
		},
	},
	selectors: {
		selectTodos: (state: TodosStore) => state.todos,
	},
})

export const { setTodos, addTodos, deleteTodos } = todosStore.actions
export const { selectTodos } = todosStore.selectors

export default todosStore.reducer
