"use client";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useHasMounted } from "../hooks/useHasMounted";

export default function AddToCartButton({ product }) {
    const { cartItems, addCart, isInCart } = useCart();
    const [added, setAdded] = useState(false);
    const hasMounted = useHasMounted();

    useEffect(() => {
        setAdded(isInCart(product.id));
    }, [cartItems, product.id, isInCart]);

    const handleAddToCart = () => {
        if (!added) {
            addCart(product);
            setAdded(true);
            Swal.fire({
                icon: "success",
                title: `${product.name} fue añadido al carrito.`,
                toast: true,
                position: "top-start",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
        }
    };

    if (!hasMounted) {
        return (
            <div className="w-[160px] h-[40px] bg-gray-300 animate-pulse rounded-lg"></div>
        );
    }

    return added ? (
        <Link href="/carrito">
            <button className="bg-green-500 text-white py-2 px-5 rounded-lg hover:bg-green-600 transition">
                Ver el carrito
            </button>
        </Link>
    ) : (
        <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white py-2 px-5 rounded-lg hover:bg-blue-700 transition"
        >
            Agregar al carrito
        </button>
    );
}
