package com.ecommerce.backend.repository;

import com.ecommerce.backend.model.Pedido;
import com.ecommerce.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido,Long> {
    List<Pedido> findByUsuario(Usuario usuario);
}
