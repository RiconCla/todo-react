import { Container, Input, Stack } from '@mui/material'
import { useTodosStore } from '../model/store/useTodosStore.ts'
import { Todo } from './Todo.tsx'
import { useState } from 'react'
import Button from '@mui/material/Button'
import type { TodoType } from '../model/todoType.ts'

const Todos = () => {
	const [newTodoTitle, setNewTodoTitle] = useState<string>('')
	const [newTodoDescription, setNewTodoDescription] = useState<string>('')
	const todos = useTodosStore((state) => state.todos)
	const setTodos = useTodosStore((state) => state.setTodos)
	const addTodos = useTodosStore((state) => state.addTodo)

	const setTodoCompleted = (todo: TodoType) => {
		const updatedTodos = todos.map((t) => {
			if (t._id === todo._id) {
				return todo
			}
			return t
		})
		setTodos(updatedTodos)
	}

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewTodoTitle(e.target.value)
	}

	const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewTodoDescription(e.target.value)
	}

	const handleAddTodo = () => {
		const newTodo: TodoType = {
			_id: Date.now().toString(),
			title: newTodoTitle,
			order: todos.length + 1,
			completed: false,
			description: newTodoDescription,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		}
		addTodos(newTodo)
		setNewTodoTitle('')
		setNewTodoDescription('')
	}

	return (
		<Container>
			<Input placeholder={'title'} value={newTodoTitle} onChange={handleTitleChange} />
			<Input placeholder={'description'} value={newTodoDescription} onChange={handleDescriptionChange} />
			<Button variant="contained" disabled={!newTodoTitle} onClick={handleAddTodo}>
				ЖМИ
			</Button>
			<Stack flexWrap={'wrap'} spacing={2} direction={'row'} gap={2}>
				{todos.map((todo) => {
					return <Todo todo={todo} key={todo._id} setTodo={setTodoCompleted} />
				})}
			</Stack>
		</Container>
	)
}

export default Todos
