import { getExclusiveByPath, getExclusives } from "@/actions/exclusivos";
import PerfumeGallery from "@/app/components/PerfumeGallery";
import Link from "next/link";

// Función para generar rutas estáticas para exclusivos
export async function generateStaticParams() {
    const exclusives = await getExclusives();
    return exclusives.map((exclusive) => ({
        path: exclusive.path,
    }));
}

export default async function ExclusivePage({ params }) {
    const { path } = params;
    const exclusive = await getExclusiveByPath(path);

    if (!exclusive) {
        return <h1 className="text-center py-10">Exclusivo no encontrado</h1>;
    }

    const images = [
        exclusive.image,
        exclusive.imagetwo,
        exclusive.imagethree,
        exclusive.imagefour,
    ];

    return (
        <main className="flex-grow max-w-[1500px] mx-auto px-5 pt-5 pb-20 md:p-10">
            <section className="flex flex-col items-center   lg:flex-row gap-5 md:gap-10">
                <PerfumeGallery images={images} />
                <div className="w-full text-start flex flex-col gap-5">
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
                        {exclusive.name}
                    </h1>
                    <div className="flex justify-between">
                        <p className="text-lg md:text-xl text-gray-600 uppercase">
                            {exclusive.brand}
                        </p>
                        <p className="text-lg md:text-xl text-gray-600 uppercase">
                            {exclusive.collection}
                        </p>
                    </div>
                    <p className="text-sm lg:text-base">
                        {exclusive.description}
                    </p>
                    <div className="text-center flex flex-col gap-5 justify-between items-center">
                        <div className="self-start flex gap-2">
                            {exclusive.version === "Tester" &&
                                !exclusive.box && (
                                    <div className=" bg-neutral-300 p-2 rounded text-sm lg:text-base">
                                        No box
                                    </div>
                                )}
                            {exclusive.version === "Tester" && (
                                <div className="bg-gray-200 p-2 rounded text-sm lg:text-base">
                                    Tester
                                </div>
                            )}
                            {exclusive.gender === "Hombre" && (
                                <div className=" bg-blue-100 p-2 rounded text-sm lg:text-base">
                                    Hombre
                                </div>
                            )}
                            {exclusive.gender === "Mujer" && (
                                <div className="bg-pink-100 p-2 rounded text-sm lg:text-base">
                                    Mujer
                                </div>
                            )}
                            {exclusive.gender === "Unisex" && (
                                <div className="bg-yellow-100 p-2 rounded text-sm lg:text-base">
                                    Unisex
                                </div>
                            )}
                            <div className="bg-gray-200 p-2 rounded text-sm lg:text-base">
                                {exclusive.concentration}
                            </div>
                            <div className=" bg-gray-100 p-2 rounded text-sm lg:text-base">
                                {exclusive.size + " ml"}
                            </div>
                        </div>
                        {/* <div className='self-end flex flex-col gap-5'>
                                <p className="text-xl md:text-2xl lg:text-3xl font-semibold self-end">S/ {exclusive.price}.00</p>
                                {isExclusiveInCart ? (
                                    <Link
                                        href="/cart"
                                        className="bg-green-500 text-white py-2 px-5 rounded-lg hover:bg-green-600 transition"
                                    >
                                        Agregado al carrito
                                    </Link>
                                ) : (
                                    <button
                                        onClick={handleAddToCart}
                                        className="bg-blue-600 text-white py-2 px-5 rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Añadir al carrito
                                    </button>
                                )}
                            </div> */}
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
