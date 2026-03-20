import { formatDistanceToNow } from 'date-fns'
import type { TodoType } from '../model/todoType.ts'
import { useSnackbar } from 'notistack'
import { memo, type SetStateAction, useEffect, useState } from 'react'
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
import { useDeleteTodoMutation, usePatchTodoMutation } from '../api/todoApi.ts'
import { NavLink } from 'react-router'
import LaunchIcon from '@mui/icons-material/Launch'

type TodoProps = {
	todo: TodoType
}

const Todo = memo(({ todo }: TodoProps) => {
	const { enqueueSnackbar } = useSnackbar()
	const [isEditing, setEditing] = useState<boolean>(false)
	const [editTitle, setEditTitle] = useState<string>(todo.title)
	const [editDescription, setEditDescription] = useState<string>(todo.description)

	const [handleToggleComplete, { isLoading, isError: isErrorComplete, isSuccess: isSuccessComplete }] =
		usePatchTodoMutation()

	const [handleEditCard, { data, isLoading: isEditLoading, isError, isSuccess }] = usePatchTodoMutation()

	const [handleToDelete, { isError: isErrorDelete, isSuccess: isSuccessDelete }] = useDeleteTodoMutation()

	const handleClick = (id: string) => {
		handleToggleComplete({
			id: id,
			todoEdit: {
				completed: !todo.completed,
			},
		})
	}

	const handleDelete = (id: string) => {
		handleToDelete(id)
	}

	const handleSave = (id: string) => {
		const trimmedTitle = editTitle.trim()
		const trimmedDescription = editDescription.trim()
		const notUpdatedTodo = trimmedTitle === todo.title && trimmedDescription === todo.description && todo.completed
		if (notUpdatedTodo) {
			setEditing(false)
			return
		}
		handleEditCard({ id, todoEdit: { title: trimmedTitle, description: trimmedDescription } })
		setEditing(false)
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

	useEffect(() => {
		if (isSuccessComplete) {
			enqueueSnackbar(`Status updated successfully`, { variant: 'success' })
		}
		if (isErrorComplete) {
			enqueueSnackbar(`Failed to update status. Please try again`, { variant: 'error' })
		}
	}, [enqueueSnackbar, isSuccessComplete, isErrorComplete])

	useEffect(() => {
		if (isSuccess) {
			enqueueSnackbar(`Card: ${data.title} saved successfully`, { variant: 'success' })
		}
		if (isError) {
			enqueueSnackbar(`Failed to change card`, { variant: 'error' })
		}
	}, [data, enqueueSnackbar, isError, isSuccess])

	useEffect(() => {
		if (isSuccessDelete) {
			enqueueSnackbar(`Card: ${todo.title} - deleted`, { variant: 'success' })
		}
		if (isErrorDelete) {
			enqueueSnackbar(`Delete failed. Element not found.`, { variant: 'error' })
		}
	}, [enqueueSnackbar, isErrorDelete, isSuccessDelete, todo.title])

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
				open={isLoading || isEditLoading}
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
							{formatDistanceToNow(todo.createdAt)}
						</Typography>
					</Typography>
					<Typography variant="body1">
						Updated:{' '}
						<Typography component="span" color="info">
							{formatDistanceToNow(todo.updatedAt)}
						</Typography>
					</Typography>
				</Stack>
			</CardContent>
			<CardActions sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto', minHeight: 50 }}>
				<Checkbox checked={todo.completed} onClick={() => handleClick(todo._id)} />
				<NavLink style={{ margin: 0, display: 'flex', color: 'inherit' }} to={`/todos/${todo._id}`}>
					<LaunchIcon sx={{ cursor: 'pointer' }} />
				</NavLink>
				<DeleteIcon sx={{ cursor: 'pointer' }} onClick={() => handleDelete(todo._id)} />
			</CardActions>
		</Card>
	)
})
export default Todo
