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
        Optional<Profesor> profesor = repositorioProfesor.findByNombre(profesorDTO.getNombre());
        if(!profesor.isPresent()){
            Profesor profesorOpt = new Profesor(profesorDTO.getNombre(), profesorDTO.getCursos());
            repositorioProfesor.save(profesorOpt);
            generarUsuarios(profesorOpt);
            return profesorOpt;
        } else {
            //Si el objeto ya se encuentra en la base de datos.
            return null;
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
            profesor.get().setNombre(profesorDTO2.getNombre());
            profesor.get().setCursos(profesorDTO2.getCursos());
            repositorioProfesor.save(profesor.get());
            return profesor.get();
        } else {
            return null;
        }
    }

    public List<ProfesorDTO2> getProfesores(){
        List<Profesor> profesores = repositorioProfesor.findAll();
        List<ProfesorDTO2> ProfesorDTOS = new ArrayList<>();
        for (Profesor profesor : profesores) {
            //System.out.println(profesor.getId());
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

    public Usuario generarUsuarios(Profesor profesor){
        String nombre = profesor.getNombre();

        String nombreSplit = nombre.toLowerCase().replace(" ", "");

        String email = nombreSplit + "@gmail.com";

        if(!repositorioUsuario.existsByEmail(email)){
            Usuario usuario = new Usuario(false, email, nombreSplit);
            //System.out.println(usuario.toString());
            repositorioUsuario.save(usuario);
            System.out.println("Usuario generado");
            return usuario;
        }
        return null;
    }


}
