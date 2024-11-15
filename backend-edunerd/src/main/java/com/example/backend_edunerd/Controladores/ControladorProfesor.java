package com.example.backend_edunerd.Controladores;

import com.example.backend_edunerd.Dominio.CursoDTO2;
import com.example.backend_edunerd.Dominio.ProfesorDTO;
import com.example.backend_edunerd.Dominio.ProfesorDTO2;
import com.example.backend_edunerd.Modelos.Profesor;
import com.example.backend_edunerd.Servicios.ServicioProfesor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("profesor")
public class ControladorProfesor {

    @Autowired
    private ServicioProfesor servicioProfesor;

    @CrossOrigin("origins")
    @PostMapping("create")
    public ResponseEntity<ProfesorDTO2> createProfesor(@RequestBody ProfesorDTO profesorDTO){
        Profesor profesor = servicioProfesor.createProfesor(profesorDTO);
        if(profesor != null){
            ProfesorDTO2 profesorDTO2 = new ProfesorDTO2(profesor);
            return ResponseEntity.ok(profesorDTO2);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @CrossOrigin("origins")
    @GetMapping("getall")
    public ResponseEntity<List<ProfesorDTO2>> getCursos() {
        List<ProfesorDTO2> profesores = servicioProfesor.getProfesores();
        return ResponseEntity.ok(profesores);
    }

    @CrossOrigin("origins")
    @GetMapping("get")
    public ResponseEntity<Profesor> getProfesor(@RequestParam("id") String id) {
        Profesor profesor = servicioProfesor.getProfesor(id);
        if(profesor != null){
            return ResponseEntity.ok().body(profesor);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @CrossOrigin("origins")
    @PostMapping("update")
    public ResponseEntity<Profesor> updateProfesor(@RequestBody ProfesorDTO2 profesorDTO2) {
        Profesor profesor = servicioProfesor.updateProfesor(profesorDTO2);
        if (profesor != null) {
            return ResponseEntity.ok().body(profesor);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @CrossOrigin("origins")
    @PostMapping("delete")
    public ResponseEntity<Profesor> deleteProfesor(@RequestParam("id") String id) {
        Profesor profesor = servicioProfesor.deleteProfesor(id);
        if(profesor != null){
            return ResponseEntity.ok().body(profesor);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
