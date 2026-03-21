import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '../../app/store.ts'

export const rtkApi = createApi({
	reducerPath: 'rtkApi ',
	tagTypes: ['Todos', 'Todo'],
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://todos-be.vercel.app/',
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).userSlice.user?.access_token
			if (token) {
				headers.set('authorization', `Bearer ${token}`)
			}
			return headers
		},
	}),
	endpoints: () => ({}),
})
