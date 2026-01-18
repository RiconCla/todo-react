import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import './index.css'
import App from './App.tsx'
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material'

const theme = createTheme({
	colorSchemes: {
		light: {
			palette: {
				primary: {
					main: '#1976d2',
				},
				secondary: {
					main: '#fff',
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

createRoot(document.getElementById('root')!).render(
	<>
		<ThemeProvider defaultMode="dark" theme={theme}>
			<CssBaseline />
			<App />
		</ThemeProvider>
	</>
)
