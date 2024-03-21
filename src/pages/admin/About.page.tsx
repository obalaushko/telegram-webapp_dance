import { PAGE_TITLE } from '@/constants/index.ts';
import { useTitle } from '@/hooks/useTitle.tsx';
import { useEffect } from 'react';

const AboutPage = () => {
    const { setTitle } = useTitle();

    useEffect(() => {
        setTitle(PAGE_TITLE.about);
    }, [setTitle]);

    return <div className='about'>
		<div className="article">
			<p>
				Почнемо з загальної інформації про те що вміє наш бот.
				
			</p>
		</div>
	</div>;
}

export default AboutPage;