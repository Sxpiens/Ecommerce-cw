import React, {useState} from "react";
import {CarritoContext} from "./CarritoContext";

export function CarritoProvider({ children }) {
    const [carrito, setCarrito] = useState([]);

    const agregarAlCarrito = (newProducto) => {
        const existeProducto = carrito.find((producto) => producto.id === newProducto.id);

        if (existeProducto) {
            const newCarrito = carrito.map((producto) =>
                producto.id === newProducto.id
                    ?{...producto, cantidad: producto.cantidad + 1}
                    : producto
            );
            setCarrito(newCarrito);
        } else
            setCarrito([...carrito,{...newProducto, cantidad: 1}]);
    };

    const eliminarProducto = (idBorrar) => {
        const carritoLimpio = carrito.filter(producto => producto.id !== idBorrar);
        setCarrito(carritoLimpio);
    };

    const disminuirProducto = (id) => {
        const existeProducto = carrito.find((producto) => producto.id === id);
        // si el carrito tiene solo tiene un producto entonces se queda vacío
        if (existeProducto.cantidad === 1) {
            eliminarProducto(id)
        } // de lo contrario resta 1 a la cantidad que exista
        else {
            const newCarrito = carrito.map(producto => producto.id === id
                ? {...producto, cantidad: producto.cantidad - 1}
                : producto
            );
            setCarrito(newCarrito);
        }
    };

    const limpiarCarrito = () => {
        setCarrito([]);
    }

    return (
        <CarritoContext.Provider value={{ carrito, agregarAlCarrito, eliminarProducto, disminuirProducto, limpiarCarrito }}>
            {children}
        </CarritoContext.Provider>
    );
}
