import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UsuarioContext } from "../context/UsuarioContext";

function Navbar() {
    const { usuario, logout } = useContext(UsuarioContext);
    const navigate = useNavigate();

    return (
        <nav className='bg-sky-400 flex justify-between p-4 text-white items-center'>
            <div className="flex items-center">
                <Link to="/" className="cursor-pointer">
                    <img
                        src="/logo.png"
                        alt="Logo Dulce Momento"
                        className="h-11 w-auto object-contain hover:scale-105 transition-transform"
                    />
                </Link>
            </div>

            <div className='flex items-center gap-4 font-serif italic text-l'>
                <Link to="/" className="hover:text-red-700 transition-colors">Inicio</Link>
                <span className="text-red-200">|</span>
                <Link to="/carrito" className="hover:text-red-700 transition-colors">Carrito</Link>
                <span className="text-red-200">|</span>
                <Link to="/catalogo" className="hover:text-red-700 transition-colors">Catálogo</Link>

                {/*Condicional si está o no logueado*/}
                {!usuario ? (
                    <>
                        <span className="text-red-200">|</span>
                        <Link to="/login" className="hover:text-red-700 transition-colors">Login</Link>
                        <span className="text-red-200">|</span>
                        <Link to="/registro" className="hover:text-red-700 transition-colors">Registro</Link>
                    </>
                ) : (
                    <>
                        <span className="text-red-200">|</span>
                        <span className="text-slate-800 font-sans not-italic font-bold">
                            Hola, {usuario.nombre}
                        </span>
                        <span className="text-red-200">|</span>
                        <button
                            onClick={() => {
                                logout();
                                navigate("/login");
                            }}
                            className="hover:text-red-700 transition-colors cursor-pointer font-serif italic"
                        >
                            Cerrar Sesión
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;