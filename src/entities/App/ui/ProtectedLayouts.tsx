import { Outlet } from 'react-router'
import ProtectedRoute from './ProtectedRoute.tsx'

const ProtectedLayout = () => {
	return (
		<ProtectedRoute>
			<Outlet />
		</ProtectedRoute>
	)
}

export default ProtectedLayout
