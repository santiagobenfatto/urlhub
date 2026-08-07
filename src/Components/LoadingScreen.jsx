import { Box, CircularProgress } from '@mui/material'

const LoadingScreen = () => (
    <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: 'primary.main'
    }}>
        <CircularProgress color='secondary' />
    </Box>
)

export default LoadingScreen