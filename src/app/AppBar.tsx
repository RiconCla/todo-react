import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Toolbar, Typography, AppBar, Avatar, Tooltip, Stack } from '@mui/material'
import { useColorScheme } from '@mui/material/styles'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import FormControl from '@mui/material/FormControl'

const ButtonAppBar = () => {
	const { mode, setMode } = useColorScheme()
	if (!mode) {
		return null
	}
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="fixed">
				<Toolbar>
					<IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
						<MenuIcon />
					</IconButton>
					<Stack direction={'row'} spacing={2} style={{ flexGrow: 1 }}>
						<Typography variant="h6" component="div">
							Todos
						</Typography>
						<Typography variant="h6" component="div">
							About
						</Typography>
					</Stack>
					<Stack direction={'row'} spacing={2} style={{ flexGrow: 1 }}>
						<FormControl>
							<FormLabel id="demo-theme-toggle" color="secondary">
								Theme
							</FormLabel>
							<RadioGroup
								aria-labelledby="demo-theme-toggle"
								name="theme-toggle"
								row
								value={mode}
								onChange={(event) => setMode(event.target.value as 'system' | 'light' | 'dark')}
							>
								<FormControlLabel value="system" control={<Radio />} label="System" />
								<FormControlLabel value="light" control={<Radio color="secondary" />} label="Light" />
								<FormControlLabel value="dark" control={<Radio />} label="Dark" />
							</RadioGroup>
						</FormControl>
					</Stack>
					<Button color="inherit">Login</Button>
					<Tooltip title="User">
						<Avatar src={''} />
					</Tooltip>
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default ButtonAppBar
