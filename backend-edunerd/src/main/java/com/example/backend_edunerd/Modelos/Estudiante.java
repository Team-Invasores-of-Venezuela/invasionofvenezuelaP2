package com.example.backend_edunerd.Modelos;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Estudiantes")
public class Estudiante {
    @Id
    private String id;
    private String nombre;
    private String matricula;
    private int anoIngreso;

    public Estudiante() {}

    public Estudiante(String nombre, String matricula, int anoIngreso) {
        this.nombre = nombre;
        this.matricula = matricula;
        this.anoIngreso = anoIngreso;
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

    public String getMatricula() {
        return matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    public int getAnoIngreso() {
        return anoIngreso;
    }

    public void setAnoIngreso(int anoIngreso) {
        this.anoIngreso = anoIngreso;
    }
}
