package com.example.backend_edunerd.Controladores;

import com.example.backend_edunerd.Dominio.AdministradorDTO;
import com.example.backend_edunerd.Dominio.ProfesorDTO;
import com.example.backend_edunerd.Dominio.UsuarioDTO;
import com.example.backend_edunerd.Modelos.Profesor;
import com.example.backend_edunerd.Modelos.Usuario;
import com.example.backend_edunerd.Repositorios.RepositorioUsuario;
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
    @Autowired
    private RepositorioUsuario repositorioUsuario;

    @CrossOrigin(origins = "*")
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody UsuarioDTO usuarioDTO) {
        Map<String, Object> response = new HashMap<>();
        Optional<Usuario> usuario = servicioUsuario.login(usuarioDTO.getEmail(), usuarioDTO.getContrasena());
        if (usuario.isPresent()) {
            response.put("id", usuario.get().getId());
            response.put("admin", usuario.get().isAdmin());
            response.put("nombre", usuario.get().getRut());

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/registeradmin")
    public ResponseEntity<Map<String, Object>> registrarAdmin(@RequestBody AdministradorDTO administradorDTO) {
        Map<String, Object> response = new HashMap<>();
        Usuario usuario = servicioUsuario.crearAdmin(administradorDTO);
        if (usuario!= null) {
            response.put("admin", usuario.isAdmin());
            response.put("rut", usuario.getRut());
            repositorioUsuario.save(usuario);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

}
