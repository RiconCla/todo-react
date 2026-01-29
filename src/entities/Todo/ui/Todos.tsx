import { Card, CardActions, CardContent, Checkbox, Stack, TextField, Typography } from '@mui/material'
import type { TodoType } from '../model/todoType.ts'
import { mockTodos } from '../model/mockTodos.ts'
import { useState, type SetStateAction } from 'react'
import { format } from 'date-fns'
import EditIcon from '@mui/icons-material/Edit'
import DoneIcon from '@mui/icons-material/Done'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import { useSnackbar } from 'notistack'

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

const Todo = ({ todo, setTodo }: TodoProps) => {
	const handleClick = () => {
		setTodo({ ...todo, completed: !todo.completed })
	}

	const { enqueueSnackbar } = useSnackbar()

	const [isEditing, setEditing] = useState<boolean>(false)
	const [editTitle, setEditTitle] = useState<string | number>(todo.title)
	const [editDescription, setEditDescription] = useState<string>(todo.description)

	const handleEditTitle = () => {
		setEditing(true)
	}

	const handleSetTitle = (event: { target: { value: SetStateAction<string | number> } }) => {
		setEditTitle(event?.target.value)
	}

	const handleSetDescription = (event: { target: { value: SetStateAction<string | number> } }) => {
		setEditDescription(event?.target.value)
	}

	const handleSave = () => {
		setEditing(false)
		if (!editTitle) {
			setTodo({ ...todo, title: todo.title, description: editDescription, updatedAt: new Date().toISOString() })
			enqueueSnackbar(`The card was saved with the previous name because a card cannot be saved without a name`, {
				variant: 'warning',
			})
			return
		}
		setTodo({ ...todo, title: editTitle, description: editDescription, updatedAt: new Date().toISOString() })
		enqueueSnackbar(`Card: ${todo.title} saved successfully`, { variant: 'success' })
	}

	return (
		<Card variant={'outlined'} sx={{ width: 250 }}>
			<CardContent>
				{isEditing ? (
					<Stack direction={'column'} spacing={1}>
						<DoneIcon fontSize={'small'} sx={{ cursor: 'pointer', alignSelf: 'flex-end' }} onClick={handleSave} />
						<TextField style={{ width: 180 }} value={editTitle} onChange={handleSetTitle} size={'small'}></TextField>
						<TextareaAutosize
							style={{ width: 180, backgroundColor: '#90caf9' }}
							value={editDescription}
							onChange={handleSetDescription}
						></TextareaAutosize>
					</Stack>
				) : (
					<Stack display={'flex'} direction={'column'} spacing={1}>
						<EditIcon
							fontSize={'small'}
							onClick={isEditing ? undefined : handleEditTitle}
							sx={{ cursor: 'pointer', alignSelf: 'flex-end' }}
						/>
						<Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
							{todo.title}
						</Typography>
						<Typography variant="body2">{todo.description}</Typography>
					</Stack>
				)}

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
			</CardContent>
			<CardActions>
				<Checkbox checked={todo.completed} onClick={handleClick} />
			</CardActions>
		</Card>
	)
}

const Todos = () => {
	const [todos, setTodos] = useState<TodoType[]>(mockTodos)

	const setTodo = (todo: TodoType) => {
		setTodos((prev) =>
			prev.map((item) => {
				if (item._id === todo._id) {
					return todo
				}
				return item
			})
		)
	}
	return (
		<Stack flexWrap={'wrap'} spacing={2} direction={'row'} gap={2}>
			{todos.map((todo) => {
				return <Todo todo={todo} key={todo._id} setTodo={setTodo} />
			})}
		</Stack>
	)
}

export default Todos
