import { Dispatch, SetStateAction, createContext } from 'react';

interface ITitleContext {
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
}

export const TitleContext = createContext<ITitleContext | undefined>(undefined);
