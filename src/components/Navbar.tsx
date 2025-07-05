'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCart } from '@/lib/CartContext';

export default function Navbar() {
    const { getTotalItems } = useCart();
    const [mounted, setMounted] = useState(false);

    // Hydration mismatch'i önlemek için
    useEffect(() => {
        setMounted(true);
    }, []);

    const navigation = [
        { name: 'Anasayfa', href: '/' },
        { name: 'Mağaza', href: '/store' },
        // { name: 'Blog', href: '/blog' }, // Geçici olarak pasif
        { name: 'Etkinlikler', href: '/events' },
        { name: 'Hakkımızda', href: '/about' },
        { name: 'İletişim', href: '/contact' },
        { name: 'Admin', href: '/admin' },
    ];

    return (
        <nav className="navbar navbar-expand-lg sticky-top" style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            zIndex: 1000
        }}>
            <div className="container">
                {/* Logo */}
                <Link href="/" className="navbar-brand" style={{
                    color: '#4299e1',
                    fontWeight: '700',
                    fontSize: '1.5rem'
                }}>
                    <i className="fas fa-book me-2"></i>
                    Kvasir Dergi
                </Link>

                {/* Mobile toggle */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    style={{
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        padding: '0.5rem'
                    }}
                >
                    <span style={{
                        background: 'linear-gradient(45deg, #666, #666)',
                        width: '20px',
                        height: '2px',
                        display: 'block',
                        position: 'relative'
                    }}></span>
                    <span style={{
                        background: 'linear-gradient(45deg, #666, #666)',
                        width: '20px',
                        height: '2px',
                        display: 'block',
                        margin: '4px 0'
                    }}></span>
                    <span style={{
                        background: 'linear-gradient(45deg, #666, #666)',
                        width: '20px',
                        height: '2px',
                        display: 'block'
                    }}></span>
                </button>

                {/* Menu */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {navigation.map((item) => (
                            <li key={item.name} className="nav-item">
                                <Link
                                    href={item.href}
                                    className="nav-link"
                                    style={{
                                        display: 'block',
                                        color: item.name === 'Admin' ? '#ed8936' : '#2d3748',
                                        textDecoration: 'none',
                                        padding: '0.75rem 1rem',
                                        borderRadius: '8px',
                                        margin: '0 0.25rem',
                                        fontWeight: '500',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.target as HTMLAnchorElement).style.background = '#f7fafc';
                                        (e.target as HTMLAnchorElement).style.color = '#4299e1';
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.target as HTMLAnchorElement).style.background = 'transparent';
                                        (e.target as HTMLAnchorElement).style.color = item.name === 'Admin' ? '#ed8936' : '#2d3748';
                                    }}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Sepet */}
                    <div className="d-flex">
                        <Link
                            href="/cart"
                            className="btn position-relative"
                            style={{
                                background: 'linear-gradient(135deg, #4299e1, #63b3ed)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '10px',
                                padding: '0.75rem 1.5rem',
                                fontWeight: '500',
                                boxShadow: '0 2px 4px rgba(66, 153, 225, 0.3)',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                (e.target as HTMLAnchorElement).style.transform = 'translateY(-1px)';
                                (e.target as HTMLAnchorElement).style.boxShadow = '0 4px 6px rgba(66, 153, 225, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                (e.target as HTMLAnchorElement).style.transform = 'translateY(0)';
                                (e.target as HTMLAnchorElement).style.boxShadow = '0 2px 4px rgba(66, 153, 225, 0.3)';
                            }}
                        >
                            <i className="fas fa-shopping-cart me-2"></i>
                            Sepet
                            {mounted && getTotalItems() > 0 && (
                                <span
                                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                                    style={{
                                        background: '#f56565',
                                        color: 'white',
                                        fontSize: '0.75rem',
                                        padding: '0.25rem 0.5rem'
                                    }}
                                >
                                    {getTotalItems()}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
