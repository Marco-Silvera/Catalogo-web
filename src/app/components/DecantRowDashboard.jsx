import { deleteDecant } from "@/actions/decants";
import Link from "next/link";

function DecantRowDashboard({ decant, onEdit, onDelete }) {
    const handleDelete = async () => {
        try {
            await deleteDecant(decant.id);
            onDelete(decant.id);
        } catch (error) {
            console.log(error);
            alert("Error al eliminar el decant");
        }
    };

    return (
        <tr className="bg-white border-b hover:bg-gray-100 text-center even:bg-gray-50">
            <th
                scope="row"
                className="px-2 py-4 font-medium text-gray-900 w-full max-w-[250px] truncate"
            >
                {decant.name}
            </th>
            <td className="px-2 py-4 text-xs w-full max-w-[400px] truncate">
                {decant.description}
            </td>
            <td className="px-2 py-4 text-xs w-full min-w-[100px] max-w-[150px] truncate">
                <Link
                    href={`/decants/${decant.path}`}
                    target="_blank"
                    className="text-blue-600 hover:underline"
                >
                    {decant.path}
                </Link>
            </td>
            <td className="px-2 py-4 w-full min-w-[100px] max-w-[150px] truncate">
                {decant.brand}
            </td>
            <td className="px-2 py-4">{decant.concentration}</td>
            <td className="px-2 py-4">{decant.gender}</td>
            <td className="px-2 py-4">{decant.size} ml</td>
            <td className="px-2 py-4">{decant.price}</td>
            <td className="px-2 py-4">{decant.sizetwo} ml</td>
            <td className="px-2 py-4">{decant.pricetwo}</td>
            <td className="px-2 py-4">{decant.sizethree} ml</td>
            <td className="px-2 py-4">{decant.pricethree}</td>
            <td className="px-2 py-4">
                <div className="grid grid-cols-3 gap-2 w-20 min-w-20 md:w-[120px] md:min-w-[120px] justify-items-center items-center h-full">
                    <img
                        className="w-full h-full object-cover aspect-square"
                        src={decant.image}
                        alt={decant.name}
                    />
                    <img
                        className="aspect-square"
                        src={decant.imagetwo}
                        alt={decant.name}
                    />
                    <img
                        className="aspect-square"
                        src={decant.imagethree}
                        alt={decant.name}
                    />
                </div>
            </td>
            <td className="px-2 py-4">
                <div className="flex flex-col gap-5 justify-center">
                    <button
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => onEdit(decant)}
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

export default DecantRowDashboard;
