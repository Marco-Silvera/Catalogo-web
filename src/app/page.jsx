import HeroHomePage from "./components/HeroHomePage";
import PerfumeList from "./components/PerfumeList";
import { getPerfumes } from "@/actions/perfumes";

export default async function Home() {
    const perfumes = await getPerfumes().catch((error) => {
        console.error("Error al obtener perfumes: ", error);
        return []; // Retorna un array vacío en caso de error
    });

    return (
        <main className="flex-grow mx-auto w-full max-w-[1500px] px-5 pb-10 pt-5 sm:pt-10 flex flex-col gap-10">
            <HeroHomePage />
            {/* Pasamos la lista de perfumes como prop */}
            <PerfumeList perfumes={perfumes} />
        </main>
    );
}
