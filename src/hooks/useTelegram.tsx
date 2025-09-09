import { telegram } from '@/shared/TelegramService';

export function useTelegram() {
    const tg = telegram.tgAPI;

    const onToggleButton = (show: boolean, text?: string) => {
        if (show && !tg.MainButton.isVisible) {
            tg.MainButton.setText(text ?? 'ВІДПРАВИТИ');
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
        botId: telegram.botId,
        queryId: telegram.queryId,
        tgUser: telegram.user,
        checkIsTGUser: Boolean(telegram.user),
        expand: tg.expand,
        isExpanded: tg.isExpanded,
        showScanQrPopup: tg.showScanQrPopup,
        closeWebApp: tg.close,
        onToggleButton,
        onHideQrScanner,
    };
}
