package com.example.backend_edunerd.Repositorios;

import com.example.backend_edunerd.Modelos.Estudiante;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RepositorioEstudiante extends MongoRepository<Estudiante, String>{
}
