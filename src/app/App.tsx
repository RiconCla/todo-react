import './App.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import AppBar from './AppBar.tsx'
import Auth from '../entities/User/ui/Auth.tsx'
import Todos from '../entities/Todo/ui/Todos.tsx'
import { autoLogin } from '../shared/util/autoLogin.ts'
import { useUserStore } from '../entities/User/model/store/useUserStore.ts'

function App() {
	const user = useUserStore((state) => state.user)
	const setUser = useUserStore((state) => state.setUser)
	const clearUser = useUserStore((state) => state.clearUser)
	if (!user) {
		const user = autoLogin()
		setUser(user)
	}
	// const [user, setUser] = useState<UserType | null>(userFromLS)

	const logOut = () => {
		localStorage.removeItem('access_token')
		clearUser()
	}

	return (
		<>
			<AppBar username={user?.username} onLogOut={logOut} />
			<div style={{ marginTop: '100px' }}></div>
			{user ? <Todos /> : <Auth setUser={setUser} />}
		</>
	)
}

export default App
