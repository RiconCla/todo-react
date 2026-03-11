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
