import { supabase } from "../supabase/client";

// Obtener todos los exclusives
export async function getExclusives() {
    const { data, error } = await supabase
        .from("exclusives")
        .select()
        .order("id", { ascending: true });
    if (error) throw error;
    return data;
}

// Crear un nuevo exclusivo
export async function createExclusive(perfumeData) {
    const { error } = await supabase.from("exclusives").insert([perfumeData]);
    if (error) throw error;
}

// Actualizar un exclusivo existente
export async function updateExclusive(id, updatedData) {
    const { error } = await supabase
        .from("exclusives")
        .update(updatedData)
        .eq("id", id);
    if (error) throw error;
}

// Eliminar un exclusivo
export async function deleteExclusive(id) {
    const { error } = await supabase.from("exclusives").delete().eq("id", id);
    if (error) throw error;
}

// Obtener un exclusivo por ID
export async function getExclusiveById(id) {
    const { data, error } = await supabase
        .from("exclusives")
        .select()
        .eq("id", id)
        .single();
    if (error) throw error;
    return data;
}
