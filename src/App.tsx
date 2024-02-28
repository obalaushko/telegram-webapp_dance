import { useCallback, useEffect } from 'react';
import { useTelegram } from './hooks/useTelegram.tsx';

import './style/main.scss';

const App = () => {
    const { tg, user, onToggleButton, quaryId } = useTelegram();
    // const [userData, setUserData] = useState(user);

    const onSendData = useCallback(() => {
        const data = {
            user: user,
			quaryId
        };

        fetch('https://c288-176-39-53-116.ngrok-free.app/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }, [user, quaryId]);

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData);

        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        };
    }, [onSendData, tg]);

    const onShowQrScanner = () => {
        tg.showScanQrPopup({ text: 'Scan QR code' }, (data) => {
            console.log(data); // send log to server api (/logs)
			fetch('https://c288-176-39-53-116.ngrok-free.app/logs', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})
        });
    };

    const onHideQrScanner = () => {
        tg.closeScanQrPopup();
    };

    return (
        <div className="main">
            <header>Test app @{user?.username}</header>
            <div>
                <button onClick={onToggleButton}>Toggle</button>
                <button onClick={onShowQrScanner}>Show scan</button>
                <button onClick={onHideQrScanner}>Hide scan</button>
            </div>
        </div>
    );
};

export default App;
