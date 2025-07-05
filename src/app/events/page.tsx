'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useToast } from '@/components/Toast';

export default function Events() {
    const { showToast } = useToast();

    // Mock events data
    const [events] = useState([
        {
            id: '1',
            title: 'Modern Şiir Atölyesi',
            description: 'Çağdaş şiir teknikleri ve yaratıcı yazım süreçleri üzerine interaktif atölye çalışması.',
            date: '2025-07-15',
            time: '19:00',
            location: 'Kvasir Dergi Merkezi, Kadıköy',
            type: 'workshop' as const,
            price: 150,
            maxAttendees: 20,
            currentAttendees: 12,
            imageUrl: '/images/events/siir-atolyesi.jpg',
            isActive: true,
            instructor: 'Prof. Dr. Metin Celal',
            duration: '3 saat'
        },
        {
            id: '2',
            title: 'Kitap Lansmanı: "Şehrin Sesi"',
            description: 'Ödüllü yazar Ayşe Kulin\'in yeni romanının tanıtım etkinliği ve imza günü.',
            date: '2025-07-08',
            time: '18:30',
            location: 'Beyoğlu Sanat Merkezi',
            type: 'launch' as const,
            price: 0,
            maxAttendees: 100,
            currentAttendees: 85,
            imageUrl: '/images/events/kitap-lansman.jpg',
            isActive: true,
            instructor: 'Ayşe Kulin',
            duration: '2 saat'
        },
        {
            id: '3',
            title: 'Edebiyat Sohbetleri',
            description: 'Ünlü yazarlar ve eleştirmenlerle güncel edebiyat üzerine açık oturum.',
            date: '2025-07-22',
            time: '20:00',
            location: 'Galata Kültür Merkezi',
            type: 'discussion' as const,
            price: 75,
            maxAttendees: 50,
            currentAttendees: 28,
            imageUrl: '/images/events/edebiyat-sohbet.jpg',
            isActive: true,
            instructor: 'Çeşitli Konuşmacılar',
            duration: '2.5 saat'
        },
        {
            id: '4',
            title: 'Sanat Tarihi Semineri',
            description: 'Türk resim sanatının gelişimi ve çağdaş sanat akımları üzerine detaylı sunum.',
            date: '2025-07-30',
            time: '14:00',
            location: 'İstanbul Modern Eğitim Salonu',
            type: 'reading' as const,
            price: 200,
            maxAttendees: 30,
            currentAttendees: 15,
            imageUrl: '/images/events/sanat-tarihi.jpg',
            isActive: true,
            instructor: 'Dr. Selma Öztürk',
            duration: '4 saat'
        }
    ]);

    const getEventTypeText = (type: string) => {
        switch (type) {
            case 'workshop': return 'Atölye';
            case 'reading': return 'Sunum';
            case 'launch': return 'Lansman';
            case 'discussion': return 'Söyleşi';
            default: return type;
        }
    };

    const getEventTypeColor = (type: string) => {
        switch (type) {
            case 'workshop': return 'bg-primary';
            case 'reading': return 'bg-success';
            case 'launch': return 'bg-warning';
            case 'discussion': return 'bg-info';
            default: return 'bg-secondary';
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const handleRegister = (eventId: string, eventTitle: string, price: number) => {
        if (price === 0) {
            showToast(`${eventTitle} etkinliğine ücretsiz kaydınız alındı!`, 'success');
        } else {
            showToast(`${eventTitle} etkinliği için ödeme sayfasına yönlendiriliyorsunuz...`, 'info');
        }
    };

    const getAvailabilityStatus = (current: number, max: number) => {
        const percentage = (current / max) * 100;
        if (percentage >= 90) return { text: 'Neredeyse Dolu', color: 'text-danger' };
        if (percentage >= 70) return { text: 'Sınırlı Yer', color: 'text-warning' };
        return { text: 'Müsait', color: 'text-success' };
    };

    return (
        <div>
            {/* Hero Section */}
            <section className="bg-primary text-white py-5">
                <div className="container text-center">
                    <h1 className="display-4 fw-bold mb-4">
                        <i className="fas fa-calendar-alt me-3"></i>
                        Etkinlikler
                    </h1>
                    <p className="lead">
                        Edebiyat, sanat ve kültür dünyasından zengin etkinlik programımız
                    </p>
                </div>
            </section>

            {/* Filter Section */}
            <section className="py-4 bg-light">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <h5 className="mb-0">
                                <i className="fas fa-filter me-2 text-primary"></i>
                                Etkinlik Filtreleri
                            </h5>
                        </div>
                        <div className="col-md-6">
                            <div className="d-flex gap-2 flex-wrap justify-content-md-end">
                                <button className="btn btn-outline-primary btn-sm active">Tümü</button>
                                <button className="btn btn-outline-primary btn-sm">Atölyeler</button>
                                <button className="btn btn-outline-primary btn-sm">Lansmanlar</button>
                                <button className="btn btn-outline-primary btn-sm">Söyleşiler</button>
                                <button className="btn btn-outline-primary btn-sm">Ücretsiz</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Events Grid */}
            <section className="py-5">
                <div className="container">
                    <div className="row">
                        {events.map((event) => {
                            const availability = getAvailabilityStatus(event.currentAttendees, event.maxAttendees);
                            return (
                                <div key={event.id} className="col-lg-6 mb-4">
                                    <div className="card h-100 shadow-sm">
                                        <div className="row g-0 h-100">
                                            <div className="col-md-4">
                                                <div
                                                    className="h-100 d-flex align-items-center justify-content-center text-white position-relative"
                                                    style={{
                                                        background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
                                                        minHeight: '200px'
                                                    }}
                                                >
                                                    <div className="text-center">
                                                        <i className="fas fa-calendar-check fa-2x mb-2"></i>
                                                        <div className="fw-bold">{formatDate(event.date).split(' ')[0]}</div>
                                                        <div className="small">{formatDate(event.date).split(' ').slice(1).join(' ')}</div>
                                                    </div>

                                                    <span className={`position-absolute top-0 start-0 badge ${getEventTypeColor(event.type)} m-2`}>
                                                        {getEventTypeText(event.type)}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="col-md-8">
                                                <div className="card-body d-flex flex-column h-100">
                                                    <div className="flex-grow-1">
                                                        <h5 className="card-title fw-bold">{event.title}</h5>
                                                        <p className="card-text text-muted small mb-3">
                                                            {event.description}
                                                        </p>

                                                        <div className="mb-3">
                                                            <div className="small text-muted mb-1">
                                                                <i className="fas fa-clock me-1"></i>
                                                                {event.time} • {event.duration}
                                                            </div>
                                                            <div className="small text-muted mb-1">
                                                                <i className="fas fa-map-marker-alt me-1"></i>
                                                                {event.location}
                                                            </div>
                                                            <div className="small text-muted mb-1">
                                                                <i className="fas fa-user-tie me-1"></i>
                                                                {event.instructor}
                                                            </div>
                                                        </div>

                                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                                            <div>
                                                                {event.price === 0 ? (
                                                                    <span className="badge bg-success">Ücretsiz</span>
                                                                ) : (
                                                                    <span className="fw-bold text-primary">₺{event.price}</span>
                                                                )}
                                                            </div>
                                                            <div className="text-end">
                                                                <div className={`small fw-bold ${availability.color}`}>
                                                                    {availability.text}
                                                                </div>
                                                                <div className="small text-muted">
                                                                    {event.currentAttendees}/{event.maxAttendees} kişi
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Progress Bar */}
                                                        <div className="mb-3">
                                                            <div className="progress" style={{ height: '4px' }}>
                                                                <div
                                                                    className="progress-bar"
                                                                    style={{
                                                                        width: `${(event.currentAttendees / event.maxAttendees) * 100}%`,
                                                                        backgroundColor: availability.color === 'text-danger' ? '#dc3545' : availability.color === 'text-warning' ? '#ffc107' : '#28a745'
                                                                    }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="d-flex gap-2">
                                                        <button
                                                            className="btn btn-primary btn-sm flex-grow-1"
                                                            onClick={() => handleRegister(event.id, event.title, event.price)}
                                                            disabled={event.currentAttendees >= event.maxAttendees}
                                                        >
                                                            {event.currentAttendees >= event.maxAttendees ? (
                                                                <>
                                                                    <i className="fas fa-times me-1"></i>
                                                                    Dolu
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <i className="fas fa-ticket-alt me-1"></i>
                                                                    Kayıt Ol
                                                                </>
                                                            )}
                                                        </button>
                                                        <Link
                                                            href={`/events/${event.id}`}
                                                            className="btn btn-outline-primary btn-sm"
                                                        >
                                                            <i className="fas fa-info-circle"></i>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Call to Action */}
                    <div className="row mt-5">
                        <div className="col-12">
                            <div className="card bg-primary text-white">
                                <div className="card-body text-center py-5">
                                    <h3 className="card-title">
                                        <i className="fas fa-bullhorn me-3"></i>
                                        Özel Etkinlik Önerisi
                                    </h3>
                                    <p className="card-text lead mb-4">
                                        Etkinlik programımızdan haberdar olmak için bültenimize abone olun!
                                    </p>
                                    <div className="row justify-content-center">
                                        <div className="col-md-6">
                                            <div className="input-group">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="E-posta adresiniz"
                                                />
                                                <button className="btn btn-warning" type="button">
                                                    <i className="fas fa-paper-plane me-1"></i>
                                                    Abone Ol
                                                </button>
                                            </div>
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
