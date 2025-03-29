"use client";
import { CartContextProvider } from "@/context/CartContext";

export default function CartProviderWrapper({ children }) {
    return <CartContextProvider>{children}</CartContextProvider>;
}
