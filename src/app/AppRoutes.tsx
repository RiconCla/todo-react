import { Route, Routes } from 'react-router'
import App from './App.tsx'
import About from '../entities/App/ui/About.tsx'
import NotFound from '../entities/App/ui/NotFound.tsx'
import Layout from '../entities/App/ui/Layout.tsx'
import Auth from '../entities/User/ui/Auth.tsx'
import Profile from '../entities/User/ui/Profile.tsx'
import Redirector from '../entities/App/ui/Redirector.tsx'

const AppRoutes = () => {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route element={<Redirector />}>
					<Route index element={<App />} />
					<Route path="/about" element={<About />} />
					<Route path="/profile" element={<Profile />} />
				</Route>
				<Route path="/auth/:mode" element={<Auth />} />
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	)
}

export default AppRoutes
