import { FC, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { routes } from './routes.ts';
import { useTelegram } from '../hooks/useTelegram.tsx';
import { useQuery } from '@tanstack/react-query';
import { checkUser } from '../api/services/post.api.ts';
import { toast } from 'react-toastify';

interface AuthCheckerProps {
    children: React.ReactNode;
}

const AuthChecker: FC<AuthCheckerProps> = ({ children }) => {
    const { tgUser } = useTelegram();

    const {
        data: admin,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['admin', tgUser?.id],
        queryFn: () => checkUser(tgUser?.id || 0),
        enabled: !!tgUser?.id,
    });

    useEffect(() => {
        error && toast.error(error.message);
    }, [error]);

    if (!isLoading && !admin) {
        return <Navigate to={routes.notFound} />;
    }

    return children;
};

export default AuthChecker;
