import React from 'react'
import { AppBar, Toolbar, Button } from '@mui/material'

const Navbar = () => {
    return (
        <AppBar position='static'>
            <Toolbar sx={{ justifyContent: 'flex-end' }}>
            <Button color='secondary' href='/login'>
                LOGIN
            </Button>
            <Button color='secondary' href='/register'>
                REGISTER
            </Button>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
