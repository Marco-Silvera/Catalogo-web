'use client'
import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

function HeroMiniatures() {
    const autoplayIntervalTime = 4000;

    const slides = [
        {
            imgSrc: "/hero_perfumes_tester.webp",
            imgAlt: "Perfumes en version Tester",
            title: "Perfumes Tester",
            description:
                "Disfruta de la esencia original a menor precio; solo cambia la caja.",
            path: "/",
        },
        {
            imgSrc: "/hero_perfumes_exclusivos.webp",
            imgAlt: "Perfumes Les Exclusifs de la casa Chanel",
            title: "Perfumes Exclusivos",
            description:
                "Sumérgete en una colección de aromas únicos que elevan tu presencia.",
            path: "/exclusivos",
        },
        {
            imgSrc: "/hero_perfumes_decants.webp",
            imgAlt: "Vibrant abstract painting with swirling red, yellow, and pink hues on a canvas.",
            title: "Decants de Perfumes",
            description:
                "Descubre y prueba perfumes de las mejores marcas con nuestros decants seleccionados.",
            path: "/decants",
        },
    ];

    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const autoplay = setInterval(() => {
            if (!isPaused) {
                setCurrentSlideIndex(
                    (prevIndex) => (prevIndex + 1) % slides.length
                );
            }
        }, autoplayIntervalTime);

        return () => clearInterval(autoplay);
    }, [isPaused]);

    const previousSlide = () => {
        setCurrentSlideIndex((prevIndex) =>
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        );
    };

    const nextSlide = () => {
        setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    return (
        <div className="relative w-full rounded-lg overflow-hidden">
            <div className="relative min-h-[50svh] w-full">
                {slides.map((slide, index) => (
                    <a
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 cursor-pointer ${
                            index === currentSlideIndex
                                ? "opacity-100"
                                : "opacity-0"
                        }`}
                        href={slide.path}
                    >
                        <div className="lg:px-32 lg:py-14 absolute inset-0 z-10 flex flex-col items-center justify-end gap-2 bg-gradient-to-t from-neutral-950/85 to-transparent px-16 py-12 text-center">
                            <h3 className="w-full lg:w-[80%] text-balance text-2xl lg:text-3xl font-bold text-white">
                                {slide.title}
                            </h3>
                            <p className="lg:w-1/2 w-full text-pretty text-sm text-neutral-300">
                                {slide.description}
                            </p>
                        </div>
                        <img
                            className="absolute w-full h-full inset-0 object-cover text-neutral-600 dark:text-neutral-300"
                            src={slide.imgSrc}
                            alt={slide.imgAlt}
                        />
                    </a>
                ))}
            </div>

            <button
                type="button"
                className="absolute bottom-5 right-5 z-20 rounded-full text-neutral-300 opacity-50 transition hover:opacity-80"
                aria-label={isPaused ? "Play carousel" : "Pause carousel"}
                onClick={() => setIsPaused(!isPaused)}
            >
                {isPaused ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        width="24"
                        height="24"
                        className="text-white"
                    >
                        <path d="M8 5v14l11-7L8 5z" />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        width="24"
                        height="24"
                        className="text-white"
                    >
                        <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                    </svg>
                )}
            </button>

            <div
                className="absolute rounded-md bottom-3 md:bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-4 md:gap-3 px-1.5 py-1 md:px-2"
                role="group"
                aria-label="slides"
            >
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`size-2 cursor-pointer rounded-full transition ${
                            currentSlideIndex === index
                                ? "bg-neutral-300"
                                : "bg-neutral-300/50"
                        }`}
                        aria-label={`Slide ${index + 1}`}
                        onClick={() => setCurrentSlideIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
}

export default HeroMiniatures;
