import { Skeleton, Stack } from '@mui/material';

const SkeletonUserPage = () => {
    return (
        <Stack spacing={2}>
            <Skeleton
                animation="wave"
                variant="text"
                sx={{ fontSize: '1rem' }}
            />

            <Skeleton
                animation="wave"
                variant="rounded"
                width={'100%'}
                height={60}
            />
            <Skeleton
                animation="wave"
                variant="rounded"
                width={'100%'}
                height={60}
            />
            <Stack
                spacing={2}
                direction="row"
                sx={{ justifyContent: 'space-between' }}
            >
                <Skeleton
                    animation="wave"
                    variant="rounded"
                    width={150}
                    height={30}
                />
                <Skeleton
                    animation="wave"
                    variant="rounded"
                    width={150}
                    height={30}
                />
            </Stack>
            <Skeleton
                animation="wave"
                variant="text"
                sx={{ fontSize: '2rem' }}
            />
            <Skeleton
                animation="wave"
                variant="text"
                sx={{ fontSize: '2rem' }}
            />
            <Skeleton
                animation="wave"
                variant="rounded"
                width={'100%'}
                height={60}
            />
        </Stack>
    );
};

export default SkeletonUserPage;
