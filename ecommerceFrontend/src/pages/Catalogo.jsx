import React, {useContext, useState, useEffect} from "react";
import {CarritoContext} from '../context/CarritoContext';
import {API_URL} from "../config/api.js";


function Catalogo() {
    const {agregarAlCarrito} = useContext(CarritoContext);
    const  [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        // Función para traer los datos del Backend
        const obtenerProductos = async () => {
            try {
                const respuesta = await fetch( `${API_URL}/api/productos`);
                const datos = await respuesta.json();
                setProductos(datos); // Guardamos los productos reales en el estado
                setCargando(false);
            } catch (error) {
                console.error("Error cargando productos:", error);
                setCargando(false); /**/
            }
        };
        obtenerProductos();
    }, []);

    if (cargando) return <p>Cargando productos...</p>;

    return (
        <section className="bg-amber-50 min-h-screen py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-serif font-bold text-slate-800 text-center mb-10 italic">
                    Nuestra Colección
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {productos.map((producto) => (
                        <div
                            key={producto.id}
                            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
                        >

                            <div className="h-64 overflow-hidden">
                                <img
                                    src={producto.imagen}
                                    alt={producto.nombre}
                                    onError={(e) => e.target.src = "https://placehold.co/400x300?text=Sin+imagen"}
                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                />
                            </div>

                            <div className="p-6 flex flex-col flex-1">
                                <h3 className="text-xl font-bold text-slate-800 mb-2">
                                    {producto.nombre}
                                </h3>
                                <p className="text-pink-600 font-black text-2xl mb-4">
                                    S/ {producto.precio.toFixed(2)}
                                </p>

                                <button
                                    className="mt-auto w-full bg-slate-800 text-white py-3 rounded-xl font-bold hover:bg-pink-500 transition-colors shadow-sm cursor-pointer"
                                    onClick={() => agregarAlCarrito(producto)}
                                >
                                    Agregar al carrito
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
export default Catalogo;