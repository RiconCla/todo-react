import Box from '@mui/material/Box'
import { Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../app/store.ts'
import { selectAccordionItems } from '../model/store/accordionItemsStore.ts'
import { toggleAccordion } from '../model/store/accordionStore.ts'
import { useNavigate } from 'react-router'

const Accordion = () => {
	const items = useAppSelector(selectAccordionItems)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const checkCorrectNavigate = (title: string) => {
		if (title === 'About') {
			return navigate('/about')
		} else {
			return navigate(`/`)
		}
	}
	return (
		<Box sx={{ width: 250 }} role="presentation" onClick={() => dispatch(toggleAccordion())}>
			<List>
				{items.map((item) => (
					<ListItem key={item._id}>
						<ListItemButton onClick={() => checkCorrectNavigate(item.title)}>
							<ListItemText primary={item.title} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider />
		</Box>
	)
}

export default Accordion
