import { useSnackbar } from 'notistack'
import { useEffect } from 'react'

export const useEnqueueSnackbar = (message: string, value: boolean, type: boolean) => {
	const { enqueueSnackbar } = useSnackbar()

	useEffect(() => {
		if (!value) return
		enqueueSnackbar(message, { variant: type ? 'success' : 'error' })
	}, [value, message, type, enqueueSnackbar])
}

export default useEnqueueSnackbar
