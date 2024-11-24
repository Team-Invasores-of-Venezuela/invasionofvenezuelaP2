package com.example.backend_edunerd.Modelos;
import com.example.backend_edunerd.Dominio.CursoDTO;
import com.example.backend_edunerd.Dominio.CursoDTO2;
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

    public Curso(String id, String carrera, String nombre, int ano, int semestre, char seccion, List<String> alumnos, String profesor) {
        this.id = id;
        this.carrera = carrera;
        this.nombre = nombre;
        this.ano = ano;
        this.semestre = semestre;
        this.seccion = seccion;
        this.alumnos = alumnos;
        this.profesor = profesor;
    }

    public Curso (CursoDTO cursoDTO) {
        this.carrera = cursoDTO.getCarrera();
        this.nombre = cursoDTO.getNombre();
        this.ano = cursoDTO.getAno();
        this.semestre = cursoDTO.getSemestre();
        this.seccion = cursoDTO.getSeccion();
        this.alumnos = cursoDTO.getAlumnos();
        this.profesor = cursoDTO.getProfesor();
    }

    public Curso (CursoDTO2 cursoDTO2) {
        this.id = cursoDTO2.getId();
        this.carrera = cursoDTO2.getCarrera();
        this.nombre = cursoDTO2.getNombre();
        this.ano = cursoDTO2.getAno();
        this.semestre = cursoDTO2.getSemestre();
        this.seccion = cursoDTO2.getSeccion();
        this.alumnos = cursoDTO2.getAlumnos();
        this.profesor = cursoDTO2.getProfesor();
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
