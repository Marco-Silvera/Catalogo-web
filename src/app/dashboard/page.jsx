"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase/client";

import PerfumeForm from "../components/PerfumeForm";
import PerfumeFormEdit from "../components/PerfumeFormEdit";
import PerfumeTable from "../components/PerfumeTable";

import ExclusiveForm from "../components/ExclusiveForm";
// import ExclusiveFormEdit from "@/components/ExclusiveFormEdit";
// import ExclusiveTable from "@/components/ExclusiveTable";

import DecantForm from "../components/DecantForm";
// import DecantFormEdit from "@/components/DecantFormEdit";
// import DecantTable from "@/components/DecantTable";

import MiniatureForm from "../components/MiniatureForm";
import { getPerfumes } from "@/actions/perfumes";
// import MiniatureFormEdit from "@/components/MiniatureFormEdit";
// import MiniatureTable from "@/components/MiniatureTable";

export default function Dashboard() {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState("perfume");
    const [selectedPerfume, setSelectedPerfume] = useState(null);
    const [perfumes, setPerfumes] = useState([]);
    const [loading, setLoading] = useState(true);

    // Verificar la sesión del usuario al cargar el componente
    useEffect(() => {
        const checkUser = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (!session) {
                router.push("/login");
            }
        };
        checkUser();
    }, [router]);

    // Cargar perfumes inicial
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPerfumes();
                setPerfumes(data);
            } catch (error) {
                console.error(error);
                alert("Error al cargar los perfumes");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Funciones para actualizar el estado local
    const handleAddPerfume = (newPerfume) => {
        setPerfumes((prev) => [...prev, newPerfume]);
    };

    const handleUpdatePerfume = (updatedPerfume) => {
        setPerfumes((prev) =>
            prev.map((perfume) =>
                perfume.id === updatedPerfume.id ? updatedPerfume : perfume
            )
        );
    };

    const handleDeletePerfume = (id) => {
        setPerfumes((prev) => prev.filter((perfume) => perfume.id !== id));
    };

    // Cerrar sesión
    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/");
    };

    // Recargar perfumes
    const refreshPerfumes = async () => {
        try {
            const data = await getPerfumes();
            setPerfumes(data); // Actualiza el estado de perfumes en PerfumeTable
        } catch (error) {
            console.error(error);
            alert("Error al recargar los perfumes");
        }
    };

    // Renderizar contenido según categoria seleccionada
    const renderContent = () => {
        const categories = {
            perfume: (
                <>
                    <PerfumeForm onAdd={handleAddPerfume} />
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase">
                        Edición
                    </h2>
                    <PerfumeFormEdit
                        initialData={selectedPerfume}
                        onUpdate={handleUpdatePerfume}
                    />
                    <PerfumeTable
                        perfumes={perfumes}
                        loading={loading}
                        onEdit={setSelectedPerfume}
                        onDelete={handleDeletePerfume}
                    />
                </>
            ),
            exclusivos: (
                <>
                    <ExclusiveForm />
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase">
                        Edición
                    </h2>
                    {/* {/* <ExclusiveFormEdit /> */}
                    {/* <ExclusiveTable /> */}
                </>
            ),
            miniaturas: (
                <>
                    <MiniatureForm />
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase">
                        Edición
                    </h2>
                    {/* <MiniatureFormEdit />
                            <MiniatureTable /> */}
                </>
            ),
            decants: (
                <>
                    <DecantForm />
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase">
                        Edición
                    </h2>
                    {/* <DecantFormEdit />
                            <DecantTable /> */}
                </>
            ),
        };

        return categories[selectedCategory] || null;
    };

    return (
        <section className="mx-auto w-full max-w-[1800px] px-5 pb-10 pt-5 sm:pt-10 flex flex-col gap-5">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase">
                Dashboard
            </h2>

            <div className="flex justify-between gap-10">
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="p-2 border rounded w-full max-w-[328.88px]"
                >
                    <option value="perfume">Perfume</option>
                    <option value="exclusivos">Exclusivos</option>
                    <option value="decants">Decants</option>
                    <option value="miniaturas">Miniaturas</option>
                </select>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 rounded-lg w-fit py-2 px-5 self-center font-bold hover:scale-95 uppercase transition-transform text-white shadow-sm hover:bg-white border hover:border-red-500 hover:text-red-500 text-sm md:text-base"
                >
                    Cerrar sesión
                </button>
            </div>
            {renderContent()}
        </section>
    );
}
