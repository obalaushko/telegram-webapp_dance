import { FC, useCallback } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import {
    Box,
    Button,
    FormControlLabel,
    FormHelperText,
    Slider,
    Switch,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
// import { sectionBgColor, textColor } from '../../theme/theme.ts';

import './userForm.scss';

import moment from 'moment';
import 'moment/locale/uk';
moment.locale('uk');

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserData } from '../../api/services/post.api.ts';
import { toast } from 'react-toastify';
import { IUpdateUser, IUser } from '@/constants/types.ts';
import PaymentReminder from './PaymentNotify.tsx';

type Inputs = {
    fullName: string;
    notifications: boolean;
    totalLessons: number;
    usedLessons: number;
    dateExpired: Date | string;
    active: boolean;
};

type UserFormProps = {
    userInfo: IUser;
};

const UserForm: FC<UserFormProps> = ({ userInfo }) => {
    const { userId, fullName, notifications, subscription } = userInfo;
    const isFreeze = subscription?.freeze.active || false;

    const queryClient = useQueryClient();

    const {
        control,
        watch,
        setValue,
        handleSubmit,
        reset,
        formState: { errors, isDirty },
    } = useForm<Inputs>({
        defaultValues: {
            active: subscription?.active,
            fullName: fullName,
            notifications: notifications,
            totalLessons: subscription?.totalLessons || 8,
            usedLessons: subscription?.usedLessons || 0,
            dateExpired: subscription?.dateExpired
                ? new Date(subscription.dateExpired)
                : undefined,
        },
    });

    /**
     * Updates the value of 'totalLessons' and ensures that 'usedLessons' does not exceed 'totalLessons'.
     *
     * @param totalLessons - The new value for 'totalLessons'.
     * @returns The updated value of 'totalLessons'.
     */
    const onChangeTotalLessons = (totalLessons: number) => {
        setValue('totalLessons', totalLessons, { shouldDirty: true });
        const usedLessons = watch('usedLessons');
        if (usedLessons > totalLessons) {
            setValue('usedLessons', totalLessons);
        }
        return totalLessons;
    };

    /**
     * Handles the change event for the notifications checkbox.
     * @param event - The change event object.
     */
    const onChangeSwitch = (
        event: React.ChangeEvent<HTMLInputElement>,
        fieldName: keyof Inputs
    ) => {
        const value = event.target.checked;
        setValue(fieldName, value, { shouldDirty: true });
    };

    /**
     * Handles the change event for the date input field.
     * Updates the value of the 'dateExpired' field in the form.
     *
     * @param date - The selected date.
     */
    const onChangeDate = (date: moment.Moment | null) => {
        if (date) {
            setValue('dateExpired', date.utc().toISOString(), {
                shouldDirty: true,
            });
        }
    };

    const { mutate } = useMutation({
        mutationFn: updateUserData,
        mutationKey: ['user-info', userId],
        onSuccess: (newUserData) => {
            toast.success('Дані успішно оновлено.');
            queryClient.invalidateQueries(
                {
                    queryKey: ['user-info', userId],
                    refetchType: 'active',
                }
            );

            reset({
                active: newUserData.subscription?.active,
                fullName: newUserData.fullName,
                notifications: newUserData.notifications,
                totalLessons: newUserData.subscription?.totalLessons || 8,
                usedLessons: newUserData.subscription?.usedLessons || 0,
                dateExpired: newUserData.subscription?.dateExpired
                    ? new Date(newUserData.subscription.dateExpired)
                    : undefined,
            });
        },
    });

    const onSubmit: SubmitHandler<Inputs> = useCallback(
        (data) => {
            const preparedData: IUpdateUser = {
                userId: userId,
            };

            control._names.mount.forEach((name: string) => {
                if (control.getFieldState(name as keyof Inputs).isDirty) {
                    preparedData[name] = data[name as keyof Inputs];
                }
            });

            if (Object.keys(preparedData).length > 1) {
                mutate(preparedData);
            }
        },
        [control, userId, mutate]
    );

    return (
        <div className="user-form">
            <PaymentReminder
                disabled={isDirty || watch('active') || isFreeze}
                userId={userId}
                fullName={fullName || ''}
            />
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                autoComplete="off"
            >
                <Controller
                    name="fullName"
                    control={control}
                    rules={{
                        required: "Це поле обов'язкове",
                        minLength: {
                            value: 3,
                            message: 'Мінімальна довжина 3 символа',
                        },
                    }}
                    render={({ field }) => (
                        <>
                            <TextField
                                {...field}
                                variant="filled"
                                color="primary"
                                error={!!errors.fullName?.message}
                                label="Ім'я та Прізвище"
                                margin="normal"
                                required
                                fullWidth
                                aria-describedby="fullname-error-text"
                            />
                            <FormHelperText
                                id="fullname-error-text"
                                error={!!errors.fullName?.message}
                            >
                                {errors.fullName && errors.fullName.message}
                            </FormHelperText>
                        </>
                    )}
                />
                {/* <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                        <FormControl fullWidth variant="filled">
                            <InputLabel id="role-select-label">Роль</InputLabel>
                            <Select
                                {...field}
                                labelId="role-select-label"
                                id="role-select"
                                value={field.value}
                                label="Role"
                                MenuProps={{
                                    PaperProps: {
                                        style: {
                                            backgroundColor: sectionBgColor,
                                            color: textColor,
                                        },
                                    },
                                }}
                            >
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="user">User</MenuItem>
                                <MenuItem value="inactive">Inactive</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                /> */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Controller
                        name="notifications"
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel
                                control={
                                    <Switch
                                        onChange={(event) =>
                                            onChangeSwitch(
                                                event,
                                                'notifications'
                                            )
                                        }
                                        checked={field.value}
                                    />
                                }
                                label="Сповіщення"
                            />
                        )}
                    />
                    <Controller
                        name="active"
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel
                                control={
                                    <Switch
                                        disabled={isFreeze}
                                        onChange={(event) =>
                                            onChangeSwitch(event, 'active')
                                        }
                                        checked={field.value}
                                    />
                                }
                                label="Абонемент"
                            />
                        )}
                    />
                </Box>
                <Box sx={{ padding: '0 10px' }}>
                    {isFreeze && (
                        <Typography
                            variant="body1"
                            sx={{ color: (theme) => theme.palette.error.main }}
                        >
                            Абонемент призупинено до{' '}
                            {moment
                                .utc(subscription?.freeze.frozenUntil)
                                .format('DD.MM.YYYY')}
                        </Typography>
                    )}
                    <Controller
                        name="totalLessons"
                        control={control}
                        render={({ field }) => (
                            <Box>
                                <Typography
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    Загальна кількість занять: {field.value}
                                    {field.value !== 8 && (
                                        <Tooltip title="Оновлена кількість буде використовуватися, доки не закінчиться абонемент">
                                            <GppMaybeIcon
                                                sx={{ ml: '5px' }}
                                                fontSize="small"
                                                color="warning"
                                            />
                                        </Tooltip>
                                    )}
                                </Typography>
                                <Slider
                                    {...field}
                                    disabled={!watch('active')}
                                    aria-label="Total Lessons"
                                    defaultValue={field.value}
                                    // getAriaValueText={valuetext}
                                    valueLabelDisplay="auto"
                                    onChange={(_, value) =>
                                        onChangeTotalLessons(
                                            Array.isArray(value)
                                                ? value[0]
                                                : value
                                        )
                                    }
                                    step={1}
                                    marks
                                    min={1}
                                    max={16}
                                />
                            </Box>
                        )}
                    />
                    <Controller
                        name="usedLessons"
                        control={control}
                        render={({ field }) => (
                            <Box>
                                <Typography>
                                    Занять використано: {field.value}
                                </Typography>
                                <Slider
                                    {...field}
                                    disabled={!watch('active')}
                                    aria-label="Used Lessons"
                                    defaultValue={field.value}
                                    // getAriaValueText={valuetext}
                                    valueLabelDisplay="auto"
                                    step={1}
                                    marks
                                    min={0}
                                    max={watch('totalLessons') || 8}
                                />
                            </Box>
                        )}
                    />
                    <Controller
                        name="dateExpired"
                        control={control}
                        render={({ field }) => (
                            <LocalizationProvider
                                dateAdapter={AdapterMoment}
                                adapterLocale="uk"
                            >
                                <DatePicker
                                    {...field}
                                    disabled={!watch('active')}
                                    className="date-picker"
                                    sx={{
                                        width: '100%',
                                    }}
                                    label="Дата закінчення"
                                    format="DD.MM.YYYY"
                                    value={moment.utc(field.value)}
                                    minDate={moment().add(1, 'days')}
                                    maxDate={moment().add(3, 'months')}
                                    onChange={onChangeDate}
                                />
                            </LocalizationProvider>
                        )}
                    />
                </Box>
                <Button
                    fullWidth
                    disabled={!isDirty}
                    sx={{ mt: '1rem' }}
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                >
                    Оновити
                </Button>
            </Box>
        </div>
    );
};

export default UserForm;
