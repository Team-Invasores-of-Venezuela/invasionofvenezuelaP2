package com.example.backend_edunerd.Dominio;

import com.example.backend_edunerd.Modelos.Estudiante;

public class EstudianteDTO2 {

    private String id;
    private String nombre;
    private String matricula;
    private int anoIngreso;

    public EstudianteDTO2(String id, String nombre, String matricula, int anoIngreso) {
        this.id = id;
        this.nombre = nombre;
        this.matricula = matricula;
        this.anoIngreso = anoIngreso;
    }

    /*
    public EstudianteDTO2(Estudiante estudiante) {
        this.id = estudiante.getId();
        this.nombre = estudiante.getNombre();
        this.matricula = estudiante.getMatricula();
        this.anoIngreso = estudiante.getAnoIngreso();
    }

     */

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
