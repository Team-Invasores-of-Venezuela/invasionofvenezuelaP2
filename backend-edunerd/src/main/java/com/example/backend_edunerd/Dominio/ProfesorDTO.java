package com.example.backend_edunerd.Dominio;

import java.util.List;

public class ProfesorDTO {


    private String nombre;
    private String apellidoPaterno;
    private String apellidoMaterno;
    private String rut;
    private String titulo;
    private String gradoMax;

    public ProfesorDTO(String nombre, String apellidoPaterno, String apellidoMaterno, String rut, String titulo, String gradoMax) {
        this.nombre = nombre;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.rut = rut;
        this.titulo = titulo;
        this.gradoMax = gradoMax;
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
