package com.example.backend_edunerd.Dominio;

import com.example.backend_edunerd.Modelos.Curso;

import java.util.List;

public class CursoDTO2 {

    private String id;
    private String carrera;
    private String nombre;
    private int ano;
    private int semestre;
    private char seccion;
    private List<String> alumnos;
    private String profesor;

    public CursoDTO2(String id, String carrera, String nombre, int ano, int semestre, char seccion, List<String> alumnos, String profesor) {
        this.id = id;
        this.carrera = carrera;
        this.nombre = nombre;
        this.ano = ano;
        this.semestre = semestre;
        this.seccion = seccion;
        this.alumnos = alumnos;
        this.profesor = profesor;
    }

    public CursoDTO2(Curso curso) {
        this.id = curso.getId();
        this.carrera = curso.getCarrera();
        this.nombre = curso.getNombre();
        this.ano = curso.getAno();
        this.semestre = curso.getSemestre();
        this.seccion = curso.getSeccion();
        this.alumnos = curso.getAlumnos();
        this.profesor = curso.getProfesor();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCarrera() {
        return carrera;
    }

    public void setCarrera(String carrera) {
        this.carrera = carrera;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getAno() {
        return ano;
    }

    public void setAno(int ano) {
        this.ano = ano;
    }

    public int getSemestre() {
        return semestre;
    }

    public void setSemestre(int semestre) {
        this.semestre = semestre;
    }

    public char getSeccion() {
        return seccion;
    }

    public void setSeccion(char seccion) {
        this.seccion = seccion;
    }

    public List<String> getAlumnos() {
        return alumnos;
    }

    public void setAlumnos(List<String> alumnos) {
        this.alumnos = alumnos;
    }

    public String getProfesor() {
        return profesor;
    }

    public void setProfesor(String profesor) {
        this.profesor = profesor;
    }
}
