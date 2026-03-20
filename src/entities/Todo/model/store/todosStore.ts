import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { CompletedFilerStatus, type TodoType } from '../todoType.ts'

export type TodosStore = {
	todos: TodoType[]
	filters: {
		completed: CompletedFilerStatus
		page?: number
		limit?: number
		search?: string
	}
}

const initialState: TodosStore = {
	todos: [],
	filters: {
		limit: 5,
		page: 1,
		completed: CompletedFilerStatus.ALL,
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
		setCompleted: (state, action: PayloadAction<CompletedFilerStatus>) => {
			state.filters.completed = action.payload
		},
		setSearch: (state, action: PayloadAction<string>) => {
			state.filters.search = action.payload
		},
	},
	selectors: {
		selectTodos: (state: TodosStore) => state.todos,
		selectFilters: (state: TodosStore) => state.filters,
	},
})

export const { setTodos, deleteTodos, setLimit, setSearch, setPage, setCompleted } = todosStore.actions
export const { selectTodos, selectFilters } = todosStore.selectors

export default todosStore.reducer
