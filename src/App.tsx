import { useCallback, useEffect, useState } from 'react';
import { useTelegram } from './hooks/useTelegram.tsx';
import scannerIcon from './assets/scanner.svg';

import './style/main.scss';
import { ListUsers } from './components/ListUsers.tsx';
import { parseUserData, sendLogs } from './utils/utils.ts';
import { URL, User } from './constants/index.ts';

// https://8107-176-39-53-116.ngrok-free.app/
// heroku adress

const App = () => {
    const {
        tg,
        showScanQrPopup,
        onHideQrScanner,
        closeWebApp,
        onToggleButton,
        quaryId,
    } = useTelegram();

    const [userList, setUserList] = useState<User[]>([]);

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
                                alert('Учень вже сканував QR-код.');
                                return prev;
                            }

                            // Add user if it doesn't exist
                            return [...prev, { userId, fullName, username }];
                        });
                    } else {
                        alert('Цей QR-код не містить необхідних даних.');
                        onHideQrScanner();
                    }
                }
            } catch (error) {
                alert(error);
            }
        });
    }, [showScanQrPopup, onHideQrScanner]);

    const onRemoveUser = useCallback(
        async (id: number) => {
            setUserList((prev) => prev.filter((user) => user.userId !== id));
            await sendLogs(URL, JSON.stringify(userList));
        },
        [userList]
    );

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

    const onSendData = useCallback(async () => {
        const data = {
            userIds: userList.map((user) => user.userId),
            quaryId,
        };

        try {
            await fetch(`${URL}/web-data`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            closeWebApp();
        } catch (error) {
            alert(error);
        }
    }, [userList, quaryId, closeWebApp]);

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData);

        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        };
    }, [onSendData, tg]);

    return (
        <div className="main">
            <header>
                <span>Сканер абониментів</span>
            </header>

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
    );
};

export default App;
