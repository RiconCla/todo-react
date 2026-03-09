import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { TodoType } from '../todoType.ts'

export type TodosStore = {
	todos: TodoType[]
	hasNextPage: boolean
	filters: {
		completed: 'true' | 'false' | 'all'
		page: number
		limit: number
		search?: string
	}
}

const initialState: TodosStore = {
	todos: [],
	hasNextPage: false,
	filters: {
		limit: 5,
		page: 1,
		completed: 'all',
	},
}

export const todosStore = createSlice({
	name: 'todosSlice',
	initialState,
	reducers: {
		setTodos: (state, action: PayloadAction<TodoType[]>) => {
			state.todos = action.payload
		},
		setLimit: (state, action: PayloadAction<number>) => {
			state.filters.limit = action.payload
			state.filters.page = 1
		},
		deleteTodos: (state, action: PayloadAction<string>) => {
			state.todos = state.todos.filter((item) => item._id !== action.payload)
		},
		setPage: (state, action: PayloadAction<number>) => {
			state.filters.page = action.payload
		},
		setHasNextPage: (state, action: PayloadAction<boolean>) => {
			state.hasNextPage = action.payload
		},
		setCompleted: (state, action: PayloadAction<'all' | 'true' | 'false'>) => {
			state.filters.completed = action.payload
		},
		setSearch: (state, action: PayloadAction<string>) => {
			state.filters.search = action.payload
		},
	},
	selectors: {
		selectTodos: (state: TodosStore) => state.todos,
		selectFilters: (state: TodosStore) => state.filters,
		selectHasNextPage: (state: TodosStore) => state.hasNextPage,
	},
})

export const { setTodos, deleteTodos, setLimit, setSearch, setPage, setCompleted, setHasNextPage } = todosStore.actions
export const { selectTodos, selectFilters, selectHasNextPage } = todosStore.selectors

export default todosStore.reducer
