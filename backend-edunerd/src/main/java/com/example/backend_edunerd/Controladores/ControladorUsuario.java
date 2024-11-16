package com.example.backend_edunerd.Controladores;

import com.example.backend_edunerd.Dominio.ProfesorDTO;
import com.example.backend_edunerd.Dominio.UsuarioDTO;
import com.example.backend_edunerd.Modelos.Profesor;
import com.example.backend_edunerd.Modelos.Usuario;
import com.example.backend_edunerd.Servicios.ServicioSVC;
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
    @Autowired
    private ServicioSVC servicioSVC;

    @CrossOrigin(origins = "*")
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody UsuarioDTO usuarioDTO) {
        Map<String, Object> response = new HashMap<>();
        Optional<Usuario> usuario = servicioUsuario.login(usuarioDTO.getEmail(), usuarioDTO.getContrasena());
        if (usuario.isPresent()) {
            response.put("id", usuario.get().getId());
            response.put("admin", usuario.get().isAdmin());

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/ola")
    public ResponseEntity<Usuario> ola(@RequestBody ProfesorDTO profesorDTO) {
        Profesor profesor = new Profesor(profesorDTO.getNombre(), profesorDTO.getCursos());
        Usuario usuario = servicioSVC.generarUsuarios(profesor);
        return ResponseEntity.ok().body(usuario);
    }
}
