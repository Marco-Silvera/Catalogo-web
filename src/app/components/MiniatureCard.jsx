import Link from "next/link";

function MiniatureCard({ miniature }) {
    const { path, image, name, brand, size, price, gender } = miniature;

    return (
        <Link
            href={`/miniaturas/${path}`}
            className="w-full h-full cursor-pointer group flex flex-col justify-between"
        >
            <div className="overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="aspect-square object-cover object-center w-full transition-all duration-300 group-hover:scale-105"
                />
            </div>
            <div className="flex flex-col justify-between py-2 text-start min-h-[140px] flex-1">
                <div className="flex-grow">
                    <h2 className="font-semibold text-sm md:text-base leading-tight line-clamp-2">
                        {name}
                    </h2>
                    <p className="uppercase text-[#666666] text-xs md:text-sm lg:text-base">
                        {brand}
                    </p>
                    <p className="text-text-[#666666] text-xs md:text-sm italic font-light">
                        {size} ml
                    </p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="font-medium text-sm md:text-base">
                        S/ {price}.00
                    </p>
                    <div className="flex flex-col lg:flex-row gap-2">
                        {gender === "Hombre" && (
                            <div className=" bg-blue-100 px-2 rounded text-xs lg:text-base">
                                Hombre
                            </div>
                        )}
                        {gender === "Mujer" && (
                            <div className="bg-pink-100 px-2 rounded text-xs lg:text-base">
                                Mujer
                            </div>
                        )}
                        {gender === "Unisex" && (
                            <div className="bg-yellow-100 px-2 rounded text-xs lg:text-base">
                                Unisex
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default MiniatureCard;
