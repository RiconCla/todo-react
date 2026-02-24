import { format } from 'date-fns'
import type { TodoType } from '../model/todoType.ts'
import { useSnackbar } from 'notistack'
import { type SetStateAction, useState } from 'react'
import {
	Card,
	CardActions,
	CardContent,
	Checkbox,
	ClickAwayListener,
	Stack,
	TextField,
	Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { deleteTodos, selectTodos } from '../model/store/todosStore.ts'
import { useAppDispatch, useAppSelector } from '../../../app/store.ts'

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
	const todos = useAppSelector(selectTodos)
	const dispatch = useAppDispatch()

	const handleClick = () => {
		setTodo({ ...todo, completed: !todo.completed })
	}

	const { enqueueSnackbar } = useSnackbar()

	const [isEditing, setEditing] = useState<boolean>(false)
	const [editTitle, setEditTitle] = useState<string>(todo.title)
	const [editDescription, setEditDescription] = useState<string>(todo.description)

	const handleEdit = () => {
		setEditing(true)
	}

	const handleSetTitle = (event: { target: { value: SetStateAction<string> } }) => {
		setEditTitle(event?.target.value)
	}

	const handleSetDescription = (event: { target: { value: SetStateAction<string> } }) => {
		setEditDescription(event?.target.value)
	}

	const handleSave = () => {
		const trimmedTitle = editTitle.trim()
		const trimmedDescription = editDescription.trim()
		if (!trimmedTitle) {
			setTodo({ ...todo, title: todo.title, description: trimmedDescription, updatedAt: new Date().toISOString() })
			setEditTitle(todo.title)
			enqueueSnackbar(`The card was saved with the previous name because a card cannot be saved without a name`, {
				variant: 'warning',
			})
			setEditing(false)
			return
		}
		setTodo({ ...todo, title: trimmedTitle, description: trimmedDescription, updatedAt: new Date().toISOString() })
		enqueueSnackbar(`Card: ${todo.title} saved successfully`, { variant: 'success' })
		setEditing(false)
	}

	const handleDelete = (_id: string) => {
		const result = todos.some((item) => item._id === _id)
		if (!result) {
			enqueueSnackbar(`Delete failed. Element not found.`, { variant: 'error' })
			return
		}
		dispatch(deleteTodos(_id))
		enqueueSnackbar(`Card: ${todo.title} - deleted`, { variant: 'success' })
	}

	return (
		<Card variant={'outlined'} sx={{ width: 250, display: 'flex', flexDirection: 'column', minHeight: 260 }}>
			<CardContent sx={{ flexGrow: 1 }}>
				{isEditing ? (
					<ClickAwayListener onClickAway={handleSave}>
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
				<Checkbox checked={todo.completed} onClick={handleClick} />
				<DeleteIcon sx={{ cursor: 'pointer' }} onClick={() => handleDelete(todo._id)} />
			</CardActions>
		</Card>
	)
}
