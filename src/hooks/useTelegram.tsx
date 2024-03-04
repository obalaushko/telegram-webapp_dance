const tg = window.Telegram.WebApp;

export function useTelegram() {
    /**
     * Handles the toggle button functionality.
     * @param show - A boolean value indicating whether to show or hide the toggle button.
     */
    const onToggleButton = (show: boolean) => {
        if (show) {
            tg.MainButton.setText('ВІДПРАВИТИ');
            tg.MainButton.show();
        } else {
            tg.MainButton.hide();
        }
    };

    /**
     * Callback function to hide the QR scanner popup.
     */
    const onHideQrScanner = () => {
        tg.closeScanQrPopup();
    };

    const checkIsTGUser = tg.initDataUnsafe.user ? true : false;

    return {
        tg,
        tgUser: tg.initDataUnsafe.user,
        onToggleButton,
        quaryId: tg.initDataUnsafe.query_id,
        onHideQrScanner,
        showScanQrPopup: tg.showScanQrPopup,
        closeWebApp: tg.close,
        checkIsTGUser: checkIsTGUser,
    };
}
