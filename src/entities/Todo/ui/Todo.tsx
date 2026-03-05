import { format } from 'date-fns'
import type { TodoType } from '../model/todoType.ts'
import { useSnackbar } from 'notistack'
import { type SetStateAction, useState } from 'react'
import {
	Backdrop,
	Card,
	CardActions,
	CardContent,
	Checkbox,
	CircularProgress,
	ClickAwayListener,
	Stack,
	TextField,
	Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { deleteTodos } from '../model/store/todosStore.ts'
import { useAppDispatch } from '../../../app/store.ts'
import { deleteTodo, patchTodo } from '../api/todoApi.ts'

type TodoProps = {
	todo: TodoType
	setTodo: (todo: TodoType) => void
}

const formatDate = (dateString: string | Date) => {
	const date = new Date(dateString)

	const time = format(date, 'HH:mm')
	const datePart = format(date, 'dd.MM.yyyy')

	return `${time}\n${datePart}`
}

export const Todo = ({ todo, setTodo }: TodoProps) => {
	const dispatch = useAppDispatch()
	const [isLoading, setIsLoading] = useState(false)
	const { enqueueSnackbar } = useSnackbar()
	const [isEditing, setEditing] = useState<boolean>(false)
	const [editTitle, setEditTitle] = useState<string>(todo.title)
	const [editDescription, setEditDescription] = useState<string>(todo.description)

	const handleClick = async (_id: string) => {
		try {
			setIsLoading(true)
			const todoSwitchCompleted = {
				completed: !todo.completed,
			}
			await patchTodo(_id, todoSwitchCompleted)
			setTodo({ ...todo, completed: !todo.completed })
			enqueueSnackbar(`Successfully`, { variant: 'success' })
		} catch (error) {
			console.log(error)
			enqueueSnackbar(`God damn it`, { variant: 'error' })
		} finally {
			setIsLoading(false)
		}
	}

	const handleEdit = () => {
		setEditing(true)
	}

	const handleSetTitle = (event: { target: { value: SetStateAction<string> } }) => {
		setEditTitle(event?.target.value)
	}

	const handleSetDescription = (event: { target: { value: SetStateAction<string> } }) => {
		setEditDescription(event?.target.value)
	}

	const handleSave = async (_id: string) => {
		const trimmedTitle = editTitle.trim()
		const trimmedDescription = editDescription.trim()
		const notUpdatedTodo = trimmedTitle === todo.title && trimmedDescription === todo.description
		console.log(notUpdatedTodo)
		if (notUpdatedTodo) {
			setEditing(false)
			return
		}
		try {
			setIsLoading(true)

			const updateTodo = {
				title: trimmedTitle,
				description: trimmedDescription,
			}
			if (!trimmedTitle) {
				await patchTodo(_id, updateTodo)
				setTodo({ ...todo, title: todo.title, description: trimmedDescription })
				setEditTitle(todo.title)
				enqueueSnackbar(`The card was saved with the previous name because a card cannot be saved without a name`, {
					variant: 'warning',
				})
				setEditing(false)
				return
			}
			await patchTodo(_id, updateTodo)
			setTodo({ ...todo, title: trimmedTitle, description: trimmedDescription })
			enqueueSnackbar(`Card: ${todo.title} saved successfully`, { variant: 'success' })
			setEditing(false)
		} catch (error) {
			console.log(error)
			enqueueSnackbar(`Failed to change card`, { variant: 'error' })
		} finally {
			setIsLoading(false)
		}
	}

	const handleDelete = async (_id: string) => {
		try {
			setIsLoading(true)
			await deleteTodo(_id)
			dispatch(deleteTodos(_id))
			enqueueSnackbar(`Card: ${todo.title} - deleted`, { variant: 'success' })
		} catch (error) {
			console.error(error)
			enqueueSnackbar(`Delete failed. Element not found.`, { variant: 'error' })
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Card
			variant={'outlined'}
			sx={{
				width: 250,
				display: 'flex',
				flexDirection: 'column',
				minHeight: 260,
				position: 'relative',
				overflow: 'hidden',
			}}
		>
			<Backdrop
				sx={{ color: '#fff', position: 'absolute', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={isLoading}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			<CardContent sx={{ flexGrow: 1 }}>
				{isEditing ? (
					<ClickAwayListener onClickAway={() => handleSave(todo._id)}>
						<Stack direction={'column'} spacing={1}>
							<TextField value={editTitle} onChange={handleSetTitle} size={'small'} />
							<TextField maxRows={2} value={editDescription} onChange={handleSetDescription} />
						</Stack>
					</ClickAwayListener>
				) : (
					<Stack display={'flex'} direction={'column'} spacing={1}>
						<Typography
							onDoubleClick={isEditing ? undefined : handleEdit}
							gutterBottom
							sx={{
								color: 'text.secondary',
								fontSize: 14,
								display: '-webkit-box',
								WebkitBoxOrient: 'vertical',
								WebkitLineClamp: 3,
								overflow: 'hidden',
							}}
						>
							{todo.title}
						</Typography>
						<Typography
							onDoubleClick={isEditing ? undefined : handleEdit}
							variant="body2"
							sx={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 4, overflow: 'hidden' }}
						>
							{todo.description}
						</Typography>
					</Stack>
				)}
				<Stack display={'flex'} direction={'column'} spacing={1} sx={{ marginTop: '20px' }}>
					<Typography variant="body1">
						Created:{' '}
						<Typography component="span" color="info">
							{formatDate(todo.createdAt)}
						</Typography>
					</Typography>
					<Typography variant="body1">
						Updated:{' '}
						<Typography component="span" color="info">
							{formatDate(todo.updatedAt)}
						</Typography>
					</Typography>
				</Stack>
			</CardContent>
			<CardActions sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto', minHeight: 50 }}>
				<Checkbox checked={todo.completed} onClick={() => handleClick(todo._id)} />
				<DeleteIcon sx={{ cursor: 'pointer' }} onClick={() => handleDelete(todo._id)} />
			</CardActions>
		</Card>
	)
}
