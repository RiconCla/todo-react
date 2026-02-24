import { useAppSelector } from '../../../app/store.ts'
import { selectUser } from '../../User/model/store/userStore.ts'
import { Navigate } from 'react-router'
import type { ReactNode } from 'react'

type Props = {
	children: ReactNode
}

const ProtectedAuthRoute = ({ children }: Props) => {
	const user = useAppSelector(selectUser)

	if (user) {
		return <Navigate to="/" replace />
	}

	return <>{children}</>
}

export default ProtectedAuthRoute
