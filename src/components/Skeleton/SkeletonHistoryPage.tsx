import { Skeleton, Stack } from '@mui/material';

const SkeletonHistoryPage = () => {
    return (
        <Stack spacing={2}>
            {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton
                    key={index}
                    animation="wave"
                    variant="rounded"
                    width={'100%'}
                    height={60}
                />
            ))}
        </Stack>
    );
};

export default SkeletonHistoryPage;
