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
import { useAppDispatch, useAppSelector } from '../../../app/store.ts'
import { selectLoading, selectUser } from '../model/store/userStore.ts'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

type SignUpFormInputs = z.infer<typeof stringSchemaRegister>
type SignInFormInputs = z.infer<typeof stringSchemaLogin>
const stringSchemaRegister = z
	.object({
		userName: z.string().max(10, { message: 'Name so long. Max length 10 symbols' }),
		userPassword: z.string().min(3, { message: 'Password must be at least 3 characters' }),
		confermedPassword: z.string(), //схема валидаций
	})
	.refine((data) => data.userPassword === data.confermedPassword, {
		message: "Passwords don't match",
		path: ['confermedPassword'],
	})

const stringSchemaLogin = z.object({
	userName: z.string().max(10, { message: 'Name so long. Max length 10 symbols' }),
	userPassword: z.string().min(5, { message: 'Password must be at least 5 characters' }),
})

const Auth = () => {
	const dispatch = useAppDispatch()
	const loading = useAppSelector(selectLoading)
	const navigate = useNavigate()
	const user = useAppSelector(selectUser)
	const { mode } = useParams()
	const stateLocation = useLocation().state
	//тут использую zod c react-hook-form
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<SignUpFormInputs>({
		resolver: zodResolver(stringSchemaRegister),
		mode: 'onChange',
	})
	// стейт для хранения логинизации
	const {
		register: login,
		handleSubmit: handleSubmitLogin,
		formState: { errors: loginErrors },
	} = useForm<SignInFormInputs>({
		resolver: zodResolver(stringSchemaLogin),
		mode: 'onChange',
	})

	if (user) {
		return <Navigate to={stateLocation || '/'} />
	}

	const handleResetFields = () => {
		reset()
	}

	const handleChange = (_event: React.MouseEvent, mode: string) => {
		if (mode !== null) {
			navigate(`/auth/${mode}`, { state: stateLocation })
		}
	}

	return (
		<Container maxWidth={'sm'}>
			<Paper elevation={3} sx={{ padding: 3 }}>
				<ToggleButtonGroup
					size={'small'}
					color="primary"
					value={mode}
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
				{mode === 'login' ? (
					<form
						onSubmit={handleSubmitLogin((data) => {
							handleLogin(navigate, dispatch, data.userName, data.userPassword)
						})}
					>
						<Stack direction={'column'} spacing={2}>
							<TextField
								disabled={loading ? true : false}
								id="filled-email-input"
								label="name"
								variant="filled"
								{...login('userName')}
								error={!!loginErrors?.userName}
								helperText={loginErrors ? loginErrors.userName?.message : ''}
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
								{...login('userPassword')}
								error={!!loginErrors?.userPassword}
								helperText={loginErrors ? loginErrors.userPassword?.message : ''}
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
								type="submit"
								variant="contained"
								color="primary"
								fullWidth
								loadingPosition="start"
								loading={loading}
							>
								{loading ? 'Loading' : 'LOGIN'}
							</Button>
						</Stack>
					</form>
				) : (
					<form
						onSubmit={handleSubmit((data) => {
							handleRegister(navigate, dispatch, data.userName, data.userPassword)
						})}
					>
						<Stack direction={'column'} spacing={2}>
							<TextField
								disabled={loading ? true : false}
								id="filled-email-input"
								label="name"
								variant="filled"
								{...register('userName')}
								error={!!errors?.userName}
								helperText={errors ? errors.userName?.message : ''}
								// onChange={handleUserNameChange}
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
								{...register('userPassword')}
								error={!!errors?.userPassword}
								helperText={errors ? errors.userPassword?.message : ''} //удобный пропс коменонента от mui
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
								label="Confermed password"
								type="password"
								variant="filled"
								{...register('confermedPassword')}
								error={!!errors?.confermedPassword}
								helperText={errors ? errors.confermedPassword?.message : ''} //удобный пропс коменонента от mui
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
								type="submit"
								variant="contained"
								color="primary"
								fullWidth
								loadingPosition="start"
								loading={loading}
								sx={{ backgroundColor: mode === 'login' ? '#1976d2' : '#dc004e' }}
							>
								{loading ? 'Loading' : 'Register'}
							</Button>
						</Stack>
					</form>
				)}
			</Paper>
		</Container>
	)
}

export default Auth
