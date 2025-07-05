'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { magazines } from '@/data/mockData';

interface SearchResult {
    type: 'magazine' | 'page';
    id: string;
    title: string;
    description: string;
    url: string;
    issue?: number;
}

export default function SearchModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Sample search data
    const searchData: SearchResult[] = useMemo(() => [
        ...magazines.map(mag => ({
            type: 'magazine' as const,
            id: mag.id,
            title: `Kvasir Dergi Sayı ${mag.issue}`,
            description: mag.description,
            url: '/store',
            issue: mag.issue
        })),
        {
            type: 'page' as const,
            id: 'blog',
            title: 'Blog',
            description: 'Edebiyat, sanat ve kültür yazıları',
            url: '/blog'
        },
        {
            type: 'page' as const,
            id: 'events',
            title: 'Etkinlikler',
            description: 'Edebiyat ve sanat etkinlikleri',
            url: '/events'
        },
        {
            type: 'page' as const,
            id: 'about',
            title: 'Hakkımızda',
            description: 'Kvasir Dergi hakkında bilgi',
            url: '/about'
        },
        {
            type: 'page' as const,
            id: 'contact',
            title: 'İletişim',
            description: 'Bizimle iletişime geçin',
            url: '/contact'
        }
    ], []);

    // Keyboard shortcut to open search (Ctrl+K or Cmd+K)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(true);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Focus input when modal opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Search functionality
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        setLoading(true);
        const searchTimer = setTimeout(() => {
            const filtered = searchData.filter(item =>
                item.title.toLowerCase().includes(query.toLowerCase()) ||
                item.description.toLowerCase().includes(query.toLowerCase())
            ).slice(0, 6);

            setResults(filtered);
            setLoading(false);
        }, 300);

        return () => clearTimeout(searchTimer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    const handleResultClick = () => {
        setIsOpen(false);
        setQuery('');
        setResults([]);
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="btn btn-outline-light btn-sm d-none d-md-flex align-items-center"
                title="Ara (Ctrl+K)"
            >
                <i className="fas fa-search me-2"></i>
                Ara...
                <kbd className="ms-2 small">⌘K</kbd>
            </button>
        );
    }

    return (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header border-0 pb-0">
                        <div className="input-group">
                            <span className="input-group-text border-0 bg-transparent">
                                <i className="fas fa-search text-muted"></i>
                            </span>
                            <input
                                ref={inputRef}
                                type="text"
                                className="form-control border-0 fs-5"
                                placeholder="Dergi sayıları, sayfalar ara..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                style={{ boxShadow: 'none' }}
                            />
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setIsOpen(false)}
                            ></button>
                        </div>
                    </div>

                    <div className="modal-body pt-2">
                        {loading && (
                            <div className="text-center py-4">
                                <div className="spinner-border spinner-border-sm text-primary" role="status">
                                    <span className="visually-hidden">Aranıyor...</span>
                                </div>
                                <p className="text-muted mt-2 mb-0">Aranıyor...</p>
                            </div>
                        )}

                        {!loading && query && results.length === 0 && (
                            <div className="text-center py-4">
                                <i className="fas fa-search text-muted mb-3" style={{ fontSize: '2rem' }}></i>
                                <p className="text-muted mb-0">&quot;{query}&quot; için sonuç bulunamadı</p>
                            </div>
                        )}

                        {!loading && results.length > 0 && (
                            <div>
                                <h6 className="text-muted mb-3">Arama Sonuçları</h6>
                                <div className="list-group list-group-flush">
                                    {results.map((result) => (
                                        <Link
                                            key={result.id}
                                            href={result.url}
                                            className="list-group-item list-group-item-action border-0 px-0"
                                            onClick={handleResultClick}
                                        >
                                            <div className="d-flex align-items-center">
                                                <div className={`me-3 p-2 rounded ${result.type === 'magazine' ? 'bg-primary' : 'bg-success'
                                                    } text-white`}>
                                                    <i className={`fas ${result.type === 'magazine' ? 'fa-book' : 'fa-file-alt'
                                                        } small`}></i>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <h6 className="mb-1">{result.title}</h6>
                                                    <p className="text-muted small mb-0">{result.description}</p>
                                                </div>
                                                <i className="fas fa-arrow-right text-muted"></i>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {!query && (
                            <div>
                                <h6 className="text-muted mb-3">Hızlı Erişim</h6>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Link href="/store" className="card text-decoration-none mb-3" onClick={handleResultClick}>
                                            <div className="card-body py-3">
                                                <div className="d-flex align-items-center">
                                                    <i className="fas fa-store text-primary me-3"></i>
                                                    <div>
                                                        <h6 className="mb-0">Mağaza</h6>
                                                        <small className="text-muted">Dergi sayıları</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-md-6">
                                        <Link href="/blog" className="card text-decoration-none mb-3" onClick={handleResultClick}>
                                            <div className="card-body py-3">
                                                <div className="d-flex align-items-center">
                                                    <i className="fas fa-pen-fancy text-success me-3"></i>
                                                    <div>
                                                        <h6 className="mb-0">Blog</h6>
                                                        <small className="text-muted">Yazılar ve makaleler</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-md-6">
                                        <Link href="/events" className="card text-decoration-none mb-3" onClick={handleResultClick}>
                                            <div className="card-body py-3">
                                                <div className="d-flex align-items-center">
                                                    <i className="fas fa-calendar-alt text-warning me-3"></i>
                                                    <div>
                                                        <h6 className="mb-0">Etkinlikler</h6>
                                                        <small className="text-muted">Atölye ve söyleşiler</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-md-6">
                                        <Link href="/contact" className="card text-decoration-none mb-3" onClick={handleResultClick}>
                                            <div className="card-body py-3">
                                                <div className="d-flex align-items-center">
                                                    <i className="fas fa-envelope text-info me-3"></i>
                                                    <div>
                                                        <h6 className="mb-0">İletişim</h6>
                                                        <small className="text-muted">Bize ulaşın</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="modal-footer border-0 pt-0">
                        <div className="d-flex justify-content-between w-100 small text-muted">
                            <span>Aramak için yazmaya başlayın</span>
                            <span><kbd>ESC</kbd> ile kapatın</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
