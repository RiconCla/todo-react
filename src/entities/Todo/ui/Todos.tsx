import { Container, FormControl, Input, Stack, Typography } from '@mui/material'
import { Todo } from './Todo.tsx'
import { useState } from 'react'
import Button from '@mui/material/Button'
import type { TodoType } from '../model/todoType.ts'
import { enqueueSnackbar } from 'notistack'
import { addTodos, selectTodos, setTodos } from '../model/store/todosStore.ts'
import { type AppDispatch } from '../../../app/store.ts'
import { useDispatch, useSelector } from 'react-redux'

const Todos = () => {
	const [newTodoTitle, setNewTodoTitle] = useState<string>('')
	const [newTodoDescription, setNewTodoDescription] = useState<string>('')
	const todos = useSelector(selectTodos)
	const dispatch = useDispatch<AppDispatch>()

	const setTodoCompleted = (todo: TodoType) => {
		const updatedTodos = todos.map((t) => {
			if (t._id === todo._id) {
				return todo
			}
			return t
		})
		dispatch(setTodos(updatedTodos))
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
		dispatch(addTodos(newTodo))
		setNewTodoTitle('')
		setNewTodoDescription('')
		enqueueSnackbar(`Card: ${newTodo.title} successfully added`, { variant: 'success' })
	}

	const handleDeleteTodo = (_id: string) => {
		const initialLength = todos.length
		const updateTodosList = todos.filter((item) => item._id !== _id)
		if (initialLength === updateTodosList.length) {
			return false
		} else {
			dispatch(setTodos(updateTodosList))
			return true
		}
	}

	return (
		<Container>
			<FormControl component="fieldset" sx={{ p: '20px', display: 'flex', gap: '20px', maxWidth: '25%' }}>
				<Typography variant={'h5'}>Create new Todo</Typography>
				<Input placeholder={'title'} value={newTodoTitle} onChange={handleTitleChange} />
				<Input placeholder={'description'} value={newTodoDescription} onChange={handleDescriptionChange} />
				<Button variant="contained" disabled={!newTodoTitle} onClick={handleAddTodo}>
					Add
				</Button>
			</FormControl>
			<Stack flexWrap={'wrap'} spacing={2} direction={'row'} gap={2}>
				{todos.map((todo) => {
					return <Todo todo={todo} key={todo._id} setTodo={setTodoCompleted} deleteTodo={handleDeleteTodo} />
				})}
			</Stack>
		</Container>
	)
}

export default Todos
