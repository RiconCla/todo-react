import { useEffect, useState } from 'react'
import { NavLink, type To, useParams } from 'react-router'
import { getTodoById } from '../api/todoApi.ts'
import type { TodoType } from '../model/todoType.ts'
import { Backdrop, CircularProgress, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { formatDistanceToNow } from 'date-fns'
import Button from '@mui/material/Button'

const SingleTodo = () => {
	const [todo, setTodo] = useState<TodoType>()
	const [isLoading, setIsLoading] = useState(false)
	const params = useParams<{ _id: string }>()
	const paramsId = params._id
	console.log(paramsId)

	useEffect(() => {
		if (!paramsId) return
		const getInfoByTodo = async () => {
			try {
				setIsLoading(true)
				const result = await getTodoById(paramsId)
				setTodo(result.data)
			} catch (error) {
				console.log(error)
			} finally {
				setIsLoading(false)
			}
		}
		getInfoByTodo()
	}, [paramsId])

	return (
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
			) : !todo ? (
				<span>Oops empty...</span>
			) : (
				<>
					<NavLink
						style={{ marginBottom: 10, display: 'flex', color: 'inherit', textDecoration: 'none' }}
						to={-1 as To}
					>
						<Button variant={'contained'} sx={{ alignSelf: 'baseline' }}>
							Back
						</Button>
					</NavLink>
					<Typography variant={'h4'}>{todo.title}</Typography>
					<Typography>{todo.description}</Typography>
					<Typography>Last updated: {formatDistanceToNow(todo.updatedAt)}</Typography>
					<Typography>Created:{formatDistanceToNow(todo.createdAt)} </Typography>
					<Typography>{todo.completed ? 'Completed' : 'Incompeted'}</Typography>{' '}
				</>
			)}
		</Box>
	)
}

export default SingleTodo
