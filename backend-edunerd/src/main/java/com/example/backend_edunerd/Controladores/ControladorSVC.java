package com.example.backend_edunerd.Controladores;

import com.example.backend_edunerd.Servicios.ServicioSVC;
import com.example.backend_edunerd.Servicios.ServicioSVCOutput;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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

    @Autowired
    private ServicioSVCOutput servicioSVCOutput;


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

    @CrossOrigin(origins = "*")
    @GetMapping("/descargarcursos")
    public ResponseEntity<byte[]> generarExcelCursos() {
        byte[] excel = servicioSVCOutput.exportarCursos();
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=cursos.xlsx").contentType(MediaType.APPLICATION_OCTET_STREAM).body(excel);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/descargarestudiantes")
    public ResponseEntity<byte[]> generarExcelEstudiantes() {
        byte[] excel = servicioSVCOutput.exportarEstudiantes();
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=estudiantes.xlsx").contentType(MediaType.APPLICATION_OCTET_STREAM).body(excel);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/descargardocentes")
    public ResponseEntity<byte[]> generarExcelProfesores() {
        byte[] excel = servicioSVCOutput.exportarProfesores();
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=docentes.xlsx").contentType(MediaType.APPLICATION_OCTET_STREAM).body(excel);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/descargarpdf")
    public ResponseEntity<byte[]> generarPDF(@RequestParam("matricula") String matricula) {
        byte[] pdf = servicioSVCOutput.generarPDF(matricula);
        if(pdf == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=CartaSumario.pdf").contentType(MediaType.APPLICATION_PDF).body(pdf);
    }
}
