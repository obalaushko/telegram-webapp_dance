import { Box, CircularProgress } from '@mui/material';

const LoadingPage = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                height: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <CircularProgress />
        </Box>
    );
};

export default LoadingPage;
