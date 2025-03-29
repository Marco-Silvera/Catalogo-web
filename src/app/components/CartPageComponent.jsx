"use client";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { useHasMounted } from "../hooks/useHasMounted";

export default function CartPageComponent() {
    const hasMounted = useHasMounted();
    const { cartItems, removeFromCart, clearCart } = useCart();

    // Mientras el componente no se haya montado, mostramos un skeleton
    if (!hasMounted) {
        return (
            <section className="max-w-[1200px] w-full mx-auto p-5 flex-1">
                <div className="animate-pulse">
                    <div className="h-10 bg-gray-200 rounded w-48 mb-8 mx-auto sm:mx-0"></div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="flex-grow">
                            {[1, 2].map((i) => (
                                <div
                                    key={i}
                                    className="mb-6 bg-white rounded-lg shadow-sm overflow-hidden"
                                >
                                    <div className="p-4 bg-gray-50">
                                        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                                    </div>

                                    {[1, 2].map((j) => (
                                        <div
                                            key={j}
                                            className="p-4 border-t border-gray-100"
                                        >
                                            <div className="flex flex-col sm:flex-row gap-4">
                                                <div className="w-full sm:w-24 h-24 bg-gray-200 rounded"></div>
                                                <div className="flex-grow">
                                                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                                                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                                                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                                                    <div className="flex justify-between">
                                                        <div className="h-8 bg-gray-200 rounded w-24"></div>
                                                        <div className="h-8 bg-gray-200 rounded w-20"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                        <div className="w-full lg:w-80">
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <div className="h-6 bg-gray-200 rounded w-2/3 mb-6"></div>
                                <div className="space-y-4 mb-6">
                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                </div>
                                <div className="h-10 bg-gray-200 rounded w-full mb-3"></div>
                                <div className="h-10 bg-gray-200 rounded w-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Agrupar items por tipo
    const groupedItems = cartItems.reduce((acc, item) => {
        const category = item.type; // "perfume", "exclusive", "decant", "miniature"
        if (!acc[category]) acc[category] = [];
        acc[category].push(item);
        return acc;
    }, {});

    const categoryTitle = {
        perfume: "Perfumes",
        exclusive: "Exclusivos",
        decant: "Decants",
        miniature: "Miniaturas",
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + parseInt(item.price);
        }, 0);
    };

    const sendToWhatsApp = () => {
        if (cartItems.length === 0) return;

        let message = "Hola, Estoy interesado en los siguientes productos:\n\n";

        // Generar mensaje agrupado por tipo
        Object.keys(groupedItems).forEach((type) => {
            message += `${
                type === "decant"
                    ? "Decants"
                    : type === "exclusive"
                    ? "Exclusivos"
                    : type === "miniature"
                    ? "Miniaturas"
                    : "Perfumes"
            }:\n`;

            groupedItems[type].forEach((item) => {
                let baseUrl = "";

                if (type === "decant") {
                    baseUrl = "http://localhost:3000/decants/";
                } else if (type === "exclusive") {
                    baseUrl = "http://localhost:3000/exclusivos/";
                } else if (type === "miniature") {
                    baseUrl = "http://localhost:3000/miniaturas/";
                } else if (type === "perfume") {
                    // Cambia el url segun la version del perfume
                    baseUrl =
                        item.version === "Tester"
                            ? "http://localhost:3000/tester/"
                            : "http://localhost:3000/";
                }

                const productUrl = `${baseUrl}${item.path}`;

                message += `- ${item.name}  [${item.gender}${
                    type === "perfume" ? ` - ${item.version}` : ""
                }] de (${item.size} ml) - S/${item.price}\n (${productUrl})\n`;
            });
        });

        // Codifica el mensaje en un string válido para URL
        const encodedMessage = encodeURIComponent(message);

        const whatsappURL = `https://wa.me/51960153257?text=${encodedMessage}`;

        // Abrie WhatsApp en una nueva ventana
        window.open(whatsappURL, "_blank");

        clearCart();
    };

    if (cartItems.length === 0) {
        return (
            <section className="flex flex-col flex-1 items-center justify-center p-5">
                <div className="text-center max-w-md">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mx-auto h-16 w-16 text-gray-400 mb-4"
                    >
                        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                        <path d="M3 6h18" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                    <h2 className="text-2xl font-bold mb-2">
                        Tu carrito está vacío
                    </h2>
                    <p className="text-gray-500 mb-6">
                        Parece que aún no has añadido ningún perfume a tu
                        carrito
                    </p>
                    <Link
                        href="/"
                        className="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                        Explorar perfumes
                    </Link>
                </div>
            </section>
        );
    }

    // Función para generar la URL correcta según la categoría y versión
    const getProductUrl = (item) => {
        // Caso especial: si es un perfume Y es tester
        if (
            item.type === "perfume" &&
            item.version &&
            item.version.toLowerCase() === "tester"
        ) {
            return `/tester/${item.path}`;
        }

        // Para todas las demás categorías (incluyendo exclusivos que son tester)
        switch (item.type) {
            case "perfume":
                return `/${item.path}`; // Perfume sellado: directo a la ruta
            case "decant":
                return `/decants/${item.path}`;
            case "exclusive":
                return `/exclusivos/${item.path}`;
            case "miniature":
                return `/miniaturas/${item.path}`;
            default:
                return `/${item.path}`;
        }
    };

    return (
        <section className="max-w-[1200px] w-full mx-auto p-5 flex-1">
            <h1 className="text-3xl font-bold mb-8 text-center sm:text-left">
                Tu carrito
            </h1>
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Productos del carrito */}
                <div className="flex-grow">
                    {Object.keys(groupedItems).map((category) => (
                        <div
                            key={category}
                            className="mb-6 bg-white rounded-lg shadow-sm overflow-hidden"
                        >
                            <div className="p-4 bg-gray-50">
                                <h2 className="text-lg font-semibold capitalize flex items-center">
                                    {categoryTitle[category] || category}
                                    <span className="ml-2 bg-gray-200 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full">
                                        {groupedItems[category].length}
                                    </span>
                                </h2>
                            </div>

                            <div className="divide-y divide-gray-100">
                                {groupedItems[category].map((item) => (
                                    <div
                                        key={item.id}
                                        className="p-4 flex flex-col sm:flex-row gap-4"
                                    >
                                        {/* Imagen del producto */}
                                        <div className="w-full sm:w-24 h-24 flex-shrink-0">
                                            <Link
                                                href={getProductUrl(item)}
                                                target="_blank"
                                                className="w-full sm:w-24 h-24 flex-shrink-0 block"
                                            >
                                                <img
                                                    src={
                                                        item.image ||
                                                        "/placeholder.svg"
                                                    }
                                                    alt={item.name}
                                                    className="w-full h-full object-contain rounded"
                                                />
                                            </Link>
                                        </div>

                                        {/* Detalles del producto */}
                                        <div className="flex-grow">
                                            <div className="flex flex-col sm:flex-row sm:justify-between">
                                                <div>
                                                    <Link
                                                        href={getProductUrl(
                                                            item
                                                        )}
                                                        target="_blank"
                                                    >
                                                        <h3 className="font-medium text-gray-900 hover:text-blue-600">
                                                            {item.name}
                                                        </h3>
                                                    </Link>
                                                    {item.brand && (
                                                        <p className="text-sm text-gray-500">
                                                            {item.brand}
                                                        </p>
                                                    )}
                                                    <p className="text-sm text-gray-500">
                                                        {item.size} ml{" "}
                                                        {item.gender
                                                            ? `• ${item.gender}`
                                                            : ""}
                                                    </p>
                                                    {item.version && (
                                                        <p className="text-sm text-gray-500">
                                                            Versión:{" "}
                                                            {item.version}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="mt-2 sm:mt-0 flex flex-col items-start sm:items-end">
                                                    <span className="font-medium">
                                                        S/ {item.price}.00
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Botón eliminar */}
                                            <div className="flex justify-end items-center mt-4">
                                                <button
                                                    onClick={() =>
                                                        removeFromCart(item.id)
                                                    }
                                                    className="text-red-500 hover:text-red-700 flex items-center"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="h-4 w-4 mr-1"
                                                    >
                                                        <path d="M3 6h18" />
                                                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                                        <line
                                                            x1="10"
                                                            x2="10"
                                                            y1="11"
                                                            y2="17"
                                                        />
                                                        <line
                                                            x1="14"
                                                            x2="14"
                                                            y1="11"
                                                            y2="17"
                                                        />
                                                    </svg>
                                                    <span className="text-sm">
                                                        Eliminar
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Resumen del pedido */}
                <div className="w-full lg:w-80 h-fit">
                    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                        <h2 className="text-lg font-semibold mb-4">
                            Resumen del Pedido
                        </h2>
                        <div className="space-y-3 mb-4">
                            <div className="flex justify-between">
                                <span className="text-gray-600">
                                    Subtotal ({cartItems.length}{" "}
                                    {cartItems.length === 1
                                        ? "producto"
                                        : "productos"}
                                    )
                                </span>
                                <span>S/ {calculateTotal().toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="border-t pt-3 mb-6">
                            <div className="flex justify-between font-semibold">
                                <span>Total</span>
                                <span>S/ {calculateTotal().toFixed(2)}</span>
                            </div>
                        </div>
                        <button
                            onClick={sendToWhatsApp}
                            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                width="18"
                                height="18"
                                fill="currentColor"
                            >
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Finalizar compra
                        </button>
                        <button
                            onClick={clearCart}
                            className="w-full mt-3 border border-gray-300 text-gray-600 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                        >
                            Vaciar carrito
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
