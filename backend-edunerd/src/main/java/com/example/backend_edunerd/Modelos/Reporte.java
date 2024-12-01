package com.example.backend_edunerd.Modelos;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Reportes")
public class Reporte {
    @Id
    private String id;
    private String matricula;
    private int puntaje;
    private String descripcion;
    private ObjectId cursoId;

    public Reporte(int puntaje, String descripcion,String matricula, ObjectId cursoId) {
        this.puntaje = puntaje;
        this.descripcion = descripcion;
        this.cursoId = cursoId;
        this.matricula = matricula;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getPuntaje() {
        return puntaje;
    }

    public void setPuntaje(int puntaje) {
        this.puntaje = puntaje;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }


    public String getCursoId() {
        return cursoId != null ? cursoId.toHexString() : null;
    }

    public void setCursoId(ObjectId cursoId) {
        this.cursoId = cursoId;
    }


}
