import { supabase } from "../supabase/client";

// Obtener todos los perfumes
export async function getPerfumes() {
    const { data, error } = await supabase
        .from("perfumes")
        .select()
        .order("id", { ascending: true });
    if (error) throw error;
    return data;
}

// Crear un nuevo perfume y retornar el registro insertado
export async function createPerfume(perfumeData) {
    const { data, error } = await supabase
        .from("perfumes")
        .insert([perfumeData])
        .select();
    if (error) throw error;
    return data[0];
}

// Actualizar un perfume existente y retornar el registro actualizado
export async function updatePerfume(id, updatedData) {
    const { data, error } = await supabase
        .from("perfumes")
        .update(updatedData)
        .eq("id", id)
        .select();
    if (error) throw error;
    return data[0];
}

// Eliminar un perfume
export async function deletePerfume(id) {
    const { error } = await supabase.from("perfumes").delete().eq("id", id);
    if (error) throw error;
}

// Obtener un perfume por ID
export async function getPerfumeById(id) {
    const { data, error } = await supabase
        .from("perfumes")
        .select()
        .eq("id", id)
        .single();
    if (error) throw error;
    return data;
}
