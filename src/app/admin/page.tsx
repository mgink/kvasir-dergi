'use client';

import { useState, useEffect } from 'react';
import { magazines, contactMessages, heroSlides, aboutData } from '@/data/mockData';
import { useOrders } from '@/lib/OrderContext';
import { useToast } from '@/components/Toast';
import { Magazine, ContactMessage, Order } from '@/types';
import { SlideData, AboutData } from '@/data/mockData';
import EnhancedDashboard from '@/components/EnhancedDashboard';

export default function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [activeTab, setActiveTab] = useState<'dashboard' | 'magazines' | 'messages' | 'orders' | 'slides' | 'about'>('dashboard');
    const [lastUpdate, setLastUpdate] = useState(new Date());

    // Mock admin data
    const [adminMagazines, setAdminMagazines] = useState<Magazine[]>(magazines);
    const [adminMessages, setAdminMessages] = useState<ContactMessage[]>(contactMessages);
    const [adminSlides, setAdminSlides] = useState<SlideData[]>(heroSlides);
    const [adminAbout, setAdminAbout] = useState<AboutData>(aboutData);

    // Orders from context and toast
    const { orders, updateOrderStatus } = useOrders();
    const { showToast } = useToast();

    // Auto refresh every 30 seconds
    useEffect(() => {
        if (isAuthenticated) {
            const interval = setInterval(() => {
                setLastUpdate(new Date());
                showToast('Panel güncellendi', 'info', 2000);
            }, 30000);

            return () => clearInterval(interval);
        }
    }, [isAuthenticated, showToast]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple mock authentication
        if (credentials.username === 'admin' && credentials.password === 'admin123') {
            setIsAuthenticated(true);
        } else {
            alert('Hatalı kullanıcı adı veya şifre!');
        }
    };

    const toggleMagazineAvailability = (id: string) => {
        const magazine = adminMagazines.find(m => m.id === id);
        setAdminMagazines(prev =>
            prev.map(mag =>
                mag.id === id ? { ...mag, isAvailable: !mag.isAvailable } : mag
            )
        );

        if (magazine) {
            showToast(
                `Sayı ${magazine.issue} ${!magazine.isAvailable ? 'aktif' : 'pasif'} edildi`,
                'success'
            );
        }
    };

    const markMessageAsRead = (id: string) => {
        const message = adminMessages.find(m => m.id === id);
        setAdminMessages(prev =>
            prev.map(msg =>
                msg.id === id ? { ...msg, isRead: true } : msg
            )
        );

        if (message) {
            showToast(`"${message.subject}" başlıklı mesaj okundu olarak işaretlendi`, 'success');
        }
    };

    const handleOrderStatusUpdate = (orderId: string, newStatus: Order['status']) => {
        updateOrderStatus(orderId, newStatus, `Durum admin tarafından güncellendi`);
        showToast(`Sipariş ${orderId} durumu güncellendi: ${getStatusText(newStatus)}`, 'success');
    };

    const addNewMagazine = () => {
        const newIssue = Math.max(...adminMagazines.map(m => m.issue)) + 1;
        const newMagazine: Magazine = {
            id: Date.now().toString(),
            title: 'Kvasir Dergi',
            issue: newIssue,
            coverImage: `/images/magazines/issue-${newIssue}.jpg`,
            price: 50,
            description: `Yeni sayı ${newIssue} - Güncel edebiyat ve sanat içerikleri`,
            publishDate: new Date().toISOString().split('T')[0],
            isAvailable: true,
            category: 'Genel'
        };

        setAdminMagazines(prev => [newMagazine, ...prev]);
        showToast(`Yeni dergi sayısı ${newIssue} eklendi!`, 'success');
    };

    const toggleSlideStatus = (id: string) => {
        const slide = adminSlides.find(s => s.id === id);
        setAdminSlides(prev =>
            prev.map(slide =>
                slide.id === id ? { ...slide, isActive: !slide.isActive } : slide
            )
        );

        if (slide) {
            showToast(
                `Slayt "${slide.title}" ${!slide.isActive ? 'aktif' : 'pasif'} edildi`,
                'success'
            );
        }
    };

    const updateSlide = (id: string, updates: Partial<SlideData>) => {
        setAdminSlides(prev =>
            prev.map(slide =>
                slide.id === id ? { ...slide, ...updates } : slide
            )
        );

        showToast('Slayt güncellendi!', 'success');
    };

    const addNewSlide = () => {
        const newSlide: SlideData = {
            id: Date.now().toString(),
            title: 'Yeni Slayt Başlığı',
            description: 'Yeni slayt açıklaması buraya gelecek.',
            imageUrl: '',
            buttonText: 'Daha Fazla',
            buttonLink: '/store',
            isActive: true
        };

        setAdminSlides(prev => [...prev, newSlide]);
        showToast('Yeni slayt eklendi!', 'success');
    };

    const deleteSlide = (id: string) => {
        const slide = adminSlides.find(s => s.id === id);
        if (slide && confirm(`"${slide.title}" slaytını silmek istediğinizden emin misiniz?`)) {
            setAdminSlides(prev => prev.filter(slide => slide.id !== id));
            showToast('Slayt silindi!', 'success');
        }
    };

    const getStatusText = (status: string): string => {
        switch (status) {
            case 'pending': return 'Beklemede';
            case 'confirmed': return 'Onaylandı';
            case 'preparing': return 'Hazırlanıyor';
            case 'shipped': return 'Kargoya Verildi';
            case 'delivered': return 'Teslim Edildi';
            case 'cancelled': return 'İptal Edildi';
            default: return status;
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
                <div className="col-md-4">
                    <div className="card shadow">
                        <div className="card-body p-5">
                            <div className="text-center mb-4">
                                <i className="fas fa-shield-alt text-primary fa-3x mb-3"></i>
                                <h2 className="card-title">Admin Paneli</h2>
                                <p className="text-muted">Yönetim paneline erişmek için giriş yapın</p>
                            </div>

                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label className="form-label">Kullanıcı Adı</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={credentials.username}
                                        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                                        placeholder="Kullanıcı adınızı girin"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Şifre</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={credentials.password}
                                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                        placeholder="Şifrenizi girin"
                                        required
                                    />
                                </div>

                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary btn-lg">
                                        <i className="fas fa-sign-in-alt me-2"></i>
                                        Giriş Yap
                                    </button>
                                </div>

                                <div className="text-center mt-3">
                                    <small className="text-muted">
                                        <strong>Demo:</strong> admin / admin123
                                    </small>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-vh-100 bg-light">
            {/* Header */}
            <nav className="navbar navbar-dark bg-dark shadow">
                <div className="container-fluid">
                    <h1 className="navbar-brand h3 mb-0">
                        <i className="fas fa-tachometer-alt me-2"></i>
                        Admin Paneli
                    </h1>
                    <div className="d-flex align-items-center">
                        <small className="text-light me-3">
                            Son güncelleme: {lastUpdate.toLocaleTimeString('tr-TR')}
                        </small>
                        <button
                            onClick={() => {
                                setLastUpdate(new Date());
                                showToast('Panel manuel olarak güncellendi', 'success');
                            }}
                            className="btn btn-outline-info btn-sm me-3"
                        >
                            <i className="fas fa-sync-alt me-1"></i>
                            Yenile
                        </button>
                        <button
                            onClick={() => setIsAuthenticated(false)}
                            className="btn btn-outline-light"
                        >
                            <i className="fas fa-sign-out-alt me-2"></i>
                            Çıkış Yap
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="container-fluid py-4">
                {/* Statistics Cards */}
                <div className="row mb-4">
                    <div className="col-lg-3 col-md-6 mb-3">
                        <div className="card bg-primary text-white">
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <h5 className="card-title">Toplam Dergi</h5>
                                        <h2 className="mb-0">{adminMagazines.length}</h2>
                                    </div>
                                    <div>
                                        <i className="fas fa-book fa-2x"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 mb-3">
                        <div className="card bg-success text-white">
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <h5 className="card-title">Aktif Siparişler</h5>
                                        <h2 className="mb-0">{orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').length}</h2>
                                    </div>
                                    <div>
                                        <i className="fas fa-shopping-bag fa-2x"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 mb-3">
                        <div className="card bg-warning text-white">
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <h5 className="card-title">Okunmamış Mesajlar</h5>
                                        <h2 className="mb-0">{adminMessages.filter(m => !m.isRead).length}</h2>
                                    </div>
                                    <div>
                                        <i className="fas fa-envelope fa-2x"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 mb-3">
                        <div className="card bg-info text-white">
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <h5 className="card-title">Aktif Slaytlar</h5>
                                        <h2 className="mb-0">{adminSlides.filter(s => s.isActive).length}</h2>
                                    </div>
                                    <div>
                                        <i className="fas fa-images fa-2x"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 mb-3">
                        <div className="card bg-dark text-white">
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <h5 className="card-title">Toplam Gelir</h5>
                                        <h2 className="mb-0">₺{orders.reduce((sum, order) => sum + order.total, 0)}</h2>
                                    </div>
                                    <div>
                                        <i className="fas fa-lira-sign fa-2x"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <ul className="nav nav-tabs mb-4">
                    {[
                        { id: 'dashboard', name: 'Dashboard', icon: 'fas fa-chart-pie', count: 0 },
                        { id: 'magazines', name: 'Dergi Yönetimi', icon: 'fas fa-book', count: adminMagazines.length },
                        { id: 'slides', name: 'Slayt Yönetimi', icon: 'fas fa-images', count: adminSlides.filter(s => s.isActive).length },
                        { id: 'about', name: 'Hakkımızda', icon: 'fas fa-info-circle', count: 0 },
                        { id: 'messages', name: 'Mesajlar', icon: 'fas fa-envelope', count: adminMessages.filter(m => !m.isRead).length },
                        { id: 'orders', name: 'Siparişler', icon: 'fas fa-shopping-bag', count: orders.length }
                    ].map((tab) => (
                        <li key={tab.id} className="nav-item">
                            <button
                                onClick={() => setActiveTab(tab.id as 'dashboard' | 'magazines' | 'slides' | 'about' | 'messages' | 'orders')}
                                className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                            >
                                <i className={`${tab.icon} me-2`}></i>
                                {tab.name}
                                {tab.count > 0 && (
                                    <span className="badge bg-primary ms-2">
                                        {tab.count}
                                    </span>
                                )}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Content */}
                <div className="tab-content">
                    {activeTab === 'dashboard' && (
                        <div className="tab-pane active">
                            <h2 className="h3 mb-4">
                                <i className="fas fa-chart-pie me-2"></i>
                                Dashboard
                            </h2>
                            <EnhancedDashboard
                                orders={orders}
                                magazines={adminMagazines}
                            />
                        </div>
                    )}

                    {activeTab === 'magazines' && (
                        <div className="tab-pane active">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h2 className="h3 mb-0">
                                    <i className="fas fa-book me-2"></i>
                                    Dergi Yönetimi
                                </h2>
                                <button
                                    className="btn btn-primary"
                                    onClick={addNewMagazine}
                                >
                                    <i className="fas fa-plus me-2"></i>
                                    Yeni Dergi Ekle
                                </button>
                            </div>

                            <div className="row">
                                {adminMagazines.map((magazine) => (
                                    <div key={magazine.id} className="col-md-6 col-lg-4 mb-4">
                                        <div className="card h-100 shadow-sm">
                                            <div className="card-body">
                                                <div className="d-flex align-items-center mb-3">
                                                    <div
                                                        className="bg-gradient text-white rounded d-flex align-items-center justify-content-center me-3"
                                                        style={{
                                                            width: '60px',
                                                            height: '80px',
                                                            background: 'linear-gradient(45deg, #6366f1, #8b5cf6)'
                                                        }}
                                                    >
                                                        <small className="fw-bold">{magazine.issue}</small>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <h5 className="card-title mb-1">Sayı {magazine.issue}</h5>
                                                        <p className="card-text text-muted small mb-1">
                                                            {magazine.description.substring(0, 60)}...
                                                        </p>
                                                        <strong className="text-primary">₺{magazine.price}</strong>
                                                    </div>
                                                </div>

                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span className={`badge ${magazine.isAvailable ? 'bg-success' : 'bg-danger'}`}>
                                                        {magazine.isAvailable ? 'Mevcut' : 'Tükendi'}
                                                    </span>
                                                    <div className="btn-group" role="group">
                                                        <button
                                                            onClick={() => toggleMagazineAvailability(magazine.id)}
                                                            className="btn btn-sm btn-outline-primary"
                                                        >
                                                            <i className="fas fa-toggle-on"></i>
                                                        </button>
                                                        <button className="btn btn-sm btn-outline-secondary">
                                                            <i className="fas fa-edit"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'messages' && (
                        <div className="tab-pane active">
                            <h2 className="h3 mb-4">
                                <i className="fas fa-envelope me-2"></i>
                                İletişim Mesajları
                            </h2>

                            <div className="row">
                                {adminMessages.map((message) => (
                                    <div key={message.id} className="col-lg-6 mb-4">
                                        <div className={`card h-100 shadow-sm ${!message.isRead ? 'border-primary' : ''}`}>
                                            <div className="card-header d-flex justify-content-between align-items-center">
                                                <h5 className="card-title mb-0">
                                                    {message.subject}
                                                    {!message.isRead && (
                                                        <span className="badge bg-primary ms-2">Yeni</span>
                                                    )}
                                                </h5>
                                                <small className="text-muted">{message.date}</small>
                                            </div>
                                            <div className="card-body">
                                                <p className="card-text">
                                                    <strong>{message.name}</strong>
                                                    <br />
                                                    <small className="text-muted">{message.email}</small>
                                                </p>
                                                <p className="card-text">{message.message}</p>

                                                {!message.isRead && (
                                                    <button
                                                        onClick={() => markMessageAsRead(message.id)}
                                                        className="btn btn-primary btn-sm"
                                                    >
                                                        <i className="fas fa-check me-1"></i>
                                                        Okundu İşaretle
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'slides' && (
                        <div className="tab-pane active">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h2 className="h3 mb-0">
                                    <i className="fas fa-images me-2"></i>
                                    Slayt Yönetimi
                                </h2>
                                <button
                                    onClick={addNewSlide}
                                    className="btn btn-primary"
                                >
                                    <i className="fas fa-plus me-2"></i>
                                    Yeni Slayt Ekle
                                </button>
                            </div>

                            {adminSlides.length === 0 ? (
                                <div className="text-center py-5">
                                    <i className="fas fa-images text-muted mb-3" style={{ fontSize: '4rem' }}></i>
                                    <h5 className="text-muted">Henüz slayt bulunmuyor.</h5>
                                    <p className="text-muted">Ana sayfa slider&apos;ı için slayt ekleyin.</p>
                                </div>
                            ) : (
                                <div className="row">
                                    {adminSlides.map((slide, index) => (
                                        <div key={slide.id} className="col-lg-6 mb-4">
                                            <div className={`card shadow-sm ${slide.isActive ? 'border-success' : 'border-secondary'}`}>
                                                <div className="card-header d-flex justify-content-between align-items-center">
                                                    <h5 className="card-title mb-0">
                                                        <i className="fas fa-image me-2"></i>
                                                        Slayt {index + 1}
                                                    </h5>
                                                    <div className="d-flex gap-2">
                                                        <span className={`badge ${slide.isActive ? 'bg-success' : 'bg-secondary'}`}>
                                                            {slide.isActive ? 'Aktif' : 'Pasif'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="card-body">
                                                    <div className="mb-3">
                                                        <label className="form-label">Başlık</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={slide.title}
                                                            onChange={(e) => updateSlide(slide.id, { title: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Açıklama</label>
                                                        <textarea
                                                            className="form-control"
                                                            rows={3}
                                                            value={slide.description}
                                                            onChange={(e) => updateSlide(slide.id, { description: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Resim URL</label>
                                                        <input
                                                            type="url"
                                                            className="form-control"
                                                            value={slide.imageUrl}
                                                            onChange={(e) => updateSlide(slide.id, { imageUrl: e.target.value })}
                                                            placeholder="https://example.com/image.jpg"
                                                        />
                                                    </div>
                                                    <div className="row mb-3">
                                                        <div className="col-md-6">
                                                            <label className="form-label">Buton Metni</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={slide.buttonText || ''}
                                                                onChange={(e) => updateSlide(slide.id, { buttonText: e.target.value })}
                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label className="form-label">Buton Linki</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={slide.buttonLink || ''}
                                                                onChange={(e) => updateSlide(slide.id, { buttonLink: e.target.value })}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="d-flex gap-2">
                                                        <button
                                                            onClick={() => toggleSlideStatus(slide.id)}
                                                            className={`btn ${slide.isActive ? 'btn-warning' : 'btn-success'}`}
                                                        >
                                                            <i className={`fas ${slide.isActive ? 'fa-eye-slash' : 'fa-eye'} me-1`}></i>
                                                            {slide.isActive ? 'Pasif Et' : 'Aktif Et'}
                                                        </button>
                                                        <button
                                                            onClick={() => deleteSlide(slide.id)}
                                                            className="btn btn-danger"
                                                        >
                                                            <i className="fas fa-trash me-1"></i>
                                                            Sil
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'orders' && (
                        <div className="tab-pane active">
                            <h2 className="h3 mb-4">
                                <i className="fas fa-shopping-bag me-2"></i>
                                Siparişler
                            </h2>

                            {orders.length === 0 ? (
                                <div className="text-center py-5">
                                    <i className="fas fa-shopping-bag text-muted mb-3" style={{ fontSize: '4rem' }}></i>
                                    <h5 className="text-muted">Henüz sipariş bulunmuyor.</h5>
                                    <p className="text-muted">Yeni siparişler geldiğinde burada görünecek.</p>
                                </div>
                            ) : (
                                <div className="row">
                                    {orders.map((order) => (
                                        <div key={order.id} className="col-lg-6 mb-4">
                                            <div className="card shadow-sm">
                                                <div className="card-header d-flex justify-content-between align-items-center">
                                                    <h5 className="card-title mb-0">
                                                        <i className="fas fa-receipt me-2"></i>
                                                        {order.id}
                                                    </h5>
                                                    <small className="text-muted">
                                                        {new Date(order.orderDate).toLocaleDateString('tr-TR')}
                                                    </small>
                                                </div>
                                                <div className="card-body">
                                                    <div className="mb-3">
                                                        <h6 className="text-muted">Müşteri Bilgileri</h6>
                                                        <p className="mb-1">
                                                            <strong>{order.customerInfo.name}</strong>
                                                        </p>
                                                        <p className="text-muted mb-0">{order.customerInfo.email}</p>
                                                    </div>

                                                    <div className="mb-3">
                                                        <h6 className="text-muted">Sipariş Detayları</h6>
                                                        <p className="mb-1">
                                                            {order.items.length} ürün - <strong>₺{order.total}</strong>
                                                        </p>
                                                        <ul className="list-unstyled small text-muted">
                                                            {order.items.map((item, index) => (
                                                                <li key={index}>
                                                                    {item.quantity}x Sayı {item.magazine.issue}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <span className={`badge ${order.status === 'pending' ? 'bg-warning' :
                                                            order.status === 'confirmed' ? 'bg-info' :
                                                                order.status === 'preparing' ? 'bg-secondary' :
                                                                    order.status === 'shipped' ? 'bg-primary' :
                                                                        order.status === 'delivered' ? 'bg-success' :
                                                                            'bg-danger'
                                                            }`}>
                                                            {order.status === 'pending' ? 'Beklemede' :
                                                                order.status === 'confirmed' ? 'Onaylandı' :
                                                                    order.status === 'preparing' ? 'Hazırlanıyor' :
                                                                        order.status === 'shipped' ? 'Kargoya Verildi' :
                                                                            order.status === 'delivered' ? 'Teslim Edildi' :
                                                                                'İptal Edildi'}
                                                        </span>

                                                        <select
                                                            value={order.status}
                                                            onChange={(e) => handleOrderStatusUpdate(order.id, e.target.value as Order['status'])}
                                                            className="form-select form-select-sm"
                                                            style={{ width: 'auto' }}
                                                        >
                                                            <option value="pending">Beklemede</option>
                                                            <option value="confirmed">Onaylandı</option>
                                                            <option value="preparing">Hazırlanıyor</option>
                                                            <option value="shipped">Kargoya Verildi</option>
                                                            <option value="delivered">Teslim Edildi</option>
                                                            <option value="cancelled">İptal Edildi</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'about' && (
                        <div className="tab-pane active">
                            <h2 className="h3 mb-4">
                                <i className="fas fa-info-circle me-2"></i>
                                Hakkımızda Yönetimi
                            </h2>

                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                        const updatedAbout = {
                                            ...adminAbout,
                                            lastUpdated: new Date().toISOString()
                                        };
                                        setAdminAbout(updatedAbout);

                                        // localStorage'a kaydet
                                        localStorage.setItem('adminAbout', JSON.stringify(updatedAbout));

                                        showToast('Hakkımızda bilgileri güncellendi!', 'success');
                                    }}>
                                        {/* Basic Info */}
                                        <div className="row mb-4">
                                            <div className="col-12">
                                                <h5 className="border-bottom pb-2">Temel Bilgiler</h5>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Başlık</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={adminAbout.title}
                                                    onChange={(e) => setAdminAbout({
                                                        ...adminAbout,
                                                        title: e.target.value
                                                    })}
                                                />
                                            </div>
                                            <div className="col-12 mb-3">
                                                <label className="form-label">Ana İçerik</label>
                                                <textarea
                                                    className="form-control"
                                                    rows={4}
                                                    value={adminAbout.content}
                                                    onChange={(e) => setAdminAbout({
                                                        ...adminAbout,
                                                        content: e.target.value
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        {/* Mission & Vision */}
                                        <div className="row mb-4">
                                            <div className="col-12">
                                                <h5 className="border-bottom pb-2">Misyon & Vizyon</h5>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Misyon</label>
                                                <textarea
                                                    className="form-control"
                                                    rows={3}
                                                    value={adminAbout.mission}
                                                    onChange={(e) => setAdminAbout({
                                                        ...adminAbout,
                                                        mission: e.target.value
                                                    })}
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Vizyon</label>
                                                <textarea
                                                    className="form-control"
                                                    rows={3}
                                                    value={adminAbout.vision}
                                                    onChange={(e) => setAdminAbout({
                                                        ...adminAbout,
                                                        vision: e.target.value
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        {/* Values */}
                                        <div className="row mb-4">
                                            <div className="col-12">
                                                <h5 className="border-bottom pb-2">Değerlerimiz</h5>
                                                <div className="mb-3">
                                                    {adminAbout.values.map((value, index) => (
                                                        <div key={index} className="input-group mb-2">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={value}
                                                                onChange={(e) => {
                                                                    const newValues = [...adminAbout.values];
                                                                    newValues[index] = e.target.value;
                                                                    setAdminAbout({
                                                                        ...adminAbout,
                                                                        values: newValues
                                                                    });
                                                                }}
                                                            />
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-danger"
                                                                onClick={() => {
                                                                    const newValues = adminAbout.values.filter((_, i) => i !== index);
                                                                    setAdminAbout({
                                                                        ...adminAbout,
                                                                        values: newValues
                                                                    });
                                                                }}
                                                            >
                                                                <i className="fas fa-trash"></i>
                                                            </button>
                                                        </div>
                                                    ))}
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-primary btn-sm"
                                                        onClick={() => {
                                                            setAdminAbout({
                                                                ...adminAbout,
                                                                values: [...adminAbout.values, 'Yeni Değer']
                                                            });
                                                        }}
                                                    >
                                                        <i className="fas fa-plus me-1"></i>
                                                        Değer Ekle
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* History */}
                                        <div className="row mb-4">
                                            <div className="col-12">
                                                <h5 className="border-bottom pb-2">Tarihçe</h5>
                                                <textarea
                                                    className="form-control"
                                                    rows={4}
                                                    value={adminAbout.history}
                                                    onChange={(e) => setAdminAbout({
                                                        ...adminAbout,
                                                        history: e.target.value
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        {/* Team */}
                                        <div className="row mb-4">
                                            <div className="col-12">
                                                <h5 className="border-bottom pb-2">Ekip</h5>
                                                {adminAbout.team.map((member, index) => (
                                                    <div key={index} className="card mb-3">
                                                        <div className="card-body">
                                                            <div className="row">
                                                                <div className="col-md-4 mb-2">
                                                                    <label className="form-label">İsim</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        value={member.name}
                                                                        onChange={(e) => {
                                                                            const newTeam = [...adminAbout.team];
                                                                            newTeam[index] = { ...member, name: e.target.value };
                                                                            setAdminAbout({
                                                                                ...adminAbout,
                                                                                team: newTeam
                                                                            });
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="col-md-4 mb-2">
                                                                    <label className="form-label">Pozisyon</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        value={member.position}
                                                                        onChange={(e) => {
                                                                            const newTeam = [...adminAbout.team];
                                                                            newTeam[index] = { ...member, position: e.target.value };
                                                                            setAdminAbout({
                                                                                ...adminAbout,
                                                                                team: newTeam
                                                                            });
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="col-md-4 mb-2">
                                                                    <div className="d-flex justify-content-between align-items-end">
                                                                        <div className="flex-grow-1 me-2">
                                                                            <label className="form-label">Açıklama</label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                value={member.description}
                                                                                onChange={(e) => {
                                                                                    const newTeam = [...adminAbout.team];
                                                                                    newTeam[index] = { ...member, description: e.target.value };
                                                                                    setAdminAbout({
                                                                                        ...adminAbout,
                                                                                        team: newTeam
                                                                                    });
                                                                                }}
                                                                            />
                                                                        </div>
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-outline-danger"
                                                                            onClick={() => {
                                                                                const newTeam = adminAbout.team.filter((_, i) => i !== index);
                                                                                setAdminAbout({
                                                                                    ...adminAbout,
                                                                                    team: newTeam
                                                                                });
                                                                            }}
                                                                        >
                                                                            <i className="fas fa-trash"></i>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-primary btn-sm"
                                                    onClick={() => {
                                                        setAdminAbout({
                                                            ...adminAbout,
                                                            team: [...adminAbout.team, {
                                                                name: 'Yeni Üye',
                                                                position: 'Pozisyon',
                                                                description: 'Açıklama'
                                                            }]
                                                        });
                                                    }}
                                                >
                                                    <i className="fas fa-plus me-1"></i>
                                                    Ekip Üyesi Ekle
                                                </button>
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <div className="d-flex justify-content-between align-items-center">
                                            <small className="text-muted">
                                                Son güncelleme: {new Date(adminAbout.lastUpdated).toLocaleString('tr-TR')}
                                            </small>
                                            <button type="submit" className="btn btn-primary">
                                                <i className="fas fa-save me-2"></i>
                                                Değişiklikleri Kaydet
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
