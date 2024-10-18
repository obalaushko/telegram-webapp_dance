import { FC, useEffect } from 'react';
import '@style/users.scss';
import { Link } from 'react-router-dom';
import { routes } from '../../router/routes.ts';

import EditIcon from '@mui/icons-material/Edit';
import { Button, List, ListItem } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchAllUsers } from '../../api/services/get.api.ts';
import { toast } from 'react-toastify';
import SkeletonSettingsPage from '../../components/Skeleton/SkeletonSettingsPage.tsx';
import { useTitle } from '@/hooks/useTitle.tsx';
import { PAGE_TITLE } from '@/constants/index.ts';
import { useTelegram } from '@/hooks/useTelegram.tsx';

const UsersPage: FC = () => {
    const { tgUser } = useTelegram();
    const {
        data: userList,
        error,
        isLoading,
    } = useQuery({
        queryKey: ['users', 'all', tgUser?.id],
        queryFn: () => fetchAllUsers({ adminId: tgUser?.id || 0 }),
        staleTime: 1000 * 5,
    });

    useEffect(() => {
        error && toast.error(error.message);
    }, [error]);

    const { setTitle } = useTitle();

    useEffect(() => {
        setTitle(PAGE_TITLE.users);
    }, [setTitle]);

    return (
        <div className="users">
            {isLoading ? (
                <SkeletonSettingsPage />
            ) : (
                <List className="users__list">
                    {userList &&
                        userList.map(({ userId, fullName }) => (
                            <ListItem
                                key={userId}
                                className="users__list-item"
                            >
                                <Button fullWidth>
                                    <Link
                                        className="users__link link"
                                        to={routes.users.user(userId)}
                                    >
                                        <span>{fullName}</span>
                                        <EditIcon fontSize="small" />
                                    </Link>
                                </Button>
                            </ListItem>
                        ))}
                </List>
            )}
        </div>
    );
};

export default UsersPage;
