import React, { useState } from 'react'
import { Box, SwipeableDrawer,  IconButton, Tooltip, Typography, Alert } from '@mui/material/'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import LinkIcon from '@mui/icons-material/Link'
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
                top: { xs: '50%', sm: 'calc(15%)' },
                right: 0,
                width: { xs: '48px', sm: '50px' },
                height: { xs: '48px', sm: `${drawerHeight}px` },
                visibility: open ? 'hidden' : 'visible',
                borderRadius: { xs: '50% 0 0 50%', sm: '16px 0 0 16px' },
                cursor: 'pointer',
                transform: { xs: 'translateY(-50%)', sm: 'none' },
                '&:hover': {
                    backgroundColor: '#ff8f00'
                }
            }}>
            <IconButton sx={{color: '#000000', p: { xs: '4px', sm: '8px' }}}>
                <Box component='span' sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
                    <KeyboardArrowLeftIcon />
                </Box>
                <Box component='span' sx={{ display: { xs: 'inline-flex', sm: 'none' } }}>
                    <LinkIcon />
                </Box>
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
			width: { xs: '280px', sm: '400px' },
			height: { xs: 'auto', sm: `${drawerHeight}px` },
			minHeight: { xs: '200px', sm: 'auto' },
			position: 'absolute',
			top: { xs: '50%', sm: 'calc(15%)' },
			right: { xs: '0', sm: '20px' },
			transform: { xs: 'translateY(-50%)', sm: 'none' },
			transition: 'right 0.3s ease',
			borderRadius: { xs: '16px 0 16px 16px', sm: '16px' },
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
                width: { xs: '40px', sm: '50px' },
                height: { xs: '100%', sm: `${drawerHeight}px` },
                borderRadius: '16px 0 0 16px',
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: '#ff8f00'
                }
            }}>
            <IconButton sx={{color: '#000000', p: { xs: '4px', sm: '8px' }}}>
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
							sx={{ fontSize: '1.1rem', paddingLeft: '8px', color: 'secondary.main' }}>
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
						sx={{ fontSize: '1.1rem', paddingLeft: '8px', wordBreak: 'break-all', color: 'secondary.main' }}>
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
						sx={{ fontSize: '1.1rem', paddingLeft: '8px', color: 'secondary.main' }}>
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
							sx={{ fontSize: '1.1rem', paddingLeft: '8px', color: 'secondary.main' }}>
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
