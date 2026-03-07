import { rootApi } from '../../../shared/api/rootApi.ts'
import type { CreateTodoType, EditTodoType, TodoType } from '../model/todoType.ts'

export const getTodos = async () => {
	return await rootApi.get<TodoType[]>('/todos')
}

export const addTodo = async (todo: CreateTodoType) => {
	return await rootApi.post<TodoType>('/todos', todo)
}

export const deleteTodo = async (id: string) => {
	return await rootApi.delete(`todos/${id}`)
}

export const patchTodo = async (id: string, todo: EditTodoType) => {
	return await rootApi.patch(`todos/${id}`, todo)
}
