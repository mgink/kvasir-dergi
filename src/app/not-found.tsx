import Link from 'next/link';

export default function NotFound() {
    return (
        <div style={{ background: '#fafafa', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8 text-center">
                        {/* 404 Number */}
                        <div style={{
                            fontSize: '8rem',
                            fontWeight: '800',
                            background: 'linear-gradient(135deg, #4299e1, #667eea)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            lineHeight: '1',
                            marginBottom: '2rem'
                        }}>
                            404
                        </div>

                        {/* Icon */}
                        <div style={{
                            fontSize: '4rem',
                            color: '#cbd5e0',
                            marginBottom: '2rem'
                        }}>
                            <i className="fas fa-book-open"></i>
                        </div>

                        {/* Title */}
                        <h1 style={{
                            fontSize: '2.5rem',
                            fontWeight: '700',
                            color: '#2d3748',
                            marginBottom: '1rem'
                        }}>
                            Sayfa Bulunamadı
                        </h1>

                        {/* Description */}
                        <p style={{
                            fontSize: '1.2rem',
                            color: '#718096',
                            marginBottom: '3rem',
                            lineHeight: '1.6'
                        }}>
                            Aradığınız sayfa mevcut değil. Silinmiş, taşınmış veya hiç var olmamış olabilir.
                            Ana sayfaya dönüp tekrar deneyebilirsiniz.
                        </p>

                        {/* Action Buttons */}
                        <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                            <Link
                                href="/"
                                className="btn btn-primary btn-lg d-flex align-items-center justify-content-center"
                                style={{
                                    background: 'linear-gradient(135deg, #4299e1, #63b3ed)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    padding: '1rem 2rem',
                                    fontSize: '1.1rem',
                                    fontWeight: '600',
                                    textDecoration: 'none',
                                    minWidth: '180px'
                                }}
                            >
                                <i className="fas fa-home me-2"></i>
                                Ana Sayfa
                            </Link>

                            <Link
                                href="/store"
                                className="btn btn-outline-primary btn-lg d-flex align-items-center justify-content-center"
                                style={{
                                    borderColor: '#4299e1',
                                    color: '#4299e1',
                                    borderRadius: '12px',
                                    padding: '1rem 2rem',
                                    fontSize: '1.1rem',
                                    fontWeight: '600',
                                    textDecoration: 'none',
                                    minWidth: '180px'
                                }}
                            >
                                <i className="fas fa-store me-2"></i>
                                Mağaza
                            </Link>
                        </div>

                        {/* Additional Links */}
                        <div style={{
                            marginTop: '3rem',
                            padding: '2rem',
                            background: 'white',
                            borderRadius: '16px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                        }}>
                            <h5 style={{
                                color: '#4a5568',
                                marginBottom: '1.5rem',
                                fontWeight: '600'
                            }}>
                                Popüler Sayfalar
                            </h5>

                            <div className="row text-start">
                                <div className="col-sm-6 mb-3">
                                    <Link
                                        href="/about"
                                        className="d-flex align-items-center text-decoration-none"
                                        style={{ color: '#718096' }}
                                    >
                                        <i className="fas fa-info-circle me-2 text-primary"></i>
                                        Hakkımızda
                                    </Link>
                                </div>
                                <div className="col-sm-6 mb-3">
                                    <Link
                                        href="/contact"
                                        className="d-flex align-items-center text-decoration-none"
                                        style={{ color: '#718096' }}
                                    >
                                        <i className="fas fa-envelope me-2 text-primary"></i>
                                        İletişim
                                    </Link>
                                </div>
                                <div className="col-sm-6 mb-3">
                                    <Link
                                        href="/cart"
                                        className="d-flex align-items-center text-decoration-none"
                                        style={{ color: '#718096' }}
                                    >
                                        <i className="fas fa-shopping-cart me-2 text-primary"></i>
                                        Sepet
                                    </Link>
                                </div>
                                <div className="col-sm-6 mb-3">
                                    <Link
                                        href="/admin"
                                        className="d-flex align-items-center text-decoration-none"
                                        style={{ color: '#718096' }}
                                    >
                                        <i className="fas fa-cog me-2 text-primary"></i>
                                        Admin Panel
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Help Text */}
                        <p style={{
                            marginTop: '2rem',
                            color: '#a0aec0',
                            fontSize: '0.9rem'
                        }}>
                            Sorun devam ederse{' '}
                            <Link
                                href="/contact"
                                style={{
                                    color: '#4299e1',
                                    textDecoration: 'none'
                                }}
                            >
                                bizimle iletişime geçin
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
