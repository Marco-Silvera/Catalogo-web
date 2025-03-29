"use client";
import { useState } from "react";
import { createPerfume } from "@/actions/perfumes";
import axios from "axios";

function PerfumeForm({ onAdd }) {
    const [adding, setAdding] = useState(false);
    const [fileKey, setFileKey] = useState(Date.now());
    const [formData, setFormData] = useState({
        name: "",
        path: "",
        description: "",
        version: "",
        gender: "",
        brand: "",
        concentration: "",
        size: "",
        price: "",
        box: false,
        image: "",
        imagetwo: "",
        imagethree: "",
        imagefour: "",
    });

    const generatePath = (name) => {
        return name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    };

    // Manejar cambios en el campo name
    const handleNameChange = (e) => {
        const name = e.target.value;
        setFormData((prevData) => ({
            ...prevData,
            name: name,
            path: generatePath(name),
        }));
    };

    const isValidUrl = (url) => {
        try {
            new URL(url); // Intenta crear un objeto URL
            return true;
        } catch (e) {
            return false; // Si falla, la URL no es válida
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
            form.append("resource_type", "image");

            const res = await axios.post(
                "https://api.cloudinary.com/v1_1/dazpe9m9l/image/upload",
                form
            );
            return res.data.secure_url; // URL pública de la imagen ya en formato WebP
        } catch (error) {
            console.error("Error procesando o subiendo a Cloudinary", error);
            return null;
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Manejar subida de archivo en uno de los 4 campos de imagen
    const handleFileChange = async (e, fieldName) => {
        const file = e.target.files[0];
        if (!file) return;

        setAdding(true); // Indicamos que está subiendo

        try {
            const uploadedUrl = await uploadToCloudinary(file);

            if (uploadedUrl) {
                // Guardamos la URL resultante en formData[fieldName]
                setFormData((prev) => ({
                    ...prev,
                    [fieldName]: uploadedUrl,
                }));
            }
        } catch (error) {
            console.error("Error al procesar la imagen:", error);
            alert("Error al procesar la imagen. Intente nuevamente.");
        } finally {
            setAdding(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAdding(true);
        try {
            const newPerfume = await createPerfume(formData);
            onAdd(newPerfume);
            setFormData({
                name: "",
                path: "",
                description: "",
                version: "",
                gender: "",
                brand: "",
                concentration: "",
                size: "",
                price: "",
                box: false,
                image: "",
                imagetwo: "",
                imagethree: "",
                imagefour: "",
            });
            setFileKey(Date.now());
        } catch (error) {
            console.error(error);
            alert("Error al agregar el perfume");
        } finally {
            setAdding(false); // Desactiva el estado de carga
        }
    };

    return (
        <section className="w-full border-b border-black pb-5">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 justify-center"
            >
                {/* Ejemplo de un campo */}
                <div className="flex flex-col gap-5 sm:gap-10">
                    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-2 sm:gap-5 justify-center">
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-5 sm:gap-x-5 text-sm sm:text-base">
                            <label className="flex flex-col gap-2 items-start w-full font-medium">
                                Nombre
                                <input
                                    className="border p-2 rounded-lg w-full outline-none focus:border-green-600 border-gray-200 font-normal"
                                    type="text"
                                    name="name"
                                    placeholder="Nombre de perfume"
                                    onChange={handleNameChange}
                                    value={formData.name}
                                    required
                                />
                            </label>
                            <label className="flex flex-col gap-2 items-start w-full font-medium">
                                Path
                                <input
                                    className="border border-gray-200 p-2 rounded-lg w-full outline-none focus:border-green-600 font-normal"
                                    type="text"
                                    name="path"
                                    placeholder="Path de perfume"
                                    value={formData.path}
                                    disabled
                                    required
                                />
                            </label>

                            <div className="flex w-full gap-2 sm:gap-5 order-1 lg:order-0">
                                <label className="flex flex-col gap-2 items-start w-full  font-medium">
                                    Versión
                                    <select
                                        className="border border-gray-200 p-2 rounded-lg w-full outline-none focus:border-green-600 font-normal"
                                        name="version"
                                        onChange={handleChange}
                                        value={formData.version}
                                        required
                                    >
                                        <option value="" disabled>
                                            Versión
                                        </option>
                                        <option value="Tester">Tester</option>
                                        <option value="Sellado">Sellado</option>
                                    </select>
                                </label>

                                <label className="flex flex-col gap-2 items-start w-full  font-medium">
                                    Género
                                    <select
                                        className="border border-gray-200 p-2 rounded-lg w-full outline-none focus:border-green-600 font-normal"
                                        name="gender"
                                        onChange={handleChange}
                                        value={formData.gender}
                                        required
                                    >
                                        <option value="" disabled>
                                            Género
                                        </option>
                                        <option value="Hombre">Hombre</option>
                                        <option value="Mujer">Mujer</option>
                                        <option value="Unisex">Unisex</option>
                                    </select>
                                </label>
                            </div>

                            <label className="flex flex-col gap-2 items-start w-full font-medium order-1 lg:order-none">
                                Marca
                                <select
                                    className="border border-gray-200 p-2 rounded-lg w-full outline-none focus:border-green-600 font-normal"
                                    name="brand"
                                    onChange={handleChange}
                                    value={formData.brand}
                                    required
                                >
                                    <option value="" disabled>
                                        Selecciona marca
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
                                    {" "}
                                    Concentración
                                    <input
                                        className="border p-2 rounded-lg w-full outline-none focus:border-green-600 border-gray-200 font-normal"
                                        type="text"
                                        name="concentration"
                                        placeholder="Concentración de perfume"
                                        onChange={handleChange}
                                        value={formData.concentration}
                                        required
                                    />
                                </label>
                                <label className="flex flex-col gap-4 items-center w-14 font-medium text-center">
                                    Caja
                                    <input
                                        className="border border-gray-200 p-2 rounded-lg h-5 w-5 outline-none font-normal"
                                        name="box"
                                        type="checkbox"
                                        checked={formData.box}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            <div className="flex w-full gap-2 sm:gap-5 order-3">
                                <label className="flex flex-col gap-2 items-start w-full  font-medium">
                                    {" "}
                                    Tamaño
                                    <input
                                        className="border border-gray-200 p-2 rounded-lg w-full outline-none focus:border-green-600 font-normal"
                                        type="number"
                                        name="size"
                                        placeholder="Tamaño"
                                        onChange={handleChange}
                                        value={formData.size}
                                        min="0"
                                        max="500"
                                        required
                                    />
                                </label>
                                <label className="flex flex-col gap-2 items-start w-full  font-medium">
                                    {" "}
                                    Precio
                                    <input
                                        className="border border-gray-200 p-2 rounded-lg w-full outline-none focus:border-green-600 font-normal"
                                        type="number"
                                        name="price"
                                        placeholder="Precio"
                                        onChange={handleChange}
                                        value={formData.price}
                                        min="0"
                                        max="3000"
                                        required
                                    />
                                </label>
                            </div>
                        </div>

                        <div className="row-span-8 md:row-span-1 col-start-1 md:col-start-2 text-sm sm:text-base">
                            <label className="flex flex-col gap-2 items-start w-full h-full font-medium">
                                {" "}
                                Descripción
                                <textarea
                                    className="border border-gray-200 p-2 rounded-lg w-full resize-none h-full  outline-none focus:border-green-600 font-normal"
                                    type="text"
                                    name="description"
                                    placeholder="Descripción de perfume"
                                    onChange={handleChange}
                                    value={formData.description}
                                    required
                                ></textarea>
                            </label>
                        </div>
                    </div>

                    <section className="flex flex-col gap-5 mt-3 text-sm sm:text-base">
                        <h3 className="text-xl uppercase font-semibold">
                            Imágenes
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 justify-center">
                            {/* Repetimos para los 4 campos de imagen */}
                            {/* 1) Imagen principal */}
                            <div className="flex flex-col gap-2">
                                <span>Imagen principal</span>

                                {/* Input de texto para pegar link */}
                                <input
                                    type="text"
                                    name="image"
                                    className="border border-gray-100 p-2 rounded-lg w-full outline-none focus:border-green-600 font-normal"
                                    placeholder="URL de imagen"
                                    value={formData.image}
                                    onChange={handleChange}
                                />

                                {/* "o" en el medio */}
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
                                            alt="Vista previa"
                                            className="w-full h-auto aspect-square object-center object-cover rounded-lg"
                                        />
                                    )}
                            </div>

                            {/* 2) Segunda imagen */}
                            <div className="flex flex-col gap-2">
                                <span>Segunda imagen</span>
                                <input
                                    type="text"
                                    name="imagetwo"
                                    className="border border-gray-100 p-2 rounded-lg w-full outline-none focus:border-green-600 font-normal"
                                    placeholder="URL de imagen"
                                    value={formData.imagetwo}
                                    onChange={handleChange}
                                />
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
                                            alt="Vista previa 2"
                                            className="w-full h-auto aspect-square object-center object-cover rounded-lg"
                                        />
                                    )}
                            </div>

                            {/* 3) Tercera imagen */}
                            <div className="flex flex-col gap-2">
                                <span>Tercera imagen</span>
                                <input
                                    type="text"
                                    name="imagethree"
                                    className="border border-gray-100 p-2 rounded-lg w-full outline-none focus:border-green-600 font-normal"
                                    placeholder="URL de imagen"
                                    value={formData.imagethree}
                                    onChange={handleChange}
                                />
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
                                            alt="Vista previa 3"
                                            className="w-full h-auto aspect-square object-center object-cover rounded-lg"
                                        />
                                    )}
                            </div>

                            {/* 4) Cuarta imagen */}
                            <div className="flex flex-col gap-2">
                                <span>Cuarta imagen</span>
                                <input
                                    type="text"
                                    name="imagefour"
                                    className="border border-gray-100 p-2 rounded-lg w-full outline-none focus:border-green-600 font-normal"
                                    placeholder="URL de imagen"
                                    value={formData.imagefour}
                                    onChange={handleChange}
                                />
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
                                            alt="Vista previa 4"
                                            className="w-full h-auto aspect-square object-center object-cover rounded-lg"
                                        />
                                    )}
                            </div>
                        </div>
                    </section>
                </div>
                {/* Repite para otros campos... */}

                <button
                    disabled={adding}
                    className="bg-green-500 hover:bg-green-600 rounded-lg w-fit py-2 px-5 self-center mt-4 font-bold uppercase transition-transform text-white shadow-sm "
                >
                    {adding ? "Agregando..." : "Agregar"}
                </button>
            </form>
        </section>
    );
}

export default PerfumeForm;
