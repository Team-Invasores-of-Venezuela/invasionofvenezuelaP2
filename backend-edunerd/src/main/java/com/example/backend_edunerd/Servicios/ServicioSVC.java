package com.example.backend_edunerd.Servicios;
import com.example.backend_edunerd.Modelos.Curso;
import com.example.backend_edunerd.Modelos.Estudiante;
import com.example.backend_edunerd.Modelos.Profesor;
import com.example.backend_edunerd.Modelos.Usuario;
import com.example.backend_edunerd.Repositorios.RepositorioCurso;
import com.example.backend_edunerd.Repositorios.RepositorioEstudiante;
import com.example.backend_edunerd.Repositorios.RepositorioProfesor;
import com.example.backend_edunerd.Repositorios.RepositorioUsuario;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.bson.internal.BsonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;
import java.sql.SQLOutput;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;
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


            for (Row row : sheet) {
                if (row.getRowNum() == 0) {
                    continue; // Saltar la fila de cabecera
                }

                String nombres = obtenerCelda(row, nombresIndex);
                String[] nombresSeparados = nombres.split("\\s+");
                if (nombresSeparados.length >= 2) {
                    // Concatenar ambos nombres separados por un espacio si existen
                    nombres = nombresSeparados[0] + " " + nombresSeparados[1];
                } else {
                    nombres = nombresSeparados[0];
                }
                String apellidoPaterno = obtenerCelda(row, apellidoPaternoIndex);
                String apellidoMaterno = obtenerCelda(row, apellidoMaternoIndex);
                String rut = obtenerCelda(row, rutIndex);
                String titulo = obtenerCelda(row, tituloIndex);
                String gradoMaximo = obtenerCelda(row, gradoMaximoIndex);


                if (!nombres.isEmpty() && !rut.isEmpty() && rutesValido(rut) && !profesorRepository.existsByRut(rut)) {
                    Profesor profesor = new Profesor();
                    profesor.setNombre(nombres);
                    profesor.setApellidoPaterno(apellidoPaterno);
                    profesor.setApellidoMaterno(apellidoMaterno);
                    profesor.setRut(formatearRut(rut));
                    profesor.setTitulo(titulo);
                    profesor.setGradoMax(gradoMaximo);
                    profesorRepository.save(profesor);
                    // Opcionalmente, genera usuarios asociados al profesor
                    generarUsuarios(profesor);

                }
            }
        }


    }



    public void importarEstudiantesDesdeExcel(MultipartFile file) throws IOException {

        try (InputStream inputStream = file.getInputStream()) {
            Workbook workbook = new XSSFWorkbook(inputStream);
            Sheet sheet = workbook.getSheetAt(0);

            Row headerRow = sheet.getRow(0);
            int nombresIndex = -1;
            int apellidoPaternoIndex = -1;
            int apellidoMaternoIndex = -1;
            int rutIndex = -1;
            int matriculaIndex = -1;
            int fechaNacimientoIndex = -1;
            int fechaIngresoIndex = -1;
            int imagenIndex = -1;

            for (int i = 0; i < headerRow.getPhysicalNumberOfCells(); i++) {
                String header = headerRow.getCell(i).getStringCellValue().toLowerCase().trim();
                if (header.contains("nombres")) {
                    nombresIndex = i;
                } else if (header.contains("apellido paterno")) {
                    apellidoPaternoIndex = i;
                } else if (header.contains("apellido materno")) {
                    apellidoMaternoIndex = i;
                } else if (header.contains("rut")) {
                    rutIndex = i;
                } else if (header.contains("matricula")) {
                    matriculaIndex = i;
                } else if (header.contains("fecha nacimiento")) {
                    fechaNacimientoIndex = i;
                } else if (header.contains("fecha ingreso")) {
                    fechaIngresoIndex = i;
                } else if (header.contains("imagen")) {
                    imagenIndex = i;
                }
            }


            if (nombresIndex == -1 || apellidoPaternoIndex == -1 || apellidoMaternoIndex == -1 || rutIndex == -1 ||
                    matriculaIndex == -1 || fechaNacimientoIndex == -1 || fechaIngresoIndex == -1 || imagenIndex == -1) {
                throw new IllegalArgumentException("El archivo Excel no contiene las columnas requeridas.");
            }


            for (Row row : sheet) {
                if (row.getRowNum() == 0) {
                    continue;
                }


                String nombre = row.getCell(nombresIndex).getStringCellValue().trim();

                String[] nombresSeparados = nombre.split("\\s+");
                if (nombresSeparados.length >= 2) {
                    // Concatenar ambos nombres separados por un espacio si existen
                    nombre = nombresSeparados[0] + " " + nombresSeparados[1];
                } else {
                    nombre = nombresSeparados[0];
                }
                String apellidoPaterno = row.getCell(apellidoPaternoIndex).getStringCellValue().trim();
                String apellidoMaterno = row.getCell(apellidoMaternoIndex).getStringCellValue().trim();
                String rut = row.getCell(rutIndex).getStringCellValue().trim();

                String matricula = "";
                Cell matriculaCell = row.getCell(matriculaIndex);
                if (matriculaCell != null) {
                    switch (matriculaCell.getCellType()) {
                        case STRING:
                            matricula = matriculaCell.getStringCellValue().trim();
                            break;
                        case NUMERIC:
                            matricula = String.valueOf((long) matriculaCell.getNumericCellValue()).trim();
                            break;
                        default:
                            throw new IllegalArgumentException("La celda de matrícula contiene un valor inválido en la fila " + row.getRowNum());
                    }
                }

                Date fechaNacimiento = row.getCell(fechaNacimientoIndex).getDateCellValue();
                Date fechaIngreso = row.getCell(fechaIngresoIndex).getDateCellValue();
                String imagen = row.getCell(imagenIndex).getStringCellValue().trim();

                // Convertir las fechas de tipo Date a LocalDate
                LocalDate fechaNacimientoLocalDate = convertirADateLocal(fechaNacimiento);
                LocalDate fechaIngresoLocalDate = convertirADateLocal(fechaIngreso);

                // Validar que el rut sea correcto
                if (!rutesValido(rut)) {
                    System.out.println("RUT no válido en la fila " + row.getRowNum());
                    continue;
                }


                if (!estudianteRepository.existsByMatricula(matricula)) {
                    Estudiante estudiante = new Estudiante();
                    estudiante.setNombre(nombre);
                    estudiante.setApellidoPaterno(apellidoPaterno);
                    estudiante.setApellidoMaterno(apellidoMaterno);
                    estudiante.setRut(formatearRut(rut));
                    estudiante.setMatricula(matricula);
                    estudiante.setFechaNacimiento(fechaNacimientoLocalDate);
                    estudiante.setFechaIngreso(fechaIngresoLocalDate);
                    estudiante.setUrlfoto(imagen);
                    estudianteRepository.save(estudiante);
                }
            }
        }

    }

    public void importarCursosDesdeExcel(MultipartFile file) throws IOException {

        try (InputStream inputStream = file.getInputStream()) {
            Workbook workbook = new XSSFWorkbook(inputStream);
            Sheet sheet = workbook.getSheetAt(0);

            Row headerRow = sheet.getRow(0);
            int carreraIndex = -1;
            int nombreIndex = -1;
            int semestreIndex = -1;
            int anoIndex = -1;
            int seccionIndex = -1;
            int listadoAlumnosIndex = -1;
            int profesorIndex = -1;

            // Encontramos los índices de las columnas
            for (int i = 0; i < headerRow.getPhysicalNumberOfCells(); i++) {
                String header = headerRow.getCell(i).getStringCellValue().toLowerCase().trim();
                if (header.contains("carrera")) {
                    carreraIndex = i;
                } else if (header.contains("nombre")) {
                    nombreIndex = i;
                } else if (header.contains("semestre")) {
                    semestreIndex = i;
                } else if (header.contains("año")) {
                    anoIndex = i;
                } else if (header.contains("seccion")) {
                    seccionIndex = i;
                } else if (header.contains("listado alumnos")) {
                    listadoAlumnosIndex = i;
                } else if (header.contains("profesor")) {
                    profesorIndex = i;
                }
            }


            for (Row row : sheet) {
                if (row.getRowNum() == 0) {
                    continue;
                }

                String carrera = row.getCell(carreraIndex).getStringCellValue().trim().replaceAll("\\s+", " ");
                String nombre = row.getCell(nombreIndex).getStringCellValue().trim().replaceAll("\\s+", " ");
                int semestre = (int) row.getCell(semestreIndex).getNumericCellValue();
                int ano = (int) row.getCell(anoIndex).getNumericCellValue();
                char seccion = row.getCell(seccionIndex).getStringCellValue().trim().charAt(0);
                String listadoAlumnosStr = row.getCell(listadoAlumnosIndex).getStringCellValue().trim().replaceAll("\\s+", " ");
                String profesor = row.getCell(profesorIndex).getStringCellValue().trim().replaceAll("\\s+", " ");

                // Validación del semestre
                if (semestre < 1 || semestre > 2) {
                    System.out.println("Semestre inválido en la fila " + row.getRowNum() + ", debe ser 1 o 2");
                    continue;
                }
                if (!rutesValido(profesor)) {
                    System.out.println("RUT inválido del profesor "+ profesor +" en la fila " + row.getRowNum());
                    continue;
                }


                List<String> listadoAlumnos = new ArrayList<>();
                if (!listadoAlumnosStr.isEmpty()) {
                    String[] alumnosArray = listadoAlumnosStr.split(",");
                    for (String matricula : alumnosArray) {
                        listadoAlumnos.add(matricula.trim().replaceAll("\\s+", " "));  // Limpiar cada matrícula
                    }
                }


                Curso curso = new Curso();
                curso.setCarrera(carrera);
                curso.setNombre(nombre);
                curso.setSemestre(semestre);
                curso.setAno(ano);
                curso.setSeccion(seccion);
                curso.setAlumnos(listadoAlumnos);
                curso.setProfesor(formatearRut(profesor));

                cursoRepository.save(curso);
            }
        }

    }

    public Usuario generarUsuarios(Profesor profesor){
        String rutLimpio =profesor.getRut().replaceAll("[^0-9kK]", "");
        String nombre = profesor.getNombre().charAt(0) + profesor.getApellidoPaterno()+ rutLimpio.charAt(0)+ rutLimpio.charAt(1);

        String nombreSplit = nombre.toLowerCase().replace(" ", "");

        String email = nombreSplit + "@docentes.utalca.cl";

        if(!repositorioUsuario.existsByEmail(email)){
            Usuario usuario = new Usuario(false, nombreSplit, email, profesor.getRut());
            //System.out.println(usuario.toString());
            System.out.println("Usuario generado");
            repositorioUsuario.save(usuario);
            System.out.println(usuario.isAdmin());
            System.out.println(usuario.getEmail());
            System.out.println(usuario.getContrasena());
            System.out.println(usuario.getRut());
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


    private boolean rutesValido(String rut) {
        if (rut == null || rut.isEmpty()) {
            System.out.println("vacio");
            return false;
        }
        String rutLimpio = rut.replaceAll("[^0-9kK]", "");
        System.out.println(rutLimpio);
        if (rutLimpio.length() < 8) {
            return false;
        }

        // Separar los números y el dígito verificador
        String numeros = rutLimpio.substring(0, rutLimpio.length() - 1);
        String verificador = rutLimpio.substring(rutLimpio.length() - 1).toUpperCase();


        if (!numeros.matches("\\d+")) {
            return false;
        }

        return verificador.matches("[0-9K]");
    }


    public String formatearRut(String rut) {
        String rutLimpio = rut.replaceAll("[^0-9kK]", "");
        String numeros = rutLimpio.substring(0, rutLimpio.length() - 1);
        String verificador = rutLimpio.substring(rutLimpio.length() - 1).toUpperCase();


        StringBuilder rutFormateado = new StringBuilder();

        if (numeros.length() == 8) {
            // Si el RUT tiene 8 dígitos, el primer bloque será de 2 dígitos
            rutFormateado.append(numeros.substring(0, 2));
            rutFormateado.append(".");
            rutFormateado.append(numeros.substring(2, 5));
            rutFormateado.append(".");
            rutFormateado.append(numeros.substring(5, 8));
        } else {
            // Si el RUT tiene 7 dígitos, el primer bloque será de 1 dígito
            rutFormateado.append(numeros.substring(0, 1));
            rutFormateado.append(".");
            rutFormateado.append(numeros.substring(1, 4));
            rutFormateado.append(".");
            rutFormateado.append(numeros.substring(4, 7));
        }


        rutFormateado.append("-");
        rutFormateado.append(verificador);

        return rutFormateado.toString();
    }

    private LocalDate convertirADateLocal(Date date) {
        if (date != null) {
            return date.toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDate();
        }
        return null;
    }






}
