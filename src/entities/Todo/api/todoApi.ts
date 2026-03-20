// Need to use the React-specific entry point to import createApi
import { rtkApi } from '../../../shared/api/rtkApi.ts'
import { CompletedFilerStatus, type CreateTodoType, type EditTodoType, type TodoType } from '../model/todoType.ts'
import { type TodosStore } from '../model/store/todosStore.ts'

const getQueryParams = (filters: TodosStore['filters']) => {
	let queryParams = ``

	if (filters.page) {
		queryParams += `?page=${filters.page}`
	}

	if (filters.limit) {
		queryParams += `&limit=${filters.limit + 1}`
	}

	if (filters.completed !== CompletedFilerStatus.ALL) {
		queryParams += `&completed=${filters.completed}`
	}
	if (filters.search) {
		queryParams += `&search=${filters.search}`
	}
	return queryParams
}

// Define a service using a base URL and expected endpoints
export const todoApiRTK = rtkApi.injectEndpoints({
	endpoints: (builder) => ({
		getTodos: builder.query<TodoType[], TodosStore['filters']>({
			query: (filters) => {
				const queryParams = getQueryParams(filters)
				return `/todos${queryParams}`
			},
			transformResponse: (baseQueryReturnValue: TodoType[]): TodoType[] => {
				return [...baseQueryReturnValue].reverse()
			},
			providesTags: ['Todos'],
		}),
		addTodo: builder.mutation<TodoType, CreateTodoType>({
			query: (todo) => ({
				url: `/todos/`,
				method: `POST`,
				body: todo,
			}),
			invalidatesTags: ['Todos'],
		}),
		deleteTodo: builder.mutation<void, string>({
			query: (id) => ({
				url: `/todos/${id}`,
				method: `DELETE`,
			}),
			invalidatesTags: ['Todos'],
		}),
		patchTodo: builder.mutation<TodoType, { id: string; todoEdit: EditTodoType }>({
			query: ({ id, todoEdit }) => ({
				url: `/todos/${id}`,
				method: `PATCH`,
				body: todoEdit,
			}),
			invalidatesTags: ['Todos', 'Todo'],
		}),
		getTodo: builder.query<TodoType, string>({
			query: (id) => ({
				url: `/todos/${id}`,
			}),
			providesTags: ['Todo'],
		}),
	}),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTodosQuery, useAddTodoMutation, usePatchTodoMutation, useGetTodoQuery, useDeleteTodoMutation } =
	todoApiRTK
