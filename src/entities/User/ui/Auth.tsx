import React, { type Dispatch, type SetStateAction, type SyntheticEvent, useState } from 'react'
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
import type { UserType } from '../model/userType.ts'
import { rootApi } from '../../../shared/api/rootApi.ts'
import { useSnackbar } from 'notistack'
import type { AxiosError } from 'axios'
import { handleLogin } from '../api/userApi.ts'

type AuthProps = {
	setUser: Dispatch<SetStateAction<UserType | null>>
}

const Auth = ({ setUser }: AuthProps) => {
	const [userName, setUserName] = useState('')
	const [userPassword, setUserPassword] = useState('')
	const [loading, setLoading] = useState<boolean>(false)
	const [isLoginFormName, setLoginFormName] = useState('login')

	const { enqueueSnackbar } = useSnackbar()

	const handleUserNameChange = (e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setUserName(e.currentTarget.value)
	}
	const handleUserPasswordChange = (e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setUserPassword(e.currentTarget.value)
	}

	const handleRegister = async () => {
		if (userName === '' || userPassword === '') return
		setLoading(true)

		try {
			await rootApi.post<UserType>('/auth/register', {
				username: userName,
				password: userPassword,
			})

			enqueueSnackbar(`Registration successful!`, { variant: 'success' })
			const user = await handleLogin(userName, userPassword)
			setUser(user)
		} catch (error) {
			setLoading(false)
			const axiosError = error as AxiosError<{ message: string }>
			enqueueSnackbar(axiosError.response?.data.message || 'Unknown error', { variant: 'error' })
		} finally {
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
							onClick={() => handleLogin(userName, userPassword)}
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
	)
}

export default Auth
