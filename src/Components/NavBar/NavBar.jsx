import React from 'react'
import { AppBar, Toolbar, Button } from '@mui/material'

const NavBar = ({isHome}) => {
    return (
        <AppBar position='static'>
            <Toolbar sx={{ justifyContent: 'flex-end' }}>
            {isHome ? 
            <>
            <Button sx={{
                letterSpacing: '1px',
                mx: 1
            }} href='/login'>
                LOGIN
            </Button>
            <Button sx={{
                letterSpacing: '1px',
                mx: 1
            }} href='/register'>
                REGISTER
            </Button>
            </> 
            :
            <Button sx={{
                letterSpacing: '1px',
                mx: 1
            }} href='/home'>
                HOME
            </Button>
            }
            </Toolbar>
        </AppBar>
    )
}

export default NavBar
