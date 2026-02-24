import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import './index.css'
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import { Provider } from 'react-redux'
import { store } from './store.ts'
import { BrowserRouter } from 'react-router'
import AppRoutes from './AppRoutes.tsx'

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
	<BrowserRouter>
		<Provider store={store}>
			<SnackbarProvider>
				<ThemeProvider defaultMode="dark" theme={theme}>
					<CssBaseline />
					<AppRoutes />
				</ThemeProvider>
			</SnackbarProvider>
		</Provider>
	</BrowserRouter>
)
