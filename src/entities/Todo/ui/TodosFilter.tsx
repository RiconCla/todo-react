import { useAppDispatch, useAppSelector } from '../../../app/store.ts'
import {
	selectFilters,
	selectHasNextPage,
	selectTodos,
	setCompleted,
	setLimit,
	setPage,
	setSearch,
} from '../model/store/todosStore.ts'
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	ButtonGroup,
	Container,
	Input,
	MenuItem,
	Paper,
	Select,
	type SelectChangeEvent,
	Stack,
	Typography,
} from '@mui/material'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

const TodosFilter = () => {
	const filters = useAppSelector(selectFilters)
	const dispatch = useAppDispatch()
	const todosLengths = useAppSelector(selectTodos).length
	const [textSearch, setTextSearch] = useState(filters.search || '')
	const hasNextPage = useAppSelector(selectHasNextPage)

	const handleFilterChange = (filter: 'true' | 'false' | 'all') => {
		dispatch(setCompleted(filter))
	}

	const debounceSearch = useDebouncedCallback((value: string) => {
		dispatch(setSearch(value))
	}, 400)

	const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const search = e.target.value
		setTextSearch(search)
		debounceSearch(search)
	}

	// функция для тротла, здесь не стоит её использовать так как длина поиска явно небольшая
	// const throttleSearch = useThrottledCallback(
	// 	(value: string) => {
	// 		dispatch(setSearch(value))
	// 	},
	// 	3000,
	// 	{ leading: true }
	// )

	// функция вызова тротла ^
	// const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	const search = e.target.value
	// 	setTextSearch(search)
	// 	throttleSearch(search)
	// }

	const handleChangeLimit = (e: SelectChangeEvent<number>) => {
		dispatch(setLimit(e.target.value))
	}

	const handlePrevClick = () => {
		if (filters.page === 1) return
		dispatch(setPage(filters.page - 1))
	}
	const handleNextClick = () => {
		if (!hasNextPage) return
		dispatch(setPage(filters.page + 1))
	}

	console.log(`dlina: ${todosLengths}`)
	console.log(`limit : ${filters.limit}`)

	return (
		<Container>
			<Accordion>
				<AccordionSummary>Filters</AccordionSummary>
				<AccordionDetails>
					<Stack direction="row" sx={{ marginBottom: '20px' }}>
						<Input onChange={handleChangeSearch} placeholder="Search..." value={textSearch} />
					</Stack>
					<ButtonGroup>
						<Button
							variant={filters.completed === 'true' ? 'contained' : 'outlined'}
							onClick={() => handleFilterChange('true')}
						>
							Completed
						</Button>
						<Button
							variant={filters.completed === 'false' ? 'contained' : 'outlined'}
							onClick={() => handleFilterChange('false')}
						>
							In Progress
						</Button>
						<Button
							variant={filters.completed === 'all' ? 'contained' : 'outlined'}
							onClick={() => handleFilterChange('all')}
						>
							Show All
						</Button>
					</ButtonGroup>
					<Stack direction="row" sx={{ marginBottom: '20px' }}>
						<Typography>Show by:</Typography>
						<Select variant={'filled'} value={filters.limit} onChange={handleChangeLimit}>
							<MenuItem value={5}>5</MenuItem>
							<MenuItem value={10}>10</MenuItem>
							<MenuItem value={20}>20</MenuItem>
							<MenuItem value={25}>25</MenuItem>
						</Select>
					</Stack>
				</AccordionDetails>
			</Accordion>
			<ButtonGroup>
				<Button onClick={handlePrevClick} disabled={filters.page === 1}>
					Prev
				</Button>
				<Paper
					sx={{ display: 'flex', minWidth: '50%', alignItems: 'center', justifyContent: 'center' }}
					variant={'outlined'}
				>
					Page:{filters.page}
				</Paper>
				<Button onClick={handleNextClick} disabled={!hasNextPage}>
					Next
				</Button>
			</ButtonGroup>
		</Container>
	)
}

export default TodosFilter
