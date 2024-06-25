import { sendPaymentReminder } from '@/api/services/post.api.ts';
import { textColor } from '@/theme/theme.ts';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
    Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { useMutation } from '@tanstack/react-query';
import { FC, forwardRef, useState } from 'react';
import { toast } from 'react-toastify';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type PaymentNotifyProps = {
    fullName: string;
    userId: number;
    disabled: boolean;
};

const PaymentReminder: FC<PaymentNotifyProps> = ({
    fullName,
    userId,
    disabled,
}) => {
    const [openModal, setOpenModal] = useState<boolean>(false);

    const toggleModal = () => {
        setOpenModal((openModal) => !openModal);
    };

    const confirmPayment = (confirm: boolean) => {
        confirm ? sendNotification() : toggleModal();
    };

    const { mutate } = useMutation({
        mutationFn: sendPaymentReminder,
        mutationKey: ['payment-reminder', userId],
        onSuccess: () => {
            toast.success('Сповіщення надіслано!');
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const sendNotification = () => {
        mutate(userId);
        toggleModal();
    };

    return (
        <>
            <Dialog
                sx={{ background: (theme) => theme.palette.background.paper }}
                open={openModal}
                TransitionComponent={Transition}
                keepMounted
                onClose={toggleModal}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle
                    sx={{ color: (theme) => theme.palette.primary.main }}
                >
                    Надіслати сповіщення про оплату?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText
                        sx={{ color: textColor }}
                        id="alert-dialog-slide-description"
                    >
                        <Typography variant="body2">
                            Ви впевнені, що хочете надіслати сповіщення учню{' '}
                            <b>{fullName}</b>? Повідомлення матиме вигляд:
                        </Typography>
                        <br />
                        <Typography variant="body1">
                            <i>
                                Ваш абонемент закінчився. Щоб продовжити
                                використання, оплатіть новий.
                            </i>
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={() => confirmPayment(false)}>
                        Скасувати
                    </Button>
                    <Button
                        color="success"
                        onClick={() => confirmPayment(true)}
                    >
                        Надіслати
                    </Button>
                </DialogActions>
            </Dialog>
            <Button
                sx={{ mt: '1rem' }}
                fullWidth
                variant="contained"
                color="warning"
                size="medium"
                onClick={toggleModal}
                disabled={disabled}
            >
                Сповістити про оплату
            </Button>
        </>
    );
};

export default PaymentReminder;
