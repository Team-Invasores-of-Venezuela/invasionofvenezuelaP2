package com.example.backend_edunerd.Controladores;

import com.example.backend_edunerd.Dominio.CursoDTO2;
import com.example.backend_edunerd.Modelos.Curso;
import com.example.backend_edunerd.Servicios.ServicioCurso;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("curso")
public class ControladorCurso {

    @Autowired
    private ServicioCurso servicioCurso;

    @CrossOrigin("origins")
    @GetMapping("getall")
    public ResponseEntity<List<CursoDTO2>> getCursos() {
        List<CursoDTO2> cursos = servicioCurso.getCursos();
        return ResponseEntity.ok(cursos);
    }
}
