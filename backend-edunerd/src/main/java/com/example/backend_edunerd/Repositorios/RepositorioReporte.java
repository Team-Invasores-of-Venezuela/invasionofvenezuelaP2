package com.example.backend_edunerd.Repositorios;

import com.example.backend_edunerd.Modelos.Reporte;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface RepositorioReporte extends MongoRepository<Reporte, String> {
    List<Reporte> findAllByMatricula(String matricula);
}
