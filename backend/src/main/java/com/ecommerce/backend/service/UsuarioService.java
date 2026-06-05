package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.UsuarioDTO;
import com.ecommerce.backend.model.Usuario;
import com.ecommerce.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public Optional<Usuario> findById(Long id) {
        return usuarioRepository.findById(id);
    }

    public Usuario registrar(Usuario usuario) {
        if (usuarioRepository.findByCorreo(usuario.getCorreo()).isPresent()) {
            throw new RuntimeException("El correo ya está registrado");
        }

        String passHasheado = passwordEncoder.encode(usuario.getPassword());
        usuario.setPassword(passHasheado);
        return usuarioRepository.save(usuario);
    }

    public Optional<Usuario> findByCorreo(String correo) {
        return usuarioRepository.findByCorreo(correo);
    }

    public UsuarioDTO obtenerPerfil(String correo) {
        Usuario usuario = usuarioRepository.findByCorreo(correo)
                .orElseThrow(() -> new RuntimeException("No encontrado"));
        // Convertimos de Entidad a DTO
        UsuarioDTO dto = new UsuarioDTO();
        dto.setNombre(usuario.getNombre());
        dto.setCorreo(usuario.getCorreo());

        return dto;
    }
}