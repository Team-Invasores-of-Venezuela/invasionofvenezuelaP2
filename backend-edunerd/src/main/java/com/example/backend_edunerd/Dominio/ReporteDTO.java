package com.example.backend_edunerd.Dominio;

import com.example.backend_edunerd.Modelos.Reporte;
import org.bson.types.ObjectId;

public class ReporteDTO {
    private String matricula;
    private Integer puntaje;
    private String descripcion;
    private String cursoId;

    public ReporteDTO(Integer puntaje, String descripcion,String matricula, String cursoId) {
        this.puntaje = puntaje;
        this.descripcion = descripcion;
        this.cursoId = cursoId;
        this.matricula = matricula;
    }

    public ReporteDTO(Reporte reporte) {
        this.matricula = reporte.getMatricula();
        this.puntaje = reporte.getPuntaje();
        this.descripcion = reporte.getDescripcion();
        this.cursoId = reporte.getCursoId();
    }


    public void setPuntaje(Integer puntaje) {
        this.puntaje = puntaje;
    }

    public String getCursoId() {
        return cursoId;
    }

    public void setCursoId(String cursoId) {
        this.cursoId = cursoId;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public int getPuntaje() {
        return puntaje;
    }

    public void setPuntaje(int puntaje) {
        this.puntaje = puntaje;
    }

    public String getMatricula() {
        return matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    @Override
    public String toString() {
        return "ReporteDTO{" +
                "matricula='" + matricula + '\'' +
                ", puntaje=" + puntaje +
                ", descripcion='" + descripcion + '\'' +
                ", cursoId=" + cursoId +
                '}';
    }
}
