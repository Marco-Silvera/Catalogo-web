"use client";
import { useState } from "react";
import { createExclusive } from "@/actions/exclusivos";

function ExclusiveForm() {
    const [adding, setAdding] = useState(false);
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

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createExclusive(formData);
            setFormData({
                name: "",
                path: "",
                description: "",
                version: "",
                gender: "",
                brand: "",
                collection: "",
                concentration: "",
                size: "",
                price: "",
                box: false,
                image: "",
                imagetwo: "",
                imagethree: "",
                imagefour: "",
            });
        } catch (error) {
            console.error(error);
            alert("Error al agregar el exclusivo");
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
                            <label className="flex flex-col gap-2 items-start w-full font-medium">Colección
                                <input
                                    className="border p-2 rounded-lg w-full outline-none focus:border-green-600 border-gray-200 font-normal"
                                    type="text"
                                    name="collection"
                                    placeholder="Colección de perfume"
                                    onChange={handleChange}
                                    value={formData.collection}
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
                            {/* Imagen principal */}
                            <div className="flex flex-col gap-2">
                                <label className="flex flex-col gap-2 items-start w-full font-medium">
                                    Imagen principal
                                    <input
                                        className="border border-gray-100 p-2 rounded-lg w-full outline-none focus:border-green-600 font-normal"
                                        type="text"
                                        name="image"
                                        placeholder="Imagen principal de perfume"
                                        onChange={handleChange}
                                        value={formData.image}
                                        required
                                    />
                                </label>

                                {formData.image &&
                                    isValidUrl(formData.image) && (
                                        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                                            <img
                                                src={formData.image}
                                                alt={`Imagen principal de ${formData.name}`}
                                                className="w-full h-auto aspect-square object-cover rounded-lg"
                                                loading="lazy"
                                            />
                                        </div>
                                    )}
                            </div>

                            {/* Segunda imagen */}
                            <div className="flex flex-col gap-2">
                                <label className="flex flex-col gap-2 items-start w-full font-medium">
                                    Segunda imagen
                                    <input
                                        className="border border-gray-100 p-2 rounded-lg w-full outline-none focus:border-green-600 font-normal"
                                        type="text"
                                        name="imagetwo"
                                        placeholder="Segunda imagen"
                                        onChange={handleChange}
                                        value={formData.imagetwo}
                                        required
                                    />
                                </label>

                                {formData.imagetwo &&
                                    isValidUrl(formData.imagetwo) && (
                                        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                                            <img
                                                src={formData.imagetwo}
                                                alt={`Imagen principal de ${formData.name}`}
                                                className="w-full h-auto aspect-square object-cover rounded-lg"
                                                loading="lazy"
                                            />
                                        </div>
                                    )}
                            </div>

                            {/* Tercera imagen */}
                            <div className="flex flex-col gap-2">
                                <label className="flex flex-col gap-2 items-start w-full font-medium">
                                    Tercera imagen
                                    <input
                                        className="border border-gray-100 p-2 rounded-lg w-full outline-none focus:border-green-600 font-normal"
                                        type="text"
                                        name="imagethree"
                                        placeholder="Tercera imagen"
                                        onChange={handleChange}
                                        value={formData.imagethree}
                                        required
                                    />
                                </label>

                                {formData.imagethree &&
                                    isValidUrl(formData.imagethree) && (
                                        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                                            <img
                                                src={formData.imagethree}
                                                alt={`Imagen principal de ${formData.name}`}
                                                className="w-full h-auto aspect-square object-cover rounded-lg"
                                                loading="lazy"
                                            />
                                        </div>
                                    )}
                            </div>

                            {/* Cuarta imagen */}
                            <div className="flex flex-col gap-2">
                                <label className="flex flex-col gap-2 items-start w-full font-medium">
                                    Cuarta imagen
                                    <input
                                        className="border border-gray-100 p-2 rounded-lg w-full outline-none focus:border-green-600 font-normal"
                                        type="text"
                                        name="imagefour"
                                        placeholder="Cuarta imagen"
                                        onChange={handleChange}
                                        value={formData.imagefour}
                                        required
                                    />
                                </label>

                                {formData.imagefour &&
                                    isValidUrl(formData.imagefour) && (
                                        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                                            <img
                                                src={formData.imagefour}
                                                alt={`Imagen principal de ${formData.name}`}
                                                className="w-full h-auto aspect-square object-cover rounded-lg"
                                                loading="lazy"
                                            />
                                        </div>
                                    )}
                            </div>
                        </div>
                    </section>
                </div>
                {/* Repite para otros campos... */}

                <button
                    disabled={adding}
                    className="bg-green-500 rounded-lg w-fit py-2 px-5 self-center mt-4 font-bold hover:scale-95 uppercase transition-transform text-white shadow-sm hover:bg-white border hover:border-green-500 hover:text-green-500"
                >
                    {adding ? "Agregando..." : "Agregar"}
                </button>
            </form>
        </section>
    );
}

export default ExclusiveForm;
