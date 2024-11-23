package com.example.backend_edunerd.Repositorios;

import com.example.backend_edunerd.Modelos.Profesor;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface RepositorioProfesor extends MongoRepository<Profesor, String> {
    boolean existsByNombre(String nombre);

    Optional<Profesor> findById(String id);

    List<Profesor> findAll();

    Optional<Profesor> findByNombre(String nombre);

    boolean existsByRut(String rut);
}
