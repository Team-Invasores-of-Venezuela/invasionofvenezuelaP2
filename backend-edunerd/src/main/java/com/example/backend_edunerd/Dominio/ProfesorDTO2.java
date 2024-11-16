package com.example.backend_edunerd.Dominio;

import com.example.backend_edunerd.Modelos.Profesor;

import java.util.List;

public class ProfesorDTO2 {

    private String id;
    private String nombre;
    private List<String> cursos;

    public ProfesorDTO2(String id, String nombre, List<String> cursos) {
        this.id = id;
        this.nombre = nombre;
        this.cursos = cursos;
    }

    public ProfesorDTO2(Profesor profesor) {
        this.id = profesor.getId();
        this.nombre = profesor.getNombre();
        this.cursos = profesor.getCursos();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public List<String> getCursos() {
        return cursos;
    }

    public void setCursos(List<String> cursos) {
        this.cursos = cursos;
    }
}
