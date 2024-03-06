import { FC, useCallback, useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { IUser } from '../../constants/index.ts';
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    Slider,
    Switch,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import { useTelegram } from '../../hooks/useTelegram.tsx';
import { sectionBgColor, textColor } from '../../theme/theme.ts';

import './userForm.scss'

import moment from 'moment';
import 'moment/locale/uk';
moment.locale('uk');

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

type Inputs = {
    fullName: string;
    role: string;
    notifications: boolean;
    totalLessons: number;
    usedLessons: number;
    dateExpired: Date | string;
};

type UserFormProps = {
    userInfo: IUser;
};

const UserForm: FC<UserFormProps> = ({ userInfo }) => {
    const { userId, fullName, role, notifications, subscription } = userInfo;
    const { tg, onToggleButton } = useTelegram();

    const {
        control,
        watch,
        setValue,
        handleSubmit,
        formState: { errors, isDirty },
    } = useForm<Inputs>({
        defaultValues: {
            fullName: fullName,
            role: role,
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
    const onChangeNotifications = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.checked;
        setValue('notifications', value, { shouldDirty: true });
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

    const onSubmit: SubmitHandler<Inputs> = useCallback(
        (data) => {
            console.log(data);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const preparedData: { [key: string]: any } = {};

            control._names.mount.forEach((name: string) => {
                if (control.getFieldState(name as keyof Inputs).isDirty) {
                    preparedData[name as keyof Inputs] =
                        data[name as keyof Inputs];
                }
            });

            if (Object.keys(preparedData).length !== 0) {
                preparedData['userId'] = userId;
            }

            console.log('Dirty values: ', preparedData);
        },
        [control, userId]
    );

    useEffect(() => {
        if (isDirty) {
            onToggleButton(true, 'ОНОВИТИ');
        } else {
            onToggleButton(false);
        }
    }, [onToggleButton, isDirty]);

    useEffect(() => {
        tg.onEvent('mainButtonClicked', handleSubmit(onSubmit));

        return () => {
            tg.offEvent('mainButtonClicked', handleSubmit(onSubmit));
            onToggleButton(false);
        };
    }, [onToggleButton, handleSubmit, tg, onSubmit]);

    return (
        <div className="user-form">
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{}}
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
                <Controller
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
                                <MenuItem value="guest">Guest</MenuItem>
                                <MenuItem value="inactive">Inactive</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                />
                <Controller
                    name="notifications"
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel
                            control={
                                <Switch
                                    onChange={onChangeNotifications}
                                    checked={field.value}
                                />
                            }
                            label="Сповіщення"
                        />
                    )}
                />
                <Box sx={{ padding: '0 10px' }}>
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
                                        <Tooltip title="Оновлена кількість буде використовуватися, доки ви не внесете зміни">
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
                                    min={0}
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
                                    aria-label="Used Lessons"
                                    defaultValue={field.value}
                                    // getAriaValueText={valuetext}
                                    valueLabelDisplay="auto"
                                    step={1}
                                    marks
                                    min={0}
                                    max={watch('totalLessons')}
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
                                    className='date-picker'
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
                <Button variant="contained" color="primary" type="submit">
                    Submit
                </Button>
            </Box>
        </div>
    );
};

export default UserForm;
