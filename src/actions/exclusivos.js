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

// Crear un nuevo exclusivo y retornar el registro insertado
export async function createExclusive(exclusiveData) {
    const { data, error } = await supabase
        .from("exclusives")
        .insert([exclusiveData])
        .select();
    if (error) throw error;
    return data[0];
}

// Actualizar un exclusivo existente y retornar el registro actualizado
export async function updateExclusive(id, updatedData) {
    const { data, error } = await supabase
        .from("exclusives")
        .update(updatedData)
        .eq("id", id)
        .select();
    if (error) throw error;
    return data[0];
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

// Obtener un exclusivo por path
export async function getExclusiveByPath(path) {
    const { data, error } = await supabase
        .from("exclusives")
        .select("*")
        .eq("path", path)
        .single();
    if (error) return null;
    return data;
}
