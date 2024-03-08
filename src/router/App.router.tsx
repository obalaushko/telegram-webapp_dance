/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from './routes.ts';
import Layout from '../components/Layout/Layout.tsx';
import AuthChecker from './Admin.router.tsx';
import { Suspense, lazy } from 'react';
import LoadingPage from '../components/Skeleton/LoadingPage.tsx';

const ScannerPage = lazy(() =>
    delayLoadingPage(import('../pages/Scanner.page.tsx'))
);
const SettingsPage = lazy(() =>
    delayLoadingPage(import('../pages/Settings.page.tsx'))
);
const HistoryPage = lazy(() =>
    delayLoadingPage(import('../pages/History.page.tsx'))
);
const NotFoundPage = lazy(() =>
    delayLoadingPage(import('../pages/404.page.tsx'))
);
const UserPage = lazy(() => import('../pages/User.page.tsx'));

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<LoadingPage />}>
                <Routes>
                    <Route path={routes.scanner} element={<Layout />}>
                        <Route
                            path={routes.scanner}
                            index
                            element={
                                <AuthChecker>
                                    <ScannerPage />
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
            </Suspense>
        </BrowserRouter>
    );
};

function delayLoadingPage(
    promise: Promise<{ default: React.ComponentType<any> }>
) {
    return new Promise<{ default: React.ComponentType<any> }>((resolve) => {
        setTimeout(() => resolve(promise), 500);
    });
}

export default AppRouter;
