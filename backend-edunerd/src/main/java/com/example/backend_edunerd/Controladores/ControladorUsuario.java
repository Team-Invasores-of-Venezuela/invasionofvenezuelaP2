package com.example.backend_edunerd.Controladores;

import com.example.backend_edunerd.Dominio.UsuarioDTO;
import com.example.backend_edunerd.Modelos.Usuario;
import com.example.backend_edunerd.Servicios.ServicioUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/usuario")
public class ControladorUsuario {

    @Autowired
    private ServicioUsuario servicioUsuario;

    @CrossOrigin(origins = "*")
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody UsuarioDTO usuarioDTO) {
        Map<String, Object> response = new HashMap<>();
        Optional<Usuario> usuario = servicioUsuario.login(usuarioDTO.getEmail(), usuarioDTO.getContrasena());
        if (usuario.isPresent()) {
            response.put("admin", usuario.get().isAdmin());
            response.put("contrasena", usuario.get().getContrasena());
            response.put("email", usuario.get().getEmail());


            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
