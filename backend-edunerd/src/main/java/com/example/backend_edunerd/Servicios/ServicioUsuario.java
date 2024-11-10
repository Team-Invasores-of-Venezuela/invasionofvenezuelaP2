package com.example.backend_edunerd.Servicios;

import com.example.backend_edunerd.Modelos.Usuario;
import com.example.backend_edunerd.Repositorios.RepositorioUsuario;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
public class ServicioUsuario {

    @Autowired
    private RepositorioUsuario repositorioUsuario;

    public Optional<Usuario> login(String email, String pass) {
        Optional<Usuario> usuario = repositorioUsuario.findByEmail(email);

        if (usuario.isPresent()) {
            if(Objects.equals(pass, usuario.get().getContrasena())) {
                return usuario;
            }
            else {
                return Optional.empty();
            }
        }
        return Optional.empty();
    }
}
