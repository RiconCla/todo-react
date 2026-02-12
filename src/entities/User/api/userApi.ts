import { rootApi } from '../../../shared/api/rootApi.ts'
import type { UserType } from '../model/userType.ts'
import type { AxiosError } from 'axios'
import { jwtDecode } from 'jwt-decode'
import { enqueueSnackbar } from 'notistack'
import type { Dispatch, SetStateAction } from 'react'

export const handleLogin = async (
	setLoading: Dispatch<SetStateAction<boolean>>,
	setUser: (user: UserType | undefined) => void,
	userName: string,
	userPassword: string
) => {
	setLoading(true)
	try {
		const loginData = await rootApi.post<UserType>('/auth/login', {
			username: userName,
			password: userPassword,
		})

		const accessToken = loginData.data.access_token
		console.warn(jwtDecode(accessToken))
		localStorage.setItem('access_token', accessToken)
		setLoading(false)
		enqueueSnackbar(`Welcome, ${loginData.data.username} !`, { variant: 'success' })
		setUser(loginData.data)
	} catch (error) {
		const axiosError = error as AxiosError<{ message: string }>
		setLoading(false)
		enqueueSnackbar(axiosError.response?.data.message || 'Unknown error', { variant: 'error' })
		return null
	}
}

export const handleRegister = async (
	setLoading: Dispatch<SetStateAction<boolean>>,
	setUser: (user: UserType | undefined) => void,
	userName: string,
	userPassword: string
) => {
	if (!userName || !userPassword) return
	setLoading(true)

	try {
		await rootApi.post<UserType>('/auth/register', {
			username: userName,
			password: userPassword,
		})

		enqueueSnackbar(`Registration successful!`, { variant: 'success' })
		return await handleLogin(setLoading, setUser, userName, userPassword)
	} catch (error) {
		setLoading(false)
		const axiosError = error as AxiosError<{ message: string }>
		enqueueSnackbar(axiosError.response?.data.message || 'Unknown error', { variant: 'error' })
		return null
	}
}
