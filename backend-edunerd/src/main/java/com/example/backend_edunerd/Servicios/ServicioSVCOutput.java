package com.example.backend_edunerd.Servicios;

import com.example.backend_edunerd.Modelos.Curso;
import com.example.backend_edunerd.Modelos.Estudiante;
import com.example.backend_edunerd.Modelos.Profesor;
import com.example.backend_edunerd.Repositorios.RepositorioCurso;
import com.example.backend_edunerd.Repositorios.RepositorioEstudiante;
import com.example.backend_edunerd.Repositorios.RepositorioProfesor;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    public byte[] generarPDF(String matricula) {
        Optional<Estudiante> estudiante = repositorioEstudiante.findByMatricula(matricula);
        if(estudiante.isPresent()){
            Estudiante estudiantePDF = estudiante.get();
            try(PDDocument document = new PDDocument(); ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
                PDPage page = new PDPage();
                document.addPage(page);

                try(PDPageContentStream contentStream = new PDPageContentStream(document, page)){
                    //Encabezado
                    contentStream.beginText();
                    contentStream.setFont(PDType1Font.HELVETICA_BOLD, 18);
                    contentStream.newLineAtOffset(220,750);
                    contentStream.showText("Carta de Sumario");
                    contentStream.endText();

                    //Info estudiante
                    contentStream.beginText();
                    contentStream.setFont(PDType1Font.HELVETICA, 12);
                    contentStream.newLineAtOffset(50,670);
                    contentStream.showText("Estudiante: " + estudiantePDF.getNombre() + " " + estudiantePDF.getApellidoPaterno() + " " + estudiantePDF.getApellidoMaterno());
                    contentStream.newLineAtOffset(0, -15);
                    contentStream.showText("Matricula: " + estudiantePDF.getMatricula());
                    contentStream.newLineAtOffset(0, -15);
                    contentStream.showText("Fecha: " + estudiantePDF.getFechaNacimiento().toString());
                    contentStream.endText();

                    //Contenido
                    String contenido = "Por medio de la presente, solicitamos información adicional sobre el estudiante " + estudiantePDF.getNombre() + " " + estudiantePDF.getApellidoPaterno() + " " + estudiantePDF.getApellidoMaterno() +
                                       ", con matricula " + estudiantePDF.getMatricula() + ". Esta solicitud se realiza con el fin de llevar a cabo un seguimiento detallado de su desempeño.";


                    contentStream.beginText();
                    contentStream.setFont(PDType1Font.HELVETICA, 12);
                    contentStream.newLineAtOffset(50,610);
                    contentStream.showText("A quien corresponda:");
                    contentStream.endText();

                    float anchoPagina = page.getMediaBox().getWidth() - 100; // Ancho con márgenes
                    List<String> lineas = dividirTexto(contenido, PDType1Font.HELVETICA, 12, anchoPagina);
                    float posY = 590;
                    for (String linea : lineas) {
                        if (posY < 50) {
                            break; // Evitar escribir fuera de la página
                        }
                        contentStream.beginText();
                        contentStream.newLineAtOffset(50, posY);
                        contentStream.showText(linea);
                        contentStream.endText();
                        posY -= 15; // Espacio entre líneas
                    }

                    contentStream.beginText();
                    contentStream.newLineAtOffset(50, posY);
                    contentStream.showText("Los datos requeridos incluyen, pero no se limitan a:");
                    contentStream.newLineAtOffset(0, -20);
                    contentStream.showText("1. Historial académico detallado.");
                    contentStream.newLineAtOffset(0, -15);
                    contentStream.showText("2. Información sobre actividades extracurriculares realizadas.");
                    contentStream.newLineAtOffset(0, -15);
                    contentStream.showText("3. Cualquier observación relevante sobre su conducta o desempeño.");
                    contentStream.endText();


                    String contenido2 = "Le solicitamos que esta información sea proporcionada a la brevedad posible, en un plazo no mayor a [insertar plazo], para proceder con las evaluaciones correspondientes. Si requiere mas información, no dude en contactarnos.";
                    float anchoPagina2 = page.getMediaBox().getWidth() - 100; // Ancho con márgenes
                    List<String> lineas2 = dividirTexto(contenido2, PDType1Font.HELVETICA, 12, anchoPagina2);
                    float posY2 = posY - 70;
                    for (String linea : lineas2) {
                        if (posY2 < 50) {
                            break; // Evitar escribir fuera de la página
                        }
                        contentStream.beginText();
                        contentStream.newLineAtOffset(50, posY2);
                        contentStream.showText(linea);
                        contentStream.endText();
                        posY2 -= 15; // Espacio entre líneas
                    }

                    //Firma
                    contentStream.beginText();
                    contentStream.setFont(PDType1Font.HELVETICA, 12);
                    contentStream.newLineAtOffset(50,370);
                    contentStream.showText("Atentamente,");
                    contentStream.newLineAtOffset(0,-20);
                    contentStream.showText("[Tu nombre]");
                    contentStream.endText();

                    URL url = new URL("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Logo-utalca.jpg/800px-Logo-utalca.jpg");
                    InputStream is = url.openStream();
                    PDImageXObject logo = PDImageXObject.createFromByteArray(document, is.readAllBytes(), "logo");
                    contentStream.drawImage(logo, 50, 700, 100, 75);
                }

                document.save(outputStream);
                return outputStream.toByteArray();

            } catch(Exception e){
                throw new RuntimeException("Error al generar el archivo PDF", e);
            }

        } else {
            return null;
        }
    }

    public static List<String> dividirTexto(String texto, PDFont fuente, float tamanoFuente, float anchoMaximo) throws IOException {
        List<String> lineas = new ArrayList<>();
        String[] palabras = texto.split(" ");
        StringBuilder lineaActual = new StringBuilder();

        for (String palabra : palabras) {
            String pruebaLinea = lineaActual + (lineaActual.length() == 0 ? "" : " ") + palabra;
            float anchoLinea = fuente.getStringWidth(pruebaLinea) / 1000 * tamanoFuente;

            if (anchoLinea > anchoMaximo) {
                lineas.add(lineaActual.toString());
                lineaActual = new StringBuilder(palabra);
            } else {
                lineaActual.append((lineaActual.length() == 0 ? "" : " ") + palabra);
            }
        }

        // Agregar la última línea
        if (lineaActual.length() > 0) {
            lineas.add(lineaActual.toString());
        }

        return lineas;
    }
}
