import { NavLink } from 'react-router-dom';
import { routes } from '../router/routes.ts';

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
                        Scanner
                    </NavLink>
                </li>
                <li className="navbar__list-item">
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? 'active navbar__link' : 'navbar__link'
                        }
                        to={routes.settings.root}
                    >
                        Settings
                    </NavLink>
                </li>
                <li className="navbar__list-item">
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? 'active navbar__link' : 'navbar__link'
                        }
                        to={routes.history}
                    >
                        History
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;