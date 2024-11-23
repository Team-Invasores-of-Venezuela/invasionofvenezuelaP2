package com.example.backend_edunerd.Repositorios;

import com.example.backend_edunerd.Modelos.Estudiante;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface RepositorioEstudiante extends MongoRepository<Estudiante, String>{
}
