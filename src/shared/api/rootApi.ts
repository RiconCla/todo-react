import axios from 'axios'

export const rootApi = axios.create({
	baseURL: 'https://todos-be.vercel.app',
	timeout: 5000,
})
