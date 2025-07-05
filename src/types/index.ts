export interface Magazine {
    id: string;
    title: string;
    issue: number;
    coverImage: string;
    price: number;
    description: string;
    publishDate: string;
    isAvailable: boolean;
    digitalVersion?: string;
    category?: string;
}

export interface CartItem {
    magazine: Magazine;
    quantity: number;
}

export interface User {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
}

export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    date: string;
    isRead: boolean;
}

export interface Order {
    id: string;
    userId?: string;
    customerInfo: {
        name: string;
        email: string;
        phone: string;
        address?: string;
    };
    items: CartItem[];
    total: number;
    status: 'pending' | 'confirmed' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';
    orderDate: string;
    shippingAddress?: {
        name: string;
        address: string;
        city: string;
        postalCode: string;
        phone: string;
    };
    trackingNumber?: string;
    statusHistory: {
        status: string;
        date: string;
        note?: string;
    }[];
}

export interface EmailNotification {
    to: string;
    subject: string;
    content: string;
    type: 'order_confirmation' | 'status_update' | 'shipping_notification';
}
