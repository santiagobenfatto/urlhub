import React, { useState } from 'react'
import { Box, SwipeableDrawer,  IconButton } from '@mui/material/'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { grey } from '@mui/material/colors'





const LinkDrawer = () => {
    const [open, setOpen] = useState(false)
    
    const drawerHeight = 200
    

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen)
  }

  return (
    <>
        <Box
            onClick={toggleDrawer(true)}
            sx={{
                overflow: 'hidden',
                backgroundColor: '#ffb300',
                position: 'absolute',
                zIndex: 1201,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                top: 'calc(15%)',
                right: 0,
                width: '50px',
                height: `${drawerHeight}px`,
                visibility: open ? 'hidden' : 'visible',
                borderRadius: '16px 0 0 16px',
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: '#ff8f00'
                }
            }}
        >   <IconButton sx={{color: '#000000'}}>
                <KeyboardArrowLeftIcon />
            </IconButton>
        </Box>
      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            backgroundColor: grey[900],
            width: '400px',
            height: '200px',
            position: 'absolute',
            top: 'calc(15%)',
            right: '20px',
            transition: 'right 0.3s ease', 
            borderRadius: '16px'
          },
        }}
      >
        <Box
            onClick={toggleDrawer(false)}
            sx={{
                overflow: 'hidden',
                backgroundColor: '#ffb300',
                position: 'absolute',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                left: '0',
                width: '50px',
                height: `${drawerHeight}px`,
                borderRadius: '16px 0 0 16px',
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: '#ff8f00'
                }
            }}
        >   <IconButton sx={{color: '#000000'}}>
                <KeyboardArrowRightIcon />
            </IconButton>
        </Box>
       Holis
      </SwipeableDrawer>
    </>
  )
}

export default LinkDrawer
