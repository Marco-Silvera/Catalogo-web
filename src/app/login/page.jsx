"use client";
import { useState } from "react";
import { supabase } from "@/supabase/client";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            router.push("/dashboard"); // Si el login es exitoso redirige a dashboard
        } catch (error) {
            setError("Error de inicio de sesión: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex-grow mx-auto w-full max-w-[1500px] px-5 pb-10 pt-5 sm:pt-10 flex flex-col gap-10 items-center justify-center">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase">
                Iniciar sesión
            </h1>
            <form
                onSubmit={handleLogin}
                className="w-full max-w-[500px] p-5 text-start flex flex-col gap-5"
            >
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="email">Correo:</label>
                    <input
                        type="email"
                        className="border border-gray-200 p-2 rounded-lg w-full outline-none focus:border-green-600 font-normal"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="password">Constraseña:</label>
                    <input
                        type="password"
                        className="border border-gray-200 p-2 rounded-lg w-full outline-none focus:border-green-600 font-normal"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="text-red-700">{error}</p>}
                <button
                    className="bg-blue-500 rounded-lg w-fit py-2 px-5 self-center mt-4 font-bold hover:scale-95 uppercase transition-transform text-white shadow-sm hover:bg-white border hover:border-blue-500 hover:text-blue-500"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Cargando ..." : "Iniciar sesión"}
                </button>
            </form>
        </main>
    );
}
