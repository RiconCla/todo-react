import { formatDistanceToNow } from 'date-fns'
import type { TodoType } from '../model/todoType.ts'
import { memo, type SetStateAction, useState } from 'react'
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
import useEnqueueSnackbar from '../lib/useEnqueueSnackbar.tsx'
import useToggleEdit from '../lib/useToggleEdit.tsx'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type TodoProps = {
	todo: TodoType
	id?: string
	index?: number
}

const Todo = memo(({ todo }: TodoProps) => {
	const [isEditing, setEdit, setNotEdit] = useToggleEdit()
	const [editTitle, setEditTitle] = useState<string>(todo.title)
	const [editDescription, setEditDescription] = useState<string>(todo.description)
	const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({ id: todo._id })

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
			setNotEdit()
			return
		}
		handleEditCard({ id, todoEdit: { title: trimmedTitle, description: trimmedDescription } })
		setNotEdit()
	}

	const handleSetTitle = (event: { target: { value: SetStateAction<string> } }) => {
		setEditTitle(event?.target.value)
	}

	const handleSetDescription = (event: { target: { value: SetStateAction<string> } }) => {
		setEditDescription(event?.target.value)
	}

	useEnqueueSnackbar(`Status updated successfully`, isSuccessComplete, true)
	useEnqueueSnackbar(`Failed to update status. Please try again`, isErrorComplete, false)

	useEnqueueSnackbar(`Card: ${todo.title} - deleted`, isSuccessDelete, true)
	useEnqueueSnackbar(`Delete failed. Element not found.`, isErrorDelete, false)

	useEnqueueSnackbar(`Card: ${data?.title} saved successfully`, isSuccess, true)
	useEnqueueSnackbar(`Failed to change card`, isError, false)

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
			ref={setNodeRef}
			style={{
				transform: CSS.Transform.toString(transform),
				transition,
				opacity: isDragging ? 0.5 : 1,
				borderColor: isDragging ? 'pink' : undefined,
			}}
			{...attributes}
			{...listeners}
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
							onDoubleClick={isEditing ? undefined : setEdit}
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
							onDoubleClick={isEditing ? undefined : setEdit}
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
