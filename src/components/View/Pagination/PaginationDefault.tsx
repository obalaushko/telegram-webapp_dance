import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface PaginationDefaultProps {
    totalPages: number;
    page: number;
    className?: string;
    handlePageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const PaginationDefault: React.FC<PaginationDefaultProps> = ({
    totalPages,
    page,
    className,
    handlePageChange,
}) => {
    return (
        <Stack spacing={2}>
            <Pagination
                className={className}
                color='primary'
                shape="rounded"
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                renderItem={(item) => (
                    <PaginationItem
                        slots={{
                            previous: ArrowBackIcon,
                            next: ArrowForwardIcon,
                        }}
                        
                        {...item}
                    />
                )}
            />
        </Stack>
    );
};

export default PaginationDefault;
