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
        Estudiante newEstudiante = new Estudiante(estudianteDTO);
        if(exists(newEstudiante)) {
            return null;
        }
        else {
            repositorioEstudiante.save(newEstudiante);
            return newEstudiante;
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
            if(exists(new Estudiante(estudianteDTO2))) {
                repositorioEstudiante.save(estudiante.get());
                System.out.println("Estudiante Repetido");
                return null;
            } else {
                Estudiante newEstudiante = new Estudiante(estudianteDTO2);
                repositorioEstudiante.save(newEstudiante);
                return newEstudiante;
            }
        } else {
            return null;
        }
    }

    public List<EstudianteDTO2> getEstudiantes(){
        List<Estudiante> estudiantes = repositorioEstudiante.findAll();
        List<EstudianteDTO2> estudianteDTOS = new ArrayList<>();
        for (Estudiante estudiante : estudiantes) {
            //System.out.println(estudiante.getFechaIngreso());
            //System.out.println(estudiante.getFechaNacimiento());
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

    public boolean exists(Estudiante estudiante) {
        Optional<Estudiante> estudianteOpt = repositorioEstudiante.findByRut(estudiante.getRut());
        if (estudianteOpt.isPresent()) {
            return true;
        }
        return false;
    }

}
