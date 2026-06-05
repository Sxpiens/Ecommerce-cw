package com.ecommerce.backend.dto;

import lombok.Data;
/*Esta clase dto sirve para definir cual de todos los datos definidos en el modelo Usuario se van a mostrar, en este caso todos menos password */
@Data
public class UsuarioDTO {
    private String nombre;
    private String correo;
}
