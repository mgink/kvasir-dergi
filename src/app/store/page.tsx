'use client';

import { useState } from 'react';
import { magazines } from '@/data/mockData';
import { useCart } from '@/lib/CartContext';
import { useToast } from '@/components/Toast';
import { Magazine } from '@/types';

export default function Store() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [addingToCart, setAddingToCart] = useState<string | null>(null);
    const { addToCart } = useCart();
    const { showToast } = useToast();

    const categories = ['all', ...Array.from(new Set(magazines.map(m => m.category).filter(Boolean)))] as string[];

    const filteredMagazines = selectedCategory === 'all'
        ? magazines
        : magazines.filter(m => m.category === selectedCategory);

    const handleAddToCart = async (magazine: Magazine) => {
        if (magazine.isAvailable && !addingToCart) {
            setAddingToCart(magazine.id);
            addToCart(magazine);
            showToast(`${magazine.title} - Sayı ${magazine.issue} sepete eklendi! 🛒`, 'success');

            setTimeout(() => {
                setAddingToCart(null);
            }, 1000);
        }
    };

    return (
        <div className="container my-5">
            {/* Header */}
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold text-dark mb-3">
                    <i className="fas fa-store me-3"></i>
                    Dergi Mağazası
                </h1>
                <p className="lead text-muted">Kvasir Dergi&apos;nin tüm sayılarını keşfedin</p>
            </div>

            {/* Filters */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="d-flex flex-wrap gap-2 justify-content-center">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`btn ${selectedCategory === category
                                    ? 'btn-primary'
                                    : 'btn-outline-primary'
                                    }`}
                            >
                                {category === 'all' ? 'Tüm Sayılar' : category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Magazine Grid */}
            <div className="row">
                {filteredMagazines.map((magazine) => (
                    <div key={magazine.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div className="card h-100 shadow-sm">
                            <div
                                className="card-img-top d-flex align-items-center justify-content-center text-white fw-bold"
                                style={{
                                    height: '250px',
                                    background: 'linear-gradient(45deg, #6366f1, #8b5cf6)'
                                }}
                            >
                                Kapak {magazine.issue}
                            </div>

                            <div className="card-body d-flex flex-column">
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <h5 className="card-title">Sayı {magazine.issue}</h5>
                                    {magazine.category && (
                                        <span className="badge bg-primary">{magazine.category}</span>
                                    )}
                                </div>

                                <p className="card-text text-muted small mb-3" style={{ flexGrow: 1 }}>
                                    {magazine.description.substring(0, 100)}...
                                </p>

                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <span className="h5 text-primary mb-0">₺{magazine.price}</span>
                                    <small className="text-muted">
                                        {new Date(magazine.publishDate).toLocaleDateString('tr-TR', {
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </small>
                                </div>

                                <div className="mt-auto">
                                    <button
                                        onClick={() => handleAddToCart(magazine)}
                                        disabled={!magazine.isAvailable || addingToCart === magazine.id}
                                        className={`btn w-100 mb-2 ${magazine.isAvailable
                                            ? addingToCart === magazine.id
                                                ? 'btn-success'
                                                : 'btn-primary'
                                            : 'btn-secondary'
                                            }`}
                                    >
                                        {addingToCart === magazine.id ? (
                                            <>
                                                <i className="fas fa-spinner fa-spin me-2"></i>
                                                Eklendi! ✓
                                            </>
                                        ) : magazine.isAvailable ? (
                                            <>
                                                <i className="fas fa-shopping-cart me-2"></i>
                                                Sepete Ekle
                                            </>
                                        ) : (
                                            'Stokta Yok'
                                        )}
                                    </button>

                                    {magazine.digitalVersion && (
                                        <button className="btn btn-outline-info w-100">
                                            <i className="fas fa-mobile-alt me-2"></i>
                                            Dijital Versiyon
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredMagazines.length === 0 && (
                <div className="text-center py-5">
                    <i className="fas fa-search text-muted mb-3" style={{ fontSize: '4rem' }}></i>
                    <h5 className="text-muted">Bu kategoride henüz dergi bulunmuyor.</h5>
                </div>
            )}
        </div>
    );
}
