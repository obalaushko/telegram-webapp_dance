import { FC, useCallback, useEffect, useState } from 'react';
import '../style/settings.scss';
import { Link } from 'react-router-dom';
import { routes } from '../router/routes.ts';
import { User } from '../constants/index.ts';
import apiService from '../api/api.ts';
import { toast } from 'react-toastify';

import editIcon from '../assets/edit.svg';

const SettingsPage: FC = () => {
    const [userList, setUserList] = useState<User[]>([]);
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
                <ul className="settings__list">
                    {userList.map(({ userId: id, fullName, username }) => (
                        <li key={id} className="settings__list-item">
                            <span>
                                {fullName} {username && `(@${username})`}
                            </span>
                                <Link
                                    className="settings__link link"
                                    to={routes.settings.user(id)}
                                >
                                    <img className='settings__icon' src={editIcon} alt="Edit icon" />
                                </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SettingsPage;
