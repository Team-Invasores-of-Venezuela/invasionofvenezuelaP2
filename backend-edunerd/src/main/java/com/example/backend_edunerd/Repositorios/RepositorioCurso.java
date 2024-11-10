package com.example.backend_edunerd.Repositorios;

import com.example.backend_edunerd.Modelos.Curso;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface RepositorioCurso extends MongoRepository<Curso, String> {
    List<Curso> findAll();
}
