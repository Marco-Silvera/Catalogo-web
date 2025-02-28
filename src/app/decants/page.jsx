import HeroDecants from "../components/HeroDecants";
import DecantList from "../components/DecantList";
import { getDecants } from "@/actions/decants";

export async function Decants() {
    const decants = await getDecants().catch((error) => {
        console.error("Error al obtener decants: ", error);
    });

    return (
        <main className="flex-grow mx-auto w-full max-w-[1500px] px-5 pb-10 pt-5 sm:pt-10 flex flex-col gap-10">
            <HeroDecants />
            <DecantList decants={decants} />
        </main>
    );
}

export default Decants;
