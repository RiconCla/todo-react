import { Stack, Typography } from '@mui/material'
import { useState } from 'react'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router'

const About = () => {
	const [error, setError] = useState(false)
	const navigate = useNavigate()

	if (error) {
		throw new Error('Critical error (я сломался)')
	}

	return (
		<div>
			<Typography variant={'h2'}>About</Typography>
			<Stack direction={'row'} spacing={2}>
				<Button variant="contained" color="error" onClick={() => setError(true)}>
					Crash App
				</Button>
				<Button variant={'contained'} color="secondary" onClick={() => navigate(-1)}>
					Go Back
				</Button>
			</Stack>
		</div>
	)
}
export default About
