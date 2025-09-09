import * as Sentry from '@sentry/react';
import { telegram } from '@/shared/TelegramService';
import React from 'react';
import {
    useLocation,
    useNavigationType,
    createRoutesFromChildren,
    matchRoutes,
} from 'react-router-dom';

Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [
        Sentry.reactRouterV6BrowserTracingIntegration({
            useEffect: React.useEffect,
            useLocation,
            useNavigationType,
            createRoutesFromChildren,
            matchRoutes,
        }),
    ],
    tracesSampleRate: 1.0,
    environment: import.meta.env.MODE,
});

const user = telegram.user;
const botId = telegram.botId;

if (user) {
    Sentry.setUser({
        id: String(user.id),
        username: user.username,
    });

    Sentry.setTag('bot_id', botId ?? 'unknown');
}
