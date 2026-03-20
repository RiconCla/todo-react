import { type SetStateAction, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useGetTodoQuery, useGetTodosQuery, usePatchTodoMutation } from '../api/todoApi.ts'
import { CompletedFilerStatus } from '../model/todoType.ts'
import { Backdrop, CircularProgress, Container, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import SingleTodoContent from './SingleTodoContent.tsx'
import { enqueueSnackbar } from 'notistack'
import { skipToken } from '@reduxjs/toolkit/query'

const SingleTodo = () => {
	const params = useParams<{ _id: string }>()
	const paramsId = params._id
	const [editTodo, setEditTodo] = useState<boolean>(false)
	const filterToGetAllTodos = { completed: CompletedFilerStatus.ALL }
	const { data, isLoading } = useGetTodoQuery(paramsId ?? skipToken)
	const { data: dataAllTodos, isLoading: isLoadingAllTodosLength } = useGetTodosQuery(filterToGetAllTodos)
	const [title, setTitle] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	const [handleEditTodo, { data: dataTodo, isLoading: isEditLoading, isError, isSuccess }] = usePatchTodoMutation()
	const [
		handleToggleComplete,
		{ isLoading: isLoadingComplete, isError: isErrorComplete, isSuccess: isSuccessComplete },
	] = usePatchTodoMutation()

	useEffect(() => {
		if (isSuccessComplete) {
			enqueueSnackbar(`Status updated successfully`, { variant: 'success' })
		}
		if (isErrorComplete) {
			enqueueSnackbar(`Failed to update status. Please try again`, { variant: 'error' })
		}
	}, [isErrorComplete, isSuccessComplete])

	useEffect(() => {
		if (isSuccess) {
			enqueueSnackbar(`Card: ${dataTodo.title} saved successfully`, { variant: 'success' })
		}
		if (isError) {
			enqueueSnackbar(`Failed to change card`, { variant: 'error' })
		}
	}, [data, enqueueSnackbar, isError, isSuccess])

	if (!paramsId) return null

	const handleClickToggleComplete = (id: string) => {
		handleToggleComplete({
			id: id,
			todoEdit: {
				completed: !data?.completed,
			},
		})
	}

	const handleClickToEditTodo = () => {
		setTitle(data?.title ?? '')
		setDescription(data?.description ?? '')
		setEditTodo(true)
	}

	const handleChangeTitle = (event: { target: { value: SetStateAction<string> } }) => {
		setTitle(event.target.value)
	}

	const handleChangeDescription = (event: { target: { value: SetStateAction<string> } }) => {
		setDescription(event.target.value)
	}

	const handleSave = (id: string) => {
		const trimmedTitle = title.trim()
		const trimmedDescription = description.trim()
		const notUpdatedTodo = trimmedTitle === data?.title && trimmedDescription === data?.description && data?.completed
		if (notUpdatedTodo) {
			setEditTodo(false)
			return
		}
		handleEditTodo({ id, todoEdit: { title: trimmedTitle, description: trimmedDescription } })
		setEditTodo(false)
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
					open={isLoading || isEditLoading}
				>
					<CircularProgress color="inherit" />
				</Backdrop>
				<SingleTodoContent
					isLoading={isLoading || isLoadingComplete}
					todo={data}
					editTodo={editTodo}
					title={title}
					description={description}
					onChangeTitle={handleChangeTitle}
					onChangeDescription={handleChangeDescription}
					onEdit={handleClickToEditTodo}
					onSave={() => handleSave(paramsId)}
					onToggleStatus={handleClickToggleComplete}
				/>
			</Box>
			<Container sx={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<Typography>Total todos: {isLoadingAllTodosLength ? 'Loaging...' : (dataAllTodos?.length ?? 0)}</Typography>
			</Container>
		</>
	)
}

export default SingleTodo
