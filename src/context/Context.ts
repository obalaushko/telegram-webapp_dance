import { createContext, useContext } from 'react';

// Створити контекст
export const UserContext = createContext(null);

// Хук для використання контексту користувача
export const useUser = () => {
    return useContext(UserContext);
};
