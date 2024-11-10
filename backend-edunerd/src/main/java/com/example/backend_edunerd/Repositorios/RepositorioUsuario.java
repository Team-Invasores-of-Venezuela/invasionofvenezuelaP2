package com.example.backend_edunerd.Repositorios;

import com.example.backend_edunerd.Modelos.Usuario;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RepositorioUsuario extends MongoRepository<Usuario, String> {
}
