import React, { type SyntheticEvent, useState } from 'react'
import {
	Button,
	Container,
	InputAdornment,
	Paper,
	Stack,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
} from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import { handleLogin, handleRegister } from '../api/userApi.ts'
import { useUserStore } from '../model/store/useUserStore.ts'

const Auth = () => {
	const [userName, setUserName] = useState('')
	const [userPassword, setUserPassword] = useState('')
	const [loading, setLoading] = useState<boolean>(false)
	const [isLoginFormName, setLoginFormName] = useState('login')
	const setUser = useUserStore((state) => state.setUser)

	const handleUserNameChange = (e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setUserName(e.currentTarget.value)
	}
	const handleUserPasswordChange = (e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setUserPassword(e.currentTarget.value)
	}

	const handleResetFields = () => {
		setUserName('')
		setUserPassword('')
	}

	const handleChange = (_event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
		setLoginFormName(newAlignment)
	}

	return (
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
							onClick={() => handleLogin(setLoading, setUser, userName, userPassword)}
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
							onClick={() => handleRegister(setLoading, setUser, userName, userPassword)}
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
	)
}

export default Auth
