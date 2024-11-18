package com.example.backend_edunerd.Repositorios;

import com.example.backend_edunerd.Modelos.Estudiante;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface RepositorioEstudiante extends MongoRepository<Estudiante, String>{
    List<Estudiante> findAll();

    Optional<Estudiante> findByNombre(String nombre);

    Optional<Estudiante> findById(String id);

    boolean existsByMatricula(String matricula);

    Optional<Estudiante> findByMatricula(String matricula);
}
