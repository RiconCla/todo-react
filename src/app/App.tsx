import Button from '@mui/material/Button'
import { type SyntheticEvent, useState } from 'react'
import './App.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import AppBar from './AppBar.tsx'
import IncreaseAge from './test.tsx'
import { Container, InputAdornment, Stack, TextField } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Paper from '@mui/material/Paper'

function App() {
	const [userName, setUserName] = useState('')
	const [userPassword, setUserPassword] = useState('')
	const [loading, setLoading] = useState<boolean>(false)
	const [isLoginFormName, setLoginFormName] = useState('login')

	const handleUserNameChange = (e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setUserName(e.currentTarget.value)
	}
	const handleUserPasswordChange = (e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setUserPassword(e.currentTarget.value)
	}

	const handleLogin = () => {
		if (userName === '' || userPassword === '') return
		console.log({ userName, userPassword })
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
		}, 2000)
	}

	const handleChange = (_event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
		setLoginFormName(newAlignment)
	}

	return (
		<>
			<AppBar />
			<div style={{ marginTop: '100px' }}></div>

			<Container maxWidth={'sm'}>
				<Paper elevation={3} sx={{ padding: 3 }}>
					<ToggleButtonGroup
						size={'small'}
						color="primary"
						value={isLoginFormName}
						exclusive
						fullWidth
						onChange={handleChange}
						aria-label="Platform"
						sx={{ marginBottom: '10px' }}
						disabled={loading}
					>
						<ToggleButton value="login">Login</ToggleButton>
						<ToggleButton value="register">Register</ToggleButton>
					</ToggleButtonGroup>
					{isLoginFormName === 'login' ? (
						<Stack direction={'column'} spacing={2}>
							<TextField
								disabled={loading ? true : false}
								id="filled-email-input"
								label="email"
								variant="filled"
								value={userName}
								onChange={handleUserNameChange}
								slotProps={{
									input: {
										startAdornment: (
											<InputAdornment position="start">
												<AccountCircle />
											</InputAdornment>
										),
									},
								}}
							></TextField>
							<TextField
								disabled={loading ? true : false}
								id="filled-password-input"
								label="password"
								type="password"
								variant="filled"
								value={userPassword}
								onChange={handleUserPasswordChange}
								slotProps={{
									input: {
										startAdornment: (
											<InputAdornment position="start">
												<AccountCircle />
											</InputAdornment>
										),
									},
								}}
							></TextField>
							<Button
								variant="contained"
								color="primary"
								onClick={handleLogin}
								fullWidth
								loadingPosition="start"
								loading={loading}
							>
								{loading ? 'Loading' : 'LOGIN'}
							</Button>
						</Stack>
					) : (
						<Stack direction={'column'} spacing={2}>
							<TextField
								disabled={loading ? true : false}
								id="filled-email-input"
								label="email"
								variant="filled"
								value={userName}
								onChange={handleUserNameChange}
								slotProps={{
									input: {
										startAdornment: (
											<InputAdornment position="start">
												<AccountCircle />
											</InputAdornment>
										),
									},
								}}
							></TextField>
							<TextField
								disabled={loading ? true : false}
								id="filled-password-input"
								label="password"
								type="password"
								variant="filled"
								value={userPassword}
								onChange={handleUserPasswordChange}
								slotProps={{
									input: {
										startAdornment: (
											<InputAdornment position="start">
												<AccountCircle />
											</InputAdornment>
										),
									},
								}}
							></TextField>
							<Button
								variant="contained"
								color="primary"
								onClick={handleLogin}
								fullWidth
								loadingPosition="start"
								loading={loading}
								sx={{ backgroundColor: isLoginFormName === 'login' ? '#1976d2' : '#dc004e' }}
							>
								{loading ? 'Loading' : 'Register'}
							</Button>
						</Stack>
					)}
				</Paper>
			</Container>
		</>
	)
}

export default App
