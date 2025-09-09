import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style/main.scss';
import AppRouter from './router/App.router.tsx';
import { TitleContext } from './context/Context.ts';
import { useEffect, useState } from 'react';
import { telegram } from './shared/TelegramService.ts';

const App = () => {
    const [title, setTitle] = useState('Web app');

    useEffect(() => {
        if (import.meta.env.DEV) return;

        let retries = 0;
        const maxRetries = 30;

        const interval = setInterval(() => {
            if (telegram.isReady) {
                console.log('[Telegram] Ready at retry', retries);
                clearInterval(interval);
                return;
            }

            if (++retries >= maxRetries) {
                console.warn('[Telegram] initData never arrived');
                clearInterval(interval);
            } else {
                console.log(
                    '[Telegram] Waiting for initData... retry',
                    retries
                );
            }
        }, 100);

        return () => clearInterval(interval);
    }, []);
    return (
        <TitleContext.Provider value={{ title, setTitle }}>
            <AppRouter />
            <ToastContainer autoClose={3000} limit={3} position="top-right" />
        </TitleContext.Provider>
    );
};

export default App;
