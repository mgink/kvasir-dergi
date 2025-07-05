'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Order, EmailNotification } from '@/types';
import { EmailService } from './EmailService';
import { generateDownloadToken } from './downloadUtils';

interface OrderContextType {
    orders: Order[];
    addOrder: (order: Omit<Order, 'id' | 'orderDate' | 'statusHistory'>) => string;
    updateOrderStatus: (orderId: string, status: Order['status'], note?: string) => void;
    getOrderById: (orderId: string) => Order | undefined;
    sendEmailNotification: (notification: EmailNotification) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
    const [orders, setOrders] = useState<Order[]>([
        // Örnek siparişler ekleyelim
        {
            id: 'ORDER-1703767200000',
            customerInfo: {
                name: 'Mehmet Demir',
                email: 'mehmet@example.com',
                phone: '+90 555 123 4567',
                address: 'Kadıköy, İstanbul'
            },
            items: [
                {
                    magazine: {
                        id: '1',
                        title: 'Kvasir Dergi',
                        issue: 25,
                        coverImage: '/images/magazines/issue-25.jpg',
                        price: 45,
                        description: 'Edebiyat, sanat ve kültür dergisi.',
                        publishDate: '2024-12-01',
                        isAvailable: true,
                        category: 'Edebiyat'
                    },
                    quantity: 2
                }
            ],
            total: 90,
            status: 'pending',
            orderDate: '2024-12-28T10:00:00.000Z',
            statusHistory: [
                {
                    status: 'pending',
                    date: '2024-12-28T10:00:00.000Z',
                    note: 'Sipariş oluşturuldu'
                }
            ]
        },
        {
            id: 'ORDER-1703853600000',
            customerInfo: {
                name: 'Ayşe Kıran',
                email: 'ayse@example.com',
                phone: '+90 555 987 6543',
                address: 'Beşiktaş, İstanbul'
            },
            items: [
                {
                    magazine: {
                        id: '2',
                        title: 'Kvasir Dergi',
                        issue: 24,
                        coverImage: '/images/magazines/issue-24.jpg',
                        price: 45,
                        description: 'Çağdaş sanat ve eleştiri özel sayısı.',
                        publishDate: '2024-11-01',
                        isAvailable: true,
                        category: 'Sanat'
                    },
                    quantity: 1
                },
                {
                    magazine: {
                        id: '3',
                        title: 'Kvasir Dergi',
                        issue: 23,
                        coverImage: '/images/magazines/issue-23.jpg',
                        price: 40,
                        description: 'Felsefe ve düşünce tarihi dosyası.',
                        publishDate: '2024-10-01',
                        isAvailable: true,
                        category: 'Felsefe'
                    },
                    quantity: 1
                }
            ],
            total: 85,
            status: 'confirmed',
            orderDate: '2024-12-27T14:30:00.000Z',
            statusHistory: [
                {
                    status: 'pending',
                    date: '2024-12-27T14:30:00.000Z',
                    note: 'Sipariş oluşturuldu'
                },
                {
                    status: 'confirmed',
                    date: '2024-12-27T15:00:00.000Z',
                    note: 'Sipariş onaylandı'
                }
            ]
        }
    ]);

    const addOrder = (orderData: Omit<Order, 'id' | 'orderDate' | 'statusHistory'>): string => {
        const orderId = 'ORDER-' + Date.now();
        const newOrder: Order = {
            ...orderData,
            id: orderId,
            orderDate: new Date().toISOString(),
            statusHistory: [{
                status: 'pending',
                date: new Date().toISOString(),
                note: 'Sipariş oluşturuldu'
            }]
        };

        setOrders(prev => [...prev, newOrder]);

        // E-posta bildirimi gönder
        sendEmailNotification({
            to: newOrder.customerInfo.email,
            subject: `Siparişiniz Alındı - ${orderId}`,
            content: `Merhaba ${newOrder.customerInfo.name}, siparişiniz başarıyla alınmıştır. Sipariş numaranız: ${orderId}`,
            type: 'order_confirmation'
        });

        return orderId;
    };

    const updateOrderStatus = (orderId: string, status: Order['status'], note?: string) => {
        setOrders(prev => prev.map(order => {
            if (order.id === orderId) {
                const updatedOrder = {
                    ...order,
                    status,
                    statusHistory: [
                        ...order.statusHistory,
                        {
                            status,
                            date: new Date().toISOString(),
                            note: note || `Sipariş durumu güncellendi: ${status}`
                        }
                    ]
                };

                // E-posta bildirimleri gönder
                handleOrderStatusChange(updatedOrder, status);

                return updatedOrder;
            }
            return order;
        }));
    };

    const handleOrderStatusChange = async (order: Order, newStatus: Order['status']) => {
        try {
            switch (newStatus) {
                case 'confirmed':
                    // Sipariş onay maili
                    const confirmationTemplate = EmailService.generateOrderConfirmation({
                        customerName: order.customerInfo.name,
                        orderNumber: order.id,
                        orderItems: order.items.map(item => ({
                            title: item.magazine.title,
                            issue: item.magazine.issue,
                            quantity: item.quantity,
                            price: item.magazine.price
                        })),
                        total: order.total,
                        orderDate: new Date(order.orderDate).toLocaleDateString('tr-TR'),
                        shippingAddress: order.customerInfo.address
                    });

                    await EmailService.sendEmail(order.customerInfo.email, confirmationTemplate);
                    break;

                case 'shipped':
                    // Kargo bildirimi
                    const trackingNumber = `KV${Date.now()}`;
                    const shippingTemplate = EmailService.generateShippingNotification({
                        customerName: order.customerInfo.name,
                        orderNumber: order.id,
                        orderItems: order.items.map(item => ({
                            title: item.magazine.title,
                            issue: item.magazine.issue,
                            quantity: item.quantity,
                            price: item.magazine.price
                        })),
                        total: order.total,
                        orderDate: new Date(order.orderDate).toLocaleDateString('tr-TR'),
                        trackingNumber
                    });

                    await EmailService.sendEmail(order.customerInfo.email, shippingTemplate);
                    break;

                case 'delivered':
                    // Dijital içerik varsa PDF gönder
                    const digitalItems = order.items
                        .filter(item => item.magazine.digitalVersion)
                        .map(item => ({
                            title: item.magazine.title,
                            issue: item.magazine.issue,
                            downloadLink: generateDigitalDownloadLink(item.magazine.id, order.id)
                        }));

                    if (digitalItems.length > 0) {
                        const digitalTemplate = EmailService.generateDigitalDelivery({
                            customerName: order.customerInfo.name,
                            orderNumber: order.id,
                            orderItems: order.items.map(item => ({
                                title: item.magazine.title,
                                issue: item.magazine.issue,
                                quantity: item.quantity,
                                price: item.magazine.price
                            })),
                            total: order.total,
                            orderDate: new Date(order.orderDate).toLocaleDateString('tr-TR'),
                            digitalItems
                        });

                        await EmailService.sendEmail(order.customerInfo.email, digitalTemplate);
                    }
                    break;

                case 'cancelled':
                    // İptal bildirimi
                    const cancellationTemplate = EmailService.generateOrderCancellation({
                        customerName: order.customerInfo.name,
                        orderNumber: order.id,
                        orderItems: order.items.map(item => ({
                            title: item.magazine.title,
                            issue: item.magazine.issue,
                            quantity: item.quantity,
                            price: item.magazine.price
                        })),
                        total: order.total,
                        orderDate: new Date(order.orderDate).toLocaleDateString('tr-TR'),
                        reason: 'Müşteri talebi'
                    });

                    await EmailService.sendEmail(order.customerInfo.email, cancellationTemplate);
                    break;
            }
        } catch (error) {
            console.error('E-posta gönderme hatası:', error);
        }
    };

    // Dijital download linki oluştur
    const generateDigitalDownloadLink = (magazineId: string, orderId: string): string => {
        // Get customer ID from order (in real app, this would be from the order)
        const order = getOrderById(orderId);
        const customerId = order?.customerInfo.email || 'unknown';

        // Generate secure token using the API function
        const token = generateDownloadToken(magazineId, customerId, orderId);
        return `${typeof window !== 'undefined' ? window.location.origin : ''}/api/download/${token}`;
    };

    const getOrderById = (orderId: string): Order | undefined => {
        return orders.find(order => order.id === orderId);
    };

    const sendEmailNotification = (notification: EmailNotification) => {
        // Gerçek uygulamada burada e-posta servisine istek atılır
        console.log('📧 E-posta Gönderildi:', {
            to: notification.to,
            subject: notification.subject,
            content: notification.content,
            type: notification.type,
            timestamp: new Date().toISOString()
        });

        // Simülasyon için toast bildirimi gösterelim
        if (typeof window !== 'undefined') {
            setTimeout(() => {
                alert(`E-posta gönderildi: ${notification.to}\nKonu: ${notification.subject}`);
            }, 1000);
        }
    };

    const getStatusText = (status: Order['status']): string => {
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

    return (
        <OrderContext.Provider value={{
            orders,
            addOrder,
            updateOrderStatus,
            getOrderById,
            sendEmailNotification
        }}>
            {children}
        </OrderContext.Provider>
    );
}

export function useOrders() {
    const context = useContext(OrderContext);
    if (context === undefined) {
        throw new Error('useOrders must be used within an OrderProvider');
    }
    return context;
}
