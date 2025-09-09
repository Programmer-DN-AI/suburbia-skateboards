"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  type: 'custom' | 'premade';
  // For custom skateboards
  wheel?: {
    uid: string;
    texture: string;
  };
  deck?: {
    uid: string;
    texture: string;
  };
  truck?: {
    uid: string;
    color: string;
  };
  bolt?: {
    uid: string;
    color: string;
  };
  // For premade skateboards
  skateboardId?: string;
  image?: string;
  price: number;
  createdAt: Date;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id" | "createdAt">) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("skateboard-cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // Convert createdAt strings back to Date objects
        const cartWithDates = parsedCart.map((item: any) => ({
          ...item,
          createdAt: new Date(item.createdAt),
        }));
        setItems(cartWithDates);
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("skateboard-cart", JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<CartItem, "id" | "createdAt">) => {
    const newItem: CartItem = {
      ...item,
      id: `skateboard-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
    };
    setItems(prev => [...prev, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price, 0);
  };

  const getItemCount = () => {
    return items.length;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        getTotalPrice,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
