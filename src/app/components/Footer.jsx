import React from "react";

function Footer() {
    return (
        <footer className="bg-white">
            <div className="mx-auto w-full max-w-[1500px] p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between md:items-center">
                    <div className="mb-6 md:mb-0">
                        <a
                            href="https://github.com/Marco-Silvera"
                            className="flex items-center"
                        >
                            <img
                                src="https://pbs.twimg.com/profile_images/1533454803/isotipo_400x400.jpg"
                                className="h-8 me-3"
                                alt="Logo de tienda"
                            />
                            <span className="self-center text-lg md:text-2xl font-semibold whitespace-nowrap">
                                PU
                            </span>
                        </a>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6">
                        <div className="text-center">
                            <a
                                className="mb-6 text-sm font-semibold text-gray-500 uppercase hover:underline"
                                href="https://github.com/Marco-Silvera"
                                target="_blank"
                            >
                                Instagram
                            </a>
                        </div>
                        <div className="text-center">
                            <a
                                className="mb-6 text-sm font-semibold text-gray-500 uppercase hover:underline"
                                href="https://github.com/Marco-Silvera"
                                target="_blank"
                            >
                                Tiktok
                            </a>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
                <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center">
                        © 2024{" "}
                        <a
                            href="https://www.linkedin.com/in/marcosilvera/"
                            className="hover:underline"
                        >
                            PU
                        </a>
                        . Todos los derechos reservados.
                    </span>
                    <div className="flex mt-4 sm:justify-center sm:mt-0 gap-2 items-center">
                        <p className="text-xs text-gray-500 font-light">
                            Desarrollado por:
                        </p>
                        <a
                            href="https://www.linkedin.com/in/marcosilvera/"
                            target="_blank"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="text-gray-400"
                            >
                                <path d="M0,1.19v21.62C0,23.6,0.4,24,0.89,24h21.62c0.49,0,0.89-0.4,0.89-0.89V1.19c0-0.49-0.4-0.89-0.89-0.89H0.89 C0.4,0.3,0,0.7,0,1.19z M7.12,20.59H3.88V9h3.24V20.59z M5.5,7.56C4.28,7.56,3.38,6.65,3.38,5.56C3.38,4.47,4.28,3.56,5.5,3.56 c1.22,0,2.12,0.91,2.12,2C7.62,6.65,6.72,7.56,5.5,7.56z M20.59,20.59h-3.24v-5.72c0-1.36-0.02-3.11-2.1-3.11 c-2.1,0-2.42,1.52-2.42,3.02v5.81H9.59V9h3.1v1.59h0.05c0.43-0.82,1.49-1.69,3.07-1.69c3.29,0,3.9,2.17,3.9,5v6.69H20.59z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
