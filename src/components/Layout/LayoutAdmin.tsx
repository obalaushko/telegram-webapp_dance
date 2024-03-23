import { Outlet } from 'react-router-dom';
import { useTitle } from '@/hooks/useTitle.tsx';
import Navbar from '../Navbar.tsx';
import ScrollToTop from '../View/ScrollToTop/ScrollToTop.component.tsx';

interface LayoutAdminProps {
    // Define any props that the component accepts
}

const LayoutAdmin: React.FC<LayoutAdminProps> = () => {
    const { title } = useTitle();

    return (
        <div className="web-app">
            <ScrollToTop />
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

export default LayoutAdmin;
