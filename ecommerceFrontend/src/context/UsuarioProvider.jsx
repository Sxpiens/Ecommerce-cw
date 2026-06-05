import { useState } from "react";
import { UsuarioContext } from "./UsuarioContext";

export function UsuarioProvider({ children }) {
    const [usuario, setUsuario] = useState(null);

    const login = (datosUsuario) => {
        setUsuario(datosUsuario);
    }

    const logout = () => {
        setUsuario(null);
    }

    return (
        <UsuarioContext.Provider value={{ usuario, login, logout }}>
            {children}
        </UsuarioContext.Provider>
    )
}