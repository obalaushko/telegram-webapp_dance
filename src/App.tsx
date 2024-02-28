import { useTelegram } from './hooks/useTelegram.tsx';

import './style/main.scss';

const App = () => {
    const { tg, user, onToggleButton } = useTelegram();

    const onShowQrScanner = () => {
        tg.showScanQrPopup({ text: 'Scan QR code' }, (data) => {
			console.log(data);
		});
    };

	const onHideQrScanner = () => {
		tg.closeScanQrPopup();
	}
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
