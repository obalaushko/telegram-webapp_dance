import { FC } from 'react';
import deleteIcon from '../assets/delete.svg';

export interface User {
    userId: number;
    fullName: string;
    username?: string;
}

interface ListUsersProps {
    users: User[];
    onRemoveUser: (userId: number) => void;
}

export const ListUsers: FC<ListUsersProps> = ({ users, onRemoveUser }) => {
    return (
        <div className="userlist">
            {users.length > 0 && <h3>Відскановані абонименти</h3>}
            <ul className="list">
                {users.length > 0 &&
                    users.map(({ userId: id, fullName, username }) => (
                        <li key={id}>
                            <span>
                                {fullName} {username && `(@${username})`}
                            </span>
                            <button
                                className="button remove"
                                onClick={() => onRemoveUser(id)}
                            >
                                <img src={deleteIcon} alt="Delete icon" />
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    );
};
