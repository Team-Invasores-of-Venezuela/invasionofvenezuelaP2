package com.example.backend_edunerd.Repositorios;

import com.example.backend_edunerd.Modelos.Reporte;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RepositorioReporte extends MongoRepository<Reporte, String> {

}
