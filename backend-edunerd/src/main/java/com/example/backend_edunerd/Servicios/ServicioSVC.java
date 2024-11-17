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
import java.util.stream.Collectors;

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

    @Autowired
    private RepositorioUsuario repositorioUsuario;

    public void importarProfesoresDesdeExcel(MultipartFile file) throws IOException {
        List<Profesor> profesores = new ArrayList<>();

        try (InputStream inputStream = file.getInputStream()) {
            Workbook workbook = new XSSFWorkbook(inputStream);
            Sheet sheet = workbook.getSheetAt(0);


            Row headerRow = sheet.getRow(0);
            int nombreIndex = -1;
            int cursosIndex = -1;

            for (int i = 0; i < headerRow.getPhysicalNumberOfCells(); i++) {
                String header = headerRow.getCell(i).getStringCellValue().toLowerCase();
                if (header.contains("nombre")) {
                    nombreIndex = i;
                } else if (header.contains("cursos")) {
                    cursosIndex = i;
                }
            }

            if (nombreIndex == -1 || cursosIndex == -1) {
                throw new IllegalArgumentException("No se encontraron las columnas 'nombre' o 'cursos' en el archivo Excel.");
            }

            for (Row row : sheet) {
                if (row.getRowNum() == 0) {
                    continue;
                }

                String nombre = row.getCell(nombreIndex) != null ? row.getCell(nombreIndex).getStringCellValue().trim() : "";
                String cursosStr = row.getCell(cursosIndex) != null ? row.getCell(cursosIndex).getStringCellValue().trim() : "";

                // EL METODO TRIM BORRA LOS ESPACIOS VACIOS AL INICIO Y AL FINAL DE UN STRING
                nombre = nombre.replaceAll("\\s{2,}", " ");
                cursosStr = cursosStr.replaceAll("\\s{2,}", " ");

                if (!nombre.isEmpty() && !cursosStr.isEmpty() && !profesorRepository.existsByNombre(nombre)) {
                    List<String> cursos = Arrays.stream(cursosStr.split(","))
                            .map(String::trim) // Eliminar espacios en cada curso
                            .filter(curso -> !curso.isEmpty()) // Ignorar cursos vacíos
                            .collect(Collectors.toList());

                    Profesor profesor = new Profesor();
                    profesor.setNombre(nombre);
                    profesor.setCursos(cursos);
                    generarUsuarios(profesor);
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
                String header = headerRow.getCell(i).getStringCellValue().toLowerCase().trim();
                if (header.contains("nombre")) {
                    nombreIndex = i;
                } else if (header.contains("matricula")) {
                    matriculaIndex = i;
                } else if (header.contains("año de ingreso")) {
                    anoIngresoIndex = i;
                }
            }

            if (nombreIndex == -1 || matriculaIndex == -1 || anoIngresoIndex == -1) {
                throw new IllegalArgumentException("El archivo Excel no contiene las columnas requeridas.");
            }

            for (Row row : sheet) {
                if (row.getRowNum() == 0) {
                    continue;
                }


                String nombre = row.getCell(nombreIndex).getStringCellValue().trim();
                String matricula = String.valueOf((int) row.getCell(matriculaIndex).getNumericCellValue()).trim();
                int anoIngreso = (int) row.getCell(anoIngresoIndex).getNumericCellValue();


                if (!estudianteRepository.existsByMatricula(matricula)) {
                    Estudiante estudiante = new Estudiante();
                    estudiante.setNombre(nombre);
                    estudiante.setMatricula(matricula);
                    estudiante.setAnoIngreso(anoIngreso);

                    estudiantes.add(estudiante);
                }
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
                String header = headerRow.getCell(i).getStringCellValue().toLowerCase().trim();
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


                String titulo = row.getCell(tituloIndex).getStringCellValue().trim().replaceAll("\\s+", " ");
                if (cursoRepository.existsByTitulo(titulo)) {
                    continue;
                }

                String docente = row.getCell(docenteIndex).getStringCellValue().trim().replaceAll("\\s+", " ");
                String aprendizajesStr = row.getCell(aprendizajesIndex).getStringCellValue().trim().replaceAll("\\s+", " ");
                int semestre = (int) row.getCell(semestreIndex).getNumericCellValue();
                int ano = (int) row.getCell(anoIndex).getNumericCellValue();

                if (semestre < 1 || semestre > 2) {
                    System.out.println("Semestre inválido en la fila " + row.getRowNum() + ", debe ser 1 o 2");
                    continue;
                }


                List<String> aprendizajes = new ArrayList<>();
                if (!aprendizajesStr.isEmpty()) {
                    String[] aprendizajesArray = aprendizajesStr.split(",");
                    for (String aprendizaje : aprendizajesArray) {
                        aprendizajes.add(aprendizaje.trim().replaceAll("\\s+", " "));  // Limpiar cada aprendizaje
                    }
                }


                Curso curso = new Curso();
                System.out.println("agregando " + titulo);
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

    public Usuario generarUsuarios(Profesor profesor){
        String nombre = profesor.getNombre();

        String nombreSplit = nombre.toLowerCase().replace(" ", "");

        String email = nombreSplit + "@gmail.com";

        if(!repositorioUsuario.existsByEmail(email)){
            Usuario usuario = new Usuario(false, nombreSplit, email);
            //System.out.println(usuario.toString());
            System.out.println("Usuario generado");
            repositorioUsuario.save(usuario);
            return usuario;
        }
        System.out.println("Usuario ya en la base de datos");
        return null;
    }

}
