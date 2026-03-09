export type TodoType = {
	_id: string
	title: string
	order: number
	completed: boolean
	description: string
	createdAt: string
	updatedAt: string
}

export type CreateTodoType = Pick<TodoType, 'title' | 'description'>

export type EditTodoType = {
	title?: string
	description?: string
	completed?: boolean
}

export type TodoId = Pick<TodoType, '_id'>
