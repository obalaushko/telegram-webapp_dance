import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style/main.scss';
import AppRouter from './router/App.router.tsx';

const App = () => {
    return (
        <>
            <AppRouter />
            <ToastContainer autoClose={3000} limit={3} position="top-right" />
        </>
    );
};

export default App;
