import type { TodoType } from '../model/todoType.ts'
import { CardActions, Checkbox, Divider, Input, Stack, Typography } from '@mui/material'
import { formatDistanceToNow } from 'date-fns'
import { NavLink, type To } from 'react-router'
import Button from '@mui/material/Button'
import type { SetStateAction } from 'react'

type PropsContent = {
	isLoading: boolean
	todo: TodoType | undefined
	editTodo: boolean
	title: string
	description: string
	onChangeTitle: (event: { target: { value: SetStateAction<string> } }) => void
	onChangeDescription: (event: { target: { value: SetStateAction<string> } }) => void
	onEdit: () => void
	onSave: () => void
	onToggleStatus: (_id: string) => void
}

const SingleTodoContent = ({
	isLoading,
	todo,
	editTodo,
	title,
	description,
	onChangeTitle,
	onChangeDescription,
	onEdit,
	onSave,
	onToggleStatus,
}: PropsContent) => {
	if (!todo) {
		return isLoading ? <Typography>Loading...</Typography> : <Typography>Oops empty...</Typography>
	}

	return (
		<>
			<Stack sx={{ margin: '10px 0 10px' }}>
				{editTodo ? (
					<>
						<Input value={title} onChange={onChangeTitle} />
						<Input value={description} onChange={onChangeDescription} />
					</>
				) : (
					<>
						<Typography variant="h4">{todo.title}</Typography>
						<Typography>{todo.description}</Typography>
					</>
				)}

				<Typography>Last updated: {formatDistanceToNow(todo.updatedAt)}</Typography>
				<Typography>Created: {formatDistanceToNow(todo.createdAt)}</Typography>

				<Typography>
					{todo.completed ? 'Completed' : 'Incompleted'}
					<Checkbox checked={todo.completed} onClick={() => onToggleStatus(todo._id)} />
				</Typography>
			</Stack>
			<Divider />
			<CardActions sx={{ padding: 0, margin: '10px 0 0', display: 'flex', gap: '20px' }}>
				<NavLink style={{ display: 'flex', color: 'inherit', textDecoration: 'none' }} to={-1 as To}>
					<Button variant="contained" sx={{ alignSelf: 'baseline' }}>
						Back
					</Button>
				</NavLink>
				<Button variant="contained" onClick={onEdit} disabled={editTodo}>
					Edit
				</Button>
				<Button variant="contained" onClick={onSave} disabled={!editTodo}>
					Save
				</Button>
			</CardActions>
		</>
	)
}

export default SingleTodoContent
