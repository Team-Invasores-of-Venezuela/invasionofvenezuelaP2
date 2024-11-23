package com.example.backend_edunerd.Controladores;

import com.example.backend_edunerd.Dominio.EstudianteDTO;
import com.example.backend_edunerd.Dominio.EstudianteDTO2;
import com.example.backend_edunerd.Modelos.Estudiante;
import com.example.backend_edunerd.Servicios.ServicioEstudiante;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("estudiante")
public class ControladorEstudiante {

    @Autowired
    private ServicioEstudiante servicioEstudiante;


    /*
    @CrossOrigin(origins = "*")
    @PostMapping("/create")
    public ResponseEntity<EstudianteDTO2> createEstudiante(@RequestBody EstudianteDTO estudianteDTO) {
        Estudiante estudiante = servicioEstudiante.createEstudiante(estudianteDTO);
        if (estudiante != null) {
            EstudianteDTO2 estudianteDTO2 = new EstudianteDTO2(estudiante);
            return ResponseEntity.ok(estudianteDTO2);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getall")
    public ResponseEntity<List<EstudianteDTO2>> getEstudiantes() {
        List<EstudianteDTO2> estudiantes = servicioEstudiante.getEstudiantes();
        return ResponseEntity.ok(estudiantes);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/get")
    public ResponseEntity<Estudiante> getEstudiante(@RequestParam("id") String id) {
        Estudiante estudiante = servicioEstudiante.getEstudiante(id);
        if (estudiante != null) {
            return ResponseEntity.ok().body(estudiante);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/update")
    public ResponseEntity<Estudiante> updateEstudiante(@RequestBody EstudianteDTO2 estudianteDTO2) {
        Estudiante estudiante = servicioEstudiante.updateEstudiante(estudianteDTO2);
        if (estudiante != null) {
            return ResponseEntity.ok().body(estudiante);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/delete")
    public ResponseEntity<Estudiante> deleteEstudiante(@RequestParam("id") String id) {
        Estudiante estudiante = servicioEstudiante.deleteEstudiante(id);
        if (estudiante != null) {
            return ResponseEntity.ok().body(estudiante);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

     */
}
