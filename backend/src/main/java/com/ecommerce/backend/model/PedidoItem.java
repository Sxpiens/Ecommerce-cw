package com.ecommerce.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Entity
@Table(name = "pedido_items")
@Data
@NoArgsConstructor
@AllArgsConstructor

/*esta clase vendría a ser la dueña de la clase Pedido ya que es la intermedia entre Pedido y producto n*/
public class PedidoItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) /*Esta anotación es para generación automática de IDs*/
    private Long idPedidoItem;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "id_pedido")
    private Pedido pedido;

    @ManyToOne
    @JoinColumn(name = "producto_id")
    @JsonIgnoreProperties({"imagen", "stock", "precio"})
    private Producto producto;

    private int cantidad;

    private BigDecimal precioUnitario;
}
