package com.example.backend_edunerd.Controladores;

import com.example.backend_edunerd.Servicios.ServicioSVC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/svc")
public class ControladorSVC {
    @Autowired
    private ServicioSVC servicioSVC;

    @CrossOrigin(origins = "*")
    @PostMapping("/importarProfesores")
    public ResponseEntity<Map<String, Object>> importarDatos(@RequestParam("file") MultipartFile archivoCSV) {
        try {

            servicioSVC.importarProfesoresDesdeExcel(archivoCSV);


            Map<String, Object> response = new HashMap<>();
            response.put("ok", true);
            response.put("mensaje", "Profesores importados correctamente");

            return ResponseEntity.ok(response);
        } catch (IOException e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("ok", false);
            errorResponse.put("error", "Error al procesar el archivo CSV");

            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/importarEstudiantes")
    public ResponseEntity<Map<String, Object>> importarEstudiantes(@RequestParam("file") MultipartFile archivoExcel) {
        try {
            servicioSVC.importarEstudiantesDesdeExcel(archivoExcel);

            Map<String, Object> response = new HashMap<>();
            response.put("ok", true);
            response.put("mensaje", "Estudiantes importados correctamente");
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("ok", false);
            errorResponse.put("error", "Error al procesar el archivo de estudiantes");
            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/importarCursos")
    public ResponseEntity<Map<String, Object>> importarCursos(@RequestParam("file") MultipartFile archivoExcel) {
        try {
            servicioSVC.importarCursosDesdeExcel(archivoExcel);

            Map<String, Object> response = new HashMap<>();
            response.put("ok", true);
            response.put("mensaje", "Cursos importados correctamente");

            return ResponseEntity.ok(response);
        } catch (IOException e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("ok", false);
            errorResponse.put("error", "Error al procesar el archivo de cursos");

            return ResponseEntity.status(500).body(errorResponse);
        }
    }



}
