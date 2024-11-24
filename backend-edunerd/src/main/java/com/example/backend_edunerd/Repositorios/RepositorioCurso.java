package com.example.backend_edunerd.Repositorios;

import com.example.backend_edunerd.Modelos.Curso;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface RepositorioCurso extends MongoRepository<Curso, String> {
    Optional<Curso> findByNombre(String nombre);

    Optional<Curso> findByAno(int ano);

    Optional<Curso> findBySemestre(int semestre);

    Optional<Curso> findById(String id);

    List<Curso> findAll();
}

