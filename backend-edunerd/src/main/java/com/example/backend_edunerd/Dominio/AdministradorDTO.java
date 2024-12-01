package com.example.backend_edunerd.Dominio;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

public class AdministradorDTO {
    @Id
    private String id;
    private String email;
    private String contrasena;
    private boolean admin;
    private String rut;
    private String imageurl;

    public AdministradorDTO() {}

   public AdministradorDTO(String email, String contrasena, boolean admin, String rut,String imageurl) {
        this.email = email;
        this.contrasena = contrasena;
        this.admin = admin;
        this.rut = rut;
        this.imageurl = imageurl;
   }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    public boolean isAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
    }

    public String getRut() {
        return rut;
    }

    public void setRut(String rut) {
        this.rut = rut;
    }

    public String getImageurl() {
        return imageurl;
    }

    public void setImageurl(String imageurl) {
        this.imageurl = imageurl;
    }
}
