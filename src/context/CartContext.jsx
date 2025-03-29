"use client";
import { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartContextProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        if (typeof window !== "undefined") {
            const savedCart = localStorage.getItem("cart");
            return savedCart ? JSON.parse(savedCart) : [];
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const addCart = (item) => {
        // item debe tener al menos: id, name, price, size, image, type, path
        setCartItems((prev) => [...prev, item]);
    };

    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const isInCart = (id) => {
        return cartItems.some((item) => item.id === id);
    };

    const clearCart = () => setCartItems([]);

    return (
        <CartContext.Provider
            value={{ cartItems, addCart, removeFromCart, isInCart, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
}
