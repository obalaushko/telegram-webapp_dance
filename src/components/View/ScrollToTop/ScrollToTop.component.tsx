import { useState, useEffect } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import '@/style/scrollToTop.scss';

const ScrollToTop = () => {
    const [showTopBtn, setShowTopBtn] = useState(false);
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });
    }, []);
    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    return (
        <div className="scroll-to-top">
            {showTopBtn && (
                <IconButton onClick={goToTop} className="button-arrow">
                    <KeyboardArrowUpIcon color='primary' />
                </IconButton>
            )}
        </div>
    );
};
export default ScrollToTop;
