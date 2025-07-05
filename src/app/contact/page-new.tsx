'use client';

import { useState } from 'react';
import { useToast } from '@/components/Toast';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { showToast } = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            showToast('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.', 'success');
            setIsSubmitting(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 1500);
    };

    return (
        <div>
            {/* Hero Section */}
            <section className="bg-primary text-white py-5">
                <div className="container text-center">
                    <h1 className="display-4 fw-bold mb-4">İletişim</h1>
                    <p className="lead">
                        Bizimle iletişime geçin, sorularınızı yanıtlayalım
                    </p>
                </div>
            </section>

            {/* Contact Content */}
            <section className="py-5">
                <div className="container">
                    <div className="row">
                        {/* Contact Information */}
                        <div className="col-lg-4 mb-5">
                            <h2 className="h3 fw-bold mb-4">
                                <i className="fas fa-info-circle me-2 text-primary"></i>
                                İletişim Bilgileri
                            </h2>

                            <div className="mb-4">
                                <div className="d-flex align-items-center mb-3">
                                    <div className="bg-primary rounded-circle p-3 me-3">
                                        <i className="fas fa-envelope text-white"></i>
                                    </div>
                                    <div>
                                        <h5 className="mb-1">E-posta</h5>
                                        <p className="text-muted mb-0">info@kvasirdergi.com</p>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center mb-3">
                                    <div className="bg-success rounded-circle p-3 me-3">
                                        <i className="fas fa-phone text-white"></i>
                                    </div>
                                    <div>
                                        <h5 className="mb-1">Telefon</h5>
                                        <p className="text-muted mb-0">+90 212 123 45 67</p>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center mb-3">
                                    <div className="bg-info rounded-circle p-3 me-3">
                                        <i className="fas fa-map-marker-alt text-white"></i>
                                    </div>
                                    <div>
                                        <h5 className="mb-1">Adres</h5>
                                        <p className="text-muted mb-0">
                                            Kadıköy Mah. Kültür Sok. No:15<br />
                                            Kadıköy, İstanbul
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <h5 className="fw-bold mb-3">Çalışma Saatleri</h5>
                                <p className="text-muted mb-1">
                                    <i className="fas fa-clock me-2"></i>
                                    Pazartesi - Cuma: 09:00 - 18:00
                                </p>
                                <p className="text-muted mb-0">
                                    <i className="fas fa-clock me-2"></i>
                                    Cumartesi: 10:00 - 15:00
                                </p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="col-lg-8">
                            <div className="card shadow">
                                <div className="card-header bg-primary text-white">
                                    <h4 className="card-title mb-0">
                                        <i className="fas fa-paper-plane me-2"></i>
                                        Bize Mesaj Gönderin
                                    </h4>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Ad Soyad *</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">E-posta *</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    className="form-control"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Konu *</label>
                                            <input
                                                type="text"
                                                name="subject"
                                                className="form-control"
                                                required
                                                value={formData.subject}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label">Mesaj *</label>
                                            <textarea
                                                name="message"
                                                className="form-control"
                                                rows={6}
                                                required
                                                value={formData.message}
                                                onChange={handleChange}
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="btn btn-primary btn-lg"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <i className="fas fa-spinner fa-spin me-2"></i>
                                                    Gönderiliyor...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="fas fa-paper-plane me-2"></i>
                                                    Mesajı Gönder
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="h2 fw-bold">
                            <i className="fas fa-question-circle me-2 text-warning"></i>
                            Sık Sorulan Sorular
                        </h2>
                    </div>

                    <div className="row">
                        <div className="col-lg-8 mx-auto">
                            <div className="accordion" id="faqAccordion">
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                                            Dergi aboneliği nasıl yapılır?
                                        </button>
                                    </h2>
                                    <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body">
                                            Mağaza sayfamızdan istediğiniz sayıları seçebilir, sepete ekleyerek satın alabilirsiniz.
                                            Yıllık abonelik için bizimle iletişime geçebilirsiniz.
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                                            Eski sayıları temin edebilir miyim?
                                        </button>
                                    </h2>
                                    <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body">
                                            Evet! Mağaza sayfamızda mevcut olan tüm eski sayılarımızı bulabilirsiniz.
                                            Stokta olmayan sayılar için bizimle iletişime geçebilirsiniz.
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                                            Dijital versiyon mevcut mu?
                                        </button>
                                    </h2>
                                    <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body">
                                            Seçili sayılarımızın dijital versiyonları mevcuttur.
                                            Bu sayıları mağaza sayfamızda &quot;Dijital Versiyon&quot; etiketi ile görebilirsiniz.
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
