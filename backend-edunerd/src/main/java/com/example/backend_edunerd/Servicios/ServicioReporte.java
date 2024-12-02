package com.example.backend_edunerd.Servicios;

import com.example.backend_edunerd.Dominio.ReporteDTO;
import com.example.backend_edunerd.Modelos.Estudiante;
import com.example.backend_edunerd.Modelos.Reporte;
import com.example.backend_edunerd.Repositorios.RepositorioCurso;
import com.example.backend_edunerd.Repositorios.RepositorioEstudiante;
import com.example.backend_edunerd.Repositorios.RepositorioProfesor;
import com.example.backend_edunerd.Repositorios.RepositorioReporte;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.security.PrivateKey;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ServicioReporte {
    @Autowired
    private RepositorioReporte repositorioReporte;
    @Autowired
    private RepositorioCurso repositorioCurso;
    @Autowired
    private RepositorioEstudiante repositorioEstudiante;
    @Autowired
    private MongoTemplate mongoTemplate;

    public Optional<Reporte>  guardarReporte(ReporteDTO reporte) {
        ObjectId cursoid = new ObjectId(reporte.getCursoId());
        Reporte reportemongo = new Reporte(reporte.getPuntaje(), reporte.getDescripcion(), reporte.getMatricula(), cursoid);

        if (repositorioCurso.existsById(reporte.getCursoId()) && repositorioEstudiante.existsByMatricula(reporte.getMatricula())) {
            // Verificar la consulta
            System.out.println("Buscando estudiante con matrícula: " + reporte.getMatricula());
            Query query = new Query(Criteria.where("matricula").is(reporte.getMatricula()));
            Estudiante estudiante = mongoTemplate.findOne(query, Estudiante.class);

            if (estudiante != null) {
                System.out.println("Estudiante encontrado: " + estudiante);
                if (reporte.getPuntaje() >= 0) {
                    estudiante.setContadorPositvo(estudiante.getContadorPositvo() + reporte.getPuntaje());
                } else {
                    estudiante.setContadorNegativo(estudiante.getContadorNegativo() + Math.abs(reporte.getPuntaje()));
                }

                mongoTemplate.save(estudiante);
                repositorioReporte.save(reportemongo);
                return Optional.of(reportemongo);
            } else {
                System.out.println("No se encontró ningún estudiante con la matrícula proporcionada.");
            }
        } else {
            System.out.println("El curso o el estudiante no existen en la base de datos.");
        }

        return Optional.empty();
    }

    public List<ReporteDTO> getReportes(){
        List<ReporteDTO> reportesDTO = new ArrayList<>();
        List<Reporte> reportes = repositorioReporte.findAll();
        for (Reporte reporte : reportes) {
            ReporteDTO reporteDTO = new ReporteDTO(reporte);
            reportesDTO.add(reporteDTO);
        }
        return reportesDTO;
    }

    public List<ReporteDTO> getReporte(String matricula){
        List<ReporteDTO> reportesDTO = new ArrayList<>();
        List<Reporte> reportes = repositorioReporte.findAllByMatricula(matricula);
        for (Reporte reporte : reportes) {
            ReporteDTO reporteDTO = new ReporteDTO(reporte);
            reportesDTO.add(reporteDTO);
        }
        return reportesDTO;
    }
}
