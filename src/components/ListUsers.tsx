import { FC } from 'react';
import { IUser } from '../constants/index.ts';
import { IconButton, List, ListItem, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface ListUsersProps {
    users: IUser[];
    onRemoveUser: (userId: number) => void;
}

export const ListUsers: FC<ListUsersProps> = ({ users, onRemoveUser }) => {
    return (
        <div className="userlist">
            {users.length > 0 && <h3>Відскановані абонементи</h3>}
            <List className="list">
                {users.length > 0 &&
                    users.map(({ userId: id, fullName, username }) => (
                        <ListItem key={id}>
                            <Typography variant="body1" component="span">
                                {fullName} {username && `(@${username})`}
                            </Typography>

                            <IconButton
                                className="remove"
                                color="error"
                                aria-label="delete"
                                onClick={() => onRemoveUser(id)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    ))}
            </List>
        </div>
    );
};
