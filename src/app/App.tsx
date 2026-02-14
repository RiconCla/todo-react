import './App.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import AppBar from './AppBar.tsx'
import Auth from '../entities/User/ui/Auth.tsx'
import Todos from '../entities/Todo/ui/Todos.tsx'
import { selectUser } from '../entities/User/model/store/userStore.ts'
import { useAppSelector } from './store.ts'

function App() {
	// const user = userStore((state) => state.user)
	const user = useAppSelector(selectUser)

	return (
		<>
			<AppBar username={user?.username} />
			<div style={{ marginTop: '100px' }}></div>
			{user ? <Todos /> : <Auth />}
		</>
	)
}

export default App
