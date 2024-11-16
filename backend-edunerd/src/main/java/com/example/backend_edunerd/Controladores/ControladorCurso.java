package com.example.backend_edunerd.Controladores;

import com.example.backend_edunerd.Dominio.CursoDTO;
import com.example.backend_edunerd.Dominio.CursoDTO2;
import com.example.backend_edunerd.Modelos.Curso;
import com.example.backend_edunerd.Servicios.ServicioCurso;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("curso")
public class ControladorCurso {

    @Autowired
    private ServicioCurso servicioCurso;

    @CrossOrigin(origins = "*")
    @GetMapping("/getall")
    public ResponseEntity<List<CursoDTO2>> getCursos() {
        List<CursoDTO2> cursos = servicioCurso.getCursos();
        return ResponseEntity.ok(cursos);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/create")
    public ResponseEntity<CursoDTO2> createCurso(@RequestBody CursoDTO cursoDTO) {
        Curso curso = servicioCurso.createCurso(cursoDTO);
        if(curso != null) {
            CursoDTO2 cursoDTO2 = new CursoDTO2(curso);
            return ResponseEntity.ok(cursoDTO2);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/get")
    public ResponseEntity<Curso> getCurso(@RequestParam("id") String id) {
        Curso curso = servicioCurso.getCurso(id);
        if(curso != null) {
            return ResponseEntity.ok().body(curso);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/update")
    public ResponseEntity<Curso> updateCurso(@RequestBody CursoDTO2 cursoDTO2) {
        Curso curso = servicioCurso.updateCurso(cursoDTO2);
        if(curso != null) {
            return ResponseEntity.ok().body(curso);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/delete")
    public ResponseEntity<Curso> deleteCurso(@RequestParam("id") String id) {
        Curso curso = servicioCurso.deleteCurso(id);
        if(curso != null) {
            return ResponseEntity.ok().body(curso);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
