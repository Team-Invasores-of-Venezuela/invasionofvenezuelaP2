package com.example.backend_edunerd.Dominio;

import com.example.backend_edunerd.Modelos.Profesor;

import java.util.List;

public class ProfesorDTO2 {

    private String id;
    private String nombre;
    private String apellidoPaterno;
    private String apellidoMaterno;
    private String rut;
    private String titulo;
    private String gradoMax;

    public ProfesorDTO2(String id, String nombre, String apellidoPaterno, String apellidoMaterno, String rut, String titulo, String gradoMax) {
        this.id = id;
        this.nombre = nombre;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.rut = rut;
        this.titulo = titulo;
        this.gradoMax = gradoMax;
    }

    public ProfesorDTO2(Profesor profesor) {
        this.id = profesor.getId();
        this.nombre = profesor.getNombre();
        this.apellidoPaterno = profesor.getApellidoPaterno();
        this.apellidoMaterno = profesor.getApellidoMaterno();
        this.rut = profesor.getRut();
        this.titulo = profesor.getTitulo();
        this.gradoMax = profesor.getGradoMax();
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

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getGradoMax() {
        return gradoMax;
    }

    public void setGradoMax(String gradoMax) {
        this.gradoMax = gradoMax;
    }
}
