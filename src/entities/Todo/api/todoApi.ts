import { rootApi } from '../../../shared/api/rootApi.ts'
import type { CreateTodoType, EditTodoType, TodoType } from '../model/todoType.ts'
import type { TodosStore } from '../model/store/todosStore.ts'

export const getTodos = async (filters: TodosStore['filters']) => {
	let queryParams = ``

	if (filters.page) {
		queryParams += `?page=${filters.page}`
	}

	if (filters.limit) {
		queryParams += `&limit=${filters.limit + 1}`
	}

	if (filters.completed !== 'all') {
		queryParams += `&completed=${filters.completed}`
	}
	if (filters.search) {
		queryParams += `&search=${filters.search}`
	}
	return await rootApi.get<TodoType[]>(`/todos/${queryParams}`)
}

export const addTodo = async (todo: CreateTodoType) => {
	return await rootApi.post<TodoType>('/todos', todo)
}

export const deleteTodo = async (TodoId: string) => {
	return await rootApi.delete(`todos/${TodoId}`)
}

export const patchTodo = async (TodoId: string, todo: EditTodoType) => {
	return await rootApi.patch(`todos/${TodoId}`, todo)
}

export const getTodoById = async (TodoId: string) => {
	return await rootApi.get<TodoType>(`todos/${TodoId}`)
}

// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '../../../app/store.ts'

// Define a service using a base URL and expected endpoints
export const todoApiRTK = createApi({
	reducerPath: 'todoApiRTK ',
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
	endpoints: (builder) => ({
		getTodos: builder.query<TodoType[], void>({
			query: () => `/todos/`,
		}),
		addTodo: builder.mutation<TodoType, CreateTodoType>({
			query: (todo) => ({
				url: `/todos/`,
				method: `POST`,
				body: todo,
			}),
		}),
	}),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTodosQuery, useAddTodoMutation } = todoApiRTK
