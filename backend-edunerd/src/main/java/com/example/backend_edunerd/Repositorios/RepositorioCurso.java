package com.example.backend_edunerd.Repositorios;

import com.example.backend_edunerd.Modelos.Curso;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RepositorioCurso extends MongoRepository<Curso, ObjectId> { ;

    boolean existsByTitulo(String titulo);

    Optional<Curso> findByTitulo(String titulo);
}
