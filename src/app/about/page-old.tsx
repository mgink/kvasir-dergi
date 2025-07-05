'use client';

import { useState, useEffect } from 'react';
import Statistics from '@/components/Statistics';
import { aboutData } from '@/data/mockData';
import type { AboutData } from '@/data/mockData';

export default function About() {
    const [about, setAbout] = useState<AboutData>(aboutData);

    // Simüle local storage veya API'den veri çekme
    useEffect(() => {
        // Gerçek uygulamada burada API'den about verilerini çekeriz
        // Şimdilik localStorage kontrol ediyoruz
        const savedAbout = localStorage.getItem('adminAbout');
        if (savedAbout) {
            try {
                setAbout(JSON.parse(savedAbout));
            } catch (error) {
                console.error('About verileri parse edilemedi:', error);
            }
        }
    }, []);

    return (
        <div>
            {/* Hero Section */}
            <section className="bg-primary text-white py-5">
                <div className="container text-center">
                    <h1 className="display-4 fw-bold mb-4">{about.title}</h1>
                    <p className="lead">
                        Edebiyat, sanat ve kültür dünyasında iz bırakan bir dergi
                    </p>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <h2 className="h2 fw-bold text-dark mb-4">
                                <i className="fas fa-book-open me-3 text-primary"></i>
                                Hikayemiz
                            </h2>

                            <p className="text-muted mb-4">
                                {about.content}
                            </p>

                            <p className="text-muted mb-4">
                                {about.history}
                            </p>

                            <h3 className="h4 fw-bold text-dark mb-3 mt-5">
                                <i className="fas fa-bullseye me-2 text-success"></i>
                                Misyonumuz
                            </h3>
                            <p className="text-muted mb-4">
                                {about.mission}
                            </p>

                            <h3 className="h4 fw-bold text-dark mb-3 mt-5">
                                <i className="fas fa-eye me-2 text-info"></i>
                                Vizyonumuz
                            </h3>
                            <p className="text-muted mb-4">
                                {about.vision}
                            </p>

                            {/* Values Section */}
                            <h3 className="h4 fw-bold text-dark mb-3 mt-5">
                                <i className="fas fa-heart me-2 text-danger"></i>
                                Değerlerimiz
                            </h3>
                            <div className="row">
                                {about.values.map((value, index) => (
                                    <div key={index} className="col-md-6 mb-3">
                                        <div className="d-flex align-items-center">
                                            <i className="fas fa-check-circle text-success me-2"></i>
                                            <span className="text-muted">{value}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics */}
            <Statistics />

            {/* Team */}
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="h2 fw-bold text-dark mb-4">
                            <i className="fas fa-users me-3 text-primary"></i>
                            Ekibimiz
                        </h2>
                        <p className="lead text-muted">
                            Kvasir Dergi&apos;yi yaşatan tutkulu profesyoneller
                        </p>
                    </div>

                    <div className="row justify-content-center">
                        {about.team.map((member, index) => (
                            <div key={index} className="col-lg-4 col-md-6 mb-4">
                                <div className="card h-100 shadow-sm border-0">
                                    <div className="card-body text-center p-4">
                                        <div 
                                            className={`w-24 h-24 mx-auto mb-4 rounded-full d-flex align-items-center justify-content-center text-white fs-3 fw-bold`}
                                            style={{
                                                width: '96px',
                                                height: '96px',
                                                background: `linear-gradient(135deg, ${
                                                    index % 3 === 0 ? '#667eea, #764ba2' :
                                                    index % 3 === 1 ? '#f093fb, #f5576c' :
                                                    '#4facfe, #00f2fe'
                                                })`
                                            }}
                                        >
                                            {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                        </div>
                                        <h3 className="h5 fw-bold text-dark mb-2">{member.name}</h3>
                                        <p className="text-primary fw-semibold mb-2">{member.position}</p>
                                        <p className="text-muted small">{member.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Elif Demir</h3>
                            <p className="text-indigo-600 font-medium mb-2">Sanat Yönetmeni</p>
                            <p className="text-gray-600 text-sm">
                                Görsel sanatlar alanındaki uzmanlığı ile derginin estetik kalitesini sağlıyor.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Değerlerimiz</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-indigo-600 text-2xl">🎯</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Kalite</h3>
                            <p className="text-gray-600">
                                Her sayımızda en yüksek editoryal ve sanatsal standartları koruyoruz.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-indigo-600 text-2xl">🌱</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Yenilik</h3>
                            <p className="text-gray-600">
                                Geleneksel değerleri korurken çağdaş yaklaşımları destekliyoruz.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-indigo-600 text-2xl">🤝</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Topluluk</h3>
                            <p className="text-gray-600">
                                Okuyucularımız ve yazarlarımızla güçlü bir kültürel topluluk oluşturuyoruz.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-indigo-600 text-2xl">🌍</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Evrensellik</h3>
                            <p className="text-gray-600">
                                Yerel kültürümüzü evrensel değerlerle buluşturarak köprüler kuruyoruz.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
