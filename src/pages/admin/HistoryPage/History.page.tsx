import React, { useEffect, useState } from 'react';
import '@style/history.scss';
import { useTitle } from '@/hooks/useTitle.tsx';
import { PAGE_TITLE, actionsHistory } from '@/constants/index.ts';
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
import ModalCustom from '@/components/View/Modal/Modal.component.tsx';
import { HistoryItem } from './types.ts';

const HistoryPage: React.FC = () => {
    const { setTitle } = useTitle();

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalInfo, setModalInfo] = useState<HistoryItem | null>(null);
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleOpenModal = (itemInfo: HistoryItem) => {
        setModalInfo(itemInfo);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleChange =
        (panel: string) =>
        (_event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    useEffect(() => {
        setTitle(PAGE_TITLE.history);
    }, [setTitle]);

    const {
        data: history,
        error,
        isLoading,
    } = useQuery({
        queryKey: ['history', 'all', page],
        queryFn: () => fetchAllHistory({ page, pageSize: 10 }),
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

    const convertToDate = (date: string) => {
        return moment(date).format('DD.MM.YYYY');
    };

    return (
        <Box className="history">
            {isLoading ? (
                <SkeletonHistoryPage />
            ) : (
                <>
                    {history?.list.length === 0 ? (
                        <Typography variant="h6" color="primary">
                            Історія порожня
                        </Typography>
                    ) : (
                        <Box className="history__container">
                            {history?.list.map((day) => (
                                <Accordion
                                    expanded={expanded === day.date.toString()}
                                    onChange={handleChange(day.date.toString())}
                                    key={day.date}
                                    className="history__accordion"
                                >
                                    <AccordionSummary
                                        expandIcon={
                                            <ExpandMoreIcon color="primary" />
                                        }
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        className="history__accordion-summary"
                                    >
                                        <Typography
                                            variant="h6"
                                            color="primary"
                                        >
                                            {day.date}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <TableContainer className="history__table-container">
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>
                                                            User
                                                        </TableCell>
                                                        <TableCell>
                                                            Action
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody className="history__table-body">
                                                    {day.usersInfo.map((info) =>
                                                        info.historyItems.map(
                                                            (item) => (
                                                                <TableRow
                                                                    key={
                                                                        item.timestamp
                                                                    }
                                                                    sx={{
                                                                        cursor: 'pointer',
                                                                    }}
                                                                    onClick={() =>
                                                                        handleOpenModal(
                                                                            item
                                                                        )
                                                                    }
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
                                                                </TableRow>
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
                                className="history__pagination"
                                page={page}
                                handlePageChange={handlePageChange}
                                totalPages={totalPages}
                            />
                            <ModalCustom
                                open={isModalOpen}
                                onClose={handleCloseModal}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{ mb: '1rem' }}
                                    color="primary"
                                >
                                    {modalInfo?.action}
                                </Typography>
                                {modalInfo?.newValue && (
                                    <Typography variant="body1">
                                        <span>
                                            Старе значення:{' '}
                                            {modalInfo.action ===
                                            actionsHistory.updateDateExpired
                                                ? convertToDate(
                                                      modalInfo.oldValue
                                                  )
                                                : modalInfo.oldValue.toString()}
                                        </span>
                                        <br />
                                        <span>
                                            Нове значення:{' '}
                                            {modalInfo.action ===
                                            actionsHistory.updateDateExpired
                                                ? convertToDate(
                                                      modalInfo.newValue
                                                  )
                                                : modalInfo.newValue.toString()}
                                        </span>
                                    </Typography>
                                )}
                                <Typography variant="body1">
                                    Час зміни:{' '}
                                    {moment(modalInfo?.timestamp).format(
                                        'DD.MM.YYYY HH:mm'
                                    )}
                                </Typography>
                            </ModalCustom>
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
};

export default HistoryPage;
