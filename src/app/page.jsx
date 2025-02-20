import Image from "next/image";
import HeroHomePage from "./components/HeroHomePage";

export default function Home() {
    return (
        <main className="flex-grow mx-auto w-full max-w-[1500px] px-5 pb-10 pt-5 sm:pt-10 flex flex-col gap-10">
            <HeroHomePage />
            {/* Pasamos la lista de perfumes como prop */}
            {/* <PerfumeListHomePage perfumes={perfumes} /> */}
        </main>
    );
}
