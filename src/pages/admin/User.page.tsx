import { FC, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import UserForm from '../../components/Form/User.form.tsx';
import { Box, Button, Link, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { fetchUserData } from '../../api/services/get.api.ts';
import { useQuery } from '@tanstack/react-query';
import SkeletonUserPage from '../../components/Skeleton/SkeletonUserPage.tsx';
import { useTitle } from '@/hooks/useTitle.tsx';
import { PAGE_TITLE } from '@/constants/index.ts';
import { routes } from '@/router/routes.ts';

const UserPage: FC = () => {
    const navigate = useNavigate();
    const params = useParams();

    const {
        data: user,
        error,
        isLoading,
    } = useQuery({
        queryKey: ['user-info', Number(params.id)],
        queryFn: () => fetchUserData(Number(params.id)),
        staleTime: 1000 * 3,
        enabled: !!params.id,
    });

    useEffect(() => {
        error && toast.error(error.message);
    }, [error]);

    const handleBack = () => {
        navigate(routes.settings.root);
    };

    const { setTitle } = useTitle();

    useEffect(() => {
        params.id && setTitle(PAGE_TITLE.user(params.id));
    }, [setTitle, params.id]);

    return (
        <div className="user-info">
            {isLoading ? (
                <SkeletonUserPage />
            ) : (
                <>
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
                </>
            )}
        </div>
    );
};

export default UserPage;
