package com.example.backend_edunerd.Servicios;

import com.example.backend_edunerd.Modelos.Curso;
import com.example.backend_edunerd.Repositorios.RepositorioCurso;
import com.example.backend_edunerd.Repositorios.RepositorioEstudiante;
import com.example.backend_edunerd.Repositorios.RepositorioProfesor;
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
}
