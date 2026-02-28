import Box from '@mui/material/Box'
import { Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../app/store.ts'
import { selectAccordionItems } from '../model/store/accordionItemsStore.ts'
import { toggleAccordion } from '../model/store/accordionStore.ts'
import { useLocation, useNavigate } from 'react-router'
import { selectUser } from '../../User/model/store/userStore.ts'

const Accordion = () => {
	const items = useAppSelector(selectAccordionItems)
	const user = useAppSelector(selectUser)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const location = useLocation()

	const handleNavigate = (route: string) => {
		navigate(route)
		dispatch(toggleAccordion())
	}

	const filterVisibleItemsMenu = items.filter((item) => {
		if (user) {
			return item.protectedAuth
		} else {
			return !item.protectedAuth
		}
	})

	return (
		<Box sx={{ width: 250 }} role="presentation">
			<List>
				{filterVisibleItemsMenu.map((item) => (
					<ListItem key={item._id}>
						<ListItemButton onClick={() => handleNavigate(item.route)} selected={location.pathname === item.route}>
							<ListItemText primary={item.title} />
						</ListItemButton>
					</ListItem>
				))}
				<Divider />
			</List>
		</Box>
	)
}

export default Accordion
