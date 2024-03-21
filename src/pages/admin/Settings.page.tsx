import { FC, useEffect } from 'react';
import '@style/settings.scss';
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

const SettingsPage: FC = () => {
    const {
        data: userList,
        error,
        isLoading,
    } = useQuery({
        queryKey: ['users', 'all'],
        queryFn: () => fetchAllUsers(),
        staleTime: 1000 * 5,
    });

    useEffect(() => {
        error && toast.error(error.message);
    }, [error]);

    const { setTitle } = useTitle();

    useEffect(() => {
        setTitle(PAGE_TITLE.settings);
    }, [setTitle]);

    return (
        <div className="settings">
            {isLoading ? (
                <SkeletonSettingsPage />
            ) : (
                <List className="settings__list">
                    {userList &&
                        userList.map(({ userId, fullName }) => (
                            <ListItem
                                key={userId}
                                className="settings__list-item"
                            >
                                <Button fullWidth>
                                    <Link
                                        className="settings__link link"
                                        to={routes.settings.user(userId)}
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

export default SettingsPage;
