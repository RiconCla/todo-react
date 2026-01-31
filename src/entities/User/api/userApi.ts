import { rootApi } from '../../../shared/api/rootApi.ts'
import type { UserType } from '../model/userType.ts'
import type { AxiosError } from 'axios'
import { jwtDecode } from 'jwt-decode'
import { enqueueSnackbar } from 'notistack'

export const handleLogin = async (userName: string, userPassword: string) => {
	try {
		const loginData = await rootApi.post<UserType>('/auth/login', {
			username: userName,
			password: userPassword,
		})

		const accessToken = loginData.data.access_token
		console.warn(jwtDecode(accessToken))
		localStorage.setItem('access_token', accessToken)

		enqueueSnackbar(`Welcome, ${loginData.data.username} !`, { variant: 'success' })
		return loginData.data
	} catch (error) {
		const axiosError = error as AxiosError<{ message: string }>
		enqueueSnackbar(axiosError.response?.data.message || 'Unknown error', { variant: 'error' })
		return null
	}
}
