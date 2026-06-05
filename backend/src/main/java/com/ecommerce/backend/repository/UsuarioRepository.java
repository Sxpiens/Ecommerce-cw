package com.ecommerce.backend.repository;

import com.ecommerce.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario,Long> {
    /*Optional sirve para que en caso no exista el correo este no se rompa al mostrar null
    sino que funciona como una caja que permite mostrar otras opciones como una Exception o mensaje de alerta*/
    Optional<Usuario> findByCorreo(String correo);
}
