import HeroMiniatures from "../components/HeroMiniatures";
import MiniatureList from "../components/MiniatureList";
import { getMiniatures } from "@/actions/miniaturas";

export async function Miniatures() {
    const miniatures = await getMiniatures().catch((error) => {
        console.error("Error al obtener miniaturas: ", error);
    });

    return (
        <main className="flex-grow mx-auto w-full max-w-[1500px] px-5 pb-10 pt-5 sm:pt-10 flex flex-col gap-10">
            <HeroMiniatures />
            <MiniatureList miniatures={miniatures} />
        </main>
    );
}

export default Miniatures;
