import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {API_URL} from "../config/api.js";

function Registro() {
    // 1. Un estado por cada campo
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [confirmarPassword, setConfirmarPassword] = useState('');
    const navigate = useNavigate();
    const [mensajeError, setMensajeError] = useState('');

    const manejarCambioNombre = (e) => {
        const valor = e.target.value;
        // Regex: permite letras (mayús/minús), espacios, tildes y eñes
        const regexSoloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]*$/;

        if (regexSoloLetras.test(valor)) {
            setNombre(valor);
        }
    };

    const handleRegistro = async (e) => {
        setMensajeError('');
        e.preventDefault();

        if (password !== confirmarPassword) {
            setMensajeError("¡Ups! Las contraseñas no coinciden.");
            return;
        }
        // Validación extra: Que el nombre no esté vacío o solo tenga espacios
        if (nombre.trim().length < 3) {
            setMensajeError("Por favor, ingresa un nombre válido.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/usuarios`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, correo, password }),
            });

            if (response.ok) {
                navigate("/login");
            } else {
                setMensajeError("El correo ya está registrado");
            }
        } catch (error) {
            console.error("Detalles del error: ", error);
            setMensajeError("Error de conexión con el servidor");
        }
    };

    return (
        <section className="min-h-screen bg-amber-50 px-4 pt-7">
            <div className="flex justify-center">
                <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-pink-100 h-fit">
                    <h2 className="text-3xl font-serif font-bold text-slate-800 text-center italic">Crear Cuenta</h2>
                    <div className="w-16 h-1 bg-pink-400 mx-auto mt-3 mb-8 rounded-full"></div>

                    <form onSubmit={handleRegistro} className="space-y-4">
                        {/* Campo Nombre */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Nombre Completo</label>
                            <input
                                type="text"
                                value={nombre}
                                onChange={manejarCambioNombre}
                                className="w-full px-5 py-3 rounded-2xl border border-slate-200 focus:border-pink-400 outline-none"
                                required
                            />
                        </div>

                        {/* Campo Correo */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Correo Electrónico</label>
                            <input
                                type="email"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                className="w-full px-5 py-3 rounded-2xl border border-slate-200 focus:border-pink-400 outline-none"
                                required
                            />
                        </div>

                        {/* Campo Password */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Contraseña</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-5 py-3 rounded-2xl border border-slate-200 focus:border-pink-400 outline-none"
                                required
                            />
                        </div>

                        {/* Campo Confirmar Password */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Confirmar Contraseña</label>
                            <input
                                type="password"
                                value={confirmarPassword}
                                onChange={(e) => setConfirmarPassword(e.target.value)}
                                className="w-full px-5 py-3 rounded-2xl border border-slate-200 focus:border-pink-400 outline-none"
                                required
                            />
                        </div>

                        {mensajeError && <p className="text-red-500 text-sm text-center">{mensajeError}</p>}
                        <button type="submit" className="w-full bg-slate-800 text-white py-4 rounded-2xl font-bold hover:bg-pink-500 transition-all mt-4">
                            Registrarse
                        </button>
                    </form>

                    <p className="mt-6 text-center text-slate-600 text-sm">
                        ¿Ya tienes cuenta? <Link to="/login" className="text-pink-500 font-bold">Inicia sesión</Link>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Registro;