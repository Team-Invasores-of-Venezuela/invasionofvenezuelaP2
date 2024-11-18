package com.example.backend_edunerd.Servicios;

import com.example.backend_edunerd.Dominio.EstudianteDTO;
import com.example.backend_edunerd.Dominio.EstudianteDTO2;
import com.example.backend_edunerd.Modelos.Estudiante;
import com.example.backend_edunerd.Repositorios.RepositorioEstudiante;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ServicioEstudiante {

    @Autowired
    private RepositorioEstudiante repositorioEstudiante;

    @Transactional
    public Estudiante createEstudiante(EstudianteDTO estudianteDTO) {
        Optional<Estudiante> estudiante = repositorioEstudiante.findByMatricula(estudianteDTO.getMatricula());
        if (!estudiante.isPresent()) {
            Estudiante estudianteOpt = new Estudiante(estudianteDTO.getNombre(), estudianteDTO.getMatricula(), estudianteDTO.getAnoIngreso());
            repositorioEstudiante.save(estudianteOpt);
            return estudianteOpt;
        } else {
            return null;
        }
    }

    public Estudiante getEstudiante(String id) {
        Optional<Estudiante> estudiante = repositorioEstudiante.findById(id);
        return estudiante.orElse(null);
    }

    @Transactional
    public Estudiante updateEstudiante(EstudianteDTO2 estudianteDTO2) {
        Optional<Estudiante> estudiante = repositorioEstudiante.findById(estudianteDTO2.getId());
        if (estudiante.isPresent()) {
            repositorioEstudiante.delete(estudiante.get());
            if(!repositorioEstudiante.existsByMatricula(estudianteDTO2.getMatricula())) {
                estudiante.get().setId(estudianteDTO2.getId());
                estudiante.get().setNombre(estudianteDTO2.getNombre());
                estudiante.get().setMatricula(estudianteDTO2.getMatricula());
                estudiante.get().setAnoIngreso(estudianteDTO2.getAnoIngreso());
                repositorioEstudiante.save(estudiante.get());
                return estudiante.get();
            } else {
                repositorioEstudiante.save(estudiante.get());
                System.out.println("Estudiante Repetido");
                return null;
            }
        } else {
            return null;
        }
    }

    public List<EstudianteDTO2> getEstudiantes(){
        List<Estudiante> estudiantes = repositorioEstudiante.findAll();
        List<EstudianteDTO2> estudianteDTOS = new ArrayList<>();
        for (Estudiante estudiante : estudiantes) {
            EstudianteDTO2 estudianteDTO2 = new EstudianteDTO2(estudiante);
            estudianteDTOS.add(estudianteDTO2);
        }
        return estudianteDTOS;
    }

    @Transactional
    public Estudiante deleteEstudiante(String id) {
        Optional<Estudiante> estudiante = repositorioEstudiante.findById(id);
        if (estudiante.isPresent()) {
            Estudiante estudianteOpt = estudiante.get();
            repositorioEstudiante.delete(estudianteOpt);
            return estudianteOpt;
        } else {
            return null;
        }
    }
}
