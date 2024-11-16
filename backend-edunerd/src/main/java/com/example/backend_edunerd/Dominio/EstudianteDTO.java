package com.example.backend_edunerd.Dominio;

import com.example.backend_edunerd.Modelos.Estudiante;

public class EstudianteDTO {

    private String nombre;
    private String matricula;
    private int anoIngreso;

    public EstudianteDTO(String nombre, String matricula, int anoIngreso) {
        this.nombre = nombre;
        this.matricula = matricula;
        this.anoIngreso = anoIngreso;
    }

    public EstudianteDTO(Estudiante estudiante) {
        this.nombre = estudiante.getNombre();
        this.matricula = estudiante.getMatricula();
        this.anoIngreso = estudiante.getAnoIngreso();
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
