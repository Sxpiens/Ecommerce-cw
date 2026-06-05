package com.ecommerce.backend.model;

import com.ecommerce.backend.model.enums.EstadoPedido;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "pedidos")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPedido;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(name = "fecha_pedido")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime fechaPedido;

    @Enumerated(EnumType.STRING)
    private EstadoPedido estado = EstadoPedido.PENDIENTE;

    /*Para cantidades monetarias se recomienda siempre BigDecimal*/
    private BigDecimal total;

    /* mappedBy: Dice a JPA que la relación existe en PedidoItem con campo Pedido así ya no crea una nueva tabla
    * CascadeType.ALL: Todas las operaciones hechas al Pedido se reflejan en los items, si borro un pedido los items se
    * eliminan y si guardo un pedido los items se mantienen
    * */

    @JsonManagedReference
    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL)
    private List<PedidoItem> items = new ArrayList<>();

}
