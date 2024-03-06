import { FC, useEffect } from 'react';
import { IUser } from '../constants/index.ts';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import UserForm from '../components/Form/User.form.tsx';
import { Box, Button, Link, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useQuery } from 'react-query';
import { fetchUserData } from '../api/services/get.api.ts';

const UserPage: FC = () => {
    const navigate = useNavigate();
    const params = useParams();

    const { data: user, error } = useQuery<IUser | null, Error>(
        ['user-info', params.id],
        () => fetchUserData(Number(params.id)),
        {
            enabled: !!params.id,
        }
    );

    useEffect(() => {
        error && toast.error(error.message);
    }, [error]);

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="user-info">
            <Box>
                <Button
                    LinkComponent={Link}
                    size="small"
                    onClick={handleBack}
                    sx={{ minWidth: 'initial', mr: '1rem' }}
                >
                    <ArrowBackIcon />
                </Button>
                <Typography variant="caption">
                    {user && user?.username
                        ? `@${user.username} | ${user.userId}`
                        : user?.userId}
                </Typography>
            </Box>
            {user && <UserForm userInfo={user} />}
        </div>
    );
};

export default UserPage;
