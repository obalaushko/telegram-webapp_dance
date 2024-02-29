import { useCallback, useEffect, useState } from 'react';
import { useTelegram } from './hooks/useTelegram.tsx';
import scannerIcon from './assets/scanner.svg';

import './style/main.scss';
import { ListUsers, User } from './components/ListUsers.tsx';
import { sendLogs } from './utils/utils.ts';

// https://8107-176-39-53-116.ngrok-free.app/
// heroku adress

const URL = 'https://8107-176-39-53-116.ngrok-free.app';
const App = () => {
    const { tg, showScanQrPopup, onHideQrScanner, onToggleButton, quaryId } =
        useTelegram();

    const [userList, setUserList] = useState<User[]>([]);

    const onShowQrScanner = useCallback(async () => {
        const data = showScanQrPopup(
            { text: 'Скануйте QR своїх учнів' },
            async (string) => {
                try {
                    const data = JSON.parse(string);
                    await sendLogs(URL, '[string] ' + string);
                    alert(string);

                    if (data) {
                        const { id, fullName, username } = data;

                        if (id && fullName) {
                            setUserList((prev) => [
                                ...prev,
                                { id: id, fullName, username },
                            ]);
                        } else {
                            onHideQrScanner();
                        }
                    }
                    await sendLogs(URL, '[userList]: ' + JSON.stringify(userList));
                } catch (error) {
                    console.error(error);
                }
            }
        );
        await sendLogs(URL, '[await data]: ' + JSON.stringify(data));
    }, [showScanQrPopup, onHideQrScanner, userList]);

    const onRemoveUser = useCallback(
        async (id: number) => {
            setUserList((prev) => prev.filter((user) => user.id !== id));
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
            userIds: userList.map((user) => user.id),
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
            <ListUsers users={userList} onRemoveUser={onRemoveUser} />
            <div className="button__container">
                <button
                    className="button button__scanner"
                    onClick={onShowQrScanner}
                >
                    <span>Сканувати</span>
                    <img src={scannerIcon} alt="Scanner" />
                </button>
            </div>
        </div>
    );
};

export default App;
