import { Outlet } from 'react-router-dom';
import { useTitle } from '@/hooks/useTitle.tsx';
import Navbar from '../Navbar.tsx';

const Layout = () => {
    const { title } = useTitle();

    return (
        <div className="web-app">
            <header>
                <span>{title}</span>
            </header>
            <Navbar />
            <div className="container">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
