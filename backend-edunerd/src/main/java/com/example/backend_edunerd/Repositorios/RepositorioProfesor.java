package com.example.backend_edunerd.Repositorios;

import com.example.backend_edunerd.Modelos.Profesor;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface RepositorioProfesor extends MongoRepository<Profesor, String> {
    Optional<Profesor> findById(String id);

    List<Profesor> findAll();

    Optional<Profesor> findByRut(String rut);

    boolean existsByRut(String rut);
}
