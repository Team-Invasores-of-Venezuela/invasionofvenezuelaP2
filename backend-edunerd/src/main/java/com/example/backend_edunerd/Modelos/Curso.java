package com.example.backend_edunerd.Modelos;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "Cursos")
public class Curso {

    @Id
    private String id;

    private String titulo;
    private String docente;
    private List<String> aprendizajes;
    private String semestre;
    private String ano;

    public Curso(String id, String titulo, String docente, List<String> aprendizajes, String semestre, String ano) {
        this.id = id;
        this.titulo = titulo;
        this.docente = docente;
        this.aprendizajes = aprendizajes;
        this.semestre = semestre;
        this.ano = ano;
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

    public String getSemestre() {
        return semestre;
    }

    public void setSemestre(String semestre) {
        this.semestre = semestre;
    }

    public String getAno() {
        return ano;
    }

    public void setAno(String ano) {
        this.ano = ano;
    }
}
