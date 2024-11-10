package com.example.backend_edunerd.Servicios;
import com.example.backend_edunerd.Modelos.Estudiante;
import com.example.backend_edunerd.Modelos.Profesor;
import com.example.backend_edunerd.Modelos.Usuario;
import com.example.backend_edunerd.Repositorios.RepositorioEstudiante;
import com.example.backend_edunerd.Repositorios.RepositorioProfesor;
import com.example.backend_edunerd.Repositorios.RepositorioUsuario;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Arrays;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ServicioSVC {

    @Autowired
    private RepositorioProfesor profesorRepository;

    @Autowired
    private RepositorioEstudiante estudianteRepository;

    public void importarProfesoresDesdeExcel(MultipartFile file) throws IOException {
        List<Profesor> profesores = new ArrayList<>();

        try (InputStream inputStream = file.getInputStream()) {
            Workbook workbook = new XSSFWorkbook(inputStream);
            Sheet sheet = workbook.getSheetAt(0);

            for (Row row : sheet) {
                if (row.getRowNum() == 0) {
                    continue;
                }

                String nombre = row.getCell(0) != null ? row.getCell(0).getStringCellValue() : "";
                String cursosStr = row.getCell(1) != null ? row.getCell(1).getStringCellValue() : "";
                List<String> cursos = Arrays.asList(cursosStr.split(","));

                if (!nombre.isEmpty() && !cursosStr.isEmpty()) {
                    Profesor profesor = new Profesor();
                    profesor.setNombre(nombre);
                    profesor.setCursos(cursos);
                    profesores.add(profesor);
                }
            }
        }

        profesorRepository.saveAll(profesores);
    }



    public void importarEstudiantesDesdeExcel(MultipartFile file) throws IOException {
        List<Estudiante> estudiantes = new ArrayList<>();

        try (InputStream inputStream = file.getInputStream()) {
            Workbook workbook = new XSSFWorkbook(inputStream);
            Sheet sheet = workbook.getSheetAt(0);


            Row headerRow = sheet.getRow(0);
            int nombreIndex = -1;
            int matriculaIndex = -1;
            int anoIngresoIndex = -1;

            for (int i = 0; i < headerRow.getPhysicalNumberOfCells(); i++) {
                String header = headerRow.getCell(i).getStringCellValue().toLowerCase();
                if (header.contains("nombre")) {
                    nombreIndex = i;
                } else if (header.contains("matricula")) {
                    matriculaIndex = i;
                } else if (header.contains("año de ingreso")) {
                    anoIngresoIndex = i;
                }
            }


            for (Row row : sheet) {
                if (row.getRowNum() == 0) {
                    continue;
                }

                Estudiante estudiante = new Estudiante();


                estudiante.setNombre(row.getCell(nombreIndex).getStringCellValue());
                double matricula = row.getCell(matriculaIndex).getNumericCellValue();
                estudiante.setMatricula(String.valueOf((int) matricula));
                estudiante.setAnoIngreso((int) row.getCell(anoIngresoIndex).getNumericCellValue());

                estudiantes.add(estudiante);
            }
        }

        estudianteRepository.saveAll(estudiantes);
    }



}
