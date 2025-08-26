import React from 'react'
import { AppBar, Toolbar, Button, Tooltip } from '@mui/material'
import { logout } from '../../Service/logout.service.js'

const NavBar = ({ currentPage }) => {
    const handleLogout = async () => {
    try {
      await logout()
      window.location.href = '/home'
    } catch (err) {
      console.error('Logout failed', err)
    }
  }

    return (
        <AppBar position='static'>
            <Toolbar sx={{ justifyContent: 'flex-end' }}>
            {currentPage === 'home' && (
                <>
                <Tooltip title='Login'>
                    <Button
                        sx={{ letterSpacing: '1px', mx: 1 }}
                        href='/login'
                    >
                        LOGIN
                    </Button>
                </Tooltip>
                <Tooltip title='Register'>
                    <Button
                        sx={{ letterSpacing: '1px', mx: 1 }}
                        href="/register"
                    >
                        REGISTER
                    </Button>
                </Tooltip>
                </>
            )}
            {currentPage === 'register' && (
                <>
                <Tooltip title='Home'>
                    <Button
                        sx={{ letterSpacing: '1px', mx: 1 }}
                        href='/home'
                    >
                        HOME
                    </Button>
                </Tooltip>
                <Button
                    sx={{ letterSpacing: '1px', mx: 1 }}
                    href="/login"
                >
                    LOGIN
                </Button>
                </>
            )}
            {currentPage === 'login' && (
                <>
                <Tooltip title='Home'>
                    <Button
                        sx={{ letterSpacing: '1px', mx: 1 }}
                        href='/home'
                    >
                        HOME
                    </Button>
                </Tooltip>
                <Tooltip title='Register'>
                    <Button
                        sx={{ letterSpacing: '1px', mx: 1 }}
                        href="/register"
                    >
                        REGISTER
                    </Button>
                </Tooltip>
                </>
            )}
            {currentPage === 'dashboard' && (
                <>
                <Tooltip title='Logout'>
                <Button
                    sx={{ letterSpacing: '1px', mx: 1 }}
                    onClick={ () => handleLogout }
                >
                    LOGOUT
                </Button>
                </Tooltip>
                </>
            )}
            </Toolbar>
        </AppBar>
    )
}

export default NavBar
