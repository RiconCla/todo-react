import type { AccordionItemType } from './accordionItemType.ts'

export const mockAccordionItems: AccordionItemType[] = [
	{
		_id: 1,
		title: 'Home',
		sequence: 1,
		route: '/',
		protectedAuth: true,
	},
	{
		_id: 2,
		title: 'About',
		sequence: 2,
		route: '/about',
		protectedAuth: true,
	},
	{
		_id: 3,
		title: 'Profile',
		sequence: 3,
		route: '/profile',
		protectedAuth: true,
	},
	{
		_id: 4,
		title: 'Authentication',
		sequence: 4,
		route: '/auth',
		protectedAuth: false,
	},
]
