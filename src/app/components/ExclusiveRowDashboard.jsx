"use client";
import { deleteExclusive } from "@/actions/exclusivos";
import Link from "next/link";

function ExclusiveRowDashboard({ exclusive, onEdit, onDelete }) {
    const handleDelete = async () => {
        try {
            await deleteExclusive(exclusive.id);
            onDelete(exclusive.id); // Actualiza la tabla
        } catch (error) {
            console.error(error);
            alert("Error al eliminar el exclusivo");
        }
    };

    return (
        <tr className="bg-white border-b hover:bg-gray-100 text-center even:bg-gray-50">
            <th
                scope="row"
                className="px-2 py-4 font-medium text-gray-900 w-full max-w-[250px] truncate"
            >
                {exclusive.name}
            </th>
            <td className="px-2 py-4 text-xs w-full max-w-[400px] truncate">
                {exclusive.description}
            </td>
            <td className="px-2 py-4 text-xs w-full min-w-[100px] max-w-[150px] truncate">
                <Link
                    href={`/exclusivos/${exclusive.path}`}
                    target="_blank"
                    className="text-blue-600 hover:underline"
                >
                    {exclusive.path}
                </Link>
            </td>
            <td className="px-2 py-4 w-full min-w-[100px] max-w-[150px] truncate">
                {exclusive.brand}
            </td>
            <td className="px-2 py-4">{exclusive.concentration}</td>
            <td className="px-2 py-4">{exclusive.version}</td>
            <td className="px-2 py-4">
                {exclusive.box ? <p className="font-bold">Si</p> : "No"}
            </td>
            <td className="px-2 py-4">{exclusive.gender}</td>
            <td className="px-2 py-4">{exclusive.size} ml</td>
            <td className="px-2 py-4">{exclusive.price}</td>
            <td className="px-2 py-4">
                <div className="grid grid-cols-2 gap-2 w-20 min-w-20 md:w-[100px] md:min-w-[100px] justify-items-center items-center h-full">
                    <img
                        className="w-full h-full object-cover aspect-square"
                        src={exclusive.image}
                        alt={exclusive.name}
                    />
                    <img
                        className="aspect-square"
                        src={exclusive.imagetwo}
                        alt={exclusive.name}
                    />
                    <img
                        className="aspect-square"
                        src={exclusive.imagethree}
                        alt={exclusive.name}
                    />
                    <img
                        className="aspect-square"
                        src={exclusive.imagefour}
                        alt={exclusive.name}
                    />
                </div>
            </td>
            <td className="px-2 py-4">
                <div className="flex flex-col gap-5 justify-center">
                    <button
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => onEdit(exclusive)}
                    >
                        Editar
                    </button>
                    <button
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        onClick={handleDelete}
                    >
                        Eliminar
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default ExclusiveRowDashboard;
