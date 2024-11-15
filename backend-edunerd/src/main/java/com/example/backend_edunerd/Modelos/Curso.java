package com.example.backend_edunerd.Modelos;
import org.bson.types.ObjectId;
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
    private int semestre;
    private int ano;

    public Curso(String titulo, String docente, List<String> aprendizajes, int semestre, int ano) {
        this.titulo = titulo;
        this.docente = docente;
        this.aprendizajes = aprendizajes;
        this.semestre = semestre;
        this.ano = ano;
    }

    public Curso() {
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
