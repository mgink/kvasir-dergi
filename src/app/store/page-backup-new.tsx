'use client';

import { useState } from 'react';
import { magazines } from '@/data/mockData';
import { useCart } from '@/lib/CartContext';
import { useToast } from '@/components/Toast';
import { Magazine } from '@/types';

export default function Store() {
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
    const [addingToCart, setAddingToCart] = useState<string | null>(null);
    const [selectedMagazine, setSelectedMagazine] = useState<Magazine | null>(null);
    const { addToCart } = useCart();
    const { showToast } = useToast();

    // Sort magazines by date (kategori kaldırıldı, sadece sıralama)
    let filteredMagazines = [...magazines].sort((a, b) => {
        const dateA = new Date(a.publishDate).getTime();
        const dateB = new Date(b.publishDate).getTime();
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

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

    const handleMagazineClick = (magazine: Magazine) => {
        setSelectedMagazine(magazine);
    };

    return (
        <div style={{ background: '#fafafa', minHeight: '100vh', paddingTop: '2rem' }}>
            <div className="container my-5">
                {/* Header */}
                <div className="text-center mb-5">
                    <h1 style={{
                        fontSize: '3rem',
                        fontWeight: '700',
                        color: '#2d3748',
                        marginBottom: '1rem'
                    }}>
                        <i className="fas fa-store me-3" style={{ color: '#4299e1' }}></i>
                        Dergi Mağazası
                    </h1>
                    <p style={{
                        fontSize: '1.2rem',
                        color: '#718096',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        Kvasir Dergi&apos;nin tüm sayılarını keşfedin ve kütüphanenizi zenginleştirin
                    </p>
                </div>

                {/* Compact Sorting Filter */}
                <div className="row mb-5">
                    <div className="col-12">
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '1rem 1.5rem',
                            background: 'white',
                            borderRadius: '16px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                            flexWrap: 'wrap',
                            gap: '1rem'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                color: '#4a5568',
                                fontWeight: '600'
                            }}>
                                <i className="fas fa-list"></i>
                                <span>{filteredMagazines.length} sayı listeleniyor</span>
                            </div>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem'
                            }}>
                                <label style={{
                                    color: '#4a5568',
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    <i className="fas fa-sort"></i>
                                    Sıralama:
                                </label>
                                <select
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
                                    style={{
                                        padding: '0.75rem 1rem',
                                        borderRadius: '10px',
                                        border: '2px solid #4299e1',
                                        background: 'white',
                                        color: '#4299e1',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        minWidth: '160px'
                                    }}
                                >
                                    <option value="newest">🔽 En Yeni Önce</option>
                                    <option value="oldest">🔼 En Eski Önce</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Magazine Grid */}
                <div className="row">
                    {filteredMagazines.map((magazine, index) => (
                        <div key={magazine.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                            <div
                                className="card h-100"
                                style={{
                                    border: 'none',
                                    borderRadius: '20px',
                                    background: 'white',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                                    transition: 'all 0.3s ease',
                                    overflow: 'hidden',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                                }}
                                onClick={() => handleMagazineClick(magazine)}
                            >
                                <div style={{
                                    height: '280px',
                                    background: `linear-gradient(135deg, ${index % 4 === 0 ? '#667eea, #764ba2' :
                                        index % 4 === 1 ? '#f093fb, #f5576c' :
                                            index % 4 === 2 ? '#4facfe, #00f2fe' :
                                                '#43e97b, #38f9d7'
                                        })`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: '700',
                                    fontSize: '1.3rem',
                                    position: 'relative'
                                }}>
                                    <div style={{
                                        background: 'rgba(255, 255, 255, 0.2)',
                                        borderRadius: '15px',
                                        padding: '1rem 1.5rem',
                                        backdropFilter: 'blur(10px)',
                                        textAlign: 'center'
                                    }}>
                                        <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Kvasir Dergi</div>
                                        <div style={{ fontSize: '1.4rem', fontWeight: '800' }}>Sayı {magazine.issue}</div>
                                    </div>
                                    
                                    {/* Click to view indicator */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '1rem',
                                        right: '1rem',
                                        background: 'rgba(255, 255, 255, 0.3)',
                                        borderRadius: '50%',
                                        width: '35px',
                                        height: '35px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.9rem'
                                    }}>
                                        <i className="fas fa-eye"></i>
                                    </div>
                                </div>

                                <div className="card-body p-4">
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        marginBottom: '1rem'
                                    }}>
                                        <h5 style={{
                                            fontSize: '1.3rem',
                                            fontWeight: '700',
                                            color: '#2d3748',
                                            marginBottom: '0',
                                            lineHeight: '1.3'
                                        }}>
                                            {magazine.title}
                                        </h5>
                                        <span style={{
                                            background: magazine.isAvailable ? '#c6f6d5' : '#fed7d7',
                                            color: magazine.isAvailable ? '#22543d' : '#742a2a',
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '12px',
                                            fontSize: '0.75rem',
                                            fontWeight: '600',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            {magazine.isAvailable ? 'Stokta' : 'Tükendi'}
                                        </span>
                                    </div>

                                    <p style={{
                                        color: '#718096',
                                        fontSize: '0.9rem',
                                        lineHeight: '1.5',
                                        marginBottom: '1rem',
                                        overflow: 'hidden',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical'
                                    }}>
                                        {magazine.description}
                                    </p>

                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: '1rem'
                                    }}>
                                        <span style={{
                                            fontSize: '1.8rem',
                                            fontWeight: '700',
                                            color: '#4299e1'
                                        }}>
                                            ₺{magazine.price}
                                        </span>
                                        <span style={{
                                            color: '#a0aec0',
                                            fontSize: '0.9rem'
                                        }}>
                                            {new Date(magazine.publishDate).toLocaleDateString('tr-TR')}
                                        </span>
                                    </div>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleAddToCart(magazine);
                                        }}
                                        disabled={!magazine.isAvailable || addingToCart === magazine.id}
                                        style={{
                                            width: '100%',
                                            padding: '0.875rem',
                                            background: magazine.isAvailable 
                                                ? 'linear-gradient(135deg, #4299e1, #63b3ed)'
                                                : '#cbd5e0',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '12px',
                                            fontWeight: '600',
                                            cursor: magazine.isAvailable ? 'pointer' : 'not-allowed',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        {addingToCart === magazine.id ? (
                                            <>
                                                <i className="fas fa-spinner fa-spin me-2"></i>
                                                Ekleniyor...
                                            </>
                                        ) : magazine.isAvailable ? (
                                            <>
                                                <i className="fas fa-shopping-cart me-2"></i>
                                                Sepete Ekle
                                            </>
                                        ) : (
                                            <>
                                                <i className="fas fa-times me-2"></i>
                                                Stokta Yok
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pop-up Modal */}
                {selectedMagazine && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1050,
                        padding: '2rem'
                    }} onClick={() => setSelectedMagazine(null)}>
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '16px',
                            maxWidth: '800px',
                            width: '100%',
                            maxHeight: '90vh',
                            overflow: 'auto',
                            position: 'relative',
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                        }} onClick={(e) => e.stopPropagation()}>
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedMagazine(null)}
                                style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    background: 'rgba(0, 0, 0, 0.1)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    zIndex: 10
                                }}
                            >
                                <i className="fas fa-times" style={{ fontSize: '1.2rem', color: '#333' }}></i>
                            </button>

                            <div className="row g-0">
                                {/* Magazine Cover */}
                                <div className="col-md-6">
                                    <div style={{
                                        height: '400px',
                                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontWeight: '700',
                                        fontSize: '1.5rem',
                                        borderTopLeftRadius: '16px',
                                        borderBottomLeftRadius: '16px'
                                    }}>
                                        <div style={{
                                            background: 'rgba(255, 255, 255, 0.2)',
                                            borderRadius: '15px',
                                            padding: '2rem',
                                            backdropFilter: 'blur(10px)',
                                            textAlign: 'center'
                                        }}>
                                            <div style={{ fontSize: '1.2rem', opacity: 0.9 }}>Kvasir Dergi</div>
                                            <div style={{ fontSize: '2rem', fontWeight: '800' }}>Sayı {selectedMagazine.issue}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Magazine Details */}
                                <div className="col-md-6" style={{ padding: '2rem' }}>
                                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <div>
                                            <h2 style={{
                                                fontSize: '2rem',
                                                fontWeight: '700',
                                                color: '#2d3748',
                                                marginBottom: '0.5rem'
                                            }}>
                                                {selectedMagazine.title}
                                            </h2>
                                            <p style={{
                                                fontSize: '1.1rem',
                                                color: '#4299e1',
                                                fontWeight: '600',
                                                marginBottom: '1rem'
                                            }}>
                                                Sayı {selectedMagazine.issue}
                                            </p>
                                            <p style={{
                                                color: '#718096',
                                                lineHeight: '1.6',
                                                marginBottom: '1.5rem'
                                            }}>
                                                {selectedMagazine.description}
                                            </p>
                                            <div style={{ marginBottom: '1.5rem' }}>
                                                <p style={{ color: '#4a5568', marginBottom: '0.5rem' }}>
                                                    <i className="fas fa-calendar me-2"></i>
                                                    Yayın Tarihi: {new Date(selectedMagazine.publishDate).toLocaleDateString('tr-TR')}
                                                </p>
                                                {selectedMagazine.digitalVersion && (
                                                    <p style={{ color: '#4a5568', marginBottom: '0.5rem' }}>
                                                        <i className="fas fa-file-pdf me-2"></i>
                                                        Dijital versiyon mevcut
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div style={{ marginTop: 'auto' }}>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                marginBottom: '1rem'
                                            }}>
                                                <span style={{
                                                    fontSize: '2rem',
                                                    fontWeight: '700',
                                                    color: '#4299e1'
                                                }}>
                                                    ₺{selectedMagazine.price}
                                                </span>
                                                <span style={{
                                                    padding: '0.5rem 1rem',
                                                    borderRadius: '8px',
                                                    background: selectedMagazine.isAvailable ? '#38a169' : '#e53e3e',
                                                    color: 'white',
                                                    fontWeight: '500',
                                                    fontSize: '0.9rem'
                                                }}>
                                                    {selectedMagazine.isAvailable ? 'Stokta' : 'Tükendi'}
                                                </span>
                                            </div>

                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleAddToCart(selectedMagazine);
                                                }}
                                                disabled={!selectedMagazine.isAvailable || addingToCart === selectedMagazine.id}
                                                style={{
                                                    width: '100%',
                                                    padding: '1rem',
                                                    background: selectedMagazine.isAvailable 
                                                        ? 'linear-gradient(135deg, #4299e1, #63b3ed)'
                                                        : '#cbd5e0',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '12px',
                                                    fontSize: '1.1rem',
                                                    fontWeight: '600',
                                                    cursor: selectedMagazine.isAvailable ? 'pointer' : 'not-allowed',
                                                    transition: 'all 0.3s ease'
                                                }}
                                            >
                                                {addingToCart === selectedMagazine.id ? (
                                                    <>
                                                        <i className="fas fa-spinner fa-spin me-2"></i>
                                                        Ekleniyor...
                                                    </>
                                                ) : selectedMagazine.isAvailable ? (
                                                    <>
                                                        <i className="fas fa-shopping-cart me-2"></i>
                                                        Sepete Ekle
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="fas fa-times me-2"></i>
                                                        Stokta Yok
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
    const [selectedMagazine, setSelectedMagazine] = useState<Magazine | null>(null);
    const { addToCart } = useCart();
    const { showToast } = useToast();

    const categories = ['all', ...Array.from(new Set(magazines.map(m => m.category).filter(Boolean)))] as string[];

    // Sort magazines by date (kategorileri kaldırıyoruz, sadece sıralama kalıyor)
    let filteredMagazines = [...magazines].sort((a, b) => {
        const dateA = new Date(a.publishDate).getTime();
        const dateB = new Date(b.publishDate).getTime();
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

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
        <div style={{ background: '#fafafa', minHeight: '100vh', paddingTop: '2rem' }}>
            <div className="container my-5">
                {/* Header */}
                <div className="text-center mb-5">
                    <h1 style={{
                        fontSize: '3rem',
                        fontWeight: '700',
                        color: '#2d3748',
                        marginBottom: '1rem'
                    }}>
                        <i className="fas fa-store me-3" style={{ color: '#4299e1' }}></i>
                        Dergi Mağazası
                    </h1>
                    <p style={{
                        fontSize: '1.2rem',
                        color: '#718096',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        Kvasir Dergi&apos;nin tüm sayılarını keşfedin ve kütüphanenizi zenginleştirin
                    </p>
                </div>

                {/* Filters */}
                <div className="row mb-5">
                    <div className="col-12">
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            padding: '1.5rem',
                            background: 'white',
                            borderRadius: '16px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                        }}>
                            {/* Category Filters */}
                            <div>
                                <h6 style={{ color: '#4a5568', marginBottom: '0.75rem', fontWeight: '600' }}>
                                    <i className="fas fa-tags me-2"></i>
                                    Kategoriler
                                </h6>
                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '0.75rem',
                                    justifyContent: 'center'
                                }}>
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            style={{
                                                background: selectedCategory === category
                                                    ? 'linear-gradient(135deg, #4299e1, #63b3ed)'
                                                    : 'transparent',
                                                color: selectedCategory === category ? 'white' : '#4299e1',
                                                border: selectedCategory === category
                                                    ? 'none'
                                                    : '2px solid #4299e1',
                                                borderRadius: '10px',
                                                padding: '0.75rem 1.5rem',
                                                fontWeight: '500',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                if (selectedCategory !== category) {
                                                    (e.target as HTMLButtonElement).style.background = '#f7fafc';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (selectedCategory !== category) {
                                                    (e.target as HTMLButtonElement).style.background = 'transparent';
                                                }
                                            }}
                                        >
                                            {category === 'all' ? 'Tüm Sayılar' : category}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sorting Filters */}
                            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
                                <h6 style={{ color: '#4a5568', marginBottom: '0.75rem', fontWeight: '600' }}>
                                    <i className="fas fa-sort me-2"></i>
                                    Sıralama
                                </h6>
                                <div style={{
                                    display: 'flex',
                                    gap: '0.75rem',
                                    justifyContent: 'center',
                                    flexWrap: 'wrap'
                                }}>
                                    <button
                                        onClick={() => setSortOrder('newest')}
                                        style={{
                                            background: sortOrder === 'newest'
                                                ? 'linear-gradient(135deg, #48bb78, #68d391)'
                                                : 'transparent',
                                            color: sortOrder === 'newest' ? 'white' : '#48bb78',
                                            border: sortOrder === 'newest'
                                                ? 'none'
                                                : '2px solid #48bb78',
                                            borderRadius: '10px',
                                            padding: '0.75rem 1.5rem',
                                            fontWeight: '500',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (sortOrder !== 'newest') {
                                                (e.target as HTMLButtonElement).style.background = '#f0fff4';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (sortOrder !== 'newest') {
                                                (e.target as HTMLButtonElement).style.background = 'transparent';
                                            }
                                        }}
                                    >
                                        <i className="fas fa-arrow-down"></i>
                                        En Yeni Önce
                                    </button>
                                    <button
                                        onClick={() => setSortOrder('oldest')}
                                        style={{
                                            background: sortOrder === 'oldest'
                                                ? 'linear-gradient(135deg, #ed8936, #f6ad55)'
                                                : 'transparent',
                                            color: sortOrder === 'oldest' ? 'white' : '#ed8936',
                                            border: sortOrder === 'oldest'
                                                ? 'none'
                                                : '2px solid #ed8936',
                                            borderRadius: '10px',
                                            padding: '0.75rem 1.5rem',
                                            fontWeight: '500',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (sortOrder !== 'oldest') {
                                                (e.target as HTMLButtonElement).style.background = '#fffaf0';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (sortOrder !== 'oldest') {
                                                (e.target as HTMLButtonElement).style.background = 'transparent';
                                            }
                                        }}
                                    >
                                        <i className="fas fa-arrow-up"></i>
                                        En Eski Önce
                                    </button>
                                </div>
                            </div>

                            {/* Results Count */}
                            <div style={{
                                textAlign: 'center',
                                color: '#718096',
                                fontSize: '0.9rem',
                                borderTop: '1px solid #e2e8f0',
                                paddingTop: '0.75rem'
                            }}>
                                <i className="fas fa-list me-2"></i>
                                {filteredMagazines.length} sayı listeleniyor
                            </div>
                        </div>
                    </div>
                </div>

                {/* Magazine Grid */}
                <div className="row">
                    {filteredMagazines.map((magazine, index) => (
                        <div key={magazine.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                            <div
                                className="card h-100"
                                style={{
                                    border: 'none',
                                    borderRadius: '20px',
                                    background: 'white',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                                    transition: 'all 0.3s ease',
                                    overflow: 'hidden'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                                }}
                            >
                                <div style={{
                                    height: '280px',
                                    background: `linear-gradient(135deg, ${index % 4 === 0 ? '#667eea, #764ba2' :
                                        index % 4 === 1 ? '#f093fb, #f5576c' :
                                            index % 4 === 2 ? '#4facfe, #00f2fe' :
                                                '#43e97b, #38f9d7'
                                        })`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: '700',
                                    fontSize: '1.3rem',
                                    position: 'relative'
                                }}>
                                    <div style={{
                                        background: 'rgba(255, 255, 255, 0.2)',
                                        borderRadius: '15px',
                                        padding: '1rem 1.5rem',
                                        backdropFilter: 'blur(10px)',
                                        textAlign: 'center'
                                    }}>
                                        <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Kvasir Dergi</div>
                                        <div style={{ fontSize: '1.4rem', fontWeight: '800' }}>Sayı {magazine.issue}</div>
                                    </div>
                                </div>

                                <div className="card-body p-4">
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        marginBottom: '1rem'
                                    }}>
                                        <h5 style={{
                                            color: '#2d3748',
                                            fontWeight: '600',
                                            margin: 0
                                        }}>
                                            {magazine.title}
                                        </h5>
                                        {magazine.category && (
                                            <span style={{
                                                background: 'linear-gradient(135deg, #ed8936, #f6ad55)',
                                                color: 'white',
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '6px',
                                                fontSize: '0.8rem',
                                                fontWeight: '500'
                                            }}>
                                                {magazine.category}
                                            </span>
                                        )}
                                    </div>

                                    <p style={{
                                        color: '#718096',
                                        fontSize: '0.95rem',
                                        lineHeight: '1.5',
                                        marginBottom: '1.5rem',
                                        minHeight: '3rem'
                                    }}>
                                        {magazine.description.substring(0, 100)}...
                                    </p>

                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: '1.5rem'
                                    }}>
                                        <span style={{
                                            background: 'linear-gradient(135deg, #48bb78, #38a169)',
                                            color: 'white',
                                            padding: '0.5rem 1rem',
                                            borderRadius: '8px',
                                            fontWeight: '600',
                                            fontSize: '1.1rem'
                                        }}>
                                            ₺{magazine.price}
                                        </span>
                                        <span style={{
                                            color: '#718096',
                                            fontSize: '0.85rem'
                                        }}>
                                            {new Date(magazine.publishDate).toLocaleDateString('tr-TR', {
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>

                                    <div>
                                        <button
                                            onClick={() => handleAddToCart(magazine)}
                                            disabled={!magazine.isAvailable || addingToCart === magazine.id}
                                            style={{
                                                background: !magazine.isAvailable
                                                    ? '#e2e8f0'
                                                    : addingToCart === magazine.id
                                                        ? 'linear-gradient(135deg, #48bb78, #38a169)'
                                                        : 'linear-gradient(135deg, #4299e1, #63b3ed)',
                                                color: !magazine.isAvailable ? '#718096' : 'white',
                                                border: 'none',
                                                borderRadius: '12px',
                                                padding: '0.75rem 1rem',
                                                width: '100%',
                                                fontWeight: '600',
                                                cursor: !magazine.isAvailable ? 'not-allowed' : 'pointer',
                                                transition: 'all 0.2s ease',
                                                marginBottom: magazine.digitalVersion ? '0.75rem' : '0',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '0.5rem'
                                            }}
                                        >
                                            {addingToCart === magazine.id ? (
                                                <>
                                                    <i className="fas fa-check"></i>
                                                    Eklendi!
                                                </>
                                            ) : magazine.isAvailable ? (
                                                <>
                                                    <i className="fas fa-shopping-cart"></i>
                                                    Sepete Ekle
                                                </>
                                            ) : (
                                                'Stokta Yok'
                                            )}
                                        </button>

                                        {magazine.digitalVersion && (
                                            <button style={{
                                                background: 'transparent',
                                                color: '#38b2ac',
                                                border: '2px solid #38b2ac',
                                                borderRadius: '12px',
                                                padding: '0.75rem 1rem',
                                                width: '100%',
                                                fontWeight: '500',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '0.5rem'
                                            }}
                                                onMouseEnter={(e) => {
                                                    (e.target as HTMLButtonElement).style.background = '#38b2ac';
                                                    (e.target as HTMLButtonElement).style.color = 'white';
                                                }}
                                                onMouseLeave={(e) => {
                                                    (e.target as HTMLButtonElement).style.background = 'transparent';
                                                    (e.target as HTMLButtonElement).style.color = '#38b2ac';
                                                }}
                                            >
                                                <i className="fas fa-mobile-alt"></i>
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
                        <div style={{
                            background: 'white',
                            borderRadius: '20px',
                            padding: '4rem 2rem',
                            margin: '2rem auto',
                            maxWidth: '500px',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                        }}>
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
                                <i className="fas fa-search" style={{ fontSize: '3rem' }}></i>
                            </div>
                            <h5 style={{
                                color: '#2d3748',
                                fontWeight: '600',
                                marginBottom: '1rem'
                            }}>
                                Sonuç Bulunamadı
                            </h5>
                            <p style={{ color: '#718096' }}>
                                Bu kategoride henüz dergi bulunmuyor. Diğer kategorileri kontrol edin.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
