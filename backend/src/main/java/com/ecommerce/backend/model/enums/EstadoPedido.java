package com.ecommerce.backend.model.enums;

public enum EstadoPedido {
    PENDIENTE("Pendiente"),
    PREPARACION("En preparación"),
    ENTREGADO("Entregado");

    private final String descripcion;

    // Constructor del Enum
    EstadoPedido(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getDescripcion() {
        return descripcion;
    }
}
