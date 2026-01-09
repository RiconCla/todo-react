import { createTheme } from '@mui/material/styles'

const theme = createTheme({
	colorSchemes: {
		light: {
			palette: {
				primary: {
					main: '#1976d2',
				},
				secondary: {
					main: '#080707',
				},
			},
		},
		dark: {
			palette: {
				primary: {
					main: '#90caf9',
				},
				secondary: {
					main: '#42a5f5',
				},
			},
		},
	},
})
export default theme
