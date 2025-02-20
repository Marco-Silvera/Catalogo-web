import { useEffect, useState } from "react";
import { usePerfumes } from "../context/PerfumeContext";

function PerfumeFormEdit() {
    const initialFormState = {
        name: '',
        description: '',
        path: '',
        version: '',
        gender: '',
        box: false,
        brand: '',
        concentration: '',
        size: '',
        price: '',
        image: '',
        imagetwo: '',
        imagethree: '',
        imagefour: ''
    };

    const { selectedPerfume, updatePerfume, addingUpdate } = usePerfumes();
    const [formData, setFormData] = useState(initialFormState);


    const generatePathFromName = (name) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
    };

    useEffect(() => {
        if (selectedPerfume) {
            setFormData({
                name: selectedPerfume.name || '',
                description: selectedPerfume.description || '',
                path: selectedPerfume.path || '',
                version: selectedPerfume.version || '',
                gender: selectedPerfume.gender || '',
                box: selectedPerfume.box || false,
                brand: selectedPerfume.brand || '',
                concentration: selectedPerfume.concentration || '',
                size: selectedPerfume.size || '',
                price: selectedPerfume.price || '',
                image: selectedPerfume.image || '',
                imagetwo: selectedPerfume.imagetwo || '',
                imagethree: selectedPerfume.imagethree || '',
                imagefour: selectedPerfume.imagefour || ''
            });
        }
    }, [selectedPerfume]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedPerfume) {
            await updatePerfume({ ...selectedPerfume, ...formData });
            setFormData(initialFormState);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            setFormData({ ...formData, [name]: checked });
        } else if (name === "name") {
            setFormData({
                ...formData,
                name: value,
                path: generatePathFromName(value)
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    return (
        <section className="w-full border-b border-black pb-5">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 justify-center">
                <div className="flex flex-col gap-5 sm:gap-10">
                    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-5 justify-center">
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 text-sm sm:text-base">
                            <label className="flex flex-col gap-2 items-start w-full font-medium">Nombre
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Nombre de perfume"
                                    className="border p-2 rounded-lg w-full outline-none focus:border-green-600 border-gray-200 font-normal"
                                    required
                                />
                            </label>
                            <label className="flex flex-col gap-2 items-start w-full font-medium" >Path
                                <input
                                    type="text"
                                    name="path"
                                    value={formData.path}
                                    onChange={handleChange}
                                    placeholder="Path de perfume"
                                    className="border p-2 rounded-lg w-full outline-none focus:border-green-600 border-gray-200 font-normal"
                                    disabled
                                    required
                                />
                            </label>
                            <div className="flex w-full gap-2 sm:gap-5 order-1 lg:order-0">

                                <label className="flex flex-col gap-2 items-start w-full  font-medium"> Versión
                                    <select
                                        className="border border-gray-200 p-2 rounded-lg w-full outline-none focus:border-green-600 font-normal"
                                        name="version"
                                        onChange={handleChange} value={formData.version} required
                                    >
                                        <option value="" disabled>Selecciona versión</option>
                                        <option value="Tester">Tester</option>
                                        <option value="Sellado">Sellado</option>
                                    </select>
                                </label>
                                <label className="flex flex-col gap-2 items-start w-full  font-medium"> Género
                                    <select
                                        className="border border-gray-200 p-2 rounded-lg w-full outline-none focus:border-green-600 font-normal"
                                        name="gender"
                                        onChange={handleChange} value={formData.gender} required
                                    >
                                        <option value="" disabled>Selecciona el genero</option>
                                        <option value="Hombre">Hombre</option>
                                        <option value="Mujer">Mujer</option>
                                        <option value="Unisex">Unisex</option>
                                    </select>
                                </label>
                            </div>
                            <label className="flex flex-col gap-2 items-start w-full font-medium order-1 lg:order-none"> Marca
                                <select
                                    className="border border-gray-200 p-2 rounded-lg w-full outline-none focus:border-green-600 font-normal"
                                    name="brand"
                                    onChange={handleChange}
                                    value={formData.brand} required
                                >
                                    <option value="" disabled>Selecciona una marca</option>
                                    <option value="Abercrombie & Fitch">Abercrombie & Fitch</option>
                                    <option value="Adolfo Dominguez">Adolfo Dominguez</option>
                                    <option value="Azzaro">Azzaro</option>
                                    <option value="Bobbi Brown">Bobbi Brown</option>
                                    <option value="Boss">Boss</option>
                                    <option value="Burberry">Burberry</option>
                                    <option value="Cacharel">Cacharel</option>
                                    <option value="Calvin Klein">Calvin Klein</option>
                                    <option value="Cala">Cala</option>
                                    <option value="Carolina Herrera">Carolina Herrera</option>
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
                                    <option value="Dolce & Gabbana">Dolce & Gabbana</option>
                                    <option value="Elie Saab">Elie Saab</option>
                                    <option value="Elizabeth Arden">Elizabeth Arden</option>
                                    <option value="Estee Lauder">Estee Lauder</option>
                                    <option value="Ferragamo">Ferragamo</option>
                                    <option value="Fila">Fila</option>
                                    <option value="Giorgio Armani">Giorgio Armani</option>
                                    <option value="Givenchy">Givenchy</option>
                                    <option value="Gucci">Gucci</option>
                                    <option value="Guess">Guess</option>
                                    <option value="Guerlain">Guerlain</option>
                                    <option value="Guy Laronche">Guy Laronche</option>
                                    <option value="Hollister">Hollister</option>
                                    <option value="Ilumínate">Ilumínate</option>
                                    <option value="Issey Miyake">Issey Miyake</option>
                                    <option value="Jean Paul Gaultier">Jean Paul Gaultier</option>
                                    <option value="Jeanne Arthes">Jeanne Arthes</option>
                                    <option value="Kenzo">Kenzo</option>
                                    <option value="La Prairie">La Prairie</option>
                                    <option value="Lacoste">Lacoste</option>
                                    <option value="Lancome">Lancome</option>
                                    <option value="Lilash">Lilash</option>
                                    <option value="Loewe">Loewe</option>
                                    <option value="L'Oréal">L'Oréal</option>
                                    <option value="MAC">MAC</option>
                                    <option value="Majorica">Majorica</option>
                                    <option value="Marc Jacobs">Marc Jacobs</option>
                                    <option value="Max Factor">Max Factor</option>
                                    <option value="Memo">Memo</option>
                                    <option value="Michael Kors">Michael Kors</option>
                                    <option value="Moschino">Moschino</option>
                                    <option value="Mugler">Mugler</option>
                                    <option value="Narciso Rodriguez">Narciso Rodriguez</option>
                                    <option value="Nina Ricci">Nina Ricci</option>
                                    <option value="Oscar de la Renta">Oscar de la Renta</option>
                                    <option value="Paco Rabanne">Paco Rabanne</option>
                                    <option value="Ralph Lauren">Ralph Lauren</option>
                                    <option value="Scalpers">Scalpers</option>
                                    <option value="Ted Lapidus">Ted Lapidus</option>
                                    <option value="Tom Ford">Tom Ford</option>
                                    <option value="Tommy Hilfiger">Tommy Hilfiger</option>
                                    <option value="TOUS">TOUS</option>
                                    <option value="Uric de Varens">Uric de Varens</option>
                                    <option value="Versace">Versace</option>
                                    <option value="victorinox">victorinox</option>
                                    <option value="Viktor & Rolf">Viktor & Rolf</option>
                                    <option value="Yves Saint Laurent">Yves Saint Laurent</option>
                                </select>
                            </label>

                            <div className="flex w-full gap-2 sm:gap-5 order-1 lg:order-0">
                                <label className="flex flex-col gap-2 items-start w-full font-medium">Concentración
                                    <input
                                        type="text"
                                        name="concentration"
                                        value={formData.concentration}
                                        onChange={handleChange}
                                        placeholder="Concentración de perfume"
                                        className="border p-2 rounded-lg w-full outline-none focus:border-green-600 border-gray-200 font-normal"
                                        required
                                    />
                                </label>
                                <label className="flex flex-col gap-4 items-center w-14 font-medium text-center">Caja
                                    <input
                                        className="border border-gray-200 p-2 rounded-lg h-5 w-5 outline-none font-normal"
                                        name="box"
                                        type="checkbox"
                                        checked={formData.box}
                                        onChange={handleChange} value={formData.box}
                                    />
                                </label>
                            </div>
                            <div className="flex w-full gap-2 sm:gap-5 order-3">
                                <label className="flex flex-col gap-2 items-start w-full font-medium">Tamaño
                                    <input
                                        type="number"
                                        name="size"
                                        value={formData.size}
                                        onChange={handleChange}
                                        placeholder="Tamaño"
                                        className="border p-2 rounded-lg w-full outline-none focus:border-green-600 border-gray-200 font-normal"
                                        min="0" max="500" required
                                    />
                                </label>
                                <label className="flex flex-col gap-2 items-start w-full font-medium">Precio
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="Precio"
                                        className="border p-2 rounded-lg w-full outline-none focus:border-green-600 border-gray-200 font-normal"
                                        min="0" max="3000" required
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="row-span-8 md:row-span-1 col-start-1 md:col-start-2 text-sm sm:text-base">
                            <label className="flex flex-col gap-2 items-start w-full h-full font-medium">Descripción
                                <textarea
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Descripción de perfume"
                                    className="border border-gray-200 p-2 rounded-lg w-full resize-none h-full  outline-none focus:border-green-600 font-normal"
                                ></textarea>
                            </label>
                        </div>
                    </div>
                    <section className="flex flex-col gap-5 mt-3 text-sm sm:text-base">
                        <h3 className="text-xl uppercase font-semibold">Imágenes</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 justify-center">
                            <div className="flex flex-col gap-2">
                                <label className="flex flex-col gap-2 items-start w-full font-medium">Imagen principal
                                    <input
                                        type="text"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleChange}
                                        placeholder="Imagen principal de perfume"
                                        className="border border-gray-100 p-2 rounded-lg w-full  outline-none focus:border-green-600 font-normal"
                                    />
                                </label>

                                {formData.image && (
                                    <img
                                        src={formData.image}
                                        alt={`Imagen principal de ${formData.name}`}
                                        className="w-full h-auto aspect-square object-cover rounded-lg"
                                    />
                                )}
                            </div>
                            <div className="flex flex-col gap-2">

                                <label className="flex flex-col gap-2 items-start w-full font-medium">Segunda imagen
                                    <input
                                        type="text"
                                        name="imagetwo"
                                        value={formData.imagetwo}
                                        onChange={handleChange}
                                        placeholder="Segunda imagen de perfume"
                                        className="border border-gray-100 p-2 rounded-lg w-full  outline-none focus:border-green-600 font-normal"
                                    />
                                </label>
                                {formData.imagetwo && (
                                    <img
                                        src={formData.imagetwo}
                                        alt={`Segunda imagen de ${formData.name}`}
                                        className="w-full h-auto aspect-square object-cover rounded-lg"
                                    />
                                )}
                            </div>
                            <div className="flex flex-col gap-2">

                                <label className="flex flex-col gap-2 items-start w-full font-medium">Tercera imagen
                                    <input
                                        type="text"
                                        name="imagethree"
                                        value={formData.imagethree}
                                        onChange={handleChange}
                                        placeholder="Tercera imagen de perfume"
                                        className="border border-gray-100 p-2 rounded-lg w-full  outline-none focus:border-green-600 font-normal"
                                    />
                                </label>
                                {formData.imagethree && (
                                    <img
                                        src={formData.imagethree}
                                        alt={`Tercera imagen de ${formData.name}`}
                                        className="w-full h-auto aspect-square object-cover rounded-lg"
                                    />
                                )}
                            </div>

                            <div className="flex flex-col gap-2">

                                <label className="flex flex-col gap-2 items-start w-full font-medium">Cuarta imagen
                                    <input
                                        type="text"
                                        name="imagefour"
                                        value={formData.imagefour}
                                        onChange={handleChange}
                                        placeholder="Cuarta imagen de perfume"
                                        className="border border-gray-100 p-2 rounded-lg w-full  outline-none focus:border-green-600 font-normal"
                                    />
                                </label>
                                {formData.imagefour && (
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
                <button disabled={addingUpdate} className="bg-yellow-500 rounded-lg w-fit py-2 px-5 self-center mt-4 font-bold hover:scale-95 uppercase transition-transform text-white shadow-sm hover:bg-white border hover:border-yellow-500 hover:text-yellow-500" type="submit">{addingUpdate ? "Guardando..." : "Guardar cambios"}</button>
            </form>
        </section>
    );
}

export default PerfumeFormEdit;