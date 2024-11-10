package com.example.backend_edunerd.Repositorios;

import com.example.backend_edunerd.Modelos.Profesor;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RepositorioProfesor extends MongoRepository<Profesor, String> {
}
