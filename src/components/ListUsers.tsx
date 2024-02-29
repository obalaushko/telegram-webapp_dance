import { FC } from 'react';
import deleteIcon from '../assets/delete.svg';

interface User {
    id: number;
    fullName: string;
	username?: string;
}

interface ListUsersProps {
    users: User[];
}

export const ListUsers: FC<ListUsersProps> = ({ users }) => {
    return (
        <div className="userlist">
            {users.length > 0  && <h3>Відскановані абонименти</h3>}
            <ul className="list">
                {users.length > 0 &&
                    users.map(({id, fullName, username}) => (
                        <li key={id}>
                            <span>{fullName} {username && `(@${username})`}</span>
                            <button className="button remove">
                                <img src={deleteIcon} alt="Delete icon" />
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    );
};
