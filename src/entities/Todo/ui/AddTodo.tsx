import type { CreateTodoType } from '../model/todoType.ts'
import { addTodo, useAddTodoMutation } from '../api/todoApi.ts'
import { enqueueSnackbar } from 'notistack'
import { Input, Stack, Typography } from '@mui/material'
import { setIsLoading } from '../../User/model/store/userStore.ts'
import Button from '@mui/material/Button'
import { useAppSelector } from '../../../app/store.ts'
import { selectTokenUser } from '../../User/model/store/selectors/selectTokenUser.tsx'
import React, { useState } from 'react'

// type TodoProp = {
// 	getTodos: () => Promise<void>
// }

const AddTodo = React.memo(() => {
	const [newTodoTitle, setNewTodoTitle] = useState<string>('')
	const [newTodoDescription, setNewTodoDescription] = useState<string>('')
	// const token = useAppSelector(selectTokenUser)

	const [addTodoToBeckend, { isLoading, isError, isSuccess }] = useAddTodoMutation() //1 функция создания туду, 2 аргумент это объект того что мы получаем из запроса(грубо говоря)

	const handleAddTodo = () => {
		handleResetInputs()
		addTodoToBeckend({ title: newTodoTitle, description: newTodoDescription })

		// try {
		// 	setIsLoading(true)
		// 	if (!token) return
		// 	const newTodo: CreateTodoType = {
		// 		title: newTodoTitle,
		// 		description: newTodoDescription,
		// 	}
		// 	await addTodo(newTodo)
		// 	setNewTodoTitle('')
		// 	setNewTodoDescription('')
		// 	// await getTodos()
		// 	enqueueSnackbar(`Card: ${newTodo.title} successfully added`, { variant: 'success' })
		// } catch (e) {
		// 	console.error(e)
		// 	enqueueSnackbar(`Error adding todo :(`, { variant: 'error' })
		// } finally {
		// 	setIsLoading(false)
		// }
	}

	const handleResetInputs = () => {
		setNewTodoTitle('')
		setNewTodoDescription('')
	}

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewTodoTitle(e.target.value)
	}

	const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewTodoDescription(e.target.value)
	}

	return (
		<Stack sx={{ marginBottom: '20px', display: 'flex', gap: '20px', maxWidth: '250px' }}>
			<Typography variant={'h5'}>Create new Todo</Typography>
			<Input placeholder={'title'} value={newTodoTitle} onChange={handleTitleChange} />
			<Input placeholder={'description'} value={newTodoDescription} onChange={handleDescriptionChange} />
			<Button variant="contained" disabled={!newTodoTitle} onClick={handleAddTodo}>
				Add
			</Button>
		</Stack>
	)
})

export default AddTodo
