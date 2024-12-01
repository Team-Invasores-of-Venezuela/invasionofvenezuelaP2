package com.example.backend_edunerd.Servicios;

import com.example.backend_edunerd.Dominio.ReporteDTO;
import com.example.backend_edunerd.Modelos.Reporte;
import com.example.backend_edunerd.Repositorios.RepositorioCurso;
import com.example.backend_edunerd.Repositorios.RepositorioEstudiante;
import com.example.backend_edunerd.Repositorios.RepositorioProfesor;
import com.example.backend_edunerd.Repositorios.RepositorioReporte;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
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

    public Optional<Reporte>  guardarReporte(ReporteDTO reporte){
            ObjectId cursoid= new ObjectId(reporte.getCursoId());
            Reporte reportemongo = new Reporte(reporte.getPuntaje(), reporte.getDescripcion(),reporte.getMatricula(),cursoid) ;
            if(repositorioCurso.existsById(reporte.getCursoId()) && repositorioEstudiante.existsByMatricula(reporte.getMatricula())) {
                repositorioReporte.save(reportemongo);
                return Optional.of(reportemongo);
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
