'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useOrders } from '@/lib/OrderContext';
import { Order } from '@/types';
import Link from 'next/link';

function OrderSuccessContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');
    const { getOrderById } = useOrders();
    const [order, setOrder] = useState<Order | null>(null);

    useEffect(() => {
        if (orderId) {
            const foundOrder = getOrderById(orderId);
            setOrder(foundOrder || null);
        }
    }, [orderId, getOrderById]);

    if (!orderId || !order) {
        return (
            <div className="container my-5 text-center">
                <div className="alert alert-warning">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    Sipariş bilgisi bulunamadı.
                </div>
                <Link href="/" className="btn btn-primary">
                    Anasayfaya Dön
                </Link>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-lg">
                        <div className="card-body text-center py-5">
                            <div className="mb-4">
                                <i className="fas fa-check-circle text-success" style={{ fontSize: '4rem' }}></i>
                            </div>

                            <h2 className="text-success mb-3">Siparişiniz Alındı!</h2>

                            <p className="lead mb-4">
                                Teşekkür ederiz! Siparişiniz başarıyla oluşturulmuştur.
                            </p>

                            <div className="alert alert-info">
                                <h5>
                                    <i className="fas fa-receipt me-2"></i>
                                    Sipariş Numarası: <strong>{order.id}</strong>
                                </h5>
                            </div>

                            <div className="row mt-4">
                                <div className="col-md-6">
                                    <h6>Müşteri Bilgileri:</h6>
                                    <p className="mb-1"><strong>{order.customerInfo.name}</strong></p>
                                    <p className="mb-1">{order.customerInfo.email}</p>
                                    <p className="mb-0">{order.customerInfo.phone}</p>
                                </div>
                                <div className="col-md-6">
                                    <h6>Teslimat Adresi:</h6>
                                    <p className="mb-1">{order.shippingAddress?.address}</p>
                                    <p className="mb-0">{order.shippingAddress?.city} {order.shippingAddress?.postalCode}</p>
                                </div>
                            </div>

                            <hr className="my-4" />

                            <div className="row">
                                <div className="col-12">
                                    <h6>Sipariş Detayları:</h6>
                                    {order.items.map((item) => (
                                        <div key={item.magazine.id} className="d-flex justify-content-between align-items-center mb-2">
                                            <span>Sayı {item.magazine.issue} (x{item.quantity})</span>
                                            <span>₺{item.magazine.price * item.quantity}</span>
                                        </div>
                                    ))}
                                    <hr />
                                    <div className="d-flex justify-content-between">
                                        <strong>Toplam:</strong>
                                        <strong className="text-primary">₺{order.total}</strong>
                                    </div>
                                </div>
                            </div>

                            <div className="alert alert-success mt-4">
                                <i className="fas fa-envelope me-2"></i>
                                Sipariş onay e-postası <strong>{order.customerInfo.email}</strong> adresine gönderilmiştir.
                            </div>

                            <div className="d-grid gap-2 d-md-flex justify-content-md-center mt-4">
                                <Link href="/" className="btn btn-primary me-md-2">
                                    <i className="fas fa-home me-2"></i>
                                    Anasayfa
                                </Link>
                                <Link href="/store" className="btn btn-outline-primary">
                                    <i className="fas fa-shopping-bag me-2"></i>
                                    Alışverişe Devam Et
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function OrderSuccess() {
    return (
        <Suspense fallback={
            <div className="container my-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Yükleniyor...</span>
                </div>
            </div>
        }>
            <OrderSuccessContent />
        </Suspense>
    );
}
