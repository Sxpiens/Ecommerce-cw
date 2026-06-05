package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.LoginRequest;
import com.ecommerce.backend.dto.UsuarioDTO;
import com.ecommerce.backend.model.Usuario;
import com.ecommerce.backend.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor

public class UsuarioController {
    private final UsuarioService usuarioService;
    private final BCryptPasswordEncoder passwordEncoder;

    /*ResponseEntity es una clase que representa http, ayuda a controlar las respuestas dependiendo del method http
      en este caso se usa .ok para representar un codigo 200*/
    @PostMapping
    public ResponseEntity<UsuarioDTO> registrar(@RequestBody Usuario usuario){
        /*1. El service registra y devuelve el Usuario (con password hasheado)*/
        usuarioService.registrar(usuario);
        /*2. Convertimos a DTO para responder al frontend solo con los datos que quiero*/
        UsuarioDTO perfil = usuarioService.obtenerPerfil(usuario.getCorreo());
        return ResponseEntity.ok(perfil);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginReq){
        Optional<Usuario> encontrado = usuarioService.findByCorreo(loginReq.getCorreo());

        if(encontrado.isEmpty()){
            return ResponseEntity.status(401).body("Usuario no encontrado");
        }

        boolean passwordCorrecto = passwordEncoder.matches(
                loginReq.getPassword(),
                encontrado.get().getPassword()
        );

        if(!passwordCorrecto){
            return ResponseEntity.status(400).body("Contra incorrecta");
        }

        //Si todo esta bien, devolvemos el perfil limpio (DTO de salida)
        UsuarioDTO perfil = usuarioService.obtenerPerfil(loginReq.getCorreo());
        return ResponseEntity.ok(perfil);

    }
}