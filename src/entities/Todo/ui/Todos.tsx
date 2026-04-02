import { Backdrop, CircularProgress, Container, Skeleton, Stack } from '@mui/material'
import Todo from './Todo.tsx'
import { useEffect, useState } from 'react'
import { enqueueSnackbar } from 'notistack'
import { useGetTodosQuery, usePatchTodoMutation } from '../api/todoApi.ts'
import { useAppSelector } from '../../../app/store.ts'
import { selectFilters } from '../model/store/todosStore.ts'
import AddTodo from './AddTodo.tsx'
import { closestCenter, DndContext, type DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import type { TodoType } from '../model/todoType.ts'
import { arrayMove, rectSwappingStrategy, SortableContext } from '@dnd-kit/sortable'
import TodoDropZone from './TodoDropZone.tsx'

const Todos = () => {
	const filters = useAppSelector(selectFilters)
	const { data, isLoading, isError, isFetching } = useGetTodosQuery(filters, {
		pollingInterval: 1000000,
		skipPollingIfUnfocused: true,
	})
	const [todos, setTodos] = useState<TodoType[]>([])
	const [patchTodo] = usePatchTodoMutation()

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				// delay: 20, // держать 20ms
				distance: 3,
			},
		})
	)

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event
		if (!over || active.id === over.id) return

		setTodos((prev) => {
			const oldIndex = prev.findIndex((t) => t._id === active.id)
			const newIndex = prev.findIndex((t) => t._id === over.id)
			const rerendered = arrayMove(prev, oldIndex, newIndex) // утилита из @dnd-kit/sortable
			rerendered.forEach((todo, index) => {
				if (todo.order !== index) {
					patchTodo({ id: todo._id, todoEdit: { order: index } })
				}
			})
			return rerendered
		})
	}

	useEffect(() => {
		if (isError) {
			enqueueSnackbar('Error fetching todos...', { variant: 'error' })
		}
	}, [isError])

	useEffect(() => {
		if (data) {
			setTodos(data?.slice(0, filters.limit).sort((a, b) => a.order - b.order))
		}
	}, [data, filters.limit])

	return (
		<>
			<Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading || isFetching}>
				<CircularProgress color="inherit" />
			</Backdrop>
			<Container>
				<Stack sx={{ display: 'flex', flexDirection: 'column' }}>
					<AddTodo />
					<TodoDropZone />
				</Stack>
				<Stack flexWrap={'wrap'} useFlexGap direction={'row'} gap={2} alignItems="stretch">
					<DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter} sensors={sensors}>
						<SortableContext items={todos.map((t) => t._id)} strategy={rectSwappingStrategy}>
							{isLoading
								? Array.from({ length: filters.limit ?? 5 }).map((_, index) => (
										<Skeleton key={index} variant="rectangular" animation="wave" width={'250px'} height={'260px'} />
									))
								: todos.map((todo) => <Todo todo={todo} key={todo._id} id={todo._id} index={todo.order} />)}
						</SortableContext>
					</DndContext>
				</Stack>
			</Container>
		</>
	)
}

export default Todos
