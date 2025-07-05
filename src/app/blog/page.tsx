'use client';

import Link from 'next/link';

export default function Blog() {
    // Mock blog posts data
    const blogPosts = [
        {
            id: '1',
            title: 'Modern Türk Edebiyatında Yeni Sesler',
            excerpt: 'Günümüz edebiyat dünyasında öne çıkan genç yazarlar ve eserleri üzerine bir inceleme...',
            author: 'Dr. Ayşe Demir',
            publishDate: '2025-06-15',
            featuredImage: '/images/blog/modern-edebiyat.jpg',
            category: 'edebiyat',
            readTime: '8 dakika'
        },
        {
            id: '2',
            title: 'Dijital Çağda Sanat: NFT ve Blockchain',
            excerpt: 'Sanat dünyasını dönüştüren teknolojiler ve gelecek için öngörüler...',
            author: 'Murat Kaya',
            publishDate: '2025-06-10',
            featuredImage: '/images/blog/dijital-sanat.jpg',
            category: 'sanat',
            readTime: '12 dakika'
        },
        {
            id: '3',
            title: 'Kahve Kültürü: İstanbul\'un Gizli Mekanları',
            excerpt: 'Şehrin saklı kahve dükkanları ve her birinin kendine özgü hikayesi...',
            author: 'Zeynep Öztürk',
            publishDate: '2025-06-05',
            featuredImage: '/images/blog/kahve-kultur.jpg',
            category: 'kultur',
            readTime: '6 dakika'
        },
        {
            id: '4',
            title: 'Minimalist Yaşam: Az İle Çok Olmak',
            excerpt: 'Modern hayatın karmaşasından uzaklaşarak sade bir yaşam tarzı benimseyen insanların deneyimleri...',
            author: 'Can Arslan',
            publishDate: '2025-05-28',
            featuredImage: '/images/blog/minimalist-yasam.jpg',
            category: 'yasamBicimi',
            readTime: '10 dakika'
        }
    ];

    const getCategoryName = (category: string) => {
        switch (category) {
            case 'edebiyat': return 'Edebiyat';
            case 'sanat': return 'Sanat';
            case 'kultur': return 'Kültür';
            case 'yasamBicimi': return 'Yaşam Biçimi';
            default: return category;
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'edebiyat': return 'bg-primary';
            case 'sanat': return 'bg-success';
            case 'kultur': return 'bg-warning';
            case 'yasamBicimi': return 'bg-info';
            default: return 'bg-secondary';
        }
    };

    return (
        <div>
            {/* Hero Section */}
            <section className="bg-primary text-white py-5">
                <div className="container text-center">
                    <h1 className="display-4 fw-bold mb-4">
                        <i className="fas fa-pen-fancy me-3"></i>
                        Blog
                    </h1>
                    <p className="lead">
                        Edebiyat, sanat ve kültür dünyasından güncel yazılar, analizler ve röportajlar
                    </p>
                </div>
            </section>

            {/* Featured Post */}
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card shadow-lg border-0">
                                <div className="row g-0">
                                    <div className="col-md-6">
                                        <div
                                            className="h-100 d-flex align-items-center justify-content-center text-white"
                                            style={{
                                                background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
                                                minHeight: '300px'
                                            }}
                                        >
                                            <div className="text-center">
                                                <i className="fas fa-star fa-3x mb-3"></i>
                                                <h5>Öne Çıkan Yazı</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card-body p-5">
                                            <span className={`badge ${getCategoryColor(blogPosts[0].category)} mb-3`}>
                                                {getCategoryName(blogPosts[0].category)}
                                            </span>
                                            <h2 className="card-title h3 fw-bold mb-3">{blogPosts[0].title}</h2>
                                            <p className="card-text text-muted mb-4">{blogPosts[0].excerpt}</p>
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <div className="text-muted small">
                                                    <i className="fas fa-user me-1"></i>
                                                    {blogPosts[0].author}
                                                </div>
                                                <div className="text-muted small">
                                                    <i className="fas fa-clock me-1"></i>
                                                    {blogPosts[0].readTime}
                                                </div>
                                            </div>
                                            <Link href={`/blog/${blogPosts[0].id}`} className="btn btn-primary">
                                                <i className="fas fa-arrow-right me-2"></i>
                                                Devamını Oku
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <h2 className="h3 fw-bold mb-4">
                                <i className="fas fa-newspaper me-2 text-primary"></i>
                                Son Yazılar
                            </h2>

                            <div className="row">
                                {blogPosts.slice(1).map((post) => (
                                    <div key={post.id} className="col-md-6 mb-4">
                                        <article className="card h-100 shadow-sm">
                                            <div
                                                className="card-img-top d-flex align-items-center justify-content-center text-white"
                                                style={{
                                                    height: '200px',
                                                    background: 'linear-gradient(45deg, #059669, #10b981)'
                                                }}
                                            >
                                                <i className="fas fa-file-alt fa-2x"></i>
                                            </div>

                                            <div className="card-body d-flex flex-column">
                                                <span className={`badge ${getCategoryColor(post.category)} mb-2 align-self-start`}>
                                                    {getCategoryName(post.category)}
                                                </span>
                                                <h5 className="card-title">{post.title}</h5>
                                                <p className="card-text text-muted flex-grow-1">{post.excerpt}</p>

                                                <div className="d-flex justify-content-between align-items-center text-muted small mb-3">
                                                    <span>
                                                        <i className="fas fa-user me-1"></i>
                                                        {post.author}
                                                    </span>
                                                    <span>
                                                        <i className="fas fa-clock me-1"></i>
                                                        {post.readTime}
                                                    </span>
                                                </div>

                                                <Link href={`/blog/${post.id}`} className="btn btn-outline-primary btn-sm">
                                                    <i className="fas fa-eye me-1"></i>
                                                    Oku
                                                </Link>
                                            </div>
                                        </article>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            <nav aria-label="Blog pagination" className="mt-5">
                                <ul className="pagination justify-content-center">
                                    <li className="page-item disabled">
                                        <span className="page-link">Önceki</span>
                                    </li>
                                    <li className="page-item active">
                                        <span className="page-link">1</span>
                                    </li>
                                    <li className="page-item">
                                        <Link className="page-link" href="/blog?page=2">2</Link>
                                    </li>
                                    <li className="page-item">
                                        <Link className="page-link" href="/blog?page=3">3</Link>
                                    </li>
                                    <li className="page-item">
                                        <Link className="page-link" href="/blog?page=2">Sonraki</Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        {/* Sidebar */}
                        <div className="col-lg-4">
                            <div className="sticky-top" style={{ top: '100px' }}>
                                {/* Categories */}
                                <div className="card mb-4">
                                    <div className="card-header bg-primary text-white">
                                        <h5 className="card-title mb-0">
                                            <i className="fas fa-tags me-2"></i>
                                            Kategoriler
                                        </h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="d-flex flex-column gap-2">
                                            <Link href="/blog?category=edebiyat" className="btn btn-outline-primary btn-sm">
                                                Edebiyat <span className="badge bg-primary ms-2">12</span>
                                            </Link>
                                            <Link href="/blog?category=sanat" className="btn btn-outline-success btn-sm">
                                                Sanat <span className="badge bg-success ms-2">8</span>
                                            </Link>
                                            <Link href="/blog?category=kultur" className="btn btn-outline-warning btn-sm">
                                                Kültür <span className="badge bg-warning ms-2">15</span>
                                            </Link>
                                            <Link href="/blog?category=yasamBicimi" className="btn btn-outline-info btn-sm">
                                                Yaşam Biçimi <span className="badge bg-info ms-2">6</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Newsletter */}
                                <div className="card mb-4">
                                    <div className="card-header bg-warning text-dark">
                                        <h5 className="card-title mb-0">
                                            <i className="fas fa-envelope me-2"></i>
                                            Haber Bülteni
                                        </h5>
                                    </div>
                                    <div className="card-body">
                                        <p className="small text-muted mb-3">
                                            Yeni yazılarımızdan haberdar olmak için abone olun!
                                        </p>
                                        <form>
                                            <div className="mb-3">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="E-posta adresiniz"
                                                />
                                            </div>
                                            <button type="submit" className="btn btn-warning w-100">
                                                <i className="fas fa-paper-plane me-2"></i>
                                                Abone Ol
                                            </button>
                                        </form>
                                    </div>
                                </div>

                                {/* Popular Posts */}
                                <div className="card">
                                    <div className="card-header bg-success text-white">
                                        <h5 className="card-title mb-0">
                                            <i className="fas fa-fire me-2"></i>
                                            Popüler Yazılar
                                        </h5>
                                    </div>
                                    <div className="card-body p-0">
                                        <div className="list-group list-group-flush">
                                            {blogPosts.slice(0, 3).map((post, index) => (
                                                <Link key={post.id} href={`/blog/${post.id}`} className="list-group-item list-group-item-action">
                                                    <div className="d-flex align-items-center">
                                                        <span className="badge bg-success me-3">{index + 1}</span>
                                                        <div>
                                                            <h6 className="mb-1 small">{post.title}</h6>
                                                            <small className="text-muted">{post.readTime}</small>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
