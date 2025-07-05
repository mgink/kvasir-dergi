// Enhanced types for analytics and dashboard functionality
import { Magazine, Order } from './index';

// Dashboard Analytics Data
export interface AnalyticsData {
    totalRevenue: number;
    totalOrders: number;
    totalCustomers: number;
    averageOrderValue: number;
    revenueGrowth: number;
    orderGrowth: number;
    topSellingMagazines: Array<{
        id: string;
        title: string;
        issue: number;
        sales: number;
        revenue: number;
    }>;
    recentActivity: Array<{
        id: string;
        type: 'order' | 'message' | 'magazine';
        description: string;
        timestamp: string;
        status: 'success' | 'warning' | 'info';
    }>;
    monthlyRevenue: Array<{
        month: string;
        revenue: number;
        orders: number;
    }>;
}

// Enhanced Magazine Interface
export interface EnhancedMagazine extends Magazine {
    views: number;
    downloads: number;
    rating: number;
    reviewCount: number;
    tags: string[];
    authorSpotlight?: string;
    featured: boolean;
}

// Newsletter Subscription
export interface NewsletterSubscription {
    id: string;
    email: string;
    name?: string;
    subscriptionDate: string;
    isActive: boolean;
    preferences: {
        newIssues: boolean;
        events: boolean;
        promotions: boolean;
    };
}

// Enhanced Order Interface
export interface EnhancedOrder extends Order {
    trackingNumber?: string;
    estimatedDelivery?: string;
    paymentMethod: 'credit_card' | 'bank_transfer' | 'cash_on_delivery';
    notes?: string;
}

// Blog Post Interface
export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    author: string;
    publishDate: string;
    featuredImage: string;
    tags: string[];
    category: 'edebiyat' | 'sanat' | 'kultur' | 'yasamBicimi';
    isPublished: boolean;
    views: number;
    comments: Array<{
        id: string;
        author: string;
        content: string;
        date: string;
    }>;
}

// Event Interface
export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    type: 'workshop' | 'reading' | 'launch' | 'discussion';
    price: number;
    maxAttendees: number;
    currentAttendees: number;
    imageUrl: string;
    isActive: boolean;
}
