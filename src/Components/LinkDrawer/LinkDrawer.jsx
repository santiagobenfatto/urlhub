import React, { useState } from 'react'
import { Box, SwipeableDrawer,  IconButton, Tooltip } from '@mui/material/'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { useSelector } from 'react-redux'



const LinkDrawer = () => {
    const [open, setOpen] = useState(false)
    
    const drawerHeight = 200
    

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen)
  }

  return (
    <>
      <Tooltip title='Click to see your short URL'>
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
            }}>
            <IconButton sx={{color: '#000000'}}>
                  <KeyboardArrowLeftIcon />
            </IconButton>
          </Box>
        </Tooltip>
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
            backgroundColor: '#121212',
            width: '400px',
            height: '200px',
            position: 'absolute',
            top: 'calc(15%)',
            right: '20px',
            transition: 'right 0.3s ease', 
            borderRadius: '16px'
          },
        }}>
      <Tooltip title='Close'>
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
            }}>
            <IconButton sx={{color: '#000000'}}>
                <KeyboardArrowRightIcon />
            </IconButton>
          </Box>
        </Tooltip>
       Holis
      </SwipeableDrawer>
    </>
  )
}

export default LinkDrawer
