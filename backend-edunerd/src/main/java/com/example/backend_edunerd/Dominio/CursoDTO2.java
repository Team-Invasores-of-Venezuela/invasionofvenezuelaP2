package com.example.backend_edunerd.Dominio;

import com.example.backend_edunerd.Modelos.Curso;

import java.util.List;

public class CursoDTO2 {
    private String id;
    private String titulo;
    private String docente;
    private List<String> aprendizajes;
    private int semestre;
    private int ano;

    public CursoDTO2(String id, String titulo, String docente, List<String> aprendizajes, int semestre, int ano) {
        this.id = id;
        this.titulo = titulo;
        this.docente = docente;
        this.aprendizajes = aprendizajes;
        this.semestre = semestre;
        this.ano = ano;
    }

    public CursoDTO2(Curso curso) {
        this.id = curso.getId().toHexString();
        this.titulo = curso.getTitulo();
        this.docente = curso.getDocente();
        this.aprendizajes = curso.getAprendizajes();
        this.semestre = curso.getSemestre();
        this.ano = curso.getAno();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDocente() {
        return docente;
    }

    public void setDocente(String docente) {
        this.docente = docente;
    }

    public List<String> getAprendizajes() {
        return aprendizajes;
    }

    public void setAprendizajes(List<String> aprendizajes) {
        this.aprendizajes = aprendizajes;
    }

    public int getSemestre() {
        return semestre;
    }

    public void setSemestre(int semestre) {
        this.semestre = semestre;
    }

    public int getAno() {
        return ano;
    }

    public void setAno(int ano) {
        this.ano = ano;
    }
}
