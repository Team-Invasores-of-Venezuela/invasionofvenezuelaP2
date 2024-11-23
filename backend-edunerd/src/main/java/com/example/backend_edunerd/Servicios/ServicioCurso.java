package com.example.backend_edunerd.Servicios;

import com.example.backend_edunerd.Dominio.CursoDTO;
import com.example.backend_edunerd.Dominio.CursoDTO2;
import com.example.backend_edunerd.Modelos.Curso;
import com.example.backend_edunerd.Repositorios.RepositorioCurso;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ServicioCurso {

    @Autowired
    private RepositorioCurso repositorioCurso;

    /*
    public List<CursoDTO2> getCursos(){
        List<Curso> cursos = repositorioCurso.findAll();
        List<CursoDTO2> cursoDTOS = new ArrayList<>();
        //System.out.println(cursos.toString());
        for (Curso curso : cursos) {
            //System.out.println(curso.getId().toHexString());
            CursoDTO2 cursoDTO2 = new CursoDTO2(curso);
            cursoDTOS.add(cursoDTO2);
        }
        return cursoDTOS;
    }


    @Transactional
    public Curso createCurso(CursoDTO cursoDTO){
        Optional<Curso> curso = repositorioCurso.findByTitulo(cursoDTO.getTitulo());
        if(!curso.isPresent()){
            Curso cursoOpt = new Curso(cursoDTO.getTitulo(), cursoDTO.getDocente(), cursoDTO.getAprendizajes(), cursoDTO.getSemestre(), cursoDTO.getAno());
            repositorioCurso.save(cursoOpt);
            return cursoOpt;
        } else {
            //Si el objeto ya se encuentra en la base de datos.
            return null;
        }
    }

    public Curso getCurso(String id){
        Optional<Curso> curso = repositorioCurso.findById(id);
        return curso.orElse(null);
    }

    @Transactional
    public Curso updateCurso(CursoDTO2 cursoDTO2){
        Optional<Curso> curso = repositorioCurso.findById(cursoDTO2.getId());
        if(curso.isPresent()){
            if(!repositorioCurso.existsByTitulo(cursoDTO2.getTitulo())){
                if(cursoDTO2.getSemestre() == 1 | cursoDTO2.getSemestre() == 2) {
                    curso.get().setTitulo(cursoDTO2.getTitulo());
                    curso.get().setDocente(cursoDTO2.getDocente());
                    curso.get().setAprendizajes(cursoDTO2.getAprendizajes());
                    curso.get().setSemestre(cursoDTO2.getSemestre());
                    curso.get().setAno(cursoDTO2.getAno());
                    repositorioCurso.save(curso.get());
                    return curso.get();
                } else {
                    System.out.println("Semestre no valido");
                    return null;
                }
            }
            System.out.println("Curso repetido");
            return null;
        } else {
            return null;
        }
    }

    @Transactional
    public Curso deleteCurso(String id){
        Optional<Curso> curso = repositorioCurso.findById(id);
        if(curso.isPresent()){
            Curso cursoOpt = curso.get();
            repositorioCurso.delete(cursoOpt);
            return cursoOpt;
        } else {
            return null;
        }
    }
    */
}
