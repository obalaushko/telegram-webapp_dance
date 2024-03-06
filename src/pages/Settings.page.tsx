import { FC, useCallback, useEffect, useState } from 'react';
import '../style/settings.scss';
import { Link } from 'react-router-dom';
import { routes } from '../router/routes.ts';
import { IUser } from '../constants/index.ts';
import apiService from '../api/api.ts';
import { toast } from 'react-toastify';

import EditIcon from '@mui/icons-material/Edit';
import { IconButton, List, ListItem } from '@mui/material';

const SettingsPage: FC = () => {
    const [userList, setUserList] = useState<IUser[]>([]);
    const fetchUsers = useCallback(async () => {
        const response = await apiService.get('users');

        if (response.ok) {
            setUserList(response.data);
        } else {
            toast.error('Не вдалося завантажити список користувачів');
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return (
        <div className="settings">
            {userList.length > 0 && (
                <List className="settings__list">
                    {userList.map(({ userId: id, fullName }) => (
                        <ListItem key={id} className="settings__list-item">
                            <span>{fullName}</span>
                            <IconButton>
                                <Link
                                    className="settings__link link"
                                    to={routes.settings.user(id)}
                                >
                                    <EditIcon fontSize="small" />
                                </Link>
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
            )}
        </div>
    );
};

export default SettingsPage;
