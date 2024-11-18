package com.example.backend_edunerd.Dominio;

import java.util.List;

public class ProfesorDTO {


    private String nombre;
    private List<String> cursos;

    public ProfesorDTO(String nombre, List<String> cursos) {
        this.nombre = nombre;
        this.cursos = cursos;
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
