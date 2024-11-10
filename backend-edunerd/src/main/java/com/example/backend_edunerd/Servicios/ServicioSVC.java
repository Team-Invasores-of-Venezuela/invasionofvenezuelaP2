package com.example.backend_edunerd.Servicios;
import com.example.backend_edunerd.Modelos.Curso;
import com.example.backend_edunerd.Modelos.Estudiante;
import com.example.backend_edunerd.Modelos.Profesor;
import com.example.backend_edunerd.Modelos.Usuario;
import com.example.backend_edunerd.Repositorios.RepositorioCurso;
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
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ServicioSVC {

    @Autowired
    private RepositorioProfesor profesorRepository;

    @Autowired
    private RepositorioEstudiante estudianteRepository;

    @Autowired
    private RepositorioCurso cursoRepository;

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

                if (!nombre.isEmpty() && !cursosStr.isEmpty()&& !profesorRepository.existsByNombre(nombre)) {
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

    public void importarCursosDesdeExcel(MultipartFile file) throws IOException {
        List<Curso> cursos = new ArrayList<>();

        try (InputStream inputStream = file.getInputStream()) {
            Workbook workbook = new XSSFWorkbook(inputStream);
            Sheet sheet = workbook.getSheetAt(0);

            Row headerRow = sheet.getRow(0);
            int tituloIndex = -1;
            int docenteIndex = -1;
            int aprendizajesIndex = -1;
            int semestreIndex = -1;
            int anoIndex = -1;

            for (int i = 0; i < headerRow.getPhysicalNumberOfCells(); i++) {
                String header = headerRow.getCell(i).getStringCellValue().toLowerCase();
                if (header.contains("titulo")) {
                    tituloIndex = i;
                } else if (header.contains("docente")) {
                    docenteIndex = i;
                } else if (header.contains("aprendizajes")) {
                    aprendizajesIndex = i;
                } else if (header.contains("semestre")) {
                    semestreIndex = i;
                } else if (header.contains("año")) {
                    anoIndex = i;
                }
            }


            for (Row row : sheet) {
                if (row.getRowNum() == 0) {
                    continue;
                }

                String titulo = row.getCell(tituloIndex).getStringCellValue();

                if (cursoRepository.existsByTitulo(titulo)) {
                    continue; 
                }

                String docente = row.getCell(docenteIndex).getStringCellValue();
                String aprendizajesStr = row.getCell(aprendizajesIndex).getStringCellValue();
                int semestre = (int) row.getCell(semestreIndex).getNumericCellValue();
                int ano = (int) row.getCell(anoIndex).getNumericCellValue();


                if (semestre < 1 || semestre > 2) {
                    System.out.println("Semestre inválido en la fila " + row.getRowNum() + ", debe ser 1 o 2");
                    continue;
                }


                List<String> aprendizajes = new ArrayList<>();
                if (aprendizajesStr != null && !aprendizajesStr.isEmpty()) {

                    String[] aprendizajesArray = aprendizajesStr.split(",");

                    for (String aprendizaje : aprendizajesArray) {
                        aprendizajes.add(aprendizaje.trim()); // .trim() para quitar espacios extra
                    }
                }


                Curso curso = new Curso();
                curso.setTitulo(titulo);
                curso.setDocente(docente);
                curso.setAprendizajes(aprendizajes);
                curso.setSemestre(semestre);
                curso.setAno(ano);
                cursos.add(curso);
            }
        }


        cursoRepository.saveAll(cursos);
    }

}
