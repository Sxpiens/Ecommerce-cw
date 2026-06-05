package com.ecommerce.backend.controller;
import com.ecommerce.backend.model.Producto;
import com.ecommerce.backend.service.ProductoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@RequiredArgsConstructor
public class ProductoController {

    private final ProductoService productoService;

    @GetMapping
    public ResponseEntity<List<Producto>> listarTodos(){
        List<Producto> productos = productoService.listarTodos();
        return ResponseEntity.ok(productos);
    }

    @PostMapping
    public ResponseEntity<?> crearProducto(@RequestBody Producto producto){
        try{
            Producto nuevoProducto = productoService.guardar(producto);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevoProducto);
        } catch(Exception ex){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminar(@PathVariable Long id){
        try {
            productoService.eliminar(id);
            return ResponseEntity.ok("Producto eliminado correctamente");
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }


}
