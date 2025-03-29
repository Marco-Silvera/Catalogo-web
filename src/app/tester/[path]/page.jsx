import { getPerfumeByPath, fetchPerfumesByVersion } from "@/actions/perfumes";
import PerfumeGallery from "@/app/components/PerfumeGallery";
import AddToCartButton from "@/app/components/AddToCartButton";
import Link from "next/link";

// Genera las rutas estáticas para perfumes Tester
export async function generateStaticParams() {
    const perfumes = await fetchPerfumesByVersion("Tester");
    return perfumes.map((perfume) => ({ path: perfume.path }));
}

export default async function PerfumeTesterPage({ params }) {
    const perfume = await getPerfumeByPath(params.path, "Tester");

    if (!perfume) {
        return (
            <h1 className="text-center py-10">Perfume Tester no encontrado</h1>
        );
    }
    const images = [
        perfume.image,
        perfume.imagetwo,
        perfume.imagethree,
        perfume.imagefour,
    ];

    return (
        <main className="flex-grow max-w-[1500px] mx-auto px-5 pt-5 pb-20 md:p-10">
            <section className="flex flex-col items-center lg:flex-row gap-5 md:gap-10">
                <PerfumeGallery images={images} />
                <div className="w-full text-start flex flex-col gap-5">
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
                        {perfume.name}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 uppercase">
                        {perfume.brand}
                    </p>
                    <p className="text-sm lg:text-base">
                        {perfume.description}
                    </p>
                    <div className="text-center flex flex-col gap-5 justify-between items-center">
                        <div className="self-start flex gap-2">
                            <div className="flex gap-2 self-start">
                                {perfume.version === "Tester" &&
                                    !perfume.box && (
                                        <div className=" bg-neutral-300 p-2 rounded text-xs md:text-sm lg:text-base flex items-center">
                                            No box
                                        </div>
                                    )}
                                {perfume.version === "Tester" && (
                                    <div className="bg-gray-200 p-2 rounded text-xs md:text-sm lg:text-base flex items-center">
                                        Tester
                                    </div>
                                )}
                                {perfume.gender === "Hombre" && (
                                    <div className=" bg-blue-100 p-2 rounded text-xs md:text-sm lg:text-base flex items-center">
                                        Hombre
                                    </div>
                                )}
                                {perfume.gender === "Mujer" && (
                                    <div className="bg-pink-100 p-2 rounded text-xs md:text-sm lg:text-base flex items-center">
                                        Mujer
                                    </div>
                                )}
                                {perfume.gender === "Unisex" && (
                                    <div className="bg-yellow-100 p-2 rounded text-xs md:text-sm lg:text-base flex items-center">
                                        Unisex
                                    </div>
                                )}
                                <div className="bg-gray-200 p-2 rounded text-xs md:text-sm lg:text-base">
                                    {perfume.concentration}
                                </div>
                                <div className="bg-gray-100 p-2 rounded text-xs md:text-sm lg:text-base flex items-center">
                                    {perfume.size + " ml"}
                                </div>
                            </div>
                        </div>
                        <div className="self-end flex flex-col gap-5">
                            <p className="text-xl md:text-2xl lg:text-3xl font-semibold self-end">
                                S/ {perfume.price}.00
                            </p>
                            <AddToCartButton product={perfume} />
                            {/* {isPerfumeInCart ? (
                            <Link
                                to="/cart"
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
