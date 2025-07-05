'use client';

import Link from 'next/link';

export default function FeaturedArticles() {
    const featuredArticles = [
        {
            id: '1',
            title: 'Dijital Çağda Edebiyatın Geleceği',
            excerpt: 'Teknolojinin edebiyat dünyasına etkileri ve gelecek için öngörüler...',
            author: 'Dr. Ayşe Demir',
            readTime: '8 dakika',
            category: 'Edebiyat',
            image: 'linear-gradient(45deg, #667eea, #764ba2)',
            isNew: true
        },
        {
            id: '2',
            title: 'İstanbul\'un Saklı Sanat Mekanları',
            excerpt: 'Şehrin gizli kalmış galeri ve atölyeleri keşfetmeye davet ediyoruz...',
            author: 'Murat Kaya',
            readTime: '12 dakika',
            category: 'Sanat',
            image: 'linear-gradient(45deg, #f093fb, #f5576c)',
            isNew: false
        },
        {
            id: '3',
            title: 'Modern Şiirde Yeni Akımlar',
            excerpt: 'Günümüz şiirinde öne çıkan yeni eğilimler ve temsilcileri...',
            author: 'Prof. Metin Celal',
            readTime: '6 dakika',
            category: 'Edebiyat',
            image: 'linear-gradient(45deg, #4facfe, #00f2fe)',
            isNew: true
        }
    ];

    return (
        <section className="py-5">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="display-5 fw-bold text-dark mb-3">
                        <i className="fas fa-star me-3 text-warning"></i>
                        Öne Çıkan Yazılar
                    </h2>
                    <p className="lead text-muted">En popüler ve güncel makalelerimiz</p>
                </div>

                <div className="row">
                    {featuredArticles.map((article) => (
                        <div key={article.id} className="col-lg-4 col-md-6 mb-4">
                            <article className="card h-100 shadow-sm position-relative">
                                {article.isNew && (
                                    <span className="position-absolute top-0 start-0 badge bg-success m-3 z-1">
                                        <i className="fas fa-fire me-1"></i>
                                        Yeni
                                    </span>
                                )}

                                <div
                                    className="card-img-top d-flex align-items-center justify-content-center text-white position-relative"
                                    style={{
                                        height: '200px',
                                        background: article.image
                                    }}
                                >
                                    <div className="text-center">
                                        <i className="fas fa-file-alt fa-2x mb-2"></i>
                                        <div className="badge bg-white text-dark">
                                            {article.category}
                                        </div>
                                    </div>
                                </div>

                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title fw-bold">{article.title}</h5>
                                    <p className="card-text text-muted flex-grow-1">{article.excerpt}</p>

                                    <div className="d-flex justify-content-between align-items-center text-muted small mb-3">
                                        <span>
                                            <i className="fas fa-user me-1"></i>
                                            {article.author}
                                        </span>
                                        <span>
                                            <i className="fas fa-clock me-1"></i>
                                            {article.readTime}
                                        </span>
                                    </div>

                                    <Link
                                        href={`/blog/${article.id}`}
                                        className="btn btn-primary btn-sm"
                                    >
                                        <i className="fas fa-arrow-right me-1"></i>
                                        Devamını Oku
                                    </Link>
                                </div>
                            </article>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-4">
                    <Link
                        href="/blog"
                        className="btn btn-outline-primary btn-lg px-4"
                    >
                        <i className="fas fa-pen-fancy me-2"></i>
                        Tüm Yazıları Görüntüle
                    </Link>
                </div>
            </div>
        </section>
    );
}
