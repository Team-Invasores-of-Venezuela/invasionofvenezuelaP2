package com.example.backend_edunerd.Modelos;

import com.example.backend_edunerd.Dominio.EstudianteDTO;
import com.example.backend_edunerd.Dominio.EstudianteDTO2;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Estudiantes")
public class Estudiante {
    @Id
    private String id;
    private String nombre;
    private String apellidoPaterno;
    private String apellidoMaterno;
    private String rut;
    private String matricula;
    private String fechaNacimiento;
    private String fechaIngreso;
    private String urlfoto;

    public Estudiante() {}

    public Estudiante(String id, String nombre, String apellidoPaterno, String apellidoMaterno, String rut, String matricula, String fechaNacimiento, String fechaIngreso, String urlfoto) {
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

    public Estudiante (EstudianteDTO estudianteDTO) {
        this.nombre = estudianteDTO.getNombre();
        this.apellidoPaterno = estudianteDTO.getApellidoPaterno();
        this.apellidoMaterno = estudianteDTO.getApellidoMaterno();
        this.rut = estudianteDTO.getRut();
        this.matricula = estudianteDTO.getMatricula();
        this.fechaNacimiento = estudianteDTO.getFechaNacimiento();
        this.fechaIngreso = estudianteDTO.getFechaIngreso();
        this.urlfoto = estudianteDTO.getUrlfoto();
    }

    public Estudiante (EstudianteDTO2 estudianteDTO2) {
        this.id = estudianteDTO2.getId();
        this.nombre = estudianteDTO2.getNombre();
        this.apellidoPaterno = estudianteDTO2.getApellidoPaterno();
        this.apellidoMaterno = estudianteDTO2.getApellidoMaterno();
        this.rut = estudianteDTO2.getRut();
        this.matricula = estudianteDTO2.getMatricula();
        this.fechaNacimiento = estudianteDTO2.getFechaNacimiento();
        this.fechaIngreso = estudianteDTO2.getFechaIngreso();
        this.urlfoto = estudianteDTO2.getUrlfoto();
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


}
