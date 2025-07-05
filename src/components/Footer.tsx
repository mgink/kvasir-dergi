'use client';

import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-dark text-white py-4 mt-auto">
            <div className="container">
                <div className="row">
                    {/* Brand */}
                    <div className="col-md-6 mb-3">
                        <h5 className="text-warning mb-3">
                            <i className="fas fa-book me-2"></i>
                            Kvasir Dergi
                        </h5>
                        <p className="text-light mb-3">
                            Edebiyat, sanat ve kültür dünyasından en güncel içerikleri sunan dergi.
                        </p>
                        <div className="d-flex gap-3">
                            <a href="#" className="text-light">
                                <i className="fab fa-facebook fa-lg"></i>
                            </a>
                            <a href="#" className="text-light">
                                <i className="fab fa-twitter fa-lg"></i>
                            </a>
                            <a href="#" className="text-light">
                                <i className="fab fa-instagram fa-lg"></i>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-md-3 mb-3">
                        <h6 className="text-warning mb-3">Hızlı Linkler</h6>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Link href="/" className="text-light text-decoration-none">
                                    Anasayfa
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/store" className="text-light text-decoration-none">
                                    Mağaza
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/blog" className="text-light text-decoration-none">
                                    Blog
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/contact" className="text-light text-decoration-none">
                                    İletişim
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="col-md-3 mb-3">
                        <h6 className="text-warning mb-3">İletişim</h6>
                        <p className="text-light mb-2">
                            <i className="fas fa-envelope me-2"></i>
                            info@kvasirdergi.com
                        </p>
                        <p className="text-light mb-2">
                            <i className="fas fa-phone me-2"></i>
                            +90 212 123 45 67
                        </p>
                        <p className="text-light mb-0">
                            <i className="fas fa-map-marker-alt me-2"></i>
                            İstanbul, Türkiye
                        </p>
                    </div>
                </div>

                <hr className="border-secondary my-4" />
                
                <div className="text-center text-muted">
                    <p className="mb-0">
                        &copy; 2025 Kvasir Dergi. Tüm hakları saklıdır.
                    </p>
                </div>
            </div>
        </footer>
    );
}
