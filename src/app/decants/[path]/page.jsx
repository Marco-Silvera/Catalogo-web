import { getDecantByPath, getDecants } from "@/actions/decants";
import PerfumeGalleryThree from "@/app/components/PerfumeGalleryThree";
import Link from "next/link";

// Función para generar rutas estáticas para exclusivos
export async function generateStaticParams() {
    const decants = await getDecants();
    return decants.map((decant) => ({
        path: decant.path,
    }));
}

export default async function DecantPage({ params }) {
    const { path } = params;
    const decant = await getDecantByPath(path);

    if (!decant) {
        return <h1 className="text-center py-10">Decant no encontrado</h1>;
    }

    const images = [decant.image, decant.imagetwo, decant.imagethree];

    return (
        <main className="flex-grow max-w-[1500px] mx-auto px-5 pt-5 pb-20 md:p-10">
            <section className="flex flex-col items-center   lg:flex-row gap-5 md:gap-10">
                <PerfumeGalleryThree images={images} />
                <div className="w-full text-start flex flex-col gap-5">
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
                        {decant.name}
                    </h1>
                    <div className="flex justify-between">
                        <p className="text-lg md:text-xl text-gray-600 uppercase">
                            {decant.brand}
                        </p>
                        <p className="text-lg md:text-xl text-gray-600 uppercase">
                            {decant.collection}
                        </p>
                    </div>
                    <p className="text-sm lg:text-base">{decant.description}</p>
                    <div className="text-center flex flex-col gap-5 justify-between items-center">
                        <div className="self-start flex gap-2">
                            {decant.gender === "Hombre" && (
                                <div className=" bg-blue-100 p-2 rounded text-sm lg:text-base">
                                    Hombre
                                </div>
                            )}
                            {decant.gender === "Mujer" && (
                                <div className="bg-pink-100 p-2 rounded text-sm lg:text-base">
                                    Mujer
                                </div>
                            )}
                            {decant.gender === "Unisex" && (
                                <div className="bg-yellow-100 p-2 rounded text-sm lg:text-base">
                                    Unisex
                                </div>
                            )}
                            <div className="bg-gray-100 p-2 rounded text-sm lg:text-base">
                                {decant.concentration}
                            </div>
                        </div>
                        <div className="self-end flex flex-col gap-5">
                            <ul className="text-xl md:text-2xl lg:text-3xl font-semibold self-end text-end pr-5">
                                <li>
                                    {decant.size + " ml - S/ " + decant.price}
                                </li>
                                <li>
                                    {decant.sizetwo +
                                        " ml - S/ " +
                                        decant.pricetwo}
                                </li>
                                <li>
                                    {decant.sizethree +
                                        " ml - S/ " +
                                        decant.pricethree}
                                </li>
                            </ul>
                            {/* {isDecantInCart ? (
                                    <Link
                                        to="/cart"
                                        className="bg-green-500 text-white py-2 px-5 rounded-lg hover:bg-green-600 transition"
                                    >
                                        Agregado al carrito
                                    </Link>
                                ) : (
                                    <>
                                        <button
                                            onClick={handleAddToCart}
                                            className="bg-blue-600 text-white py-2 px-5 rounded-lg hover:bg-blue-700 transition"
                                        >
                                            Añadir al carrito
                                        </button>
                                    </>
                                )} */}
                        </div>
                    </div>
                    <p className="text-center text-sm mt-5">
                        Envíos a todo el Perú, más información{" "}
                        <Link
                            href={`/envios`}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                            aquí.
                        </Link>
                    </p>
                </div>
            </section>
        </main>
    );
}
