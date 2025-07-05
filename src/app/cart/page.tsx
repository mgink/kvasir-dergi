'use client';

import Link from 'next/link';
import { useCart } from '@/lib/CartContext';

export default function Cart() {
    const { items, updateQuantity, removeFromCart, getTotalPrice } = useCart();

    if (items.length === 0) {
        return (
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-lg-6 text-center">
                        <div className="card" style={{ border: 'none', background: 'white' }}>
                            <div className="card-body p-4" style={{ padding: '4rem 2rem' }}>
                                <div style={{
                                    width: '120px',
                                    height: '120px',
                                    background: 'linear-gradient(135deg, #e2e8f0, #cbd5e0)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 2rem',
                                    color: '#718096'
                                }}>
                                    <i className="fas fa-shopping-cart" style={{ fontSize: '3rem' }}></i>
                                </div>
                                <h2 style={{
                                    color: '#2d3748',
                                    fontWeight: '600',
                                    marginBottom: '1rem'
                                }}>
                                    Sepetiniz Boş
                                </h2>
                                <p style={{
                                    color: '#718096',
                                    fontSize: '1.1rem',
                                    marginBottom: '2rem',
                                    lineHeight: '1.6'
                                }}>
                                    Henüz sepetinize ürün eklemediniz. Harika dergilerimizi keşfetmek için mağazamızı ziyaret edin.
                                </p>
                                <Link
                                    href="/store"
                                    className="btn btn-primary btn-lg"
                                    style={{
                                        background: 'linear-gradient(135deg, #4299e1, #63b3ed)',
                                        border: 'none',
                                        borderRadius: '12px',
                                        padding: '1rem 2rem',
                                        fontWeight: '600',
                                        fontSize: '1.1rem',
                                        boxShadow: '0 4px 6px rgba(66, 153, 225, 0.3)',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <i className="fas fa-store me-2"></i>
                                    Mağazaya Git
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ background: '#fafafa', minHeight: '100vh', paddingTop: '2rem' }}>
            <div className="container my-5">
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{
                        color: '#2d3748',
                        fontWeight: '700',
                        fontSize: '2.5rem',
                        marginBottom: '0.5rem'
                    }}>
                        <i className="fas fa-shopping-cart me-3" style={{ color: '#4299e1' }}></i>
                        Sepetim
                    </h1>
                    <p style={{ color: '#718096', fontSize: '1.1rem' }}>
                        {items.length} ürün sepetinizde bulunuyor
                    </p>
                </div>

                <div className="row">
                    <div className="col-lg-8">
                        {items.map((item, index) => (
                            <div
                                key={item.magazine.id}
                                className="card mb-4"
                                style={{
                                    border: 'none',
                                    borderRadius: '16px',
                                    background: 'white',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                                }}
                            >
                                <div className="card-body p-4">
                                    <div className="row align-items-center">
                                        <div className="col-md-2">
                                            <div style={{
                                                background: 'linear-gradient(135deg, #63b3ed, #4299e1)',
                                                borderRadius: '12px',
                                                height: '100px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'white',
                                                fontWeight: '600',
                                                fontSize: '0.9rem'
                                            }}>
                                                Sayı {item.magazine.issue}
                                            </div>
                                        </div>

                                        <div className="col-md-5">
                                            <h5 style={{
                                                color: '#2d3748',
                                                fontWeight: '600',
                                                marginBottom: '0.5rem'
                                            }}>
                                                {item.magazine.title}
                                            </h5>
                                            <p style={{
                                                color: '#718096',
                                                fontSize: '0.95rem',
                                                marginBottom: '1rem',
                                                lineHeight: '1.5'
                                            }}>
                                                {item.magazine.description.substring(0, 100)}...
                                            </p>
                                            <div style={{
                                                background: 'linear-gradient(135deg, #48bb78, #38a169)',
                                                color: 'white',
                                                padding: '0.5rem 1rem',
                                                borderRadius: '8px',
                                                display: 'inline-block',
                                                fontWeight: '600',
                                                fontSize: '1.1rem'
                                            }}>
                                                ₺{item.magazine.price}
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                background: '#f7fafc',
                                                borderRadius: '12px',
                                                padding: '0.5rem'
                                            }}>
                                                <button
                                                    style={{
                                                        background: 'white',
                                                        border: '1px solid #e2e8f0',
                                                        borderRadius: '8px',
                                                        width: '40px',
                                                        height: '40px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        color: '#718096',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s ease'
                                                    }}
                                                    onClick={() => updateQuantity(item.magazine.id, item.quantity - 1)}
                                                    onMouseEnter={(e) => {
                                                        (e.target as HTMLButtonElement).style.background = '#e2e8f0';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        (e.target as HTMLButtonElement).style.background = 'white';
                                                    }}
                                                >
                                                    <i className="fas fa-minus"></i>
                                                </button>
                                                <span style={{
                                                    fontWeight: '600',
                                                    fontSize: '1.1rem',
                                                    color: '#2d3748',
                                                    margin: '0 1rem',
                                                    minWidth: '20px',
                                                    textAlign: 'center'
                                                }}>
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    style={{
                                                        background: 'white',
                                                        border: '1px solid #e2e8f0',
                                                        borderRadius: '8px',
                                                        width: '40px',
                                                        height: '40px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        color: '#718096',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s ease'
                                                    }}
                                                    onClick={() => updateQuantity(item.magazine.id, item.quantity + 1)}
                                                    onMouseEnter={(e) => {
                                                        (e.target as HTMLButtonElement).style.background = '#e2e8f0';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        (e.target as HTMLButtonElement).style.background = 'white';
                                                    }}
                                                >
                                                    <i className="fas fa-plus"></i>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="col-md-2 text-end">
                                            <button
                                                style={{
                                                    background: 'transparent',
                                                    border: '2px solid #fed7d7',
                                                    borderRadius: '10px',
                                                    color: '#f56565',
                                                    width: '50px',
                                                    height: '50px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s ease'
                                                }}
                                                onClick={() => removeFromCart(item.magazine.id)}
                                                onMouseEnter={(e) => {
                                                    (e.target as HTMLButtonElement).style.background = '#f56565';
                                                    (e.target as HTMLButtonElement).style.color = 'white';
                                                }}
                                                onMouseLeave={(e) => {
                                                    (e.target as HTMLButtonElement).style.background = 'transparent';
                                                    (e.target as HTMLButtonElement).style.color = '#f56565';
                                                }}
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="col-lg-4">
                        <div
                            className="card"
                            style={{
                                border: 'none',
                                borderRadius: '16px',
                                background: 'white',
                                position: 'sticky',
                                top: '2rem',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                            }}
                        >
                            <div
                                className="card-header"
                                style={{
                                    background: 'linear-gradient(135deg, #63b3ed, #4299e1)',
                                    color: 'white',
                                    borderRadius: '16px 16px 0 0',
                                    padding: '1.5rem',
                                    border: 'none'
                                }}
                            >
                                <h5 style={{
                                    margin: 0,
                                    fontWeight: '600',
                                    fontSize: '1.2rem'
                                }}>
                                    <i className="fas fa-receipt me-2"></i>
                                    Sipariş Özeti
                                </h5>
                            </div>
                            <div className="card-body p-4">
                                {items.map((item) => (
                                    <div
                                        key={item.magazine.id}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '1rem 0',
                                            borderBottom: '1px solid #f1f5f9'
                                        }}
                                    >
                                        <span style={{
                                            color: '#718096',
                                            fontSize: '0.95rem'
                                        }}>
                                            {item.quantity}x Sayı {item.magazine.issue}
                                        </span>
                                        <span style={{
                                            fontWeight: '600',
                                            color: '#2d3748'
                                        }}>
                                            ₺{item.magazine.price * item.quantity}
                                        </span>
                                    </div>
                                ))}

                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '1.5rem 0 1rem',
                                    marginTop: '1rem',
                                    borderTop: '2px solid #e2e8f0'
                                }}>
                                    <h5 style={{
                                        margin: 0,
                                        color: '#2d3748',
                                        fontWeight: '700'
                                    }}>
                                        Toplam:
                                    </h5>
                                    <h5 style={{
                                        margin: 0,
                                        color: '#4299e1',
                                        fontWeight: '700',
                                        fontSize: '1.5rem'
                                    }}>
                                        ₺{getTotalPrice()}
                                    </h5>
                                </div>

                                <div style={{ marginTop: '2rem' }}>
                                    <Link
                                        href="/checkout"
                                        className="btn btn-success btn-lg"
                                        style={{
                                            background: 'linear-gradient(135deg, #48bb78, #38a169)',
                                            border: 'none',
                                            borderRadius: '12px',
                                            width: '100%',
                                            padding: '1rem',
                                            fontWeight: '600',
                                            fontSize: '1.1rem',
                                            marginBottom: '1rem',
                                            boxShadow: '0 4px 6px rgba(72, 187, 120, 0.3)',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        <i className="fas fa-credit-card me-2"></i>
                                        Siparişi Tamamla
                                    </Link>

                                    <Link
                                        href="/store"
                                        className="btn btn-outline-primary"
                                        style={{
                                            background: 'transparent',
                                            border: '2px solid #4299e1',
                                            borderRadius: '12px',
                                            color: '#4299e1',
                                            width: '100%',
                                            padding: '0.75rem',
                                            fontWeight: '500',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        <i className="fas fa-arrow-left me-2"></i>
                                        Alışverişe Devam Et
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}