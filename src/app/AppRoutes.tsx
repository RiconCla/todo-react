import { Route, Routes } from 'react-router'
import App from './App.tsx'
import About from '../entities/App/ui/About.tsx'
import NotFound from '../entities/App/ui/NotFound.tsx'
import Layout from '../entities/App/ui/Layout.tsx'
import Auth from '../entities/User/ui/Auth.tsx'
import ProtectedLayout from '../entities/App/ui/ProtectedLayouts.tsx'
import ProtectedAuthRoute from '../entities/App/ui/ProtectedAuthRoute.tsx'

const AppRoutes = () => {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route element={<ProtectedLayout />}>
					<Route index element={<App />} />
					<Route path="/about" element={<About />} />
				</Route>
				<Route
					path="/auth"
					element={
						<ProtectedAuthRoute>
							<Auth />
						</ProtectedAuthRoute>
					}
				/>

				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	)
}

export default AppRoutes
