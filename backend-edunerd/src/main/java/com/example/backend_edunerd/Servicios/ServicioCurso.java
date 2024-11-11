package com.example.backend_edunerd.Servicios;

import com.example.backend_edunerd.Dominio.CursoDTO2;
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

    public List<CursoDTO2> getCursos(){
        List<Curso> cursos = repositorioCurso.findAll();
        List<CursoDTO2> cursoDTOS = new ArrayList<>();
        //System.out.println(cursos.toString());
        for (Curso curso : cursos) {
            System.out.println(curso.getId().toHexString());
            CursoDTO2 cursoDTO2 = new CursoDTO2(curso);
            cursoDTOS.add(cursoDTO2);
        }
        return cursoDTOS;
    }
}
