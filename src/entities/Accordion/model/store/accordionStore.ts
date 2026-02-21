import { createSlice } from '@reduxjs/toolkit'

type AccordionState = {
	isOpen: boolean
}

const initialState: AccordionState = {
	isOpen: false,
}

export const accordionStateStore = createSlice({
	name: 'accordionStateSlice',
	initialState,
	reducers: {
		toggleAccordion: (state) => {
			state.isOpen = !state.isOpen
		},
	},
	selectors: {
		selectAccordionState: (state: AccordionState) => state.isOpen,
	},
})

export const { toggleAccordion } = accordionStateStore.actions
export const { selectAccordionState } = accordionStateStore.selectors

export default accordionStateStore.reducer
