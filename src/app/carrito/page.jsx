// import { useCart } from "../context/CartContext";

function Cart() {

    return (
        <section className="max-w-[1000px] w-full self-center mt-10 p-5 flex-1">
            <h2 className="text-2xl font-bold mb-5 text-center underline">
                Carrito de Compras
            </h2>
            {/* {Object.keys(groupedItems).map((type) => (
                <div key={type} className="mb-5">
                    <h3 className="text-xl font-semibold mb-3">
                        {type === "decant"
                            ? "Decants"
                            : type === "exclusive"
                            ? "Exclusivos"
                            : type === "miniature"
                            ? "Miniaturas"
                            : "Perfumes"}
                    </h3>
                    <section className="relative overflow-x-auto">
                        <table className="w-full overflow-x-auto text-sm text-left text-gray-500 table-fixed rtl:text-right">
                            <thead className="text-xs text-gray-700 uppercase">
                                <th className="text-start px-0 sm:px-6 py-3">
                                    Nombre
                                </th>
                                <th className="text-start px-0 sm:px-6 py-3"></th>
                                <th className="text-start px-0 sm:px-6 py-3">
                                    Tamaño
                                </th>
                                <th className="text-start px-0 sm:px-6 py-3">
                                    Precio
                                </th>
                            </thead>
                            <tbody>
                                {groupedItems[type].map((item) => {
                                    let path = "";
                                    if (type === "perfume") {
                                        path =
                                            item.version === "Tester"
                                                ? `/tester/${item.path}`
                                                : `/${item.path}`;
                                    } else if (type === "exclusive") {
                                        path = `/exclusivos/${item.path}`;
                                    } else if (type === "decant") {
                                        path = `/decants/${item.path}`;
                                    } else if (type === "miniature") {
                                        path = `/miniaturas/${item.path}`;
                                    }

                                    return (
                                        <tr
                                            key={item.id}
                                            className="border-b mb-2 sm:mb-0"
                                        >
                                            <td className="px-0 sm:px-6 py-4">
                                                <a
                                                    className="hover:text-gray-700"
                                                    href={path}
                                                    target="_blank"
                                                >
                                                    {item.name}
                                                </a>
                                            </td>
                                            <td className="px-0 sm:px-6 py-4">
                                                <a href={path} target="_blank">
                                                    <img
                                                        className="h-10 sm:h-20"
                                                        src={item.image}
                                                        alt={`Perfume ${item.type} - ${item.name}`}
                                                    />
                                                </a>
                                            </td>
                                            <td className="px-0 sm:px-6 py-4">
                                                {item.size} ml
                                            </td>
                                            <td className="px-0 sm:px-6 py-4">
                                                {item.price}
                                            </td>
                                            <td className="px-0 sm:px-6 py-4 w-[100px]">
                                                <div className="flex justify-center sm:justify-end items-center h-full">
                                                    <button
                                                        onClick={() =>
                                                            removeFromCart(
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        <img
                                                            className="h-5"
                                                            src="/eliminar.svg"
                                                            alt="Eliminar del carrito"
                                                        />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </section>
                </div>
            ))} */}
            <div className="flex justify-between mt-5">
                {/* <button
                    onClick={clearCart}
                    className="bg-gray-600 text-white py-2 px-2 sm:px-5 rounded hover:bg-gray-700"
                >
                    Vaciar Carrito
                </button>
                <button
                    onClick={sendToWhatsApp}
                    className="bg-green-500 text-white py-2 px-2 sm:px-5 rounded hover:bg-green-600 flex gap-2 sm:gap-5"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M20.52 3.483A11.625 11.625 0 0012.015 0C5.378 0 .039 5.338.039 11.929c0 2.105.548 4.163 1.587 5.985l-1.664 6.086 6.215-1.628c1.739.951 3.7 1.455 5.672 1.455h.005c6.635 0 11.98-5.339 11.98-11.929 0-3.189-1.242-6.189-3.516-8.415zM12.02 21.617c-1.735 0-3.462-.457-4.95-1.319l-.354-.206-3.686.964.984-3.599-.224-.37a9.429 9.429 0 01-1.438-4.941c0-5.209 4.243-9.453 9.458-9.453a9.35 9.35 0 016.667 2.756 9.398 9.398 0 012.791 6.697c0 5.209-4.244 9.454-9.458 9.454zm5.237-7.17c-.29-.144-1.708-.843-1.973-.938-.264-.096-.456-.144-.647.144-.192.288-.743.938-.912 1.13-.168.192-.335.215-.626.072-.29-.144-1.22-.448-2.32-1.43-.857-.765-1.436-1.71-1.604-2-.168-.288-.018-.443.126-.587.13-.129.288-.336.432-.505.144-.168.192-.288.288-.48.096-.192.048-.36-.024-.504-.072-.144-.648-1.56-.89-2.137-.235-.564-.473-.488-.648-.488h-.557c-.192 0-.503.072-.764.36-.263.288-1.002.977-1.002 2.376s1.027 2.754 1.17 2.946c.144.192 2.02 3.088 4.895 4.332.684.296 1.22.472 1.637.604.687.216 1.313.185 1.807.112.551-.082 1.708-.7 1.95-1.375.24-.672.24-1.249.168-1.375-.073-.12-.264-.192-.553-.336z" />
                    </svg>
                    <span>Enviar a WhatsApp</span>
                </button> */}
            </div>
        </section>
    );
}

export default Cart;
