import { FC, useCallback, useEffect, useState } from 'react';
import apiService from '../api/api.ts';
import { Navigate } from 'react-router-dom';
import { routes } from './routes.ts';
import { useTelegram } from '../hooks/useTelegram.tsx';

interface AuthCheckerProps {
    children: React.ReactNode;
}

const checkUser = async (userId: number): Promise<boolean> => {
    try {
        const response = await apiService.post('user-info', { userId });
        if (response.ok) return response.ok;
        return false;
    } catch (error) {
        console.error('Error checking user:', error);
        return false;
    }
};

const AuthChecker: FC<AuthCheckerProps> = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const { tgUser } = useTelegram();

    const fetchData = useCallback(async () => {
        if (!tgUser?.id) return;
        const isAdminUser = await checkUser(tgUser?.id || 0);
        setIsAdmin(isAdminUser);
    }, [tgUser?.id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (!isAdmin) {
        return <Navigate to={routes.notFound} />;
    }

    return children;
};

export default AuthChecker;
