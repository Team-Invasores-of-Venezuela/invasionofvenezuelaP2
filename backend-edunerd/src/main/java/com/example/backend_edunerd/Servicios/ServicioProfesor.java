package com.example.backend_edunerd.Servicios;

import com.example.backend_edunerd.Dominio.CursoDTO2;
import com.example.backend_edunerd.Dominio.ProfesorDTO;
import com.example.backend_edunerd.Dominio.ProfesorDTO2;
import com.example.backend_edunerd.Modelos.Curso;
import com.example.backend_edunerd.Modelos.Profesor;
import com.example.backend_edunerd.Modelos.Usuario;
import com.example.backend_edunerd.Repositorios.RepositorioProfesor;
import com.example.backend_edunerd.Repositorios.RepositorioUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ServicioProfesor {

    @Autowired
    private RepositorioProfesor repositorioProfesor;
    @Autowired
    private RepositorioUsuario repositorioUsuario;

    @Transactional
    public Profesor createProfesor(ProfesorDTO profesorDTO){
        Profesor newProfesor = new Profesor(profesorDTO);
        if(exists(newProfesor)) {
            return null;
        }
        else {
            repositorioProfesor.save(newProfesor);
            return newProfesor;
        }
    }

    public Profesor getProfesor(String id){
        Optional<Profesor> profesor = repositorioProfesor.findById(id);
        return profesor.orElse(null);
    }

    @Transactional
    public Profesor updateProfesor(ProfesorDTO2 profesorDTO2){
        Optional<Profesor> profesor = repositorioProfesor.findById(profesorDTO2.getId());
        if(profesor.isPresent()){
            repositorioProfesor.delete(profesor.get());
            if(exists(new Profesor(profesorDTO2))) {
                repositorioProfesor.save(profesor.get());
                System.out.println("Profesor Repetido");
                return null;
            } else {
                Profesor newProfesor = new Profesor(profesorDTO2);
                repositorioProfesor.save(newProfesor);
                return newProfesor;
            }
        } else {
            return null;
        }
    }

    public List<ProfesorDTO2> getProfesores(){
        List<Profesor> profesores = repositorioProfesor.findAll();
        List<ProfesorDTO2> ProfesorDTOS = new ArrayList<>();
        for (Profesor profesor : profesores) {
            ProfesorDTO2 profesorDTO2 = new ProfesorDTO2(profesor);
            ProfesorDTOS.add(profesorDTO2);
        }
        return ProfesorDTOS;
    }

    @Transactional
    public Profesor deleteProfesor(String id){
        Optional<Profesor> profesor = repositorioProfesor.findById(id);
        if(profesor.isPresent()){
            Profesor profesorOpt = profesor.get();
            repositorioProfesor.delete(profesorOpt);
            return profesorOpt;
        } else {
            return null;
        }
    }

    public boolean exists (Profesor profesor){
        Optional<Profesor> profesorOpt = repositorioProfesor.findByRut(profesor.getRut());
        if(profesorOpt.isPresent()){
            return true;
        }
        return false;
    }

}
