"use client";
import { useEffect, useState } from "react";
import { updatePerfume } from "../../actions/perfumes";
import axios from "axios";

function PerfumeFormEdit({ initialData, onUpdate }) {
    const [formData, setFormData] = useState(initialData || {});
    const [addingUpdate, setAddingUpdate] = useState(false);
    const [fileKey, setFileKey] = useState(Date.now());

    // Función para generar el path automáticamente
    const generatePathFromName = (name) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    };

    // Cargar los datos iniciales si se proporciona un ID
    useEffect(() => {
        if (initialData?.id) {
            setFormData({
                ...initialData,
                path: generatePathFromName(initialData.name),
            });
        }
    }, [initialData]);

    // Manejar cambios en los campos
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            setFormData({ ...formData, [name]: checked });
        } else if (name === "name") {
            setFormData({
                ...formData,
                name: value,
                path: generatePathFromName(value),
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Convierte una imagen a formato WebP
    const convertToWebP = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0);

                    // Convertir a WebP con calidad 0.8 (80%)
                    canvas.toBlob(
                        (blob) => {
                            if (blob) {
                                // Crear un nuevo archivo con extensión .webp
                                const fileName =
                                    file.name
                                        .split(".")
                                        .slice(0, -1)
                                        .join(".") || file.name;
                                const webpFile = new File(
                                    [blob],
                                    `${fileName}.webp`,
                                    {
                                        type: "image/webp",
                                        lastModified: new Date().getTime(),
                                    }
                                );
                                resolve(webpFile);
                            } else {
                                reject(new Error("Error al convertir a WebP"));
                            }
                        },
                        "image/webp",
                        0.8
                    );
                };
                img.onerror = () =>
                    reject(new Error("Error al cargar la imagen"));
                img.src = event.target.result;
            };
            reader.onerror = () =>
                reject(new Error("Error al leer el archivo"));
            reader.readAsDataURL(file);
        });
    };

    // Sube un archivo a Cloudinary y retorna la URL
    const uploadToCloudinary = async (file) => {
        try {
            // Primero convertimos el archivo a WebP
            const webpFile = await convertToWebP(file);

            const form = new FormData();
            form.append("file", webpFile);
            form.append("upload_preset", "catalogo");
            form.append("folder", "catalogo_perfumes");
            // Ya no necesitamos el format=webp porque el archivo ya está en formato WebP
            // form.append("format", "webp"); <-- Eliminamos esta línea que causaba el error

            const res = await axios.post(
                "https://api.cloudinary.com/v1_1/dazpe9m9l/image/upload",
                form
            );
            return res.data.secure_url;
        } catch (error) {
            console.error("Error procesando o subiendo a Cloudinary", error);
            return null;
        }
    };

    // Maneja la subida de archivo y actualiza formData con la URL resultante
    const handleFileChange = async (e, fieldName) => {
        const file = e.target.files[0];
        if (!file) return;

        setAddingUpdate(true); // Mostrar "Guardando..." o similar mientras sube

        try {
            const uploadedUrl = await uploadToCloudinary(file);

            if (uploadedUrl) {
                setFormData((prev) => ({
                    ...prev,
                    [fieldName]: uploadedUrl,
                }));
            }
        } catch (error) {
            console.error("Error al procesar la imagen:", error);
            alert("Error al procesar la imagen. Intente nuevamente.");
        } finally {
            setAddingUpdate(false);
        }
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setAddingUpdate(true);

        try {
            const updated = await updatePerfume(formData.id, formData);
            // Se asume que updatePerfume retorna el registro actualizado.
            onUpdate(updated);
            setFormData({});

            setFileKey(Date.now());
        } catch (error) {
            console.error(error);
            alert("Error al actualizar el perfume");
        } finally {
            setAddingUpdate(false);
        }
    };

    // Función para verificar si la URL es válida y así mostrar preview
    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    };

    return (
        <section className="w-full border-b border-black pb-5">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 justify-center"
            >
                <div className="flex flex-col gap-5 sm:gap-10">
                    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-5 justify-center">
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 text-sm sm:text-base">
                            {/* Nombre */}
                            <label className="flex flex-col gap-2 items-start w-full font-medium">
                                Nombre
                                <input
                                    className="border p-2 rounded-lg w-full outline-none focus:border-green-600 border-gray-200 font-normal"
                                    type="text"
                                    name="name"
                                    placeholder="Nombre de perfume"
                                    onChange={handleChange}
                                    value={formData.name || ""}
                                    required
                                />
                            </label>

                            {/* Path */}
                            <label className="flex flex-col gap-2 items-start w-full font-medium">
                                Path
                                <input
                                    className="border border-gray-200 p-2 rounded-lg w-full outline-none focus:border-green-600 font-normal"
                                    type="text"
                                    name="path"
                                    placeholder="Path de perfume"
                                    value={formData.path || ""}
                                    disabled
                                    required
                                />
                            </label>
                            <div className="flex w-full gap-2 sm:gap-5 order-1 lg:order-0">
                                {/* Versión */}
                                <label className="flex flex-col gap-2 items-start w-full font-medium">
                                    Versión
                                    <select
                                        className="border border-gray-200 p-2 rounded-lg w-full outline-none focus:border-green-600 font-normal"
                                        name="version"
                                        onChange={handleChange}
                                        value={formData.version || ""}
                                        required
                                    >
                                        <option value="" disabled>
                                            Selecciona versión
                                        </option>
                                        <option value="Tester">Tester</option>
                                        <option value="Sellado">Sellado</option>
                                    </select>
                                </label>
                                <label className="flex flex-col gap-2 items-start w-full  font-medium">
                                    {" "}
                                    Género
                                    <select
                                        className="border border-gray-200 p-2 rounded-lg w-full outline-none focus:border-green-600 font-normal"
                                        name="gender"
                                        onChange={handleChange}
                                        value={formData.gender || ""}
                                        required
                                    >
                                        <option value="" disabled>
                                            Selecciona el genero
                                        </option>
                                        <option value="Hombre">Hombre</option>
                                        <option value="Mujer">Mujer</option>
                                        <option value="Unisex">Unisex</option>
                                    </select>
                                </label>
                            </div>

                            <label className="flex flex-col gap-2 items-start w-full font-medium order-1 lg:order-none">
                                {" "}
                                Marca
                                <select
                                    className="border border-gray-200 p-2 rounded-lg w-full outline-none focus:border-green-600 font-normal"
                                    name="brand"
                                    onChange={handleChange}
                                    value={formData.brand || ""}
                                    required
                                >
                                    <option value="" disabled>
                                        Selecciona una marca
                                    </option>
                                    <option value="Abercrombie & Fitch">
                                        Abercrombie & Fitch
                                    </option>
                                    <option value="Adolfo Dominguez">
                                        Adolfo Dominguez
                                    </option>
                                    <option value="Azzaro">Azzaro</option>
                                    <option value="Bobbi Brown">
                                        Bobbi Brown
                                    </option>
                                    <option value="Boss">Boss</option>
                                    <option value="Burberry">Burberry</option>
                                    <option value="Cacharel">Cacharel</option>
                                    <option value="Calvin Klein">
                                        Calvin Klein
                                    </option>
                                    <option value="Cala">Cala</option>
                                    <option value="Carolina Herrera">
                                        Carolina Herrera
                                    </option>
                                    <option value="Cartier">Cartier</option>
                                    <option value="Chanel">Chanel</option>
                                    <option value="Clinique">Clinique</option>
                                    <option value="Covergirl">Covergirl</option>
                                    <option value="Creed">Creed</option>
                                    <option value="Cross">Cross</option>
                                    <option value="Davidoff">Davidoff</option>
                                    <option value="Diesel">Diesel</option>
                                    <option value="Dior">Dior</option>
                                    <option value="Dkny">Dkny</option>
                                    <option value="Dolce & Gabbana">
                                        Dolce & Gabbana
                                    </option>
                                    <option value="Elie Saab">Elie Saab</option>
                                    <option value="Elizabeth Arden">
                                        Elizabeth Arden
                                    </option>
                                    <option value="Estee Lauder">
                                        Estee Lauder
                                    </option>
                                    <option value="Ferragamo">Ferragamo</option>
                                    <option value="Fila">Fila</option>
                                    <option value="Giorgio Armani">
                                        Giorgio Armani
                                    </option>
                                    <option value="Givenchy">Givenchy</option>
                                    <option value="Gucci">Gucci</option>
                                    <option value="Guess">Guess</option>
                                    <option value="Guerlain">Guerlain</option>
                                    <option value="Guy Laronche">
                                        Guy Laronche
                                    </option>
                                    <option value="Hollister">Hollister</option>
                                    <option value="Ilumínate">Ilumínate</option>
                                    <option value="Issey Miyake">
                                        Issey Miyake
                                    </option>
                                    <option value="Jean Paul Gaultier">
                                        Jean Paul Gaultier
                                    </option>
                                    <option value="Jeanne Arthes">
                                        Jeanne Arthes
                                    </option>
                                    <option value="Kenzo">Kenzo</option>
                                    <option value="La Prairie">
                                        La Prairie
                                    </option>
                                    <option value="Lacoste">Lacoste</option>
                                    <option value="Lancome">Lancome</option>
                                    <option value="Lilash">Lilash</option>
                                    <option value="Loewe">Loewe</option>
                                    <option value="L'Oréal">L'Oréal</option>
                                    <option value="MAC">MAC</option>
                                    <option value="Majorica">Majorica</option>
                                    <option value="Marc Jacobs">
                                        Marc Jacobs
                                    </option>
                                    <option value="Max Factor">
                                        Max Factor
                                    </option>
                                    <option value="Memo">Memo</option>
                                    <option value="Michael Kors">
                                        Michael Kors
                                    </option>
                                    <option value="Moschino">Moschino</option>
                                    <option value="Mugler">Mugler</option>
                                    <option value="Narciso Rodriguez">
                                        Narciso Rodriguez
                                    </option>
                                    <option value="Nina Ricci">
                                        Nina Ricci
                                    </option>
                                    <option value="Oscar de la Renta">
                                        Oscar de la Renta
                                    </option>
                                    <option value="Paco Rabanne">
                                        Paco Rabanne
                                    </option>
                                    <option value="Ralph Lauren">
                                        Ralph Lauren
                                    </option>
                                    <option value="Scalpers">Scalpers</option>
                                    <option value="Ted Lapidus">
                                        Ted Lapidus
                                    </option>
                                    <option value="Tom Ford">Tom Ford</option>
                                    <option value="Tommy Hilfiger">
                                        Tommy Hilfiger
                                    </option>
                                    <option value="TOUS">TOUS</option>
                                    <option value="Uric de Varens">
                                        Uric de Varens
                                    </option>
                                    <option value="Versace">Versace</option>
                                    <option value="victorinox">
                                        victorinox
                                    </option>
                                    <option value="Viktor & Rolf">
                                        Viktor & Rolf
                                    </option>
                                    <option value="Yves Saint Laurent">
                                        Yves Saint Laurent
                                    </option>
                                </select>
                            </label>
                            <div className="flex w-full gap-2 sm:gap-5 order-1 lg:order-0">
                                <label className="flex flex-col gap-2 items-start w-full font-medium">
                                    Concentración
                                    <input
                                        type="text"
                                        name="concentration"
                                        value={formData.concentration || ""}
                                        onChange={handleChange}
                                        placeholder="Concentración de perfume"
                                        className="border p-2 rounded-lg w-full outline-none focus:border-green-600 border-gray-200 font-normal"
                                        required
                                    />
                                </label>
                                {/* Checkbox de Caja */}
                                <label className="flex flex-col gap-4 items-center w-14 font-medium text-center">
                                    Caja
                                    <input
                                        className="border border-gray-200 p-2 rounded-lg h-5 w-5 outline-none font-normal"
                                        name="box"
                                        type="checkbox"
                                        checked={formData.box || false}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                            <div className="flex w-full gap-2 sm:gap-5 order-3">
                                <label className="flex flex-col gap-2 items-start w-full font-medium">
                                    Tamaño
                                    <input
                                        type="number"
                                        name="size"
                                        value={formData.size || ""}
                                        onChange={handleChange}
                                        placeholder="Tamaño"
                                        className="border p-2 rounded-lg w-full outline-none focus:border-green-600 border-gray-200 font-normal"
                                        min="0"
                                        max="500"
                                        required
                                    />
                                </label>
                                <label className="flex flex-col gap-2 items-start w-full font-medium">
                                    Precio
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price || ""}
                                        onChange={handleChange}
                                        placeholder="Precio"
                                        className="border p-2 rounded-lg w-full outline-none focus:border-green-600 border-gray-200 font-normal"
                                        min="0"
                                        max="3000"
                                        required
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="row-span-8 md:row-span-1 col-start-1 md:col-start-2 text-sm sm:text-base">
                            <label className="flex flex-col gap-2 items-start w-full h-full font-medium">
                                Descripción
                                <textarea
                                    type="text"
                                    name="description"
                                    value={formData.description || ""}
                                    onChange={handleChange}
                                    placeholder="Descripción de perfume"
                                    className="border border-gray-200 p-2 rounded-lg w-full resize-none h-full  outline-none focus:border-green-600 font-normal"
                                ></textarea>
                            </label>
                        </div>
                    </div>
                    <section className="flex flex-col gap-5 mt-3 text-sm sm:text-base">
                        <h3 className="text-xl uppercase font-semibold">
                            Imágenes
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 justify-center">
                            <div className="flex flex-col gap-2">
                                <label className="flex flex-col gap-2 items-start w-full font-medium">
                                    Imagen principal
                                    {/* Input de texto (link) */}
                                    <input
                                        type="text"
                                        name="image"
                                        value={formData.image || ""}
                                        onChange={handleChange}
                                        placeholder="Imagen principal de perfume"
                                        className="border border-gray-100 p-2 rounded-lg w-full outline-none focus:border-green-600 font-normal"
                                    />
                                </label>

                                {/* "o" */}
                                <div className="text-center text-sm">ó</div>

                                {/* Input de archivo */}
                                <input
                                    key={fileKey}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        handleFileChange(e, "image")
                                    }
                                />

                                {/* Vista previa */}
                                {formData.image &&
                                    isValidUrl(formData.image) && (
                                        <img
                                            src={formData.image}
                                            alt={`Imagen principal de ${formData.name}`}
                                            className="w-full h-auto aspect-square object-cover rounded-lg"
                                        />
                                    )}
                            </div>

                            {/* Segunda imagen */}
                            <div className="flex flex-col gap-2">
                                <label className="flex flex-col gap-2 items-start w-full font-medium">
                                    Segunda imagen
                                    <input
                                        type="text"
                                        name="imagetwo"
                                        value={formData.imagetwo || ""}
                                        onChange={handleChange}
                                        placeholder="Segunda imagen de perfume"
                                        className="border border-gray-100 p-2 rounded-lg w-full outline-none focus:border-green-600 font-normal"
                                    />
                                </label>

                                <div className="text-center text-sm">ó</div>

                                <input
                                    key={fileKey}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        handleFileChange(e, "imagetwo")
                                    }
                                />

                                {formData.imagetwo &&
                                    isValidUrl(formData.imagetwo) && (
                                        <img
                                            src={formData.imagetwo}
                                            alt={`Segunda imagen de ${formData.name}`}
                                            className="w-full h-auto aspect-square object-cover rounded-lg"
                                        />
                                    )}
                            </div>

                            {/* Tercera imagen */}
                            <div className="flex flex-col gap-2">
                                <label className="flex flex-col gap-2 items-start w-full font-medium">
                                    Tercera imagen
                                    <input
                                        type="text"
                                        name="imagethree"
                                        value={formData.imagethree || ""}
                                        onChange={handleChange}
                                        placeholder="Tercera imagen de perfume"
                                        className="border border-gray-100 p-2 rounded-lg w-full outline-none focus:border-green-600 font-normal"
                                    />
                                </label>

                                <div className="text-center text-sm">ó</div>

                                <input
                                    key={fileKey}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        handleFileChange(e, "imagethree")
                                    }
                                />

                                {formData.imagethree &&
                                    isValidUrl(formData.imagethree) && (
                                        <img
                                            src={formData.imagethree}
                                            alt={`Tercera imagen de ${formData.name}`}
                                            className="w-full h-auto aspect-square object-cover rounded-lg"
                                        />
                                    )}
                            </div>

                            {/* Cuarta imagen */}
                            <div className="flex flex-col gap-2">
                                <label className="flex flex-col gap-2 items-start w-full font-medium">
                                    Cuarta imagen
                                    <input
                                        type="text"
                                        name="imagefour"
                                        value={formData.imagefour || ""}
                                        onChange={handleChange}
                                        placeholder="Cuarta imagen de perfume"
                                        className="border border-gray-100 p-2 rounded-lg w-full outline-none focus:border-green-600 font-normal"
                                    />
                                </label>

                                <div className="text-center text-sm">ó</div>

                                <input
                                    key={fileKey}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        handleFileChange(e, "imagefour")
                                    }
                                />

                                {formData.imagefour &&
                                    isValidUrl(formData.imagefour) && (
                                        <img
                                            src={formData.imagefour}
                                            alt={`Cuarta imagen de ${formData.name}`}
                                            className="w-full h-auto aspect-square object-cover rounded-lg"
                                        />
                                    )}
                            </div>
                        </div>
                    </section>
                </div>
                {/* Resto de los campos... */}

                {/* Botón de envío */}
                <button
                    disabled={addingUpdate}
                    className="bg-teal-500 hover:bg-teal-600 rounded-lg w-fit py-2 px-5 self-center mt-4 font-bold uppercase transition-transform text-white shadow-sm "
                >
                    {addingUpdate ? "Guardando..." : "Guardar cambios"}
                </button>
            </form>
        </section>
    );
}

export default PerfumeFormEdit;
{
    /* <div className="flex flex-col gap-2">
                                <label className="flex flex-col gap-2 items-start w-full font-medium">
                                    Imagen principal
                                    <input
                                        type="text"
                                        name="image"
                                        value={formData.image || ""}
                                        onChange={handleChange}
                                        placeholder="Imagen principal de perfume"
                                        className="border border-gray-100 p-2 rounded-lg w-full  outline-none focus:border-green-600 font-normal"
                                    />
                                </label>

                                {formData.image && (
                                    <img
                                        src={formData.image || ""}
                                        alt={`Imagen principal de ${formData.name}`}
                                        className="w-full h-auto aspect-square object-cover rounded-lg"
                                    />
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="flex flex-col gap-2 items-start w-full font-medium">
                                    Segunda imagen
                                    <input
                                        type="text"
                                        name="imagetwo"
                                        value={formData.imagetwo || ""}
                                        onChange={handleChange}
                                        placeholder="Segunda imagen de perfume"
                                        className="border border-gray-100 p-2 rounded-lg w-full  outline-none focus:border-green-600 font-normal"
                                    />
                                </label>
                                {formData.imagetwo && (
                                    <img
                                        src={formData.imagetwo || ""}
                                        alt={`Segunda imagen de ${formData.name}`}
                                        className="w-full h-auto aspect-square object-cover rounded-lg"
                                    />
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="flex flex-col gap-2 items-start w-full font-medium">
                                    Tercera imagen
                                    <input
                                        type="text"
                                        name="imagethree"
                                        value={formData.imagethree || ""}
                                        onChange={handleChange}
                                        placeholder="Tercera imagen de perfume"
                                        className="border border-gray-100 p-2 rounded-lg w-full  outline-none focus:border-green-600 font-normal"
                                    />
                                </label>
                                {formData.imagethree && (
                                    <img
                                        src={formData.imagethree || ""}
                                        alt={`Tercera imagen de ${formData.name}`}
                                        className="w-full h-auto aspect-square object-cover rounded-lg"
                                    />
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="flex flex-col gap-2 items-start w-full font-medium">
                                    Cuarta imagen
                                    <input
                                        type="text"
                                        name="imagefour"
                                        value={formData.imagefour || ""}
                                        onChange={handleChange}
                                        placeholder="Cuarta imagen de perfume"
                                        className="border border-gray-100 p-2 rounded-lg w-full  outline-none focus:border-green-600 font-normal"
                                    />
                                </label>
                                {formData.imagefour && (
                                    <img
                                        src={formData.imagefour || ""}
                                        alt={`Cuarta imagen de ${formData.name}`}
                                        className="w-full h-auto aspect-square object-cover rounded-lg"
                                    />
                                )}
                            </div> */
}
