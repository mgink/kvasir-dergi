'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Magazine } from '@/types';

interface CartContextType {
    items: CartItem[];
    addToCart: (magazine: Magazine, showAnimation?: boolean) => void;
    removeFromCart: (magazineId: string) => void;
    updateQuantity: (magazineId: string, quantity: number) => void;
    clearCart: () => void;
    getTotalPrice: () => number;
    getTotalItems: () => number;
    cartAnimation: boolean;
    triggerCartAnimation: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [cartAnimation, setCartAnimation] = useState(false);

    const triggerCartAnimation = () => {
        setCartAnimation(true);
        setTimeout(() => setCartAnimation(false), 600);
    };

    const addToCart = (magazine: Magazine, showAnimation: boolean = true) => {
        setItems(prevItems => {
            const existingItem = prevItems.find(item => item.magazine.id === magazine.id);

            if (existingItem) {
                return prevItems.map(item =>
                    item.magazine.id === magazine.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prevItems, { magazine, quantity: 1 }];
        });

        if (showAnimation) {
            triggerCartAnimation();
        }
    };

    const removeFromCart = (magazineId: string) => {
        setItems(prevItems => prevItems.filter(item => item.magazine.id !== magazineId));
    };

    const updateQuantity = (magazineId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(magazineId);
            return;
        }

        setItems(prevItems =>
            prevItems.map(item =>
                item.magazine.id === magazineId
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const getTotalPrice = () => {
        return items.reduce((total, item) => total + (item.magazine.price * item.quantity), 0);
    };

    const getTotalItems = () => {
        return items.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{
            items,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getTotalPrice,
            getTotalItems,
            cartAnimation,
            triggerCartAnimation
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
