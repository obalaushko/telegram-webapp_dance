import React, { useEffect } from 'react';
import '@style/history.scss';
import { useTitle } from '@/hooks/useTitle.tsx';
import { PAGE_TITLE } from '@/constants/index.ts';

const HistoryPage: React.FC = () => {
    const { setTitle } = useTitle();

    useEffect(() => {
        setTitle(PAGE_TITLE.history);
    }, [setTitle]);

    return (
        <div className="history">
            <h1>History Page</h1>
        </div>
    );
};

export default HistoryPage;
