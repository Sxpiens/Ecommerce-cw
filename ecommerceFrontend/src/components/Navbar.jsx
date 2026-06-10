import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UsuarioContext } from "../context/UsuarioContext";

function Navbar() {
    const { usuario, logout } = useContext(UsuarioContext);
    const navigate = useNavigate();
    const [menuAbierto, setMenuAbierto] = useState(false);

    const cerrarMenu = () => setMenuAbierto(false);

    return (
        <nav className='bg-sky-400 text-white'>

            <div className="flex justify-between items-center p-4">
                <Link to="/" className="cursor-pointer" onClick={cerrarMenu}>
                    <img
                        src="/logo.png"
                        alt="Logo Dulce Momento"
                        className="h-11 w-auto object-contain hover:scale-105 transition-transform"
                    />
                </Link>

                <div className='hidden md:flex items-center gap-4 font-serif italic'>
                    <Link to="/" className="hover:text-red-700 transition-colors">Inicio</Link>
                    <span className="text-red-200">|</span>
                    <Link to="/carrito" className="hover:text-red-700 transition-colors">Carrito</Link>
                    <span className="text-red-200">|</span>
                    <Link to="/catalogo" className="hover:text-red-700 transition-colors">Catálogo</Link>
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
                            <span className="text-slate-800 font-sans not-italic font-bold">Hola, {usuario.nombre}</span>
                            <span className="text-red-200">|</span>
                            <button
                                onClick={() => { logout(); navigate("/login"); }}
                                className="hover:text-red-700 transition-colors cursor-pointer font-serif italic"
                            >
                                Cerrar Sesión
                            </button>
                        </>
                    )}
                </div>

                <button
                    className="md:hidden flex flex-col gap-1.5 p-2"
                    onClick={() => setMenuAbierto(!menuAbierto)}
                >
                    <span className={`block w-6 h-0.5 bg-white transition-all ${menuAbierto ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-white transition-all ${menuAbierto ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-white transition-all ${menuAbierto ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>
            </div>

            {menuAbierto && (
                <div className="md:hidden flex flex-col gap-4 px-6 pb-5 font-serif italic border-t border-sky-300">
                    <Link to="/" onClick={cerrarMenu} className="hover:text-red-700 pt-4">Inicio</Link>
                    <Link to="/carrito" onClick={cerrarMenu} className="hover:text-red-700">Carrito</Link>
                    <Link to="/catalogo" onClick={cerrarMenu} className="hover:text-red-700">Catálogo</Link>
                    {!usuario ? (
                        <>
                            <Link to="/login" onClick={cerrarMenu} className="hover:text-red-700">Login</Link>
                            <Link to="/registro" onClick={cerrarMenu} className="hover:text-red-700">Registro</Link>
                        </>
                    ) : (
                        <>
                            <span className="text-slate-800 font-sans not-italic font-bold">Hola, {usuario.nombre}</span>
                            <button
                                onClick={() => { logout(); navigate("/login"); cerrarMenu(); }}
                                className="text-left hover:text-red-700 cursor-pointer font-serif italic"
                            >
                                Cerrar Sesión
                            </button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}

export default Navbar;