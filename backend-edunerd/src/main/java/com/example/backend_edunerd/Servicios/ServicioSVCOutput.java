package com.example.backend_edunerd.Servicios;

import com.example.backend_edunerd.Modelos.Curso;
import com.example.backend_edunerd.Modelos.Estudiante;
import com.example.backend_edunerd.Modelos.Profesor;
import com.example.backend_edunerd.Repositorios.RepositorioCurso;
import com.example.backend_edunerd.Repositorios.RepositorioEstudiante;
import com.example.backend_edunerd.Repositorios.RepositorioProfesor;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
public class ServicioSVCOutput {

    @Autowired
    private RepositorioCurso repositorioCurso;

    @Autowired
    private RepositorioEstudiante repositorioEstudiante;

    @Autowired
    private RepositorioProfesor repositorioProfesor;


    public byte[] exportarCursos() {
        List<Curso> cursos = repositorioCurso.findAll();

        try(Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream outputStream = new ByteArrayOutputStream())  {
            Sheet sheet = workbook.createSheet("Cursos");

            Row headerRow = sheet.createRow(0);
            String[] headers = {
                    "ID", "Carrera", "Nombre", "Ano", "Semestre", "Seccion", "Alumnos", "Profesor"
            };

            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
            }

            int rowNum = 1;
            for(Curso curso: cursos){
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(curso.getId());
                row.createCell(1).setCellValue(curso.getCarrera());
                row.createCell(2).setCellValue(curso.getNombre());
                row.createCell(3).setCellValue(curso.getAno());
                row.createCell(4).setCellValue(curso.getSemestre());
                row.createCell(5).setCellValue(Character.toString(curso.getSeccion()));
                row.createCell(6).setCellValue(curso.getAlumnos().toString());
                row.createCell(7).setCellValue(curso.getProfesor());
            }

            for(int i = 0; i < headers.length; i++) {
                sheet.autoSizeColumn(i);
            }

            workbook.write(outputStream);
            byte[] excelContent = outputStream.toByteArray();

            return excelContent;
        } catch (IOException e) {
            throw new RuntimeException("Error al generar el archivo Excel", e);
        }
    }

    public byte[] exportarEstudiantes() {
        List<Estudiante> estudiantes = repositorioEstudiante.findAll();

        try(Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream outputStream = new ByteArrayOutputStream())  {
            Sheet sheet = workbook.createSheet("Estudiantes");

            Row headerRow = sheet.createRow(0);
            String[] headers = {
                    "ID", "Nombre", "Apellido Paterno", "Apellido Materno", "Rut", "Matricula", "Fecha Nacimiento", "Fecha Ingreso", "URL Foto", "Contador Positivo", "Contador Negativo"
            };

            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
            }

            int rowNum = 1;
            for(Estudiante estudiante: estudiantes){
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(estudiante.getId());
                row.createCell(1).setCellValue(estudiante.getNombre());
                row.createCell(2).setCellValue(estudiante.getApellidoPaterno());
                row.createCell(3).setCellValue(estudiante.getApellidoMaterno());
                row.createCell(4).setCellValue(estudiante.getRut());
                row.createCell(5).setCellValue(estudiante.getMatricula());
                row.createCell(6).setCellValue(estudiante.getFechaNacimiento().toString());
                row.createCell(7).setCellValue(estudiante.getFechaIngreso().toString());
                row.createCell(8).setCellValue(estudiante.getUrlfoto());
                row.createCell(9).setCellValue(estudiante.getContadorPositvo());
                row.createCell(10).setCellValue(estudiante.getContadorNegativo());
            }

            for(int i = 0; i < headers.length; i++) {
                sheet.autoSizeColumn(i);
            }

            workbook.write(outputStream);
            byte[] excelContent = outputStream.toByteArray();

            return excelContent;

        } catch (IOException e){
            throw new RuntimeException("Error al generar el archivo Excel", e);
        }
    }

    public byte[] exportarProfesores(){
        List<Profesor> profesores = repositorioProfesor.findAll();

        try(Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream outputStream = new ByteArrayOutputStream())  {
            Sheet sheet = workbook.createSheet("Profesores");

            Row headerRow = sheet.createRow(0);
            String[] headers = {
                    "ID", "Nombre", "Apellido Paterno", "Apellido Materno", "Rut", "Titulo", "Grado Maximo"
            };

            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
            }

            int rowNum = 1;
            for(Profesor profesor: profesores){
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(profesor.getId());
                row.createCell(1).setCellValue(profesor.getNombre());
                row.createCell(2).setCellValue(profesor.getApellidoPaterno());
                row.createCell(3).setCellValue(profesor.getApellidoMaterno());
                row.createCell(4).setCellValue(profesor.getRut());
                row.createCell(5).setCellValue(profesor.getTitulo());
                row.createCell(6).setCellValue(profesor.getGradoMax());
            }

            for(int i = 0; i < headers.length; i++) {
                sheet.autoSizeColumn(i);
            }

            workbook.write(outputStream);
            byte[] excelContent = outputStream.toByteArray();

            return excelContent;

        } catch (IOException e ){
            throw new RuntimeException("Error al generar el archivo Excel", e);
        }
    }
}
