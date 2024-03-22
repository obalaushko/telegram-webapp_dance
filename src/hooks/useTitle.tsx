import { useContext, useEffect } from "react";
import { TitleContext } from "../context/Context.ts";

export const useTitle = () => {
    const context = useContext(TitleContext);
    if (context === undefined) {
        throw new Error('useTitle must be used within a TitleProvider');
    }

    useEffect(() => {
        const title = `${context.title} - Dance bot (TG)`;
        document.title = title;
        window.history.pushState({}, title, document.location.pathname);
    }, [context.title]);

    return context;
};