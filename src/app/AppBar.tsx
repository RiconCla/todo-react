import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Toolbar, Typography, AppBar, Avatar, Tooltip, Stack, styled, type SwitchProps, Switch } from '@mui/material'
import { useColorScheme } from '@mui/material/styles'
import FormControlLabel from '@mui/material/FormControlLabel'
import FlareIcon from '@mui/icons-material/Flare'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import { type SyntheticEvent } from 'react'
import { useUserStore } from '../entities/User/model/provider/UserContex.tsx'

const ButtonAppBar = () => {
	const { mode, setMode } = useColorScheme()
	const { user, setUser } = useUserStore()

	if (!mode) {
		return null
	}

	const logOut = () => {
		localStorage.removeItem('access_token')
		setUser(undefined)
	}

	const handleToggleTheme = (_event: SyntheticEvent<Element, Event>, checked: boolean) => {
		setMode(checked ? 'dark' : 'light')
	}

	const stringToColor = (string: string) => {
		let hash = 0
		let i: number

		for (i = 0; i < string.length; i += 1) {
			hash = string.charCodeAt(i) + ((hash << 5) - hash)
		}
		let color = '#'
		for (i = 0; i < 3; i += 1) {
			const value = (hash >> (i * 8)) & 0xff
			color += `00${value.toString(16)}`.slice(-2)
		}
		return color
	}

	const stringAvatar = (name: string) => ({
		sx: {
			bgcolor: stringToColor(name),
		},
		children: `${name.split(' ')[0][0]}${name.split(' ')[1]?.[0] || ''}`.toUpperCase(),
	})

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
						{user && (
							<Typography variant="h6" component="div">
								Todos
							</Typography>
						)}
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
						label={undefined}
					/>
					<Stack direction="row">
						<Brightness4Icon style={{ marginRight: '10px' }} />
					</Stack>
					{user ? (
						<Stack direction="row">
							<Button sx={{ marginRight: '10px' }} color="inherit" onClick={logOut}>
								Logout
							</Button>
							<Tooltip title="User">
								<Avatar src={''} alt={user.username} {...stringAvatar(user.username)} />
							</Tooltip>
						</Stack>
					) : (
						<Button color="inherit">Login</Button>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default ButtonAppBar
