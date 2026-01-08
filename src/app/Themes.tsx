import { createTheme } from '@mui/material/styles'

const theme = createTheme({
	colorSchemes: {
		light: {
			palette: {
				primary: {
					main: '#1976d2',
				},
			},
		},
		dark: {
			palette: {
				primary: {
					main: '#90caf9',
				},
			},
		},
	},
})
export default theme
