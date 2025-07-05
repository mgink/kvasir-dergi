'use client';

import { useState, useEffect } from 'react';
import { SlideData } from '@/data/mockData';

interface HeroSliderProps {
    slides: SlideData[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
    // Sadece aktif slaytları filtrele
    const activeSlides = slides.filter(slide => slide.isActive !== false);

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying || activeSlides.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
        }, 5000); // 5 saniyede bir geçiş

        return () => clearInterval(interval);
    }, [activeSlides.length, isAutoPlaying]);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
        // 10 saniye sonra auto-play'i tekrar başlat
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    if (!activeSlides || activeSlides.length === 0) {
        return (
            <section style={{
                height: '70vh',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
            }}>
                <div className="text-center">
                    <h2>Slayt İçeriği Yükleniyor...</h2>
                </div>
            </section>
        );
    }

    const currentSlideData = activeSlides[currentSlide];

    return (
        <section style={{
            height: '70vh',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '0 0 30px 30px'
        }}>
            {/* Background Image with Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: currentSlideData.imageUrl ? `url(${currentSlideData.imageUrl})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                transition: 'all 0.8s ease-in-out'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8))',
                    backdropFilter: 'blur(2px)'
                }}></div>
            </div>

            {/* Content */}
            <div style={{
                position: 'relative',
                zIndex: 2,
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                color: 'white'
            }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-8 col-md-10 mx-auto text-center">
                            <div style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                borderRadius: '20px',
                                padding: '3rem 2rem',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                animation: 'fadeInUp 0.8s ease-out'
                            }}>
                                <h1 style={{
                                    fontSize: '3.5rem',
                                    fontWeight: '800',
                                    marginBottom: '1.5rem',
                                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                                    lineHeight: '1.2'
                                }}>
                                    {currentSlideData.title}
                                </h1>
                                <p style={{
                                    fontSize: '1.3rem',
                                    marginBottom: '2rem',
                                    opacity: 0.95,
                                    lineHeight: '1.6',
                                    maxWidth: '600px',
                                    margin: '0 auto 2rem'
                                }}>
                                    {currentSlideData.description}
                                </p>
                                {currentSlideData.buttonText && currentSlideData.buttonLink && (
                                    <a
                                        href={currentSlideData.buttonLink}
                                        style={{
                                            background: 'linear-gradient(135deg, #ffd700, #ffed4a)',
                                            color: '#2d3748',
                                            padding: '1rem 2.5rem',
                                            borderRadius: '15px',
                                            textDecoration: 'none',
                                            fontWeight: '600',
                                            fontSize: '1.1rem',
                                            boxShadow: '0 4px 6px rgba(255, 215, 0, 0.4)',
                                            transition: 'all 0.3s ease',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.5rem'
                                        }}
                                        onMouseEnter={(e) => {
                                            (e.target as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                                            (e.target as HTMLAnchorElement).style.boxShadow = '0 6px 8px rgba(255, 215, 0, 0.6)';
                                        }}
                                        onMouseLeave={(e) => {
                                            (e.target as HTMLAnchorElement).style.transform = 'translateY(0)';
                                            (e.target as HTMLAnchorElement).style.boxShadow = '0 4px 6px rgba(255, 215, 0, 0.4)';
                                        }}
                                    >
                                        {currentSlideData.buttonText}
                                        <i className="fas fa-arrow-right"></i>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Arrows */}
            {activeSlides.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        style={{
                            position: 'absolute',
                            left: '2rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'rgba(255, 255, 255, 0.2)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '60px',
                            height: '60px',
                            color: 'white',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            zIndex: 3,
                            backdropFilter: 'blur(10px)'
                        }}
                        onMouseEnter={(e) => {
                            (e.target as HTMLButtonElement).style.background = 'rgba(255, 255, 255, 0.3)';
                            (e.target as HTMLButtonElement).style.transform = 'translateY(-50%) scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                            (e.target as HTMLButtonElement).style.background = 'rgba(255, 255, 255, 0.2)';
                            (e.target as HTMLButtonElement).style.transform = 'translateY(-50%) scale(1)';
                        }}
                    >
                        <i className="fas fa-chevron-left"></i>
                    </button>

                    <button
                        onClick={nextSlide}
                        style={{
                            position: 'absolute',
                            right: '2rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'rgba(255, 255, 255, 0.2)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '60px',
                            height: '60px',
                            color: 'white',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            zIndex: 3,
                            backdropFilter: 'blur(10px)'
                        }}
                        onMouseEnter={(e) => {
                            (e.target as HTMLButtonElement).style.background = 'rgba(255, 255, 255, 0.3)';
                            (e.target as HTMLButtonElement).style.transform = 'translateY(-50%) scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                            (e.target as HTMLButtonElement).style.background = 'rgba(255, 255, 255, 0.2)';
                            (e.target as HTMLButtonElement).style.transform = 'translateY(-50%) scale(1)';
                        }}
                    >
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </>
            )}

            {/* Dots Indicator */}
            {activeSlides.length > 1 && (
                <div style={{
                    position: 'absolute',
                    bottom: '2rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: '0.75rem',
                    zIndex: 3
                }}>
                    {activeSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            style={{
                                width: currentSlide === index ? '40px' : '15px',
                                height: '15px',
                                borderRadius: '10px',
                                border: 'none',
                                background: currentSlide === index
                                    ? 'rgba(255, 255, 255, 0.9)'
                                    : 'rgba(255, 255, 255, 0.4)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                backdropFilter: 'blur(10px)'
                            }}
                        ></button>
                    ))}
                </div>
            )}

            {/* Auto-play indicator */}
            {activeSlides.length > 1 && isAutoPlaying && (
                <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '20px',
                    padding: '0.5rem 1rem',
                    color: 'white',
                    fontSize: '0.9rem',
                    zIndex: 3,
                    backdropFilter: 'blur(10px)'
                }}>
                    <i className="fas fa-play me-2"></i>
                    Otomatik Geçiş
                </div>
            )}
        </section>
    );
}
