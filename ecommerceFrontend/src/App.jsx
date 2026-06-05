import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Catalogo from './pages/Catalogo'
import Carrito from './pages/Carrito'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Inicio from './pages/Inicio'

import Navbar from "./components/Navbar";
import {CarritoProvider} from "./context/CarritoProvider.jsx";
import {UsuarioProvider} from "./context/UsuarioProvider.jsx";

function App() {

  return (

    <UsuarioProvider>
        <CarritoProvider>
            <BrowserRouter>
                <Navbar/>

                <Routes>
                    <Route path="/"        element={<Inicio />} />
                    <Route path="/catalogo" element={<Catalogo />} />
                    <Route path="/carrito" element={<Carrito />} />
                    <Route path="/login"   element={<Login />} />
                    <Route path="/registro" element={<Registro />} />
                </Routes>

            </BrowserRouter>
        </CarritoProvider>
    </UsuarioProvider>



  )
}

export default App
