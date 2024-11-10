package com.example.backend_edunerd.Servicios;

import com.example.backend_edunerd.Modelos.Curso;
import com.example.backend_edunerd.Repositorios.RepositorioCurso;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ServicioCurso {

    @Autowired
    private RepositorioCurso repositorioCurso;

    public List<Curso> getCursos(){
        List<Curso> cursos = new ArrayList<>();
        cursos = repositorioCurso.findAll();
        //System.out.println(cursos.toString());
        for (Curso curso : cursos) {
            System.out.println(curso.getAprendizajes().toString());
        }
        return cursos;
    }
}
