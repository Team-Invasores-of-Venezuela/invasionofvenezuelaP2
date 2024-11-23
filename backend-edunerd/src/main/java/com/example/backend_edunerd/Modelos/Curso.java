package com.example.backend_edunerd.Modelos;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "Cursos")
public class Curso {
    @Id
    private String id;
    private String carrera;
    private String nombre;
    private int ano;
    private int semestre;
    private char seccion;
    private List<String> alumnos;
    private String profesor;




    public Curso() {
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

    public char getSeccion() {
        return seccion;
    }

    public void setSeccion(char seccion) {
        this.seccion = seccion;
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

    public void setAno(int ano) {
        this.ano = ano;
    }
}
