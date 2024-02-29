const tg = window.Telegram.WebApp;

export function useTelegram() {
    const onClose = () => {
        tg.close();
    };

    const onToggleButton = (show: boolean) => {
        if (show) {
            tg.MainButton.setText('ВІДПРАВИТИ');
            tg.MainButton.show();
        } else {
            tg.MainButton.hide();
        }
    };

    const onHideQrScanner = () => {
        tg.closeScanQrPopup();
    };

    return {
        tg,
        user: tg.initDataUnsafe.user,
        onClose,
        onToggleButton,
        quaryId: tg.initDataUnsafe.query_id,
        onHideQrScanner,
        showScanQrPopup: tg.showScanQrPopup,
    };
}
