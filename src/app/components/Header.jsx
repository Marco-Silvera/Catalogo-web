"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase/client";
import Link from "next/link";
import Image from "next/image";

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar si el usuario está logueado

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        const checkUser = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();
            setIsLoggedIn(!!session);
        };

        const { data: authListener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setIsLoggedIn(!!session);
            }
        );

        window.addEventListener("scroll", handleScroll);
        checkUser();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            authListener?.subscription?.unsubscribe();
        };
    }, []);

    function openMenu() {
        let menu = document.getElementById("menu");
        let menuIcon = document.getElementById("menu-icon");
        let closeIcon = document.getElementById("close-icon");
        if (menu.classList.contains("hidden")) {
            menu.classList.remove("hidden");
            menuIcon.classList.add("hidden");
            closeIcon.classList.remove("hidden");
        } else {
            menu.classList.add("hidden");
            menuIcon.classList.remove("hidden");
            closeIcon.classList.add("hidden");
        }
    }

    return (
        <header
            className={`bg-white h-[70px] w-full sticky z-[100] top-0 transition-all flex items-center ${
                isScrolled ? "shadow-lg" : ""
            }`}
        >
            <div className="max-w-[1500px] w-full mx-auto flex justify-between items-center gap-5 md:gap-10 px-5">
                <Link href="/" className="hidden sm:block">
                    <Image
                        className="hidden sm:block"
                        src="/logo.webp"
                        alt="Logo"
                        height={50}
                        width={120}
                    />
                </Link>
                <Link href="/" className="block sm:hidden">
                    <Image
                        className="block sm:hidden"
                        src="/logo_mini.webp"
                        alt="Logo"
                        height={40}
                        width={40}
                    />
                </Link>
                <div className="flex items-center gap-5 md:gap-10 relative">
                    <div
                        id="menu"
                        className="hidden xl:block absolute xl:relative top-[70px] xl:top-0 right-0 bg-white w-64 xl:w-auto rounded-lg shadow-lg xl:shadow-none xl:rounded-none overflow-hidden z-50"
                    >
                        <ul className="gap-none xl:gap-10 flex flex-col items-center xl:flex-row py-3">
                            <li className="hover:bg-gray-50 xl:hover:bg-transparent w-full h-10 xl:w-auto xl:h-auto  last:rounded-b-lg xl:first:rounded-none xl:last:rounded-none">
                                <Link
                                    href="/"
                                    className="text-gray-600 hover:text-gray-900 text-base font-medium transition-colors h-full w-ful flex items-center justify-center"
                                >
                                    Inicio
                                </Link>
                            </li>
                            <li className="hover:bg-gray-50 xl:hover:bg-transparent w-full h-10 xl:w-auto xl:h-auto">
                                <Link
                                    href="/exclusivos"
                                    className="text-gray-600 hover:text-gray-900 text-base font-medium transition-colors h-full w-ful flex items-center justify-center"
                                >
                                    Exclusivos
                                </Link>
                            </li>
                            <li className="hover:bg-gray-50 xl:hover:bg-transparent w-full h-10 xl:w-auto xl:h-auto">
                                <Link
                                    href="/miniaturas"
                                    className="text-gray-600 hover:text-gray-900 text-base font-medium transition-colors h-full w-ful flex items-center justify-center"
                                >
                                    Miniaturas
                                </Link>
                            </li>
                            <li className="hover:bg-gray-50 xl:hover:bg-transparent w-full h-10 xl:w-auto xl:h-auto">
                                <Link
                                    href="/decants"
                                    className="text-gray-600 hover:text-gray-900 text-base font-medium transition-colors h-full w-ful flex items-center justify-center"
                                >
                                    Decants
                                </Link>
                            </li>
                            <li className="hover:bg-gray-50 xl:hover:bg-transparent w-full h-10 xl:w-auto xl:h-auto">
                                <Link
                                    href="/testers"
                                    className="text-gray-600 hover:text-gray-900 text-base font-medium transition-colors h-full w-ful flex items-center justify-center"
                                >
                                    ¿Qué es un perfume tester?
                                </Link>
                            </li>
                            <li className="hover:bg-gray-50 xl:hover:bg-transparent w-full h-10 xl:w-auto xl:h-auto">
                                <Link
                                    href="/envios"
                                    className="text-gray-600 hover:text-gray-900 text-base font-medium transition-colors h-full w-ful flex items-center justify-center"
                                >
                                    Envíos
                                </Link>
                            </li>
                            <li className="hover:bg-gray-50 xl:hover:bg-transparent w-full h-10 xl:w-auto xl:h-auto">
                                <Link
                                    href="/carrito"
                                    className="text-gray-600 hover:text-gray-900 text-base font-medium transition-colors h-full w-ful flex items-center justify-center"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-6"
                                    >
                                        <circle cx="8" cy="21" r="1" />
                                        <circle cx="19" cy="21" r="1" />
                                        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                                    </svg>
                                </Link>
                            </li>
                            <li className="hover:bg-blue-50 xl:hover:bg-transparent w-full h-10 xl:w-auto xl:h-auto first:rounded-t-lg xl:first:rounded-none xl:last:rounded-none">
                                <Link
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline h-full w-ful flex items-center justify-center"
                                    href={isLoggedIn ? "/dashboard" : "/login"}
                                >
                                    {isLoggedIn ? "Dashboard" : "Login"}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <svg
                        id="menu-icon"
                        className="w-8 h-8 block xl:hidden cursor-pointer"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={openMenu}
                    >
                        <path
                            id="icon-path"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        ></path>
                    </svg>

                    <svg
                        id="close-icon"
                        className="w-8 h-8 hidden xl:hidden cursor-pointer"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={openMenu}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        ></path>
                    </svg>
                </div>
            </div>
        </header>
    );
}

export default Header;
