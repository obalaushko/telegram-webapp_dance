/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from './routes.ts';
import AuthChecker from './Admin.router.tsx';
import { Suspense, lazy } from 'react';
import LoadingPage from '@/components/Skeleton/LoadingPage.tsx';
import LayoutAdmin from '@/components/Layout/LayoutAdmin.tsx';
import LayoutUser from '@/components/Layout/LayoutUser.tsx';

const ScannerPage = lazy(() =>
    delayLoadingPage(import('@pages/admin/Scanner.page.tsx'))
);
const SettingsPage = lazy(() =>
    delayLoadingPage(import('@pages/admin/Settings.page.tsx'))
);
const HistoryPage = lazy(() =>
    delayLoadingPage(import('@pages/admin/HistoryPage/History.page.tsx'))
);
const NotFoundPage = lazy(() =>
    delayLoadingPage(import('@pages/404.page.tsx'))
);
const UserPage = lazy(() => import('@pages/admin/User.page.tsx'));
const AboutPage = lazy(() =>
    delayLoadingPage(import('@pages/admin/About.page.tsx'))
);
const AboutUserPage = lazy(() =>
    delayLoadingPage(import('@pages/user/AboutUser.page.tsx'))
);
const HistoryUserPage = lazy(() =>
    delayLoadingPage(import('@pages/user/HistoryUser.page.tsx'))
);

/**
 * Renders the main application router.
 * @returns The JSX element representing the application router.
 */
const AppRouter = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<LoadingPage />}>
                <Routes>
                    <Route
                        path={routes.scanner}
                        element={
                            <AuthChecker>
                                <LayoutAdmin />
                            </AuthChecker>
                        }
                    >
                        <Route
                            path={routes.scanner}
                            index
                            element={<ScannerPage />}
                        />
                        <Route
                            path={routes.settings.root}
                            element={<SettingsPage />}
                        />
                        <Route
                            path={routes.settings.userLink}
                            element={<UserPage />}
                        />
                        <Route
                            path={routes.history}
                            element={<HistoryPage />}
                        />
                        <Route path={routes.about} element={<AboutPage />} />
                    </Route>
                    {/* Without Auth */}
                    <Route path={routes.notFound} element={<NotFoundPage />} />
                    <Route path={routes.user.root} element={<LayoutUser />}>
                        <Route
                            path={routes.user.about}
                            index
                            element={<AboutUserPage />}
                        />
                        <Route
                            path={routes.user.history}
                            element={<HistoryUserPage />}
                        />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

/**
 * Delays the loading of a page component by a specified number of milliseconds.
 *
 * @param promise - The promise that resolves to the page component.
 * @param milliseconds - The number of milliseconds to delay the loading. Default is 500 milliseconds.
 * @returns A promise that resolves to the page component after the specified delay.
 */
function delayLoadingPage(
    promise: Promise<{ default: React.ComponentType<any> }>,
    milliseconds = 500
) {
    return new Promise<{ default: React.ComponentType<any> }>((resolve) => {
        setTimeout(() => resolve(promise), milliseconds);
    });
}

export default AppRouter;
