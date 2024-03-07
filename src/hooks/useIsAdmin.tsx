import { useState, useEffect } from 'react';
import { useTelegram } from '../hooks/useTelegram.tsx';
import apiService from '../api/api.ts';

export const useIsAdmin = () => {
    const { tgUser } = useTelegram();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (!tgUser?.id) return;

        const checkIsAdmin = async () => {
            const response = await apiService.post('user-info', {
                userId: tgUser.id,
            });
            if (response.ok && 'data' in response) {
                setIsAdmin(true);
            }
        };

        checkIsAdmin().catch(console.error);
    }, [tgUser]);

    return isAdmin;
};
