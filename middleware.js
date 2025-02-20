import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });

    // Obtener la sesión del usuario
    const {
        data: { session },
    } = await supabase.auth.getSession();

    // Si intentan acceder al dashboard y no están autenticados
    if (req.nextUrl.pathname.startsWith("/dashboard")) {
        if (!session) {
            return NextResponse.redirect(new URL("/login", req.url));
        }

        // Opcional: verificar que sea el email correcto del admin
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (user.email !== "tu-email-admin@ejemplo.com") {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    return res;
}

export const config = {
    matcher: ["/dashboard/:path*"],
};
