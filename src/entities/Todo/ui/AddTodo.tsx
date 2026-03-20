import { useAddTodoMutation } from '../api/todoApi.ts'
import { enqueueSnackbar } from 'notistack'
import { Input, Stack, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import React, { useEffect, useState } from 'react'

const AddTodo = React.memo(() => {
	const [newTodoTitle, setNewTodoTitle] = useState<string>('')
	const [newTodoDescription, setNewTodoDescription] = useState<string>('')

	const [addTodoToBackend, { data, isLoading, isError, isSuccess }] = useAddTodoMutation() //1 функция тригера, 2 аргумент это объект того что мы получаем из запроса(грубо говоря)

	const handleAddTodo = () => {
		addTodoToBackend({ title: newTodoTitle, description: newTodoDescription })
	}

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewTodoTitle(e.target.value)
	}

	const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewTodoDescription(e.target.value)
	}

	useEffect(() => {
		const handleResetInputs = () => {
			setNewTodoTitle('')
			setNewTodoDescription('')
		}
		if (isSuccess) {
			handleResetInputs()
			enqueueSnackbar(`Card: ${data.title} successfully added`, { variant: 'success' })
		}
		if (isError) {
			enqueueSnackbar(`Error adding todo :(`, { variant: 'error' })
		}
	}, [isError, isSuccess])

	return (
		<Stack sx={{ marginBottom: '20px', display: 'flex', gap: '20px', maxWidth: '250px' }}>
			<Typography variant={'h5'}>Create new Todo</Typography>
			<Input placeholder={'title'} value={newTodoTitle} onChange={handleTitleChange} />
			<Input placeholder={'description'} value={newTodoDescription} onChange={handleDescriptionChange} />
			<Button
				variant="contained"
				loadingPosition="center"
				loading={isLoading}
				disabled={!newTodoTitle || isLoading}
				onClick={handleAddTodo}
			>
				Add
			</Button>
		</Stack>
	)
})

export default AddTodo
