import ExclusiveList from "../components/ExclusiveList";
import HeroExclusives from "../components/HeroExclusives";
import { getExclusives } from "@/actions/exclusivos";

export async function Exclusives() {
    const exclusives = await getExclusives().catch((error) => {
        console.error("Error al obtener exclusivos: ", error);
    });
    return (
        <main className="flex-grow mx-auto w-full max-w-[1500px] px-5 pb-10 pt-5 sm:pt-10 flex flex-col gap-10">
            <HeroExclusives />
            <ExclusiveList exclusives={exclusives} />
        </main>
    );
}

export default Exclusives;
