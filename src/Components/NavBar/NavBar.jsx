import React from 'react'
import { AppBar, Toolbar, Button } from '@mui/material'

const Navbar = () => {
    return (
        <AppBar position='static'>
            <Toolbar sx={{ justifyContent: 'flex-end' }}>
            <Button sx={{
                mx: 1
            }} href='/login'>
                LOGIN
            </Button>
            <Button sx={{
                mx: 1
            }} href='/register'>
                REGISTER
            </Button>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
