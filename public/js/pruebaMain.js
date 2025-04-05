const obtenerRespuestaGemini = require("./geminiClient");

const prompt1 = `creame un cv como este y evita poner cualquier tipo de comentario, repitro no quiero ningun comentario solo el codigo solo dame el codigo y inventa los datos de un ingeniero: 
    function generarCVEstilo3(doc, nombre, profesion, resumen, experiencia, educacion, habilidades) {
    const grisOscuro ;
    const blanco ;
    const anchoPagina = doc.internal.pageSize.getWidth();
    const altoPagina = doc.internal.pageSize.getHeight();
  
    // Sidebar izquierda
    doc.setFillColor(grisOscuro);
    doc.rect(0, 0, 70, altoPagina, "F");
  
    // FOTO
    doc.setFillColor(blanco);
    doc.rect(15, 15, 40, 50, "F");
    doc.setTextColor(0);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("FOTO", 35, 45, { align: "center" });
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Descripción", 35, 50, { align: "center" });
  
    // DETALLES PERSONALES
    let y = 70;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(blanco);
    doc.text("DETALLES PERSONALES", 10, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(Nombre:, 10, y);
    y += 5;
    doc.text("Apellidos: Ejemplo", 10, y);
  
    // CONTACTO
    y += 10;
    doc.setFont("helvetica", "bold");
    doc.text("CONTACTO", 10, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.text("Número: 1234567890", 10, y);
    y += 5;
    doc.text("📧 Correo: email@dominio.com", 10, y);
    y += 5;
    doc.text("Dirección: Ciudad", 10, y);
  
    // HABILIDADES
    y += 10;
    doc.setFont("helvetica", "bold");
    doc.text("HABILIDADES", 10, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    const habilidadesList = habilidades.split(","); // Separar por comas
    doc.text("habilidades", 10, y);
    });
  
    // Cuerpo principal - lado derecho
    let x = 80;
    y = 20;
  
    // DESCRIPCIÓN
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(negro);
    doc.text("DESCRIPCIÓN", x, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    const resumenLines = doc.splitTextToSize(resumen, 110);
    doc.text(resumenLines, x, y);
    y += resumenLines.length * 6;
  
    doc.setDrawColor(grisOscuro);
    doc.setLineWidth(1);
    doc.line(x, y, 200, y);
    y += 10;
  
    // EXPERIENCIA
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(grisOscuro);
    doc.text("EXPERIENCIA", x, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    const expLines = doc.splitTextToSize(experiencia, 110);
    doc.text(expLines, x, y);
    y += expLines.length * 6;
  
    // FORMACIÓN
    y += 10;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("FORMACIÓN", x, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    const eduLines = doc.splitTextToSize(educacion, 110);
    doc.text(eduLines, x, y);
    y += eduLines.length * 6;
  
    // Universidad + localidad + fechas
    y += 5;
    doc.setFontSize(10);
    doc.text("Institución: Universidad Ejemplo", x, y);
    y += 5;
    doc.text("Localidad: Ciudad XYZ", x, y);
    y += 5;
    doc.text("Fecha de inicio: 2020", x, y);
    y += 5;
    doc.text("Fecha de fin: 2024", x, y);
  }
async function main() {
  const respuesta = await obtenerRespuestaGemini(prompt1);
  return respuesta; // <- devolvemos la respuesta
}

// Usamos .then() para manejar la respuesta fuera del main
main().then(respuesta => {
  console.log("Gemini respondió:", respuesta);

  // Aquí puedes hacer más cosas con la respuesta
});`;

async function main() {
  const respuesta = await obtenerRespuestaGemini(prompt1);
  return respuesta; // <- devolvemos la respuesta
}

// Usamos .then() para manejar la respuesta fuera del main
main().then(respuesta => {
  console.log("Gemini respondió:", respuesta);

  // Aquí puedes hacer más cosas con la respuesta
});