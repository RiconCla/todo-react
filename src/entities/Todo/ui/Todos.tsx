import { Backdrop, CircularProgress, Container, Skeleton, Stack } from '@mui/material'
import Todo from './Todo.tsx'
import { useEffect } from 'react'
import { enqueueSnackbar } from 'notistack'
import { useGetTodosQuery } from '../api/todoApi.ts'
import { useAppSelector } from '../../../app/store.ts'
import { selectFilters } from '../model/store/todosStore.ts'
import AddTodo from './AddTodo.tsx'

const Todos = () => {
	const filters = useAppSelector(selectFilters)
	const { data, isLoading, isError, isFetching } = useGetTodosQuery(filters)

	useEffect(() => {
		if (isError) {
			enqueueSnackbar('Error fetching todos...', { variant: 'error' })
		}
	}, [isError])

	return (
		<>
			<Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading || isFetching}>
				<CircularProgress color="inherit" />
			</Backdrop>
			<Container>
				<AddTodo />
				<Stack flexWrap={'wrap'} useFlexGap direction={'row'} gap={2} alignItems="stretch">
					{isLoading
						? Array.from({ length: filters.limit ?? 5 }).map((_, index) => (
								<Skeleton key={index} variant="rectangular" animation="wave" width={'250px'} height={'260px'} />
							))
						: data?.slice(0, filters.limit).map((todo) => <Todo todo={todo} key={todo._id} />)}
				</Stack>
			</Container>
		</>
	)
}

export default Todos
