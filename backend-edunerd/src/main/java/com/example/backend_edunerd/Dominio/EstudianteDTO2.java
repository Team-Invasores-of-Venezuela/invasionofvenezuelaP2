package com.example.backend_edunerd.Dominio;

import com.example.backend_edunerd.Modelos.Estudiante;

import java.time.LocalDate;

public class EstudianteDTO2 {

    private String id;
    private String nombre;
    private String apellidoPaterno;
    private String apellidoMaterno;
    private String rut;
    private String matricula;
    private LocalDate fechaNacimiento;
    private LocalDate fechaIngreso;
    private String urlfoto;
    private int contadorPositivo;
    private int contadorNegativo;

    public EstudianteDTO2(String id, String nombre, String apellidoPaterno, String apellidoMaterno, String rut, String matricula, LocalDate fechaNacimiento, LocalDate fechaIngreso, String urlfoto, int contadorPositivo, int contadorNegativo) {
        this.id = id;
        this.nombre = nombre;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.rut = rut;
        this.matricula = matricula;
        this.fechaNacimiento = fechaNacimiento;
        this.fechaIngreso = fechaIngreso;
        this.urlfoto = urlfoto;
        this.contadorPositivo = contadorPositivo;
        this.contadorNegativo = contadorNegativo;
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
        this.contadorPositivo = estudiante.getContadorPositvo();
        this.contadorNegativo = estudiante.getContadorNegativo();
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

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public LocalDate getFechaIngreso() {
        return fechaIngreso;
    }

    public void setFechaIngreso(LocalDate fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
    }

    public String getUrlfoto() {
        return urlfoto;
    }

    public void setUrlfoto(String urlfoto) {
        this.urlfoto = urlfoto;
    }

    public int getContadorPositivo() {
        return contadorPositivo;
    }

    public void setContadorPositivo(int contadorPositivo) {
        this.contadorPositivo = contadorPositivo;
    }

    public int getContadorNegativo() {
        return contadorNegativo;
    }

    public void setContadorNegativo(int contadorNegativo) {
        this.contadorNegativo = contadorNegativo;
    }
}
