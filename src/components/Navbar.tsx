import { NavLink } from 'react-router-dom';
import { routes } from '@/router/routes.ts';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import SettingsIcon from '@mui/icons-material/Settings';
import HistoryIcon from '@mui/icons-material/History';
import InfoIcon from '@mui/icons-material/Info';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar__list">
                <li className="navbar__list-item">
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? 'active navbar__link' : 'navbar__link'
                        }
                        to={routes.scanner}
                    >
                        <QrCodeScannerIcon />
                    </NavLink>
                </li>
                <li className="navbar__list-item">
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? 'active navbar__link' : 'navbar__link'
                        }
                        to={routes.settings.root}
                    >
                        <SettingsIcon />
                    </NavLink>
                </li>
                <li className="navbar__list-item">
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? 'active navbar__link' : 'navbar__link'
                        }
                        to={routes.history}
                    >
                        <HistoryIcon />
                    </NavLink>
                </li>
                <li className="navbar__list-item">
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? 'active navbar__link' : 'navbar__link'
                        }
                        to={routes.about}
                    >
                        <InfoIcon />
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
