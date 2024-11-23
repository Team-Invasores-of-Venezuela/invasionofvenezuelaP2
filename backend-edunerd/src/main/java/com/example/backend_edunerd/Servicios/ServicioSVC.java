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
            int nombresIndex = -1;
            int apellidoPaternoIndex = -1;
            int apellidoMaternoIndex = -1;
            int rutIndex = -1;
            int tituloIndex = -1;
            int gradoMaximoIndex = -1;

            // Buscar las columnas en la cabecera
            for (int i = 0; i < headerRow.getPhysicalNumberOfCells(); i++) {
                String header = headerRow.getCell(i).getStringCellValue().toLowerCase();
                if (header.contains("nombres")) {
                    nombresIndex = i;
                } else if (header.contains("apellido paterno")) {
                    apellidoPaternoIndex = i;
                } else if (header.contains("apellido materno")) {
                    apellidoMaternoIndex = i;
                } else if (header.contains("rut")) {
                    rutIndex = i;
                } else if (header.contains("titulo")) {
                    tituloIndex = i;
                } else if (header.contains("grado maximo")) {
                    gradoMaximoIndex = i;
                }
            }

            // Validar que se encontraron todas las columnas
            if (nombresIndex == -1 || apellidoPaternoIndex == -1 || apellidoMaternoIndex == -1 ||
                    rutIndex == -1 || tituloIndex == -1 || gradoMaximoIndex == -1) {
                throw new IllegalArgumentException("No se encontraron todas las columnas necesarias en el archivo Excel.");
            }

            // Iterar sobre las filas del Excel
            for (Row row : sheet) {
                if (row.getRowNum() == 0) {
                    continue; // Saltar la fila de cabecera
                }

                String nombres = obtenerCelda(row, nombresIndex);
                String apellidoPaterno = obtenerCelda(row, apellidoPaternoIndex);
                String apellidoMaterno = obtenerCelda(row, apellidoMaternoIndex);
                String rut = obtenerCelda(row, rutIndex);
                String titulo = obtenerCelda(row, tituloIndex);
                String gradoMaximo = obtenerCelda(row, gradoMaximoIndex);

                // Crear el objeto Profesor si los datos son válidos
                if (!nombres.isEmpty() && !rut.isEmpty() && !profesorRepository.existsByRut(rut)) {
                    Profesor profesor = new Profesor();
                    profesor.setNombre(nombres);
                    profesor.setApellidoPaterno(apellidoPaterno);
                    profesor.setApellidoMaterno(apellidoMaterno);
                    profesor.setRut(rut);
                    profesor.setTitulo(titulo);
                    profesor.setGradoMax(gradoMaximo);

                    // Opcionalmente, genera usuarios asociados al profesor
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
            Usuario usuario = new Usuario(false, nombreSplit, email, nombre);
            //System.out.println(usuario.toString());
            System.out.println("Usuario generado");
            repositorioUsuario.save(usuario);
            System.out.println(usuario.isAdmin());
            System.out.println(usuario.getEmail());
            System.out.println(usuario.getContrasena());
            System.out.println(usuario.getNombre());
            return usuario;
        }
        System.out.println("Usuario ya en la base de datos");
        return null;
    }

    // Método auxiliar para obtener el valor de una celda como String
    private String obtenerCelda(Row row, int index) {
        if (row.getCell(index) != null) {
            return row.getCell(index).getStringCellValue().trim().replaceAll("\\s{2,}", " ");
        }
        return "";
    }



}
