import { supabase } from "../supabase/client";

// Obtener todos los decants
export async function getDecants() {
    const { data, error } = await supabase
        .from("decants")
        .select()
        .order("id", { ascending: true });
    if (error) throw error;
    return data;
}


// Crear un nuevo decant y retornar el registro insertado
export async function createDecant(decantData) {
    const { data, error } = await supabase
        .from("decants")
        .insert([decantData])
        .select();
    if (error) throw error;
    return data[0];
}


// Actualizar un decant existente y retornar el registro actualizado
export async function updateDecant(id, updatedData) {
    const { data, error } = await supabase
        .from("decants")
        .update(updatedData)
        .eq("id", id)
        .select();
    if (error) throw error;
    return data[0];
}

// Eliminar un decant
export async function deleteDecant(id) {
    const { error } = await supabase.from("decants").delete().eq("id", id);
    if (error) throw error;
}

// Obtener un decant por ID
export async function getDecantById(id) {
    const { data, error } = await supabase
        .from("decants")
        .select()
        .eq("id", id)
        .single();
    if (error) throw error;
    return data;
}
