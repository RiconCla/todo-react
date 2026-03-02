import React, { Component, type PropsWithChildren } from 'react'
import { Container, Typography } from '@mui/material'
import { NavLink } from 'react-router'
import Button from '@mui/material/Button'

class ErrorHandler extends Component<PropsWithChildren, { hasError: boolean }> {
	constructor(props: PropsWithChildren) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError() {
		return { hasError: true }
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.warn('Uncaught error: ', error, errorInfo)
	}

	render() {
		if (this.state.hasError) {
			return (
				<>
					<Typography variant={'h1'}>Something went wrong</Typography>
					<Typography variant={'body1'}>Please try to reload page or contact support</Typography>
					<NavLink to={'/'} onClick={() => this.setState({ hasError: false })}>
						Go back to homepage
					</NavLink>
					<Container sx={{ paddingY: 2, m: 0 }}>
						<Button variant={'contained'} color={'warning'} onClick={() => this.setState({ hasError: false })}>
							Reset Error
						</Button>
					</Container>
				</>
			)
		}
		return this.props.children
	}
}

export default ErrorHandler
