import { FC, useEffect, useState } from 'react';
import '@style/users.scss';
import { Link } from 'react-router-dom';
import { routes } from '../../router/routes.ts';
import { debounce } from 'lodash';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import {
    Button,
    List,
    ListItem,
    TextField,
    IconButton,
    Collapse,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Box,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchAllUsers } from '../../api/services/get.api.ts';
import { toast } from 'react-toastify';
import SkeletonUsersPage from '../../components/Skeleton/SkeletonUsersPage.tsx';
import { useTitle } from '@/hooks/useTitle.tsx';
import { PAGE_TITLE } from '@/constants/index.ts';
import { useTelegram } from '@/hooks/useTelegram.tsx';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import { SelectChangeEvent } from '@mui/material/Select';
import { useForm, Controller } from 'react-hook-form';

const UsersPage: FC = () => {
    const { tgUser } = useTelegram();
    const { control, watch, setValue } = useForm({
        defaultValues: {
            searchTerm: '',
            filterStatus: '',
            filterRole: 'user',
            filterSubscriptionEndDate: null,
            filterNotificationStatus: '',
        },
    });
    const [showFilters, setShowFilters] = useState<boolean>(false);

    const {
        data: userList,
        error,
        isLoading,
    } = useQuery({
        queryKey: ['users', 'all', tgUser?.id],
        queryFn: () => fetchAllUsers({ adminId: tgUser?.id || 0 }),
        staleTime: 1000 * 5,
    });

    useEffect(() => {
        error && toast.error(error.message);
    }, [error]);

    const { setTitle } = useTitle();

    useEffect(() => {
        setTitle(PAGE_TITLE.users);
    }, [setTitle]);

    const debouncedSearch = debounce((value: string) => {
        setValue('searchTerm', value, { shouldDirty: true });
    }, 300);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        debouncedSearch(event.target.value);
    };

    const handleFilterToggle = () => {
        setShowFilters((prev) => !prev);
    };

    const filteredUsers = userList?.filter(
        ({ fullName, role, subscription, notifications }) => {
            const searchTerm = watch('searchTerm').toLowerCase();
            const filterStatus = watch('filterStatus');
            const filterRole = watch('filterRole');
            const filterNotificationStatus = watch('filterNotificationStatus');
            const filterSubscriptionEndDate = watch(
                'filterSubscriptionEndDate'
            );

            return (
                fullName.toLowerCase().includes(searchTerm) &&
                (filterStatus
                    ? filterStatus === 'active'
                        ? subscription?.active
                        : !subscription?.active
                    : true) &&
                (filterRole ? role === filterRole : true) &&
                (filterNotificationStatus
                    ? filterNotificationStatus === 'enabled'
                        ? notifications
                        : !notifications
                    : true) &&
                (filterSubscriptionEndDate
                    ? moment(
                          subscription?.dateExpired &&
                              moment(subscription?.dateExpired)
                      ).isSame(filterSubscriptionEndDate, 'day')
                    : true)
            );
        }
    );

    return (
        <div className="users">
            <div
                className="users__controls"
                style={{ display: 'flex', gap: '10px' }}
            >
                <TextField
                    label="Пошук по імені"
                    variant="filled"
                    onChange={handleSearchChange}
                    style={{ flex: 0.9 }}
                />
                <IconButton onClick={handleFilterToggle} sx={{ flex: 0.1 }}>
                    {showFilters ? (
                        <FilterListOffIcon color="warning" />
                    ) : (
                        <FilterListIcon color="primary" />
                    )}
                </IconButton>
            </div>
            <Collapse
                in={showFilters}
                className="users__filters"
                sx={{ marginTop: '20px' }}
            >
                <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <Controller
                        name="filterStatus"
                        control={control}
                        render={({ field }) => (
                            <FormControl
                                fullWidth
                                variant="filled"
                                sx={{ flex: 0.5 }}
                            >
                                <InputLabel id="filter-status-label">
                                    Статус абонементу
                                </InputLabel>
                                <Select
                                    {...field}
                                    labelId="filter-status-label"
                                    label="Статус абонементу"
                                    onChange={(event: SelectChangeEvent) => {
                                        field.onChange(event);
                                    }}
                                >
                                    <MenuItem value="">Всі</MenuItem>
                                    <MenuItem value="active">Активний</MenuItem>
                                    <MenuItem value="inactive">
                                        Неактивний
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    />
                    <Controller
                        name="filterRole"
                        control={control}
                        render={({ field }) => (
                            <FormControl
                                fullWidth
                                variant="filled"
                                sx={{ flex: 0.5 }}
                            >
                                <InputLabel id="filter-role-label">
                                    Роль
                                </InputLabel>
                                <Select
                                    {...field}
                                    labelId="filter-role-label"
                                    label="Роль"
                                    onChange={(event: SelectChangeEvent) => {
                                        field.onChange(event);
                                    }}
                                >
                                    <MenuItem value="">Всі</MenuItem>
                                    <MenuItem value="user">Учень</MenuItem>
                                    <MenuItem value="guest">Гість</MenuItem>
                                    <MenuItem value="inactive">
                                        Неактивний
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    />
                </Box>
                <Box
                    sx={{
                        marginTop: '10px',
                    }}
                >
                    <Controller
                        name="filterNotificationStatus"
                        control={control}
                        render={({ field }) => (
                            <FormControl
                                fullWidth
                                variant="filled"
                                sx={{ flex: 0.5 }}
                            >
                                <InputLabel id="filter-notification-label">
                                    Статус сповіщень
                                </InputLabel>
                                <Select
                                    {...field}
                                    labelId="filter-notification-label"
                                    label="Статус сповіщень"
                                    onChange={(event: SelectChangeEvent) => {
                                        field.onChange(event);
                                    }}
                                >
                                    <MenuItem value="">Всі</MenuItem>
                                    <MenuItem value="enabled">
                                        Увімкнені
                                    </MenuItem>
                                    <MenuItem value="disabled">
                                        Вимкнуті
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    />
                </Box>
                <Box sx={{ marginTop: '10px' }}>
                    <Controller
                        name="filterSubscriptionEndDate"
                        control={control}
                        render={({ field }) => (
                            <LocalizationProvider
                                dateAdapter={AdapterMoment}
                                adapterLocale="uk"
                            >
                                <DatePicker
                                    {...field}
                                    label="Дата закінчення абонементу"
                                    value={field.value}
                                    onChange={(date) => field.onChange(date)}
                                    minDate={moment()}
                                    maxDate={moment().add(3, 'months')}
                                    slotProps={{
                                        textField: {
                                            variant: 'filled',
                                            fullWidth: true,
                                        },
                                        field: { clearable: true },
                                    }}
                                    className="users__filter"
                                    sx={{ flex: 0.5 }}
                                />
                            </LocalizationProvider>
                        )}
                    />
                </Box>
            </Collapse>
            {isLoading ? (
                <SkeletonUsersPage />
            ) : (
                <List className="users__list">
                    {filteredUsers &&
                        filteredUsers.map(({ userId, fullName }) => (
                            <ListItem key={userId} className="users__list-item">
                                <Button fullWidth>
                                    <Link
                                        className="users__link link"
                                        to={routes.users.user(userId)}
                                    >
                                        <span>{fullName}</span>
                                        <EditIcon fontSize="small" />
                                    </Link>
                                </Button>
                            </ListItem>
                        ))}
                </List>
            )}
        </div>
    );
};

export default UsersPage;
