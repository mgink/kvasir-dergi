'use client';

import { useState } from 'react';
import { useCart } from '@/lib/CartContext';
import { useOrders } from '@/lib/OrderContext';
import { useToast } from '@/components/Toast';
import { useRouter } from 'next/navigation';

export default function Checkout() {
    const { items, getTotalPrice, clearCart } = useCart();
    const { addOrder } = useOrders();
    const { showToast } = useToast();
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const orderId = addOrder({
                customerInfo: {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone
                },
                items,
                total: getTotalPrice(),
                status: 'pending',
                shippingAddress: {
                    name: formData.name,
                    address: formData.address,
                    city: formData.city,
                    postalCode: formData.postalCode,
                    phone: formData.phone
                }
            });

            clearCart();
            showToast('Siparişiniz başarıyla oluşturuldu! 🎉', 'success');

            setTimeout(() => {
                router.push(`/order-success?orderId=${orderId}`);
            }, 2000);

        } catch (err) {
            console.error('Checkout error:', err);
            showToast('Sipariş oluşturulurken bir hata oluştu!', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (items.length === 0) {
        router.push('/cart');
        return null;
    }

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-lg-8">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white">
                            <h4 className="card-title mb-0">
                                <i className="fas fa-shipping-fast me-2"></i>
                                Teslimat Bilgileri
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

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Telefon *</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            className="form-control"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Şehir *</label>
                                        <input
                                            type="text"
                                            name="city"
                                            className="form-control"
                                            required
                                            value={formData.city}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Adres *</label>
                                    <textarea
                                        name="address"
                                        className="form-control"
                                        rows={3}
                                        required
                                        value={formData.address}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Posta Kodu</label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        className="form-control"
                                        value={formData.postalCode}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="d-grid gap-2">
                                    <button
                                        type="submit"
                                        className="btn btn-success btn-lg"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                İşleniyor...
                                            </>
                                        ) : (
                                            <>
                                                <i className="fas fa-check-circle me-2"></i>
                                                Siparişi Tamamla
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card shadow">
                        <div className="card-header bg-info text-white">
                            <h5 className="card-title mb-0">
                                <i className="fas fa-shopping-cart me-2"></i>
                                Sipariş Özeti
                            </h5>
                        </div>
                        <div className="card-body">
                            {items.map((item) => (
                                <div key={item.magazine.id} className="d-flex justify-content-between align-items-center mb-3">
                                    <div>
                                        <h6 className="mb-1">Sayı {item.magazine.issue}</h6>
                                        <small className="text-muted">Adet: {item.quantity}</small>
                                    </div>
                                    <strong>₺{item.magazine.price * item.quantity}</strong>
                                </div>
                            ))}

                            <hr />

                            <div className="d-flex justify-content-between">
                                <h5>Toplam:</h5>
                                <h5 className="text-primary">₺{getTotalPrice()}</h5>
                            </div>

                            <div className="alert alert-info mt-3">
                                <i className="fas fa-info-circle me-2"></i>
                                <small>Ücretsiz kargo ve güvenli ödeme</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
