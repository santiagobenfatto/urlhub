import React, { useState } from 'react'
import { Box, SwipeableDrawer,  IconButton, Tooltip, Typography, Alert } from '@mui/material/'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { toast } from 'react-toastify'
import { useLink } from '../../Context/useLink.jsx'
import { getPublicLink } from '../../Utils/utils.js'

const LinkDrawer = () => {
    const [open, setOpen] = useState(false)

    const drawerHeight = 280

	const { urlData: contextData } = useLink()
	const urlData = contextData.shortLink ? contextData : (getPublicLink()[0] || contextData)

	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen)
	}

	const hasLink = urlData.shortLink !== ''

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
        anchor='right'
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
			boxSizing: 'border-box',
			backgroundColor: '#121212',
			width: '400px',
			height: `${drawerHeight}px`,
			position: 'absolute',
			top: 'calc(15%)',
			right: '20px',
			transition: 'right 0.3s ease',
			borderRadius: '16px',
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center'
          },
        }}>
      <Tooltip title='Close'>
        <Box
            onClick={toggleDrawer(false)}
            sx={{
                overflow: 'hidden',
                backgroundColor: '#ffb300',
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
       <Box
	   sx={{
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
		width: '100%',
		p: '16px 12px 24px 12px',
		gap: '12px',
		overflow: 'auto'
	   }}>
		{!hasLink ? (
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
				<Typography variant='body1' color='secondary.main' sx={{ fontSize: '1rem' }}>
					No links yet
				</Typography>
			</Box>
		) : (
			<>
				{urlData.title && (
					<Box sx={{display: 'flex', flexDirection: 'column'}}>
						<Typography
							variant='body1'
							sx={{ fontSize: '.9rem', color: 'rgba(255, 255, 255, 0.8)'}}>
								Title:
						</Typography>
						<Typography
							variant='body1'
							sx={{ fontSize: '1.1rem', paddingLeft: '8px' }}>
							{urlData.title}
						</Typography>
					</Box>
				)}
				<Box sx={{display: 'flex', flexDirection: 'column'}}>
					<Typography
						variant='body1'
						sx={{ fontSize: '.9rem', color: 'rgba(255, 255, 255, 0.8)'}}>
							Big Link:
					</Typography>
					<Typography
						variant='body1'
						sx={{ fontSize: '1.1rem', paddingLeft: '8px', wordBreak: 'break-all' }}>
						{urlData.bigLink}
					</Typography>
				</Box>
				<Box sx={{display: 'flex', flexDirection: 'column'}}>
					<Typography
					variant='body1'
					sx={{ fontSize: '.9rem', color: 'rgba(255, 255, 255, 0.8)'}}>
						Short Link:
					</Typography>
					<Typography
						variant='body1'
						sx={{ fontSize: '1.1rem', paddingLeft: '8px' }}>
						{urlData.shortLink}
						<Tooltip title='Copy'>
							<IconButton
								aria-label='Copy Short URL'
								onClick={() => {
									navigator.clipboard.writeText(urlData.shortLink)
										.then(() => {
											toast.success('Short link copied to clipboard!', { theme: 'dark' })
										})
										.catch(() => {
											toast.error('An error occurred. Please try again.', { theme: 'dark' })
										})
								}}
								color='secondary'
								sx={{
									p: 0,
									':hover': {
										filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 1))'
									}
								}}
							>
								<ContentCopyIcon />
							</IconButton>
						</Tooltip>
					</Typography>
				</Box>
				{urlData.alias && (
					<Box sx={{display: 'flex', flexDirection: 'column'}}>
						<Typography
							variant='body1'
							sx={{ fontSize: '.9rem', color: 'rgba(255, 255, 255, 0.8)'}}>
								Alias:
						</Typography>
						<Typography
							variant='body1'
							sx={{ fontSize: '1.1rem', paddingLeft: '8px' }}>
							{urlData.alias}
						</Typography>
					</Box>
				)}
				<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<WarningAmberIcon sx={{ color: 'rgba(255, 193, 7, 0.8)' }} />
						<Typography variant='body2' sx={{ color: 'rgba(255, 193, 7, 0.8)', ml: 1 }}>
							To customize your link, you need to sign up.
						</Typography>
					</Box>
				</Box>
			</>
		)}
      </Box>
      </SwipeableDrawer>
    </>
  )
}

export default LinkDrawer
