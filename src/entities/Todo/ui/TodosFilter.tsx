import { useAppDispatch, useAppSelector } from '../../../app/store.ts'
import { selectFilters, setCompleted, setLimit, setPage, setSearch } from '../model/store/todosStore.ts'
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
import { CompletedFilterStatus } from '../model/todoType.ts'
import { useGetTodosQuery } from '../api/todoApi.ts'

const TodosFilter = () => {
	const filters = useAppSelector(selectFilters)
	const dispatch = useAppDispatch()
	const [textSearch, setTextSearch] = useState(filters.search || '')
	const { todosLength, hasNextPage } = useGetTodosQuery(filters, {
		selectFromResult: ({ data }) => ({
			todosLength: Math.min(data?.length ?? 0, filters.limit ?? 5),
			hasNextPage: (data?.length ?? 0) > (filters.limit ?? 5),
		}),
	})

	const handleFilterChange = (filter: CompletedFilterStatus) => {
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
		debounceSearch.cancel()
		setTextSearch('')
		dispatch(setSearch(''))
	}

	const handlePrevClick = () => {
		if (filters.page === 1) return
		dispatch(setPage((filters.page ?? 1) - 1))
	}

	const handleNextClick = () => {
		if (!hasNextPage) return true
		dispatch(setPage((filters.page ?? 1) + 1))
		return false
	}

	const handleResetFilters = () => {
		handleClearSearch()
		dispatch(setPage(1))
		dispatch(setCompleted(CompletedFilterStatus.ALL))
		dispatch(setSearch(''))
		dispatch(setLimit(5))
	}

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
							onClick={() => handleFilterChange(CompletedFilterStatus.TRUE)}
						>
							Completed
						</Button>
						<Button
							variant={filters.completed === 'false' ? 'contained' : 'outlined'}
							onClick={() => handleFilterChange(CompletedFilterStatus.FALSE)}
						>
							In Progress
						</Button>
						<Button
							variant={filters.completed === 'all' ? 'contained' : 'outlined'}
							onClick={() => handleFilterChange(CompletedFilterStatus.ALL)}
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
			<Paper variant="elevation" sx={{ margin: '20px 0', padding: '10px 0' }}>
				<Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
					<ButtonGroup>
						<Button onClick={handlePrevClick} disabled={filters.page === 1}>
							Prev
						</Button>
						<Card sx={{ margin: '10px 20px' }}>{filters.page}</Card>
						<Button onClick={handleNextClick} disabled={!hasNextPage}>
							Next
						</Button>
					</ButtonGroup>
				</Stack>
				<Stack
					sx={{
						margin: '20px 0',
						display: 'flex',
						flexDirection: 'row',
						gap: '50px',
						justifyContent: 'center',
					}}
				>
					<Button variant={'contained'} onClick={handleResetFilters}>
						Reset filters
					</Button>
					<Typography variant={'button'} sx={{ alignSelf: 'center' }}>
						Total: {todosLength}{' '}
					</Typography>
				</Stack>
			</Paper>
		</Container>
	)
}

export default TodosFilter
