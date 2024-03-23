import { fetchHistoryByUserId } from '@/api/services/get.api.ts';
import SkeletonHistoryPage from '@/components/Skeleton/SkeletonHistoryPage.tsx';
import { PAGE_TITLE, actionsHistory } from '@/constants/index.ts';
import { useTelegram } from '@/hooks/useTelegram.tsx';
import { useTitle } from '@/hooks/useTitle.tsx';
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
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PaginationDefault from '@/components/View/Pagination/PaginationDefault.tsx';
import ModalCustom from '@/components/View/Modal/Modal.component.tsx';
import { HistoryItem } from '../admin/HistoryPage/types.ts';
import moment from 'moment';
import '@style/history.scss';

interface HistoryUserProps {
    // Define the props for your component here
}

const HistoryUser: React.FC<HistoryUserProps> = () => {
    const { setTitle } = useTitle();
    const { tgUser } = useTelegram();

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

    const handlePageChange = (
        _event: React.ChangeEvent<unknown>,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const convertToDate = (date: string) => {
        return moment(date).format('DD.MM.YYYY');
    };

    useEffect(() => {
        setTitle(PAGE_TITLE.history);
    }, [setTitle]);

    const {
        data: history,
        error,
        isLoading,
    } = useQuery({
        queryKey: ['history', tgUser?.id],
        queryFn: () => fetchHistoryByUserId({ userId: tgUser?.id }),
        enabled: !!tgUser?.id,
    });

    useEffect(() => {
        error && toast.error(error.message);
    }, [error]);

    useEffect(() => {
        if (history) {
            setTotalPages(history.totalPage);
        }
    }, [history]);

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
                                                                        <u>
                                                                            {
                                                                                item.action
                                                                            }
                                                                        </u>
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

export default HistoryUser;
