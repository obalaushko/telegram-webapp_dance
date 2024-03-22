import { PAGE_TITLE } from "@/constants/index.ts";
import { useTitle } from "@/hooks/useTitle.tsx";
import { useEffect } from "react";

interface HistoryUserProps {
    // Define the props for your component here
}

const HistoryUser: React.FC<HistoryUserProps> = () => {
    const { setTitle } = useTitle();

    useEffect(() => {
        setTitle(PAGE_TITLE.history);
    }, [setTitle]);

    return (
        // JSX code for your component's UI
        <div>
            {/* Add your component's UI elements here */}
        </div>
    );
};

export default HistoryUser;