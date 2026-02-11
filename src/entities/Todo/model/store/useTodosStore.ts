import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { mockTodos } from '../mockTodos.ts'
import type { TodoType } from '../todoType.ts'

type TodosState = {
	todos: TodoType[]
	addTodo: (newTodo: TodoType) => void
	setTodos: (todos: TodoType[]) => void
}

export const useTodosStore = create<TodosState>()(
	devtools((set) => {
		return {
			todos: mockTodos,
			addTodo: (newTodo: TodoType) => set((state) => ({ todos: [newTodo, ...state.todos] })),
			setTodos: (todos: TodoType[]) => set({ todos }),
		}
	})
)
