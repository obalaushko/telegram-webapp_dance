import { useCallback, useEffect, useState } from 'react';

import '@style/scanner.scss';
import { useTelegram } from '../../hooks/useTelegram.tsx';
import { parseUserData } from '../../utils/utils.ts';
import { ListUsers } from '../../components/ListUsers.tsx';
import { toast } from 'react-toastify';
import { Fab } from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { useMutation } from '@tanstack/react-query';
import { sendQrData } from '../../api/services/post.api.ts';
import { IUser } from '@/constants/types.ts';
import { useTitle } from '@/hooks/useTitle.tsx';
import { PAGE_TITLE } from '@/constants/index.ts';

const ScannerPage = () => {
    const {
        tg,
        showScanQrPopup,
        onHideQrScanner,
        closeWebApp,
        onToggleButton,
        quaryId,
        tgUser,
    } = useTelegram();

    const [userList, setUserList] = useState<IUser[]>([]);
    const { setTitle } = useTitle();

    useEffect(() => {
        setTitle(PAGE_TITLE.scanner);
    }, [setTitle]);

    /**
     * Handles the event when the QR scanner is shown.
     * @returns {void}
     */
    const onShowQrScanner = useCallback(async () => {
        showScanQrPopup({ text: 'Скануйте QR своїх учнів' }, async (string) => {
            try {
                const data = parseUserData(string);

                if (data) {
                    const { userId, fullName, username } = data;

                    if (userId && fullName) {
                        setUserList((prev) => {
                            // Check if user already exists
                            if (prev.some((user) => user.userId === userId)) {
                                toast.warn('Учень вже сканував QR-код.');
                                return prev;
                            }

                            // Add user if it doesn't exist
                            return [...prev, { userId, fullName, username }];
                        });
                    } else {
                        toast.warn('Цей QR-код не містить необхідних даних.');
                        onHideQrScanner();
                    }
                }
            } catch (error) {
                alert(error);
            }
        });
    }, [showScanQrPopup, onHideQrScanner]);

    /**
     * Removes a user from the user list based on their ID.
     * @param id - The ID of the user to be removed.
     */
    const onRemoveUser = useCallback(async (id: number) => {
        setUserList((prev) => prev.filter((user) => user.userId !== id));
    }, []);

    useEffect(() => {
        if (!userList.length) {
            onShowQrScanner();
        }
    }, [userList, onShowQrScanner]);

    useEffect(() => {
        if (userList.length) {
            onToggleButton(true);
        } else {
            onToggleButton(false);
        }
    }, [userList, onToggleButton]);

    /**
     * Sends QR data using the sendQrData mutation.
     */
    const { mutate } = useMutation({
        mutationFn: sendQrData,
    });

    /**
     * Sends data to the server.
     * @returns {Promise<void>} A promise that resolves when the data is successfully sent.
     */
    const onSendData = useCallback(async () => {
        const data = {
            userId: tgUser?.id,
            userIds: userList.map((user) => user.userId),
            quaryId,
        };
        mutate(data, {
            onSuccess: () => {
                toast.success('Дані успішно оновлені.');
                setUserList([]);
                setTimeout(() => {
                    closeWebApp();
                }, 2000);
            },
            onError: (error) => {
                toast.error(error.message);
            },
        });
    }, [userList, quaryId, closeWebApp, tgUser, mutate]);

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData);

        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
            onToggleButton(false);
        };
    }, [onSendData, onToggleButton, tg]);

    return (
        <div className="scanner">
            <div className="scanner__container">
                <div className="button__container">
                    <Fab
                        variant="circular"
                        size="large"
                        color="primary"
                        onClick={onShowQrScanner}
                    >
                        <QrCodeScannerIcon fontSize="large" />
                    </Fab>
                </div>
                <ListUsers users={userList} onRemoveUser={onRemoveUser} />
            </div>
        </div>
    );
};

export default ScannerPage;
