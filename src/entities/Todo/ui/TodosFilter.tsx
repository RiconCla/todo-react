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
	Card,
	Container,
	Divider,
	FormControl,
	Input,
	InputLabel,
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
import DehazeIcon from '@mui/icons-material/Dehaze'

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

	const handleClearSearch = () => {
		setTextSearch('')
	}

	const handlePrevClick = () => {
		if (filters.page === 1) return
		dispatch(setPage(filters.page - 1))
	}

	const handleNextClick = () => {
		if (!hasNextPage) return true
		dispatch(setPage(filters.page + 1))
		return false
	}

	console.log(`dlina: ${todosLengths}`)
	console.log(`limit : ${filters.limit}`)

	return (
		<Container>
			<Accordion>
				<AccordionSummary sx={{ display: 'flex', gap: '200px' }}>
					<DehazeIcon sx={{ alignSelf: 'center' }}></DehazeIcon>
					<Typography sx={{ marginLeft: '20px' }} variant={'h5'}>
						Filters
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Stack direction="row" sx={{ marginBottom: '20px' }}>
						<Input
							onChange={handleChangeSearch}
							placeholder="Search..."
							value={textSearch}
							sx={{ marginRight: '10px' }}
						/>
						<Button variant={'outlined'} onClick={handleClearSearch}>
							Clear
						</Button>
					</Stack>
					<Divider sx={{ marginBottom: '20px' }} />
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
					<Divider sx={{ margin: '20px 20px' }} />
					<FormControl size={'medium'} sx={{ width: '50%' }}>
						<InputLabel id="choise-limit">Show by</InputLabel>
						<Select
							labelId="choise-limit"
							id="choise-limit-select"
							variant={'filled'}
							value={filters.limit}
							label="Show by"
							onChange={handleChangeLimit}
						>
							<MenuItem value={5}>5</MenuItem>
							<MenuItem value={10}>10</MenuItem>
							<MenuItem value={20}>20</MenuItem>
							<MenuItem value={25}>25</MenuItem>
						</Select>
					</FormControl>
				</AccordionDetails>
			</Accordion>
			<Paper variant="elevation" sx={{ margin: '20px 0' }}>
				<ButtonGroup>
					<Button onClick={handlePrevClick} disabled={filters.page === 1}>
						Prev
					</Button>
					<Card sx={{ margin: '10px 20px' }}>{filters.page}</Card>
					<Button onClick={handleNextClick} disabled={!hasNextPage}>
						Next
					</Button>
				</ButtonGroup>
			</Paper>
		</Container>
	)
}

export default TodosFilter
