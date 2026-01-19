import Button from '@mui/material/Button'
import { type SyntheticEvent, useState } from 'react'
import './App.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import AppBar from './AppBar.tsx'
import { Container, InputAdornment, Stack, TextField } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Paper from '@mui/material/Paper'
import { jwtDecode } from 'jwt-decode'

function App() {
	const [user, setUser] = useState<{ access_token: string; username: string } | null>(null)
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

	const handleLogin = async () => {
		if (userName === '' || userPassword === '') return
		setLoading(true)

		try {
			const loginResponse = await fetch('https://todos-be.vercel.app/auth/login', {
				method: 'POST',
				body: JSON.stringify({ username: userName, password: userPassword }),
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
				},
			})

			if (loginResponse.status === 200) {
				const loginData = (await loginResponse.json()) as { access_token: string; username: string }
				const accessToken = loginData.access_token
				console.log(jwtDecode(accessToken))
				localStorage.setItem('access_token', accessToken)
				setLoading(false)
				setUser(loginData)
				return
			}

			if (loginResponse.status === 401) {
				alert(`Invalid username or password`)
				setLoading(false)
				return
			}

			if (!loginResponse.ok) {
				alert(`Something went wrong ${loginResponse.status}`)
				setLoading(false)
				return
			}
		} catch (error) {
			setLoading(false)
			console.log(error.message)
		}
	}

	const handleRegister = async () => {
		if (userName === '' || userPassword === '') return
		setLoading(true)

		try {
			const registerResponce = await fetch('https://todos-be.vercel.app/auth/register', {
				method: 'POST',
				body: JSON.stringify({ username: userName, password: userPassword }),
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
				},
			})

			if (registerResponce.status === 201) {
				const registerData = (await registerResponce.json()) as { _id: string; username: string }
				console.log(registerData)
				await handleLogin()
				setLoading(false)
			}

			if (registerResponce.status === 409) {
				alert(`User already exists`)
				setLoading(false)
				return
			}
		} catch (error) {
			console.log(error.message)
			setLoading(false)
		}
	}

	const handleResetFields = () => {
		setUserName('')
		setUserPassword('')
	}

	const handleChange = (_event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
		setLoginFormName(newAlignment)
	}

	return (
		<>
			<AppBar username={user?.username} />
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
							/>
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
							/>
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
							/>
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
							/>
							<Button variant="contained" color="primary" fullWidth onClick={handleResetFields}>
								Reset fields
							</Button>
							<Button
								variant="contained"
								color="primary"
								onClick={handleRegister}
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
