import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { CompletedFilerStatus } from '../todoType.ts'

export type TodosStore = {
	filters: {
		completed: CompletedFilerStatus
		page?: number
		limit?: number
		search?: string
	}
}

const initialState: TodosStore = {
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
		setLimit: (state, action: PayloadAction<number>) => {
			state.filters.limit = action.payload
			state.filters.page = 1
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
		selectFilters: (state: TodosStore) => state.filters,
	},
})

export const { setLimit, setSearch, setPage, setCompleted } = todosStore.actions
export const { selectFilters } = todosStore.selectors

export default todosStore.reducer
