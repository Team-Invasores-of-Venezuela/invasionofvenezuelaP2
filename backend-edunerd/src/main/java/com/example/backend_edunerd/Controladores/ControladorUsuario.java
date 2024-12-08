package com.example.backend_edunerd.Controladores;

import com.example.backend_edunerd.Dominio.AdministradorDTO;
import com.example.backend_edunerd.Dominio.ImagenDTO;
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
            response.put("email", usuario.get().getEmail());
            response.put("imagen",usuario.get().getImageurl());

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
            response.put("imagenurl",usuario.getImageurl());
            repositorioUsuario.save(usuario);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }


    }

    @CrossOrigin(origins = "*")
    @PostMapping("/existeusuario")
    public ResponseEntity<Map<String, Boolean>>  existeUsuario(@RequestParam("email") String email){
        if(repositorioUsuario.existsByEmail(email)){
            return ResponseEntity.ok(Map.of("exist", true));
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/cambiarcontraseña")
    public ResponseEntity<Map<String, Boolean>> cambiarContraseña (@RequestBody UsuarioDTO usuarioDTO){
        Map<String, Boolean> response = new HashMap<>();

        try {
            Optional<Usuario> usuarioOptional = repositorioUsuario.findByEmail(usuarioDTO.getEmail());
            if (usuarioOptional.isPresent()) {
                Usuario usuario = usuarioOptional.get();
                usuario.setContrasena(usuarioDTO.getContrasena()); // Asegúrate de encriptar si es necesario
                repositorioUsuario.save(usuario);
                response.put("success", true);
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception e) {
            response.put("success", false);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


    @CrossOrigin(origins = "*")
    @PostMapping("/cambiarimagen")
    public ResponseEntity<Map<String, Boolean>> cambiarImagen (@RequestBody ImagenDTO imagen){
        Map<String, Boolean> response = new HashMap<>();
        System.out.println(imagen.getEmail());
        try {
            Optional<Usuario> usuarioOptional = repositorioUsuario.findByEmail(imagen.getEmail());
            if (usuarioOptional.isPresent()) {
                Usuario usuario = usuarioOptional.get();
                usuario.setImageurl(imagen.getImagen());
                repositorioUsuario.save(usuario);
                response.put("success", true);
                return ResponseEntity.ok(response);
            } else {
                System.out.println("no encuenta al usuario por algun motivo");
                response.put("success", false);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception e) {
            System.out.println("exception for any reason");
            response.put("success", false);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

}
