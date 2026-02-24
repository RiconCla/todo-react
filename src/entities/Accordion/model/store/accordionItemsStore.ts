import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { AccordionItemType } from '../accordionItemType.ts'
import { mockAccordionItems } from '../mockAccordionItems.ts'

type AccordionItemsStore = {
	items: AccordionItemType[]
}

const initialState: AccordionItemsStore = {
	items: mockAccordionItems,
}

export const accordionItemsStore = createSlice({
	name: 'accordionItemsSlice',
	initialState,
	reducers: {
		setAccordion: (state, action: PayloadAction<AccordionItemType[]>) => {
			state.items = action.payload
		},
		addAccordionItem: (state, action: PayloadAction<AccordionItemType>) => {
			state.items = [action.payload, ...state.items]
		},
		deleteAccordionItem: (state, action: PayloadAction<number>) => {
			state.items = state.items.filter((item) => item._id !== action.payload)
		},
	},
	selectors: {
		selectAccordionItems: (state: AccordionItemsStore) => state.items,
	},
})

export const { setAccordion, addAccordionItem, deleteAccordionItem } = accordionItemsStore.actions
export const { selectAccordionItems } = accordionItemsStore.selectors

export default accordionItemsStore.reducer
// это сделано на будущее, есть идея добавлять элементы меню. Но как и где - еще не решил
