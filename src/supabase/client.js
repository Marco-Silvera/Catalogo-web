import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
        "Falta la URL de Supabase o la clave ANON. Verifique las variables del entorno."
    );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);