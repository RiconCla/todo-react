import { useAppSelector } from '../../../app/store.ts'
import { selectUser } from '../../User/model/store/userStore.ts'
import { Navigate, useLocation } from 'react-router'
import type { ReactNode } from 'react'

type Props = {
	children: ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
	const user = useAppSelector(selectUser)
	const location = useLocation()
	const shouldRedirectToLogin = !user && !location.pathname.includes('/auth') && !location.pathname.includes('/profile')
	const shouldRedirectFromLogin = user && location.pathname.includes('/auth')

	if (shouldRedirectToLogin) {
		return <Navigate to="/auth" />
	} else if (shouldRedirectFromLogin) {
		return <Navigate to="/" replace />
	}
	return <>{children}</>
}

export default ProtectedRoute
