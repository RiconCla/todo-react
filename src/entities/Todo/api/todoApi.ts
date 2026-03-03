import { rootApi } from '../../../shared/api/rootApi.ts'
import type { CreateTodoType, TodoType } from '../model/todoType.ts'

export const getTodos = async () => {
	return await rootApi.get<TodoType[]>('/todos')
}

export const addTodo = async (todo: CreateTodoType) => {
	return await rootApi.post<TodoType>('/todos', todo)
}
