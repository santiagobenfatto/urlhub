import React from 'react'
import { AppBar, Toolbar, Button } from '@mui/material'

const NavBar = ({ currentPage }) => {
    return (
        <AppBar position="static">
            <Toolbar sx={{ justifyContent: 'flex-end' }}>
                {currentPage === 'home' && (
                    <>
                        <Button
                            sx={{ letterSpacing: '1px', mx: 1 }}
                            href="/login"
                        >
                            LOGIN
                        </Button>
                        <Button
                            sx={{ letterSpacing: '1px', mx: 1 }}
                            href="/register"
                        >
                            REGISTER
                        </Button>
                    </>
                )}
                {currentPage === 'register' && (
                    <>
                        <Button
                            sx={{ letterSpacing: '1px', mx: 1 }}
                            href="/home"
                        >
                            HOME
                        </Button>
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
                        <Button
                            sx={{ letterSpacing: '1px', mx: 1 }}
                            href="/home"
                        >
                            HOME
                        </Button>
                        <Button
                            sx={{ letterSpacing: '1px', mx: 1 }}
                            href="/register"
                        >
                            REGISTER
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default NavBar
