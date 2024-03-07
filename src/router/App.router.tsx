import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from './routes.ts';
import SettingsPage from '../pages/Settings.page.tsx';
import HistoryPage from '../pages/History.page.tsx';
import NotFoundPage from '../pages/404.page.tsx';
import Scanner from '../pages/Scanner.page.tsx';
import UserPage from '../pages/User.page.tsx';
import Layout from '../components/Layout/Layout.tsx';
import AuthChecker from './Admin.router.tsx';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={routes.scanner} element={<Layout />}>
                    <Route
                        path={routes.scanner}
                        index
                        element={
                            <AuthChecker>
                                <Scanner />
                            </AuthChecker>
                        }
                    />
                    <Route
                        path={routes.settings.root}
                        element={
                            <AuthChecker>
                                <SettingsPage />
                            </AuthChecker>
                        }
                    />
                    <Route
                        path={routes.settings.userLink}
                        element={
                            <AuthChecker>
                                <UserPage />
                            </AuthChecker>
                        }
                    />
                    <Route
                        path={routes.history}
                        element={
                            <AuthChecker>
                                <HistoryPage />
                            </AuthChecker>
                        }
                    />
                </Route>
                <Route path={routes.notFound} element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
