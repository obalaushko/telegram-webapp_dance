import { Skeleton, Stack } from '@mui/material';

const SkeletonUsersPage = () => {
    return (
        <Stack spacing={2}>
            {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton
                    key={index}
                    animation="wave"
                    variant="rounded"
                    width={'100%'}
                    height={40}
                />
            ))}
        </Stack>
    );
};

export default SkeletonUsersPage;
