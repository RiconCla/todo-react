import { Backdrop, CircularProgress, Container, Skeleton, Stack } from '@mui/material'
import { Todo } from './Todo.tsx'
import { useCallback, useEffect, useState } from 'react'
import type { TodoType } from '../model/todoType.ts'
import { enqueueSnackbar } from 'notistack'
import { selectFilters, selectTodos, setTodos, setHasNextPage } from '../model/store/todosStore.ts'
import { useAppDispatch, useAppSelector } from '../../../app/store.ts'
import { getTodos } from '../api/todoApi.ts'
import AddTodo from './AddTodo.tsx'

const Todos = () => {
	const [isLoading, setIsLoading] = useState(true)

	const todos = useAppSelector(selectTodos)
	const dispatch = useAppDispatch()

	const filters = useAppSelector(selectFilters)

	const setTodoCompleted = useCallback(
		(todo: TodoType) => {
			const updatedTodos = todos.map((t) => (t._id === todo._id ? todo : t))
			dispatch(setTodos(updatedTodos))
		},
		[dispatch, todos]
	)

	const handleGetTodos = useCallback(async () => {
		setIsLoading(true)
		try {
			const result = await getTodos(filters)
			const allTodos = result.data
			const todosVisible = allTodos.slice(0, filters.limit)
			const hasNextPage = todosVisible.length < allTodos.length
			dispatch(setTodos(todosVisible || []))
			dispatch(setHasNextPage(hasNextPage))
		} catch (error) {
			console.error(error)
			enqueueSnackbar('Error fetching todos...', { variant: 'error' })
			dispatch(setTodos([]))
			dispatch(setHasNextPage(false))
		}
		setIsLoading(false)
	}, [dispatch, filters])

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		handleGetTodos()
	}, [handleGetTodos])

	return (
		<>
			<Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
				<CircularProgress color="inherit" />
			</Backdrop>
			<Container>
				<AddTodo getTodos={handleGetTodos} />

				<Stack flexWrap={'wrap'} useFlexGap direction={'row'} gap={2} alignItems="stretch">
					{isLoading
						? Array.from({ length: filters.limit ?? 5 }).map((_, index) => (
								<Skeleton key={index} variant="rectangular" animation="wave" width={'250px'} height={'260px'} />
							))
						: todos.map((todo) => <Todo todo={todo} key={todo._id} setTodo={setTodoCompleted} />)}
				</Stack>
			</Container>
		</>
	)
}

export default Todos
