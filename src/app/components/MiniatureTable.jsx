"use client";
import { useState, useEffect } from "react";
import MiniatureRowDashboard from "./MiniatureRowDashboard";

function MiniatureTable({ miniatures, onEdit, onDelete, loading }) {
    const [filteredMiniatures, setFilteredMiniatures] = useState(null);
    const [filter, setFilter] = useState("added");
    const [searchTerm, setSearchTerm] = useState("");

    // Cada vez que cambien las miniaturas, el filtro o la búsqueda se recalcula
    useEffect(() => {
        if (!loading) {
            handleFilter();
        }
    }, [filter, searchTerm, miniatures, loading]);

    const handleFilter = () => {
        let sortedMiniatures = [...miniatures];

        if (searchTerm) {
            sortedMiniatures = sortedMiniatures.filter((miniature) =>
                miniature.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        switch (filter) {
            case "nombre":
                sortedMiniatures.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "marca":
                sortedMiniatures.sort((a, b) => a.brand.localeCompare(b.brand));
                break;
            case "hombre":
                sortedMiniatures = sortedMiniatures.filter(
                    (miniature) => miniature.gender.toLowerCase() === "hombre"
                );
                break;
            case "mujer":
                sortedMiniatures = sortedMiniatures.filter(
                    (miniature) => miniature.gender.toLowerCase() === "mujer"
                );
                break;
            default:
                // Orden por defecto (más recientes al inicio)
                sortedMiniatures = sortedMiniatures.reverse();
                break;
        }
        setFilteredMiniatures(sortedMiniatures);
    };

    return (
        <section>
            {/* Select para ordenar y filtrar */}
            <div className="flex justify-between gap-5 flex-col sm:flex-row sm:items-center mb-4">
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
                        className="p-2 pl-8 border rounded-md text-sm lg:text-base"
                    >
                        <option value="por defecto">Orden por defecto</option>
                        <option value="nombre">Ordenar por nombre</option>
                        <option value="marca">Ordenar por marca</option>
                        <option value="hombre">Perfumes de hombre</option>
                        <option value="mujer">Perfumes de mujer</option>
                    </select>
                </div>
                <span className="flex sm:justify-center self-center order-2 sm:order-3 text-xs sm:text-sm  md:text-base">
                    {filteredMiniatures ? filteredMiniatures.length : 0}{" "}
                    productos
                </span>
                <div className="relative flex items-center order-1 sm:order-3">
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
                        className="p-2 pl-8 border rounded-md text-sm lg:text-base"
                        placeholder="Buscar perfume..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 min-h-[70vh] max-h-[70vh]">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                        <tr className="text-center">
                            <th scope="col" className="px-2 py-3">
                                Nombre
                            </th>
                            <th scope="col" className="px-2 py-3">
                                Descripción
                            </th>
                            <th scope="col" className="px-2 py-3">
                                Path
                            </th>
                            <th scope="col" className="px-2 py-3">
                                Marca
                            </th>
                            <th scope="col" className="px-2 py-3">
                                Concentración
                            </th>
                            <th scope="col" className="px-2 py-3">
                                Género
                            </th>
                            <th scope="col" className="px-2 py-3">
                                Tamaño
                            </th>
                            <th scope="col" className="px-2 py-3">
                                Precio
                            </th>
                            <th scope="col" className="px-2 py-3">
                                Imágenes
                            </th>
                            <th scope="col" className="px-2 py-3">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading || filteredMiniatures === null ? (
                            <tr>
                                <td
                                    colSpan="12"
                                    className="text-center py-4 h-[20vh]"
                                >
                                    Cargando...
                                </td>
                            </tr>
                        ) : filteredMiniatures.length > 0 ? (
                            filteredMiniatures.map((miniature) => (
                                <MiniatureRowDashboard
                                    key={miniature.id}
                                    miniature={miniature}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                />
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="12"
                                    className="text-center py-4 h-[20vh]"
                                >
                                    No se encontraron coincidencias
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default MiniatureTable;
