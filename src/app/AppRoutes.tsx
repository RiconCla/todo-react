import { Route, Routes } from 'react-router'
import App from './App.tsx'
import About from '../entities/App/ui/About.tsx'
import NotFound from '../entities/App/ui/NotFound.tsx'
import Layout from '../entities/App/ui/Layout.tsx'
import Auth from '../entities/User/ui/Auth.tsx'
import ProtectedRoute from '../entities/App/ui/ProtectedRoute.tsx'
import ProtectedAuthRoute from '../entities/App/ui/ProtectedAuthRoute.tsx'

const AppRoutes = () => {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route
					index
					element={
						<ProtectedRoute>
							<App />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/about"
					element={
						<ProtectedRoute>
							<About />
						</ProtectedRoute>
					}
				/>
				<Route path="*" element={<NotFound />} />
				<Route
					path="/auth"
					element={
						<ProtectedAuthRoute>
							<Auth />
						</ProtectedAuthRoute>
					}
				/>
			</Route>
		</Routes>
	)
}

export default AppRoutes
