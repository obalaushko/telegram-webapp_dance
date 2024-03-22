import { PAGE_TITLE } from '@/constants/index.ts';
import { useTitle } from '@/hooks/useTitle.tsx';
import { Box } from '@mui/material';
import React, { useEffect } from 'react';

const NotFoundPage: React.FC = () => {
    const { setTitle } = useTitle();

    useEffect(() => {
        setTitle(PAGE_TITLE.notFound);
    }, [setTitle]);
    return (
        <div className="container">
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <h1>У доступі відмовлено</h1>
            </Box>
        </div>
    );
};

export default NotFoundPage;
