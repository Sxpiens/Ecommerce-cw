package com.ecommerce.backend.service;

import com.ecommerce.backend.model.Pedido;
import com.ecommerce.backend.model.Producto;
import com.ecommerce.backend.model.Usuario;
import com.ecommerce.backend.model.enums.EstadoPedido;
import com.ecommerce.backend.repository.PedidoRepository;
import com.ecommerce.backend.repository.ProductoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PedidoService {
    private final PedidoRepository pedidoRepository;
    private final ProductoRepository productoRepository;

    public Pedido crearPedido(Usuario usuario, Pedido pedido) {
        Pedido nuevoPedido = new Pedido();
        nuevoPedido.setUsuario(usuario);

        nuevoPedido.setFechaPedido(LocalDateTime.now());

        nuevoPedido.setEstado(EstadoPedido.PENDIENTE);

        pedido.getItems().forEach(item -> {
            // Buscar el precio REAL desde la BD
            Producto productoDB = productoRepository.findById(item.getProducto().getId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

            // Usar el precio de la BD, no el del frontend
            item.setPrecioUnitario(BigDecimal.valueOf(productoDB.getPrecio()));
            item.setProducto(productoDB);
            item.setPedido(nuevoPedido);
        });
        nuevoPedido.setItems(pedido.getItems());

        BigDecimal total = pedido.getItems().stream()
                .map(item -> item.getPrecioUnitario().multiply(new BigDecimal(item.getCantidad())))
                .reduce(BigDecimal.ZERO,  BigDecimal::add);
        nuevoPedido.setTotal(total);

        return pedidoRepository.save(nuevoPedido);
    }

}
