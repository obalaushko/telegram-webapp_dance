import { NavLink, Outlet } from 'react-router-dom';
import ScrollToTop from '../View/ScrollToTop/ScrollToTop.component.tsx';
import { useTitle } from '@/hooks/useTitle.tsx';
import Navbar from '../Navbar.tsx';
import { routes } from '@/router/routes.ts';
import HistoryIcon from '@mui/icons-material/History';
import InfoIcon from '@mui/icons-material/Info';

interface LayoutUserProps {
    // Define props here
}

const LayoutUser: React.FC<LayoutUserProps> = () => {
    const { title } = useTitle();

    return (
        <div className="user-layout">
            <ScrollToTop />
            <header>
                <span>{title}</span>
            </header>
            <Navbar>
                <li className="navbar__list-item">
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? 'active navbar__link' : 'navbar__link'
                        }
                        to={routes.user.about}
                    >
                        <InfoIcon />
                    </NavLink>
                </li>
                <li className="navbar__list-item">
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? 'active navbar__link' : 'navbar__link'
                        }
                        to={routes.user.history}
                    >
                        <HistoryIcon />
                    </NavLink>
                </li>
            </Navbar>
            <div className="container">
                <Outlet />
            </div>
        </div>
    );
};

export default LayoutUser;
