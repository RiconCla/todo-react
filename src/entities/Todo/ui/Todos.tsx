import { Backdrop, CircularProgress, Container, Input, Stack, Typography } from '@mui/material'
import { Todo } from './Todo.tsx'
import { useCallback, useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import type { CreateTodoType, TodoType } from '../model/todoType.ts'
import { enqueueSnackbar } from 'notistack'
import { selectTodos, setTodos } from '../model/store/todosStore.ts'
import { useAppDispatch, useAppSelector } from '../../../app/store.ts'
import { addTodo, getTodos } from '../api/todoApi.ts'
import { selectUser } from '../../User/model/store/userStore.ts'

const Todos = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [newTodoTitle, setNewTodoTitle] = useState<string>('')
	const [newTodoDescription, setNewTodoDescription] = useState<string>('')
	const todos = useAppSelector(selectTodos)
	const dispatch = useAppDispatch()
	const user = useAppSelector(selectUser)
	const token = user?.access_token

	const setTodoCompleted = (todo: TodoType) => {
		const updatedTodos = todos.map((t) => {
			if (t._id === todo._id) {
				return todo
			}
			return t
		})
		dispatch(setTodos(updatedTodos))
	}

	const handleGetTodos = useCallback(async () => {
		getTodos()
			.then((todos) => {
				dispatch(setTodos(todos.data.reverse() || []))
			})
			.catch(() => {
				enqueueSnackbar('Error fetching todos...', { variant: 'error' })
				dispatch(setTodos([]))
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [dispatch])

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewTodoTitle(e.target.value)
	}

	const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewTodoDescription(e.target.value)
	}

	const handleAddTodo = async () => {
		try {
			setIsLoading(true)
			if (!token) return
			const newTodo: CreateTodoType = {
				title: newTodoTitle,
				description: newTodoDescription,
			}
			await addTodo(newTodo)
			setNewTodoTitle('')
			setNewTodoDescription('')
			await handleGetTodos()

			enqueueSnackbar(`Card: ${newTodo.title} successfully added`, { variant: 'success' })
		} catch (e) {
			console.error(e)
			enqueueSnackbar(`Error adding todo :(`, { variant: 'error' })
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		handleGetTodos()
	}, [handleGetTodos])

	return (
		<>
			<Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
				<CircularProgress color="inherit" />
			</Backdrop>
			<Container>
				<Stack sx={{ marginBottom: '20px', display: 'flex', gap: '20px', maxWidth: '250px' }}>
					<Typography variant={'h5'}>Create new Todo</Typography>
					<Input placeholder={'title'} value={newTodoTitle} onChange={handleTitleChange} />
					<Input placeholder={'description'} value={newTodoDescription} onChange={handleDescriptionChange} />
					<Button variant="contained" disabled={!newTodoTitle} onClick={handleAddTodo}>
						Add
					</Button>
				</Stack>
				<Stack flexWrap={'wrap'} useFlexGap direction={'row'} gap={2} alignItems="stretch">
					{todos.map((todo) => {
						return <Todo todo={todo} key={todo._id} setTodo={setTodoCompleted} />
					})}
				</Stack>
			</Container>
		</>
	)
}

export default Todos
