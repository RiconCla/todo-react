import { Typography } from '@mui/material'
import { useState } from 'react'
import Button from '@mui/material/Button'

const About = () => {
	const [error, setError] = useState(false)

	if (error) {
		throw new Error('Test error')
	}

	return (
		<div>
			<Typography variant={'h2'}>About</Typography>
			<Button variant="contained" color="error" onClick={() => setError(true)}>
				Crash App
			</Button>
		</div>
	)
}
export default About
