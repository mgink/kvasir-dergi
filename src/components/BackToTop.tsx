'use client';

import { useState, useEffect } from 'react';

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="btn btn-primary position-fixed shadow-lg"
                    style={{
                        bottom: '30px',
                        right: '30px',
                        zIndex: 1050,
                        borderRadius: '50%',
                        width: '60px',
                        height: '60px',
                        transition: 'all 0.3s ease'
                    }}
                    title="Başa Dön"
                >
                    <i className="fas fa-arrow-up fa-lg"></i>
                </button>
            )}
        </>
    );
}
