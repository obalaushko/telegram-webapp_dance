const tg = window.Telegram.WebApp;

/**
 * Custom hook for interacting with the Telegram API.
 * @returns An object containing various Telegram-related functions and data.
 */
export function useTelegram() {
    /**
     * Handles the toggle button functionality.
     * @param show - A boolean value indicating whether to show or hide the toggle button.
     * @param text - Optional text to be displayed on the toggle button. If not provided, a default text will be used.
     */
    const onToggleButton = (show: boolean, text?: string) => {
        if (show) {
            if (!tg.MainButton.isVisible) {
                tg.MainButton.setText(text ?? 'ВІДПРАВИТИ');
                tg.MainButton.show();
            }
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

    /**
     * Checks if the Telegram user is available.
     * @returns {boolean} Returns true if the Telegram user is available, otherwise false.
     */
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
