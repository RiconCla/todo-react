import AppBar from '../../../app/AppBar.tsx'
import { useAppSelector } from '../../../app/store.ts'
import { selectUser } from '../../User/model/store/userStore.ts'
import { Outlet } from 'react-router'
import ErrorHandler from './ErrorHandler.tsx'

const Layout = () => {
	const user = useAppSelector(selectUser)
	return (
		<>
			<AppBar username={user?.username} />
			<div style={{ marginTop: '100px' }}>
				<ErrorHandler>
					<Outlet />
				</ErrorHandler>
			</div>
		</>
	)
}

export default Layout
