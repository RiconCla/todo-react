import { useState } from 'react'

export const useToggleEdit = () => {
	const [value, setValue] = useState<boolean>(false)
	const setTrue = () => setValue(true)
	const setFalse = () => setValue(false)
	const toggle = () => setValue((prevState) => !prevState)
	return [value, setTrue, setFalse, toggle] as const
}

export default useToggleEdit
