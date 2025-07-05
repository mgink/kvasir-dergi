'use client';

import { useState, useEffect } from 'react';
import { Order, Magazine } from '@/types';

interface TopSellingMagazine extends Magazine {
    sales: number;
    revenue: number;
}

interface RecentActivity {
    id: string;
    type: 'order' | 'message' | 'magazine';
    description: string;
    timestamp: string;
    status: 'success' | 'warning' | 'info';
}

interface DashboardProps {
    orders: Order[];
    magazines: Magazine[];
}

export default function EnhancedDashboard({ orders, magazines }: DashboardProps) {
    const [dashboardData, setDashboardData] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        totalCustomers: 0,
        averageOrderValue: 0,
        revenueGrowth: 0,
        orderGrowth: 0,
        topSellingMagazines: [] as TopSellingMagazine[],
        recentActivity: [] as RecentActivity[],
        monthlyRevenue: [] as { month: string; revenue: number }[]
    });

    useEffect(() => {
        // Calculate dashboard metrics
        const revenue = orders.reduce((sum, order) => sum + order.total, 0);
        const uniqueCustomers = new Set(orders.map(order => order.customerInfo.email)).size;
        const avgOrderValue = orders.length > 0 ? revenue / orders.length : 0;

        // Calculate magazine sales
        const magazineSales = magazines.map(mag => {
            const sales = orders.reduce((sum, order) => {
                const magazineItems = order.items.filter(item => item.magazine.id === mag.id);
                return sum + magazineItems.reduce((itemSum, item) => itemSum + item.quantity, 0);
            }, 0);

            const magazineRevenue = orders.reduce((sum, order) => {
                const magazineItems = order.items.filter(item => item.magazine.id === mag.id);
                return sum + magazineItems.reduce((itemSum, item) => itemSum + (item.quantity * item.magazine.price), 0);
            }, 0);

            return {
                ...mag,
                sales,
                revenue: magazineRevenue
            };
        }).sort((a, b) => b.sales - a.sales).slice(0, 5);

        // Mock recent activity
        const recentActivity = [
            {
                id: '1',
                type: 'order' as const,
                description: 'Yeni sipariş alındı - Sayı 42',
                timestamp: '5 dakika önce',
                status: 'success' as const
            },
            {
                id: '2',
                type: 'message' as const,
                description: 'Yeni iletişim mesajı',
                timestamp: '12 dakika önce',
                status: 'info' as const
            },
            {
                id: '3',
                type: 'magazine' as const,
                description: 'Sayı 43 yayınlandı',
                timestamp: '1 saat önce',
                status: 'success' as const
            }
        ];

        // Mock monthly revenue data
        const monthlyRevenue = [
            { month: 'Ocak', revenue: 15000, orders: 45 },
            { month: 'Şubat', revenue: 18000, orders: 52 },
            { month: 'Mart', revenue: 22000, orders: 61 },
            { month: 'Nisan', revenue: 19000, orders: 48 },
            { month: 'Mayıs', revenue: 25000, orders: 67 },
            { month: 'Haziran', revenue: revenue, orders: orders.length }
        ];

        setDashboardData({
            totalRevenue: revenue,
            totalOrders: orders.length,
            totalCustomers: uniqueCustomers,
            averageOrderValue: avgOrderValue,
            revenueGrowth: 15.3,
            orderGrowth: 8.7,
            topSellingMagazines: magazineSales,
            recentActivity,
            monthlyRevenue
        });
    }, [orders, magazines]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'TRY'
        }).format(amount);
    };

    return (
        <div>
            {/* Enhanced Statistics Cards */}
            <div className="row mb-4">
                <div className="col-lg-3 col-md-6 mb-4">
                    <div className="card bg-primary text-white h-100">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="card-title text-uppercase fw-bold small">Toplam Gelir</h6>
                                    <h2 className="fw-bold">{formatCurrency(dashboardData.totalRevenue)}</h2>
                                    <p className="mb-0 small">
                                        <i className="fas fa-arrow-up me-1"></i>
                                        +{dashboardData.revenueGrowth}% bu ay
                                    </p>
                                </div>
                                <div className="text-end">
                                    <i className="fas fa-chart-line fa-2x opacity-75"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 mb-4">
                    <div className="card bg-success text-white h-100">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="card-title text-uppercase fw-bold small">Toplam Sipariş</h6>
                                    <h2 className="fw-bold">{dashboardData.totalOrders}</h2>
                                    <p className="mb-0 small">
                                        <i className="fas fa-arrow-up me-1"></i>
                                        +{dashboardData.orderGrowth}% bu ay
                                    </p>
                                </div>
                                <div className="text-end">
                                    <i className="fas fa-shopping-cart fa-2x opacity-75"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 mb-4">
                    <div className="card bg-info text-white h-100">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="card-title text-uppercase fw-bold small">Toplam Müşteri</h6>
                                    <h2 className="fw-bold">{dashboardData.totalCustomers}</h2>
                                    <p className="mb-0 small">
                                        <i className="fas fa-users me-1"></i>
                                        Benzersiz müşteri
                                    </p>
                                </div>
                                <div className="text-end">
                                    <i className="fas fa-users fa-2x opacity-75"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 mb-4">
                    <div className="card bg-warning text-dark h-100">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="card-title text-uppercase fw-bold small">Ortalama Sepet</h6>
                                    <h2 className="fw-bold">{formatCurrency(dashboardData.averageOrderValue)}</h2>
                                    <p className="mb-0 small">
                                        <i className="fas fa-calculator me-1"></i>
                                        Sipariş başına
                                    </p>
                                </div>
                                <div className="text-end">
                                    <i className="fas fa-calculator fa-2x opacity-75"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                {/* Revenue Chart */}
                <div className="col-lg-8 mb-4">
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h5 className="card-title mb-0">
                                <i className="fas fa-chart-area me-2"></i>
                                Aylık Gelir Trendi
                            </h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                {dashboardData.monthlyRevenue.map((month) => (
                                    <div key={month.month} className="col-md-2 text-center mb-3">
                                        <div className="mb-2">
                                            <div
                                                className="bg-primary rounded"
                                                style={{
                                                    height: `${(month.revenue / 25000) * 100}px`,
                                                    minHeight: '20px',
                                                    width: '100%'
                                                }}
                                            ></div>
                                        </div>
                                        <small className="fw-bold">{month.month}</small>
                                        <br />
                                        <small className="text-muted">{formatCurrency(month.revenue)}</small>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="col-lg-4 mb-4">
                    <div className="card">
                        <div className="card-header bg-success text-white">
                            <h5 className="card-title mb-0">
                                <i className="fas fa-clock me-2"></i>
                                Son Aktiviteler
                            </h5>
                        </div>
                        <div className="card-body p-0">
                            <div className="list-group list-group-flush">
                                {dashboardData.recentActivity.map((activity) => (
                                    <div key={activity.id} className="list-group-item">
                                        <div className="d-flex align-items-center">
                                            <div className={`me-3 p-2 rounded-circle ${activity.status === 'success' ? 'bg-success' :
                                                activity.status === 'warning' ? 'bg-warning' :
                                                    'bg-info'
                                                } text-white`}>
                                                <i className={`fas ${activity.type === 'order' ? 'fa-shopping-cart' :
                                                    activity.type === 'message' ? 'fa-envelope' :
                                                        'fa-book'
                                                    } small`}></i>
                                            </div>
                                            <div className="flex-grow-1">
                                                <h6 className="mb-1 small">{activity.description}</h6>
                                                <small className="text-muted">{activity.timestamp}</small>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Selling Magazines */}
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header bg-warning text-dark">
                            <h5 className="card-title mb-0">
                                <i className="fas fa-trophy me-2"></i>
                                En Çok Satan Dergiler
                            </h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                {dashboardData.topSellingMagazines.map((magazine, index) => (
                                    <div key={magazine.id} className="col-md-2-4 col-sm-6 mb-3">
                                        <div className="card text-center">
                                            <div className="card-body">
                                                <div className={`badge ${index === 0 ? 'bg-warning' :
                                                    index === 1 ? 'bg-secondary' :
                                                        index === 2 ? 'bg-info' :
                                                            'bg-light text-dark'
                                                    } mb-2`}>
                                                    #{index + 1}
                                                </div>
                                                <h6 className="card-title">Sayı {magazine.issue}</h6>
                                                <p className="card-text small text-muted">
                                                    {magazine.sales} satış
                                                </p>
                                                <p className="card-text fw-bold text-success">
                                                    {formatCurrency(magazine.revenue)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
