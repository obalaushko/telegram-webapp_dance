import { useCallback, useEffect, useState } from 'react';
import scannerIcon from '../assets/scanner.svg';

import '../style/scanner.scss';
import { useTelegram } from '../hooks/useTelegram.tsx';
import { User } from '../constants/index.ts';
import { parseUserData } from '../utils/utils.ts';
import { ListUsers } from '../components/ListUsers.tsx';
import { toast } from 'react-toastify';
import apiService from '../api/api.ts';

const Scanner = () => {
    const {
        tg,
        showScanQrPopup,
        onHideQrScanner,
        closeWebApp,
        onToggleButton,
        quaryId,
        tgUser,
    } = useTelegram();

    const [userList, setUserList] = useState<User[]>([]);

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
     * Sends data to the server.
     * @returns {Promise<void>} A promise that resolves when the data is successfully sent.
     */
    const onSendData = useCallback(async () => {
        const data = {
            userId: tgUser?.id,
            userIds: userList.map((user) => user.userId),
            quaryId,
        };

        const response = await apiService.post('web-data', data);

        if (response.ok) {
            toast.success('Дані успішно оновлені.');
            setTimeout(() => {
                closeWebApp();
            }, 1000);
        } else {
            toast.error(response.message);
        }
    }, [userList, quaryId, closeWebApp, tgUser]);

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData);

        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        };
    }, [onSendData, tg]);

    return (
        <div className="scanner">
            <div className="scanner__container">
                <div className="button__container">
                    <button
                        className="button button__scanner"
                        onClick={onShowQrScanner}
                    >
                        <span>Сканувати</span>
                        <img src={scannerIcon} alt="Scanner" />
                    </button>
                </div>
                <ListUsers users={userList} onRemoveUser={onRemoveUser} />
            </div>
        </div>
    );
};

export default Scanner;
