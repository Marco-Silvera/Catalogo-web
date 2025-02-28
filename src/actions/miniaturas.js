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

// Crear una nueva miniatura y retornar el registro insertado
export async function createMiniature(perfumeData) {
    const { data, error } = await supabase
        .from("miniatures")
        .insert([perfumeData])
        .select();
    if (error) throw error;
    return data[0];
}

// Actualizar una minaitura existente y retornar el registro actualizado
export async function updateMiniature(id, updatedData) {
    const { data, error } = await supabase
        .from("miniatures")
        .update(updatedData)
        .eq("id", id)
        .select();
    if (error) throw error;
    return data[0];
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

// Obtener miniatures para generar rutas estáticas (se necesita el campo "path")
export async function fetchMiniaturesForPaths() {
    const { data, error } = await supabase
        .from("miniatures")
        .select("path")
        .order("id", { ascending: true });
    if (error) throw error;
    return data;
}

// Obtener una miniatura por su "path"
export async function getMiniatureByPath(path) {
    const { data, error } = await supabase
        .from("miniatures")
        .select("*")
        .eq("path", path)
        .single();
    if (error) return null;
    return data;
}
