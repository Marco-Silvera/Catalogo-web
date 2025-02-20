import { supabase } from "../supabase/client";

// Obtener todos los miniatures
export async function getMiniatures() {
    const { data, error } = await supabase
        .from("miniatures")
        .select()
        .order("id", { ascending: true });
    if (error) throw error;
    return data;
}

// Crear un nueva miniatura
export async function createMiniature(perfumeData) {
    const { error } = await supabase.from("miniatures").insert([perfumeData]);
    if (error) throw error;
}

// Actualizar una miniatura existente
export async function updateMiniature(id, updatedData) {
    const { error } = await supabase
        .from("miniatures")
        .update(updatedData)
        .eq("id", id);
    if (error) throw error;
}

// Eliminar una miniatura
export async function deleteMiniature(id) {
    const { error } = await supabase.from("miniatures").delete().eq("id", id);
    if (error) throw error;
}

// Obtener una miniatura por ID
export async function getMiniatureById(id) {
    const { data, error } = await supabase
        .from("miniatures")
        .select()
        .eq("id", id)
        .single();
    if (error) throw error;
    return data;
}
