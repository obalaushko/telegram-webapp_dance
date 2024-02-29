import { useCallback, useEffect, useState } from 'react';
import { useTelegram } from './hooks/useTelegram.tsx';
import scannerIcon from './assets/scanner.svg';

import './style/main.scss';
import { ListUsers, User } from './components/ListUsers.tsx';
import { parseUserData, sendLogs } from './utils/utils.ts';

// https://8107-176-39-53-116.ngrok-free.app/
// heroku adress

const URL = 'https://8107-176-39-53-116.ngrok-free.app';
const App = () => {
    const { tg, showScanQrPopup, onHideQrScanner, onToggleButton, quaryId } =
        useTelegram();

    const [userList, setUserList] = useState<User[]>([
        { userId: 1, fullName: 'test' },
        { userId: 2, fullName: 'test2' },
        { userId: 3, fullName: 'test3' },
    ]);

    const onShowQrScanner = useCallback(async () => {
        showScanQrPopup({ text: 'Скануйте QR своїх учнів' }, async (string) => {
            try {
                await sendLogs(URL, '[string] ' + string);

                const data = parseUserData(string);

                if (data) {
                    const { userId, fullName, username } = data;

                    if (userId && fullName) {
                        setUserList((prev) => {
                            // Check if user already exists
                            if (prev.some(user => user.userId === userId)) {
                                alert('User already exists');
                                return prev;
                            }

                            // Add user if it doesn't exist
                            return [
                                ...prev,
                                { userId, fullName, username },
                            ];
                        });
                        alert('User added');
                    } else {
                        onHideQrScanner();
                    }
                }
            } catch (error) {
                console.error(error);
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
        } catch (error) {
            console.error(error);
        }
    }, [userList, quaryId]);

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
