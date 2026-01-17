import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Toolbar, Typography, AppBar, Avatar, Tooltip, Stack, styled, type SwitchProps, Switch } from '@mui/material'
import { useColorScheme } from '@mui/material/styles'
import FormControlLabel from '@mui/material/FormControlLabel'
import FlareIcon from '@mui/icons-material/Flare'
import Brightness4Icon from '@mui/icons-material/Brightness4'

const ButtonAppBar = () => {
	const { mode, setMode } = useColorScheme()
	if (!mode) {
		return null
	}

	const handleToggleTheme = (_event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
		setMode(checked ? 'dark' : 'light')
	}

	const IOSSwitch = styled((props: SwitchProps) => (
		<Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
	))(({ theme }) => ({
		width: 42,
		height: 26,
		padding: 0,
		'& .MuiSwitch-switchBase': {
			padding: 0,
			margin: 2,
			transitionDuration: '300ms',
			'&.Mui-checked': {
				transform: 'translateX(16px)',
				color: '#fff',
				'& + .MuiSwitch-track': {
					backgroundColor: 'primary',
					opacity: 1,
					border: 0,
					...theme.applyStyles('dark', {
						backgroundColor: 'primary',
					}),
				},
				'&.Mui-disabled + .MuiSwitch-track': {
					opacity: 0.5,
				},
			},
			'&.Mui-focusVisible .MuiSwitch-thumb': {
				color: '#33cf4d',
				border: '6px solid #fff',
			},
			'&.Mui-disabled .MuiSwitch-thumb': {
				color: theme.palette.grey[100],
				...theme.applyStyles('dark', {
					color: theme.palette.grey[600],
				}),
			},
			'&.Mui-disabled + .MuiSwitch-track': {
				opacity: 0.7,
				...theme.applyStyles('dark', {
					opacity: 0.3,
				}),
			},
		},
		'& .MuiSwitch-thumb': {
			boxSizing: 'border-box',
			width: 22,
			height: 22,
		},
		'& .MuiSwitch-track': {
			borderRadius: 26 / 2,
			backgroundColor: '#E9E9EA',
			opacity: 1,
			transition: theme.transitions.create(['background-color'], {
				duration: 500,
			}),
			...theme.applyStyles('dark', {
				backgroundColor: '#39393D',
			}),
		},
	}))

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
					<Stack direction="row" spacing={2} sx={{ marginRight: '25px' }}>
						<FlareIcon />
					</Stack>
					<FormControlLabel
						control={<IOSSwitch sx={{ m: 0 }} checked={mode === 'dark'} />}
						onChange={handleToggleTheme}
					/>
					<Stack direction="row">
						<Brightness4Icon />
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
