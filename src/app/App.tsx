import Button from '@mui/material/Button'
import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import AppBar from './AppBar.tsx'
import IncreaseAge from './test.tsx'

function App() {
	const [count, setCount] = useState(0)
	const [text, setText] = useState('')

	return (
		<>
			<AppBar />
			<div>
				<a href="https://vite.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<input value={text} onChange={(e) => setText(e.target.value)} />
			<p>Typed text:{text}</p>
			<h1>Vite + React</h1>
			<div className="card">
				<Button variant={'contained'} onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</Button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">Click on the Vite and React logos to learn more</p>
			<Button variant="contained">Hello world</Button>
			<IncreaseAge />
		</>
	)
}

export default App
