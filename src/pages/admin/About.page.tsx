import { PAGE_TITLE } from '@/constants/index.ts';
import { useTitle } from '@/hooks/useTitle.tsx';
import { useEffect } from 'react';

export default function AboutPage() {
    const { setTitle } = useTitle();

    useEffect(() => {
        setTitle(PAGE_TITLE.about);
    }, [setTitle]);
    return <div>About.page</div>;
}
