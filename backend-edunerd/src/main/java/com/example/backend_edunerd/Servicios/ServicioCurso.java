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
        Curso newCurso = new Curso(cursoDTO);

        if(exists(newCurso)) {
            return null;
        } else {
            repositorioCurso.save(newCurso);
            return newCurso;
        }
    }

    public Curso getCurso(String id){
        Optional<Curso> curso = repositorioCurso.findById(id);
        return curso.orElse(null);
    }

    @Transactional
    public Curso updateCurso(CursoDTO2 cursoDTO2){
        Optional<Curso> curso = repositorioCurso.findById(cursoDTO2.getId());
        System.out.println("Encontrado");
        if(curso.isPresent()){
            repositorioCurso.delete(curso.get());
            System.out.println("Eliminado");
            if(cursoDTO2.getSemestre() == 1 | cursoDTO2.getSemestre() == 2){
                System.out.println("Semestre valido");
                if(exists(new Curso(cursoDTO2))) {
                    repositorioCurso.save(curso.get());
                    System.out.println("Curso Repetido");
                    return null;
                } else {
                    Curso newCurso = new Curso(cursoDTO2);
                    repositorioCurso.save(newCurso);
                    return newCurso;
                }
            } else {
                System.out.println("Semestre no valido");
                return null;
            }
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

    public boolean exists(Curso curso){
        List<Curso> cursos = repositorioCurso.findAll();

        for (Curso curso1 : cursos) {
            if(curso1.getNombre().equals(curso.getNombre()) && curso1.getAno() == curso.getAno() && curso1.getSemestre() == curso.getSemestre()){
                return true;
            }
        }
        return false;
    }
}
