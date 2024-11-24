package com.example.backend_edunerd.Dominio;

import java.util.List;

public class CursoDTO {


    private String carrera;
    private String nombre;
    private int ano;
    private int semestre;
    private char seccion;
    private List<String> alumnos;
    private String profesor;

    public CursoDTO(String carrera, String nombre, int ano, int semestre, char seccion, List<String> alumnos, String profesor) {
        this.carrera = carrera;
        this.nombre = nombre;
        this.ano = ano;
        this.semestre = semestre;
        this.seccion = seccion;
        this.alumnos = alumnos;
        this.profesor = profesor;
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
