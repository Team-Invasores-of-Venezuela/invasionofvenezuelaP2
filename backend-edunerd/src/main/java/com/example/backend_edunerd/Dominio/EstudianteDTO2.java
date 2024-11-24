package com.example.backend_edunerd.Dominio;

import com.example.backend_edunerd.Modelos.Estudiante;

public class EstudianteDTO2 {

    private String id;
    private String nombre;
    private String apellidoPaterno;
    private String apellidoMaterno;
    private String rut;
    private String matricula;
    private String fechaNacimiento;
    private String fechaIngreso;
    private String urlfoto;

    public EstudianteDTO2(String id, String nombre, String apellidoPaterno, String apellidoMaterno, String rut, String matricula, String fechaNacimiento, String fechaIngreso, String urlfoto) {
        this.id = id;
        this.nombre = nombre;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.rut = rut;
        this.matricula = matricula;
        this.fechaNacimiento = fechaNacimiento;
        this.fechaIngreso = fechaIngreso;
        this.urlfoto = urlfoto;
    }

    public EstudianteDTO2(Estudiante estudiante) {
        this.id = estudiante.getId();
        this.nombre = estudiante.getNombre();
        this.apellidoPaterno = estudiante.getApellidoPaterno();
        this.apellidoMaterno = estudiante.getApellidoMaterno();
        this.rut = estudiante.getRut();
        this.matricula = estudiante.getMatricula();
        this.fechaNacimiento = estudiante.getFechaNacimiento();
        this.fechaIngreso = estudiante.getFechaIngreso();
        this.urlfoto = estudiante.getUrlfoto();
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

    public String getApellidoPaterno() {
        return apellidoPaterno;
    }

    public void setApellidoPaterno(String apellidoPaterno) {
        this.apellidoPaterno = apellidoPaterno;
    }

    public String getApellidoMaterno() {
        return apellidoMaterno;
    }

    public void setApellidoMaterno(String apellidoMaterno) {
        this.apellidoMaterno = apellidoMaterno;
    }

    public String getRut() {
        return rut;
    }

    public void setRut(String rut) {
        this.rut = rut;
    }

    public String getMatricula() {
        return matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    public String getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(String fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getFechaIngreso() {
        return fechaIngreso;
    }

    public void setFechaIngreso(String fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
    }

    public String getUrlfoto() {
        return urlfoto;
    }

    public void setUrlfoto(String urlfoto) {
        this.urlfoto = urlfoto;
    }
}
