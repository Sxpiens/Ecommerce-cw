package com.ecommerce.backend.controller;

import com.ecommerce.backend.model.Pedido;
import com.ecommerce.backend.model.Usuario;
import com.ecommerce.backend.service.PedidoService;
import com.ecommerce.backend.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pedidos")
@RequiredArgsConstructor
public class PedidoController {
    private final PedidoService pedidoService;
    private final UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<?> crearPedido(@RequestParam Long usuarioID, @RequestBody Pedido pedido){
        try{
            Usuario usuarioReal = usuarioService.findById(usuarioID)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con el ID: " + usuarioID));

            Pedido pedidoNuevo = pedidoService.crearPedido(usuarioReal, pedido);
            return ResponseEntity.status(HttpStatus.CREATED).body(pedidoNuevo);
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
