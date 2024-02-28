const tg = window.Telegram.WebApp;

export function useTelegram() {
    const onClose = () => {
        tg.close();
    };

	

    const onToggleButton = () => {
        if (tg.MainButton.isVisible) {
            tg.MainButton.hide();
        } else {
			tg.MainButton.setText('Відправити')
            tg.MainButton.show();
        }
    };

    return {
        tg,
        user: tg.initDataUnsafe.user,
        onClose,
        onToggleButton,
		quaryId: tg.initDataUnsafe.query_id
    };
}
