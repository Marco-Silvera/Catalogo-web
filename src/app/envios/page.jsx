import React from "react";

function Envios() {
    return (
        <main className="flex-grow mx-auto w-full max-w-[1200px] px-5 pb-10 pt-5 sm:pt-10 flex flex-col gap-14 lg:gap-20">
            <section className="flex flex-col items-center gap-5">
                <img
                    src="/Shalom_logo.webp"
                    className="h-14 lg:h-24 w-fit self-center"
                />
                <p className="text-base lg:text-xl">
                    Realizamos envíos a todo el país por medio de{" "}
                    <strong className="text-[#EE2A2F]">Shalom</strong>.
                </p>
                <section className="flex flex-col lg:flex-row gap-10 mt-5 lg:mt-10">
                    <article className="p-5 sm:p-10 bg-white rounded-xl relative border-t-[1px] border-l-[1px] w-full max-w-[560px]">
                        <p className="text-[#EE2A2F] font-bold uppercase text-base lg:text-xl pb-4">
                            Lima Metropolitana
                        </p>
                        <p className="text-start text-sm lg:text-base pb-3">
                            La tarifa de envíos es de 8 soles{" "}
                            <strong className="text-[#EE2A2F]">
                                (paquete XXS)
                            </strong>{" "}
                            caja necesaria para 1 perfume. Envio a una sede de
                            Shalom.
                        </p>
                        <p className="text-start text-sm lg:text-base">
                            El tiempo de entrega es de 1 a 2 días hábiles.
                        </p>
                        <div className="bg-red-500 absolute w-full h-full top-2 left-2 -z-10 rounded-xl"></div>
                    </article>
                    <article className="p-5 sm:p-10 bg-white rounded-xl relative border-t-[1px] border-l-[1px] w-full max-w-[560px]">
                        <p className="text-[#EE2A2F] font-bold uppercase  text-base lg:text-xl pb-4">
                            Provincias
                        </p>
                        <p className="text-start text-sm lg:text-base pb-3">
                            La tarifa de envíos es de 10 soles{" "}
                            <strong className="text-[#EE2A2F]">
                                (paquete XXS)
                            </strong>{" "}
                            caja necesaria para 1 perfume. Envio a una sede de
                            Shalom.
                        </p>
                        <p className="text-start text-sm lg:text-base">
                            El tiempo de entrega es de 2 a 4 días hábiles.
                        </p>
                        <div className="bg-red-500 absolute w-full h-full top-2 left-2 -z-10 rounded-xl"></div>
                    </article>
                </section>
            </section>
            <section className="flex flex-col lg:flex-row gap-10 items-center border-t-[1px] border-gray-400 pt-10 lg:pt-20 pb-10">
                <article className="flex flex-col gap-5 w-full max-w-[600px] lg:w-1/2 p-0 lg:p-5">
                    <h3 className="text-xl lg:text-3xl uppercase font-bold">
                        Envios Gratuitos
                    </h3>
                    <p className="text-base lg:text-xl">
                        Envios gratuitos en el Jockey Plaza y las estaciones de
                        tren previa coordinación.
                    </p>
                    <a
                        href={
                            "https://api.whatsapp.com/send?phone=51960153257&text=Hola, quisiera coordinar mi envío."
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="bg-green-600 rounded-lg w-fit py-2 px-5 font-bold uppercase transition-transform text-white shadow-sm hover:bg-green-700 border text-base sm:text-xl flex gap-3 items-center"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M20.52 3.483A11.625 11.625 0 0012.015 0C5.378 0 .039 5.338.039 11.929c0 2.105.548 4.163 1.587 5.985l-1.664 6.086 6.215-1.628c1.739.951 3.7 1.455 5.672 1.455h.005c6.635 0 11.98-5.339 11.98-11.929 0-3.189-1.242-6.189-3.516-8.415zM12.02 21.617c-1.735 0-3.462-.457-4.95-1.319l-.354-.206-3.686.964.984-3.599-.224-.37a9.429 9.429 0 01-1.438-4.941c0-5.209 4.243-9.453 9.458-9.453a9.35 9.35 0 016.667 2.756 9.398 9.398 0 012.791 6.697c0 5.209-4.244 9.454-9.458 9.454zm5.237-7.17c-.29-.144-1.708-.843-1.973-.938-.264-.096-.456-.144-.647.144-.192.288-.743.938-.912 1.13-.168.192-.335.215-.626.072-.29-.144-1.22-.448-2.32-1.43-.857-.765-1.436-1.71-1.604-2-.168-.288-.018-.443.126-.587.13-.129.288-.336.432-.505.144-.168.192-.288.288-.48.096-.192.048-.36-.024-.504-.072-.144-.648-1.56-.89-2.137-.235-.564-.473-.488-.648-.488h-.557c-.192 0-.503.072-.764.36-.263.288-1.002.977-1.002 2.376s1.027 2.754 1.17 2.946c.144.192 2.02 3.088 4.895 4.332.684.296 1.22.472 1.637.604.687.216 1.313.185 1.807.112.551-.082 1.708-.7 1.95-1.375.24-.672.24-1.249.168-1.375-.073-.12-.264-.192-.553-.336z" />
                        </svg>
                        <p>Coordinar envío</p>
                    </a>
                </article>
                <article className="w-full max-w-[600px] lg:w-1/2 aspect-square overflow-hidden rounded-lg object-cover ">
                    <img
                        className="object-cover h-1/2 w-full"
                        src="/Jockey_Plaza.webp"
                    />
                    <img
                        className="object-cover h-1/2 w-full"
                        src="/Estación.webp"
                    />
                </article>
            </section>
        </main>
    );
}

export default Envios;
