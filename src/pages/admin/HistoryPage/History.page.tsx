import React, { useEffect, useState } from 'react';
import '@style/history.scss';
import { useTitle } from '@/hooks/useTitle.tsx';
import { PAGE_TITLE } from '@/constants/index.ts';
import { useQuery } from '@tanstack/react-query';
import { fetchAllHistory } from '@/api/services/get.api.ts';
import { toast } from 'react-toastify';
import SkeletonHistoryPage from '@/components/Skeleton/SkeletonHistoryPage.tsx';
import PaginationDefault from '@/components/View/Pagination/PaginationDefault.tsx';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Collapse,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import moment from 'moment';

import '@style/history.scss';

const HistoryPage: React.FC = () => {
    const { setTitle } = useTitle();

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState<string | null>(null);

    useEffect(() => {
        setTitle(PAGE_TITLE.history);
    }, [setTitle]);

    const {
        data: history,
        error,
        isLoading,
    } = useQuery({
        queryKey: ['history', 'all', page],
        queryFn: () => fetchAllHistory({ page }),
        staleTime: 1000 * 5,
    });

    const handlePageChange = (
        _event: React.ChangeEvent<unknown>,
        newPage: number
    ) => {
        setPage(newPage);
    };

    useEffect(() => {
        if (history) {
            setTotalPages(history.totalPage);
        }
    }, [history]);

    useEffect(() => {
        error && toast.error(error.message);
    }, [error]);

    return (
        <Box className="history">
            {isLoading ? (
                <SkeletonHistoryPage />
            ) : (
                <Box className="history__container">
                    {history?.list.map((day) => (
                        <Accordion
                            key={day.date}
                            className="history__accordion"
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon color="primary" />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                className="history__accordion-summary"
                            >
                                <Typography variant="h6" color="primary">
                                    {day.date}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <TableContainer className="history__table-container">
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>User</TableCell>
                                                <TableCell>Action</TableCell>
                                                <TableCell>Time</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody className="history__table-body">
                                            {day.usersInfo.map((info) =>
                                                info.historyItems.map(
                                                    (item) => (
                                                        <>
                                                            <TableRow
                                                                key={
                                                                    item.timestamp
                                                                }
                                                                sx={{
                                                                    cursor: 'pointer',
                                                                }}
                                                                className={
                                                                    open &&
                                                                    selectedRow ===
                                                                        item.timestamp
                                                                        ? 'open'
                                                                        : ''
                                                                }
                                                                onClick={() => {
                                                                    setSelectedRow(
                                                                        item.timestamp
                                                                    );
                                                                    setOpen(
                                                                        !open
                                                                    );
                                                                }}
                                                            >
                                                                <TableCell>
                                                                    {
                                                                        info
                                                                            .user
                                                                            .fullName
                                                                    }
                                                                </TableCell>
                                                                <TableCell>
                                                                    {
                                                                        item.action
                                                                    }
                                                                </TableCell>
                                                                <TableCell>
                                                                    {moment(
                                                                        item.timestamp
                                                                    ).format(
                                                                        'DD.MM.YYYY HH:mm'
                                                                    )}
                                                                </TableCell>
                                                            </TableRow>
                                                            <Collapse
                                                                in={
                                                                    open &&
                                                                    selectedRow ===
                                                                        item.timestamp
                                                                }
                                                                timeout="auto"
                                                                unmountOnExit
                                                            >
                                                                <Box
                                                                    margin={1}
                                                                    className="history__additional-info"
                                                                >
                                                                    <Typography
                                                                        variant="body1"
                                                                        gutterBottom
                                                                        component="div"
                                                                    >
                                                                        <span>
                                                                            {
                                                                                item.action
                                                                            }
                                                                        </span>
                                                                    </Typography>
                                                                    {item.newValue && (
                                                                        <Typography variant="body1">
                                                                            {
                                                                                item.oldValue
                                                                            }
                                                                            {
                                                                                ' -> '
                                                                            }
                                                                            {
                                                                                item.newValue
                                                                            }
                                                                        </Typography>
                                                                    )}
                                                                </Box>
                                                            </Collapse>
                                                        </>
                                                    )
                                                )
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                    <PaginationDefault
                        page={page}
                        handlePageChange={handlePageChange}
                        totalPages={totalPages}
                    />
                </Box>
            )}
        </Box>
    );
};

export default HistoryPage;

{
    /* <TableContainer>
    <Table>
        <TableHead>
            <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Time</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {history?.list.map((day) =>
                day.usersInfo.map((info) =>
                    info.historyItems.map((item) => (
                        <TableRow key={item.timestamp}>
                            <TableCell>{day.date}</TableCell>
                            <TableCell>{info.user.fullName}</TableCell>
                            <TableCell>{item.action}</TableCell>
                            <TableCell>{item.timestamp}</TableCell>
                        </TableRow>
                    ))
                )
            )}
        </TableBody>
    </Table>
</TableContainer>; */
}
