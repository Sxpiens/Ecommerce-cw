package com.ecommerce.backend.service;

import com.ecommerce.backend.model.Producto;
import com.ecommerce.backend.repository.ProductoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ProductoService {
    private final ProductoRepository productoRepository;

    public List<Producto> listarTodos() {
        return productoRepository.findAll();
    }

    public Producto guardar(Producto producto){
        if (producto.getStock() <= 0){
            throw new RuntimeException("Producto no disponible");
        }
        return productoRepository.save(producto);
    }

    public void eliminar(Long id){
        if (!productoRepository.existsById(id)){
            throw new RuntimeException("Producto  de id " + id + " no encontrado o no existe");
        }
        productoRepository.deleteById(id);
    }


}
