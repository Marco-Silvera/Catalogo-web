import Link from "next/link";

function ExclusiveCard({ exclusive }) {
    const {
        version,
        path,
        image,
        name,
        brand,
        size,
        price,
        gender,
        box,
        collection,
    } = exclusive;

    return (
        <Link
            href={`/exclusivos/${path}`}
            className="w-full h-full cursor-pointer group flex flex-col justify-between"
        >
            <div className="overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="aspect-square object-cover object-center w-full transition-all duration-300 group-hover:scale-105 group-hover:brightness-90"
                />
            </div>
            <div className="flex flex-col justify-between py-2 text-start min-h-[140px] flex-1">
                <div className="flex-grow">
                    <h2 className="font-semibold text-sm md:text-base leading-tight line-clamp-2">
                        {name}
                    </h2>
                    <p className="uppercase text-[#666666] text-xs md:text-sm lg:text-base">
                        {brand} - {collection}
                    </p>
                    <p className="text-text-[#666666] text-xs md:text-sm italic font-light">
                        {size} ml
                    </p>
                </div>
                <div className="flex justify-between items-end">
                    <p className="font-medium text-sm md:text-base">
                        S/ {price}.00
                    </p>
                    <div className="flex flex-col lg:flex-row gap-2 text-center items-end lg:items-center">
                        {gender === "Hombre" && (
                            <div className=" bg-blue-100 h-4 w-4 rounded-full text-xs lg:text-base"></div>
                        )}
                        {gender === "Mujer" && (
                            <div className="bg-pink-100 h-4 w-4 rounded-full text-xs lg:text-base"></div>
                        )}
                        {gender === "Unisex" && (
                            <div className="bg-yellow-100 h-4 w-4 rounded-full text-xs lg:text-base"></div>
                        )}
                        {version === "Tester" && !box && (
                            <div className=" bg-neutral-300 px-2 rounded text-xs lg:text-base">
                                No box
                            </div>
                        )}
                        {version === "Tester" && (
                            <div className="bg-gray-200 px-2 rounded text-xs lg:text-base">
                                Tester
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ExclusiveCard;
