import { NavLink } from 'react-router-dom';
import { routes } from '@/router/routes.ts';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import SettingsIcon from '@mui/icons-material/Settings';
import HistoryIcon from '@mui/icons-material/History';
import InfoIcon from '@mui/icons-material/Info';
import { useEffect, useState } from 'react';


const Navbar = ({ children }: { children?: React.ReactNode }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    const checkScroll = () => {
        if (window.scrollY > 60) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', checkScroll);
        return () => {
            window.removeEventListener('scroll', checkScroll);
        };
    }, []);
    return (
        <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
            <ul className="navbar__list">
                {children ? (
                    children
                ) : (
                    <>
                        <li className="navbar__list-item">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? 'active navbar__link'
                                        : 'navbar__link'
                                }
                                to={routes.scanner}
                            >
                                <QrCodeScannerIcon />
                            </NavLink>
                        </li>
                        <li className="navbar__list-item">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? 'active navbar__link'
                                        : 'navbar__link'
                                }
                                to={routes.settings.root}
                            >
                                <SettingsIcon />
                            </NavLink>
                        </li>
                        <li className="navbar__list-item">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? 'active navbar__link'
                                        : 'navbar__link'
                                }
                                to={routes.history}
                            >
                                <HistoryIcon />
                            </NavLink>
                        </li>
                        <li className="navbar__list-item">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? 'active navbar__link'
                                        : 'navbar__link'
                                }
                                to={routes.about}
                            >
                                <InfoIcon />
                            </NavLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
