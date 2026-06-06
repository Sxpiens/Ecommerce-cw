import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from "../config/api.js";
import {UsuarioContext} from '../context/UsuarioContext';

function Login() {

    const {login} = useContext(UsuarioContext);
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [mensajeError, setMensajeError] = useState('');

    const enviarFormulario = async (e) => {
        setMensajeError('');
        e.preventDefault(); // evita que la pagina se actualice al enviar el form
        try{
            const response = await fetch(`${API_URL}/api/usuarios/login`, {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify({correo, password}),
            });

            if (response.ok) {
                const usuarioData = await response.json();
                login(usuarioData)
                navigate("/catalogo");
            }else{
                setMensajeError("Usuario/contraseña incorrecta o no Registrado");
            }
        } catch (error) {
            console.log(error);
            setMensajeError('Error de conexión con el servidor');
        }
    };

    return (
        <section className="min-h-screen bg-amber-50 px-4">
            <div className=" flex justify-center pt-10 md:pt-16">

                <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-pink-100 h-fit">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-serif font-bold text-slate-800 italic">Bienvenido</h2>
                        <div className="w-16 h-1 bg-pink-400 mx-auto mt-3 rounded-full"></div>
                    </div>

                    <form onSubmit={enviarFormulario} className="space-y-6">
                        {/* Campo Correo */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Correo Electrónico</label>
                            <input
                                type="email"
                                value={correo} // Conectamos el valor
                                onChange={(e) => setCorreo(e.target.value)} // Actualizamos el estado
                                placeholder="miCorreo@correo.com"
                                className="w-full px-5 py-3 rounded-2xl border border-slate-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                                required
                            />
                        </div>

                        {/* Campo Contraseña */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Contraseña</label>
                            <input
                                type="password"
                                value={password} // Conectamos el valor
                                onChange={(e) => setPassword(e.target.value)} // Actualizamos el estado
                                placeholder="••••••••"
                                className="w-full px-5 py-3 rounded-2xl border border-slate-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                                required
                            />
                        </div>
                        {/*Este mensaje de error solo se mostrará cuando el <p></p> este lleno, como al incio lo definimos vacio no se rendirizara a menos que caiga en el else*/}
                        {mensajeError && <p className="text-red-500 text-sm text-center">{mensajeError}</p>}
                        <button
                            type="submit" // Cambiamos a submit para que dispare el handleSubmit
                            className="w-full bg-slate-800 text-white py-4 rounded-2xl font-bold hover:bg-pink-500 transition-all shadow-md"
                        >
                            Iniciar Sesión
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-slate-600">
                            ¿No tienes cuenta? <Link to="/registro" className="text-pink-500 font-bold hover:underline">Regístrate</Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;