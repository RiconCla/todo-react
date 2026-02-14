import { rootApi } from '../../../shared/api/rootApi.ts'
import type { UserType } from '../model/userType.ts'
import type { AxiosError } from 'axios'
import { jwtDecode } from 'jwt-decode'
import { enqueueSnackbar } from 'notistack'
import type { Dispatch, SetStateAction } from 'react'
import { setIsLoading, setUser } from '../model/store/userStore.ts'

export const handleLogin = async (dispatch: Dispatch<SetStateAction>, userName: string, userPassword: string) => {
	dispatch(setIsLoading(true))
	try {
		const loginData = await rootApi.post<UserType>('/auth/login', {
			username: userName,
			password: userPassword,
		})

		const accessToken = loginData.data.access_token
		console.warn(jwtDecode(accessToken))
		localStorage.setItem('access_token', accessToken)

		console.log('UserAPI(auth.tsx)', loginData.data)
		const setUserAction = setUser(loginData.data)
		console.log(setUserAction)
		dispatch(setUser(loginData.data))

		dispatch(setIsLoading(false))
		enqueueSnackbar(`Welcome, ${loginData.data.username} !`, { variant: 'success' })
	} catch (error) {
		const axiosError = error as AxiosError<{ message: string }>
		dispatch(setIsLoading(false))
		enqueueSnackbar(axiosError.response?.data.message || 'Unknown error', { variant: 'error' })
		return null
	}
}

export const handleRegister = async (dispatch: Dispatch<any>, userName: string, userPassword: string) => {
	if (!userName || !userPassword) return
	dispatch(setIsLoading(true))

	try {
		await rootApi.post<UserType>('/auth/register', {
			username: userName,
			password: userPassword,
		})

		enqueueSnackbar(`Registration successful!`, { variant: 'success' })
		return await handleLogin(dispatch, userName, userPassword)
	} catch (error) {
		dispatch(setIsLoading(false))
		const axiosError = error as AxiosError<{ message: string }>
		enqueueSnackbar(axiosError.response?.data.message || 'Unknown error', { variant: 'error' })
		return null
	}
}
