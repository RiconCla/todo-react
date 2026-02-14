import { createSlice } from '@reduxjs/toolkit'
import type { UserType } from '../userType.ts'

type UserStore = {
	user: null | UserType
	isLoading: boolean
}

const initialState: UserStore = {
	user: null,
	isLoading: false,
}

export const userStore = createSlice({
	name: 'userSlice',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload
		},
		removerUser: (state) => {
			state.user = null
		},
		setIsLoading: (state, action) => {
			state.isLoading = action.payload
		},
	},
	selectors: {
		selectUser: (state: UserStore) => state.user,
		selectLoading: (state) => state.isLoading,
	},
})

export const { setUser, removerUser, setIsLoading } = userStore.actions
export const { selectUser, selectLoading } = userStore.selectors

export default userStore.reducer
