"use client";
import { useEffect, useState } from "react";
import PerfumeRowDashboard from "./PerfumeRowDashboard";
import { getPerfumes } from "../../actions/perfumes";

function PerfumeTable({ perfumes: initialPerfumes, onEdit, onRefresh }) {
    const [perfumes, setPerfumes] = useState(initialPerfumes || []);
    const [filteredPerfumes, setFilteredPerfumes] = useState([]);
    const [filter, setFilter] = useState("added");
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    // Cargar perfumes desde la base de datos
    useEffect(() => {
        const fetchPerfumes = async () => {
            try {
                const data = await getPerfumes();
                setPerfumes(data);
                setFilteredPerfumes(data);
            } catch (error) {
                console.error(error);
                alert("Error al cargar los perfumes");
            } finally {
                setLoading(false);
            }
        };
        fetchPerfumes();
    }, []);

    // Actualizar la tabla cuando se llame a onRefresh
    useEffect(() => {
        if (onRefresh) {
            const refreshData = async () => {
                try {
                    const data = await getPerfumes();
                    setPerfumes(data);
                    setFilteredPerfumes(data);
                } catch (error) {
                    console.error(error);
                    alert("Error al recargar los perfumes");
                }
            };
            refreshData();
        }
    }, [onRefresh]);

    // Filtrar y ordenar perfumes
    useEffect(() => {
        handleFilter();
    }, [filter, searchTerm, perfumes]);

    const handleFilter = () => {
        let sortedPerfumes = [...perfumes]; // Crear una copia de los perfumes

        // Filtrar por término de búsqueda
        if (searchTerm) {
            sortedPerfumes = sortedPerfumes.filter((perfume) =>
                perfume.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Ordenar o filtrar según el valor de `filter`
        switch (filter) {
            case "nombre":
                sortedPerfumes.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "marca":
                sortedPerfumes.sort((a, b) => a.brand.localeCompare(b.brand));
                break;
            case "hombre":
                sortedPerfumes = sortedPerfumes.filter(
                    (perfume) => perfume.gender.toLowerCase() === "hombre"
                );
                break;
            case "mujer":
                sortedPerfumes = sortedPerfumes.filter(
                    (perfume) => perfume.gender.toLowerCase() === "mujer"
                );
                break;
            case "tester":
                sortedPerfumes = sortedPerfumes.filter(
                    (perfume) => perfume.version.toLowerCase() === "tester"
                );
                break;
            case "sellado":
                sortedPerfumes = sortedPerfumes.filter(
                    (perfume) => perfume.version.toLowerCase() === "sellado"
                );
                break;
            case "caja":
                sortedPerfumes = sortedPerfumes.filter(
                    (perfume) => perfume.box === true
                );
                break;
            default:
                sortedPerfumes = sortedPerfumes.reverse(); // Mostrar los más recientes primero
                break;
        }

        setFilteredPerfumes(sortedPerfumes);
    };

    const renderPerfumes = () => {
        if (loading) {
            return <p>Cargando...</p>;
        } else if (perfumes.length === 0) {
            return <p>No hay perfumes</p>;
        } else {
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
                            {/* Select para filtrar */}
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="p-2 pl-8 border rounded-md text-sm lg:text-base"
                            >
                                <option value="por defecto">
                                    Orden por defecto
                                </option>
                                <option value="nombre">
                                    Ordenar por nombre
                                </option>
                                <option value="marca">Ordenar por marca</option>
                                <option value="hombre">
                                    Perfumes de hombre
                                </option>
                                <option value="mujer">Perfumes de mujer</option>
                                <option value="tester">Solo tester</option>
                                <option value="sellado">Solo sellados</option>
                                <option value="caja">Con caja</option>
                            </select>
                        </div>
                        <span className="flex sm:justify-center self-center order-2 sm:order-3 text-xs sm:text-sm md:text-base">
                            {filteredPerfumes.length} productos
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

                    {/* Tabla de perfumes */}
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
                                        Versión
                                    </th>
                                    <th scope="col" className="px-2 py-3">
                                        Caja
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
                                {filteredPerfumes.length > 0 ? (
                                    filteredPerfumes.map((perfume) => (
                                        <PerfumeRowDashboard
                                            key={perfume.id}
                                            perfume={perfume}
                                            onEdit={onEdit}
                                            onRefresh={onRefresh}
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
    };

    return <div>{renderPerfumes()}</div>;
}

export default PerfumeTable;
