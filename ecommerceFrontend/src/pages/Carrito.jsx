import {CarritoContext} from '../context/CarritoContext';
import React, {useContext} from "react";
import {UsuarioContext} from '../context/UsuarioContext';
import {API_URL} from "../config/api.js";
import {useNavigate} from "react-router-dom";

function Carrito() {
    const {carrito, eliminarProducto, disminuirProducto, agregarAlCarrito, limpiarCarrito}  = useContext(CarritoContext);
    const navigate = useNavigate();
    const {usuario} = useContext(UsuarioContext);
    const total = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);

    const realizarPedido = async () =>{
        try{
            const response = await fetch(`${API_URL}/api/pedidos?usuarioID=${usuario.id}`, {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    items: carrito.map(producto => ({
                        producto: { id: producto.id },
                        cantidad: producto.cantidad
                    }))
                }),
                });

            if (response.ok){
                limpiarCarrito();

                alert("Pedido realizado!");
                navigate("/catalogo");
            }
        } catch(error){
            console.log("Error al procesar su pedido",error);
        }
    }

    if (carrito.length === 0) {
        return (
            <section className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
                {/* icono simple */}
                <div className="bg-pink-50 p-8 rounded-full mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                </div>

                <h2 className="text-2xl font-serif font-bold text-slate-800 italic">
                    Tu carrito está vacío
                </h2>

                <div className="w-12 h-1 bg-pink-300 mx-auto mt-3 rounded-full"></div>

                <p className="text-slate-500 mt-4 max-w-xs">
                    Parece que aún no has añadido ningun detalle a tu orden.
                </p>

                <a
                    href="/catalogo"
                    className="mt-8 px-8 py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-all shadow-md active:scale-95 cursor-pointer"
                >
                    Explorar Catálogo
                </a>
            </section>
        );
    }

    return (
        <section className="max-w-4xl mx-auto p-6 bg-slate-50 rounded-3xl shadow-lg mt-10">
            <h2 className="text-3xl font-serif font-bold text-slate-800 italic text-center mb-6">
                Tu Carrito
                <div className="w-16 h-1 bg-pink-400 mx-auto mt-2 rounded-full"></div>
            </h2>

            <div className="space-y-4">
                {carrito.map((producto) => (
                    <div
                        key={producto.id}
                        className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-pink-100"
                    >
                        {/* Info Producto */}
                        <div className="flex-1">
                            <p className="font-bold text-slate-800 text-lg">{producto.nombre}</p>
                            <p className="text-slate-500 text-sm">S/ {producto.precio.toFixed(2)} c/u</p>
                        </div>

                        {/* Controles de Cantidad */}
                        <div className="flex items-center gap-3 bg-slate-100 rounded-full px-3 py-1">
                            <button
                                className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-pink-500 font-bold hover:bg-pink-50 cursor-pointer transition-colors"
                                onClick={() => disminuirProducto(producto.id)}
                            >
                                -
                            </button>

                            <span className="font-mono font-bold text-slate-700 w-6 text-center">
                              {producto.cantidad}
                            </span>

                            <button
                                className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-pink-500 font-bold hover:bg-pink-50 cursor-pointer transition-colors"
                                onClick={() => agregarAlCarrito(producto)}
                            >
                                +
                            </button>
                        </div>

                        {/* Eliminar */}
                        <button
                            className="ml-4 p-2 text-slate-400 hover:text-red-500 cursor-pointer transition-colors"
                            onClick={() => eliminarProducto(producto.id)}
                            title="Eliminar producto"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>

            {/* Resumen Final */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col items-end">
                <p className="text-2xl font-bold text-slate-800 mb-4">
                    Total: <span className="text-pink-500">S/ {total.toFixed(2)}</span>
                </p>

                <button
                    onClick={() => realizarPedido()}
                    className="w-full md:w-auto px-10 py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 cursor-pointer transition-all shadow-md active:scale-95"
                >
                    Realizar pedido
                </button>
            </div>
        </section>
    );
}
export default Carrito;