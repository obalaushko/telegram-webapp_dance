import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style/main.scss';
import AppRouter from './router/App.router.tsx';
import { TitleContext } from './context/Context.ts';
import { useState } from 'react';

const App = () => {
    const [title, setTitle] = useState('Web app');
    return (
        <TitleContext.Provider value={{ title, setTitle }}>
            <AppRouter />
            <ToastContainer autoClose={3000} limit={3} position="top-right" />
        </TitleContext.Provider>
    );
};

export default App;
