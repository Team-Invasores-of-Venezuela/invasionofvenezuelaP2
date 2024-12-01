package com.example.backend_edunerd.Controladores;

import com.example.backend_edunerd.Dominio.ReporteDTO;
import com.example.backend_edunerd.Modelos.Reporte;
import com.example.backend_edunerd.Servicios.ServicioReporte;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResponseErrorHandler;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/reporte")
public class ControladorReporte {
    @Autowired
    private ServicioReporte servicioReporte;

    @CrossOrigin(origins = "*")
    @PostMapping("/nuevoreporte")
    public ResponseEntity<Map<String, Object>> guardarreporte(@RequestBody ReporteDTO reporteDTO){
        System.out.printf(reporteDTO.toString());;
        Optional <Reporte> reporteOptional= servicioReporte.guardarReporte(reporteDTO);
        HashMap<String, Object> response = new HashMap<>();
        if(reporteOptional.isPresent()){

            response.put("reporte agregado con exito", reporteOptional.get());
            return ResponseEntity.ok(response);
        }
        else {
            response.put("Fallo al agregar el reporte", reporteOptional.get());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

    }



}