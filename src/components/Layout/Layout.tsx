import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../Navbar.tsx';

const Layout = () => {
    const location = useLocation();
    const [headerTitle, setHeaderTitle] = useState<string>('Web app');

    useEffect(() => {
        const staticTitles = {
            settings: 'Налаштування',
            history: 'Історія відвідувань',
            scanner: 'Сканер абонементів',
        };

        if (location.state?.title) {
            setHeaderTitle(location.state.title);
        } else {
            switch (location.pathname) {
                case '/settings':
                    setHeaderTitle(staticTitles.settings);
                    break;
                case '/history':
                    setHeaderTitle(staticTitles.history);
                    break;
                case '/':
                    setHeaderTitle(staticTitles.scanner);
                    break;
            }
        }
    }, [location.state?.title, location.pathname]);

    return (
        <div className="web-app">
            <header>
                <span>{headerTitle}</span>
            </header>
            <Navbar />
            <div className="container">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
