import { type SetStateAction, useEffect, useState } from 'react'
import { NavLink, type To, useParams } from 'react-router'
import { getTodoById, getTodos, patchTodo } from '../api/todoApi.ts'
import type { TodoType } from '../model/todoType.ts'
import { Backdrop, CardActions, CircularProgress, Container, Divider, Input, Stack, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { formatDistanceToNow } from 'date-fns'
import Button from '@mui/material/Button'

const SingleTodo = () => {
	const [todo, setTodo] = useState<TodoType>()
	const [isLoading, setIsLoading] = useState(false)
	const params = useParams<{ _id: string }>()
	const paramsId = params._id
	const [editTodo, setEditTodo] = useState<boolean>(false)
	const [title, setTitle] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	const filterToGetAllTodos = { completed: 'all' as const }
	const [allTodosCount, setAllTodosCount] = useState<string | number>('Loading...')

	useEffect(() => {
		getInfoByTodo()
		getAllTodosLength()
	}, [paramsId])

	const getInfoByTodo = async () => {
		if (!paramsId) return
		try {
			setIsLoading(true)
			const result = await getTodoById(paramsId)
			setTodo(result.data)
			setTitle(result.data.title)
			setDescription(result.data.description)
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	const getAllTodosLength = async () => {
		if (!paramsId) return
		try {
			const result = await getTodos(filterToGetAllTodos)
			setAllTodosCount(result.data.length)
		} catch (error) {
			console.log(error)
		}
	}

	const handleClickToEditTodo = () => {
		setEditTodo(true)
	}

	const handleChangeTitle = (event: { target: { value: SetStateAction<string> } }) => {
		setTitle(event.target.value)
	}

	const handleChangeDescription = (event: { target: { value: SetStateAction<string> } }) => {
		setDescription(event.target.value)
	}

	const handleSave = async () => {
		if (!todo || !paramsId) return
		const trimmedTitle = title.trim()
		const trimmedDescription = description.trim()
		const newTodo = {
			title: trimmedTitle,
			description: trimmedDescription,
		}
		const notUpdatedTodo = trimmedTitle === todo.title && trimmedDescription === todo.description
		if (notUpdatedTodo) {
			setEditTodo(false)
			return
		}
		try {
			setIsLoading(true)
			const result = await patchTodo(paramsId, newTodo)
			setTodo({ ...todo, title: result.data.title, description: result.data.description })
			getInfoByTodo()
		} catch (error) {
			console.log(error)
		} finally {
			setEditTodo(false)
			setIsLoading(false)
		}
		console.log(`sosi jopu`)
	}

	return (
		<>
			<Box
				component="section"
				sx={{
					p: 2,
					borderRadius: 1,
					border: '1px solid white',
					display: 'flex',
					flexDirection: 'column',
					flexWrap: 'wrap',
					minWidth: '230px',
					wordBreak: 'break-word',
					position: 'relative',
				}}
			>
				<Backdrop
					sx={{ color: '#fff', position: 'absolute', zIndex: (theme) => theme.zIndex.drawer + 1 }}
					open={isLoading}
				>
					<CircularProgress color="inherit" />
				</Backdrop>

				{isLoading && !todo ? (
					<span>Loading...</span>
				) : todo ? (
					<>
						<Stack sx={{ margin: '10px 0 10px' }}>
							{editTodo ? (
								<>
									<Input value={title} onChange={handleChangeTitle} />
									<Input value={description} onChange={handleChangeDescription} />
								</>
							) : (
								<>
									<Typography variant="h4">{todo.title}</Typography>
									<Typography>{todo.description}</Typography>
								</>
							)}

							<Typography>Last updated: {formatDistanceToNow(todo.updatedAt)}</Typography>
							<Typography>Created: {formatDistanceToNow(todo.createdAt)}</Typography>
							<Typography>{todo.completed ? 'Completed' : 'Incompleted'}</Typography>
						</Stack>

						<Divider />

						<CardActions sx={{ padding: 0, margin: '10px 0 0', display: 'flex', gap: '20px' }}>
							<NavLink style={{ display: 'flex', color: 'inherit', textDecoration: 'none' }} to={-1 as To}>
								<Button variant="contained" sx={{ alignSelf: 'baseline' }}>
									Back
								</Button>
							</NavLink>
							<Button variant="contained" onClick={handleClickToEditTodo} disabled={editTodo}>
								Edit
							</Button>
							<Button variant="contained" onClick={handleSave} disabled={!editTodo}>
								Save
							</Button>
						</CardActions>
					</>
				) : (
					<span>Oops empty...</span>
				)}
			</Box>
			<Container sx={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<Typography>Total todos: {allTodosCount}</Typography>
			</Container>
		</>
	)
}

export default SingleTodo
