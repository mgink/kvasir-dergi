import Link from 'next/link';
import { magazines } from '@/data/mockData';

export default function Home() {
    const latestMagazines = magazines.slice(0, 3);

    return (
        <div>
            {/* Hero Section */}
            <section className="bg-primary text-white py-5">
                <div className="container text-center py-5">
                    <h1 className="display-4 fw-bold mb-4">
                        <i className="fas fa-book me-3 text-warning"></i>
                        Kvasir Dergi
                    </h1>
                    <p className="lead mb-4">
                        Edebiyat, sanat ve kültür dünyasından en güncel içerikleri keşfedin
                    </p>
                    <div className="d-flex gap-3 justify-content-center">
                        <Link href="/store" className="btn btn-warning btn-lg">
                            <i className="fas fa-store me-2"></i>
                            Mağaza
                        </Link>
                        <Link href="/about" className="btn btn-outline-light btn-lg">
                            <i className="fas fa-info-circle me-2"></i>
                            Hakkımızda
                        </Link>
                    </div>
                </div>
            </section>

            {/* Latest Issues */}
            <section className="py-5">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="h2 fw-bold mb-3">
                            <i className="fas fa-newspaper me-3 text-primary"></i>
                            Son Sayılar
                        </h2>
                        <p className="text-muted">En güncel dergi sayılarımızı inceleyin</p>
                    </div>

                    <div className="row">
                        {latestMagazines.map((magazine) => (
                            <div key={magazine.id} className="col-md-4 mb-4">
                                <div className="card h-100 shadow-sm">
                                    <div 
                                        className="card-img-top d-flex align-items-center justify-content-center text-white fw-bold"
                                        style={{ 
                                            height: '200px', 
                                            background: 'linear-gradient(45deg, #6366f1, #8b5cf6)' 
                                        }}
                                    >
                                        <span className="h4">Sayı {magazine.issue}</span>
                                    </div>
                                    
                                    <div className="card-body">
                                        <h5 className="card-title">Sayı {magazine.issue}</h5>
                                        <p className="card-text text-muted">
                                            {magazine.description.substring(0, 100)}...
                                        </p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <strong className="text-primary">₺{magazine.price}</strong>
                                            <Link href="/store" className="btn btn-primary btn-sm">
                                                <i className="fas fa-eye me-1"></i>
                                                İncele
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-4">
                        <Link href="/store" className="btn btn-primary btn-lg">
                            <i className="fas fa-arrow-right me-2"></i>
                            Tüm Sayıları Görüntüle
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="h2 fw-bold mb-3">
                            <i className="fas fa-star me-3 text-warning"></i>
                            Neden Kvasir Dergi?
                        </h2>
                    </div>

                    <div className="row">
                        <div className="col-md-4 mb-4 text-center">
                            <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" 
                                 style={{ width: '64px', height: '64px' }}>
                                <i className="fas fa-book text-white fa-2x"></i>
                            </div>
                            <h5 className="fw-bold mb-2">Kaliteli İçerik</h5>
                            <p className="text-muted">
                                Alanında uzman yazarlardan kaliteli edebiyat, sanat ve kültür içerikleri
                            </p>
                        </div>

                        <div className="col-md-4 mb-4 text-center">
                            <div className="bg-success rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" 
                                 style={{ width: '64px', height: '64px' }}>
                                <i className="fas fa-palette text-white fa-2x"></i>
                            </div>
                            <h5 className="fw-bold mb-2">Sanat Odaklı</h5>
                            <p className="text-muted">
                                Görsel sanatlar, edebiyat ve kültür dünyasından güncel gelişmeler
                            </p>
                        </div>

                        <div className="col-md-4 mb-4 text-center">
                            <div className="bg-info rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" 
                                 style={{ width: '64px', height: '64px' }}>
                                <i className="fas fa-globe text-white fa-2x"></i>
                            </div>
                            <h5 className="fw-bold mb-2">Evrensel Bakış</h5>
                            <p className="text-muted">
                                Yerel ve uluslararası perspektiflerle geniş bir kültürel yelpaze
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
