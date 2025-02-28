"use client";
import { useEffect, useState } from "react";
import DecantCard from "./DecantCard";

export default function DecantList({ decants }) {
    const [filter, setFilter] = useState("added");
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredDecants, setFilteredDecants] = useState([]);
    const [visibleCount, setVisibleCount] = useState(20);

    useEffect(() => {
        handleFilter();
    }, [filter, searchTerm, decants]);

    function handleFilter() {
        let sortedDecants = [...decants];

        if (searchTerm) {
            sortedDecants = sortedDecants.filter((decant) =>
                decant.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        switch (filter) {
            case "nombre":
                sortedDecants.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "marca":
                sortedDecants.sort((a, b) => a.brand.localeCompare(b.brand));
                break;
            case "hombre":
                sortedDecants = sortedDecants.filter((decant) =>
                    ["hombre", "unisex"].includes(decant.gender.toLowerCase())
                );
                break;
            case "mujer":
                sortedDecants = sortedDecants.filter((decant) =>
                    ["mujer", "unisex"].includes(decant.gender.toLowerCase())
                );
                break;
            default:
                sortedDecants.reverse();
                break;
        }

        setFilteredDecants(sortedDecants);
        setVisibleCount(20);
    }

    return (
        <section>
            <div className="flex justify-between gap-5 flex-col sm:flex-row sm:items-center mb-4">
                {/* Select de filtros */}
                <div className="relative flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="w-5 h-5 left-2 absolute text-gray-500"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5.5 4.75h13a1 1 0 01.852 1.518L12.723 12.5a1 1 0 00-.223.626V18.75a.75.75 0 01-1.5 0v-5.624a1 1 0 00-.223-.626L4.648 6.268A1 1 0 015.5 4.75z"
                        />
                    </svg>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="p-2 pl-8 border rounded-md text-sm lg:text-base outline-none"
                    >
                        <option value="por defecto">Orden por defecto</option>
                        <option value="nombre">Ordenar por nombre</option>
                        <option value="marca">Ordenar por marca</option>
                        <option value="hombre">Perfumes de hombre</option>
                        <option value="mujer">Perfumes de mujer</option>
                    </select>
                </div>
                {/* Input de búsqueda */}
                <div className="relative flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute left-2 w-5 h-5 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3.5a7.5 7.5 0 016.15 13.15z"
                        />
                    </svg>
                    <input
                        type="text"
                        className="p-2 pl-8 border rounded-md text-sm lg:text-base outline-none"
                        placeholder="Buscar exclusivo..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Lista de decants */}
            <section className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-10">
                {filteredDecants.slice(0, visibleCount).length > 0 ? (
                    filteredDecants
                        .slice(0, visibleCount)
                        .map((decant) => (
                            <DecantCard key={decant.id} decant={decant} />
                        ))
                ) : (
                    <div className="col-span-full text-center py-4">
                        No se encontraron coincidencias
                    </div>
                )}
            </section>

            {/* Botón de "Mostrar más" */}
            {visibleCount < filteredDecants.length && (
                <div className="text-center mt-6">
                    <button
                        onClick={() => setVisibleCount(visibleCount + 40)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Mostrar más
                    </button>
                </div>
            )}
        </section>
    );
}
