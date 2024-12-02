package com.example.backend_edunerd.Modelos;

import com.example.backend_edunerd.Dominio.ProfesorDTO;
import com.example.backend_edunerd.Dominio.ProfesorDTO2;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "Profesores")
public class Profesor {

    @Id
    private String id;
    private String nombre;
    private String apellidoPaterno;
    private String apellidoMaterno;
    private String rut;
    private String titulo;
    private String gradoMax;
    private String imageurl;

    public Profesor() {}

    public Profesor(String id, String nombre, String apellidoPaterno, String apellidoMaterno, String rut, String titulo, String gradoMax,String imageurl) {
        this.id = id;
        this.nombre = nombre;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.rut = rut;
        this.titulo = titulo;
        this.gradoMax = gradoMax;
        this.imageurl = imageurl;
    }

    public Profesor(ProfesorDTO profesorDTO) {
        this.nombre = profesorDTO.getNombre();
        this.apellidoPaterno = profesorDTO.getApellidoPaterno();
        this.apellidoMaterno = profesorDTO.getApellidoMaterno();
        this.rut = profesorDTO.getRut();
        this.titulo = profesorDTO.getTitulo();
        this.gradoMax = profesorDTO.getGradoMax();
    }

    public Profesor(ProfesorDTO2 profesorDTO2) {
        this.id = profesorDTO2.getId();
        this.nombre = profesorDTO2.getNombre();
        this.apellidoPaterno  = profesorDTO2.getApellidoPaterno();
        this.apellidoMaterno = profesorDTO2.getApellidoMaterno();
        this.rut = profesorDTO2.getRut();
        this.titulo = profesorDTO2.getTitulo();
        this.gradoMax = profesorDTO2.getGradoMax();
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


}
