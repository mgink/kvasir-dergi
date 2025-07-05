'use client';

import { useState, useEffect } from 'react';

export default function Statistics() {
    const [stats, setStats] = useState([
        { value: 0, target: 42, label: 'Yayınlanan Sayı', icon: 'fas fa-book', color: 'text-primary' },
        { value: 0, target: 15000, label: 'Mutlu Okuyucu', icon: 'fas fa-users', color: 'text-success' },
        { value: 0, target: 250, label: 'Etkinlik', icon: 'fas fa-calendar-alt', color: 'text-warning' },
        { value: 0, target: 8, label: 'Yıllık Deneyim', icon: 'fas fa-star', color: 'text-info' }
    ]);

    useEffect(() => {
        const animateCounters = () => {
            setStats(prevStats =>
                prevStats.map(stat => {
                    const increment = Math.ceil(stat.target / 100);
                    const newValue = Math.min(stat.value + increment, stat.target);
                    return { ...stat, value: newValue };
                })
            );
        };

        const interval = setInterval(animateCounters, 50);

        // Stop animation when all counters reach their targets
        const allReached = stats.every(stat => stat.value >= stat.target);
        if (allReached) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [stats]);

    const formatNumber = (num: number): string => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    };

    return (
        <section className="py-5 bg-primary text-white">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="display-5 fw-bold mb-3">Rakamlarla Kvasir</h2>
                    <p className="lead">Bugüne kadar elde ettiğimiz başarılar</p>
                </div>

                <div className="row">
                    {stats.map((stat, index) => (
                        <div key={index} className="col-lg-3 col-md-6 mb-4">
                            <div className="text-center">
                                <div className="bg-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                                    style={{ width: '80px', height: '80px' }}>
                                    <i className={`${stat.icon} ${stat.color} fa-2x`}></i>
                                </div>
                                <h3 className="display-4 fw-bold mb-2">
                                    {formatNumber(stat.value)}
                                    {stat.label === 'Mutlu Okuyucu' && '+'}
                                </h3>
                                <p className="h5 mb-0">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Progress Indicators */}
                <div className="row mt-5">
                    <div className="col-12">
                        <div className="text-center">
                            <h5 className="mb-4">Gelişim Hedeflerimiz</h5>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <div className="d-flex justify-content-between mb-1">
                                        <span>Dijital Dönüşüm</span>
                                        <span>85%</span>
                                    </div>
                                    <div className="progress" style={{ height: '8px' }}>
                                        <div className="progress-bar bg-warning" style={{ width: '85%' }}></div>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="d-flex justify-content-between mb-1">
                                        <span>Okuyucu Memnuniyeti</span>
                                        <span>92%</span>
                                    </div>
                                    <div className="progress" style={{ height: '8px' }}>
                                        <div className="progress-bar bg-success" style={{ width: '92%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
