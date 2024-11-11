package com.example.backend_edunerd.Repositorios;

import com.example.backend_edunerd.Modelos.Usuario;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RepositorioUsuario extends MongoRepository<Usuario, String> {
    Optional<Usuario> findByEmail(String email);
}
