import { Box } from '@mui/material';
import React from 'react';

const NotFoundPage: React.FC = () => {
    return (
        <div className="container">
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <h1>У доступі відмовлено</h1>
            </Box>
        </div>
    );
};

export default NotFoundPage;
