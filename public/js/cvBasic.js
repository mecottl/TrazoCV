// Refactorizamos el código para que se ejecute dentro de una función exportable.
export function generarPDF() {
    // Recopilación de los datos del formulario
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const edad = document.getElementById("edad").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const ciudad = document.getElementById("ciudad").value.trim();
    const pais = document.getElementById("pais").value.trim();
    const perfil = document.getElementById("perfil").value.trim();
    const formacion = document.getElementById("formacion").value.trim();
    const experiencia = document.getElementById("experiencia").value.trim();
    const habilidades = document.getElementById("habilidades").value.trim();
  
    // Crea el nombre completo
    const nombreCompleto = `${nombre} ${apellido}`;
  
    // Inicializa jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let y = 20; // Posición vertical inicial
  
    // Encabezado: Nombre y edad
    doc.setFontSize(22);
    doc.text(nombreCompleto, 20, y);
    y += 10;
    doc.setFontSize(16);
    doc.text(`Edad: ${edad}`, 20, y);
    y += 10;
  
    // Datos de contacto
    doc.setFontSize(12);
    doc.text(`Teléfono: ${telefono}`, 20, y);
    y += 8;
    doc.text(`Correo: ${correo}`, 20, y);
    y += 8;
    if (ciudad || pais) {
      doc.text(`Ciudad: ${ciudad}${pais ? ", " + pais : ""}`, 20, y);
      y += 10;
    }
  
    // Perfil personal
    doc.setFontSize(14);
    doc.text("Perfil Personal:", 20, y);
    y += 8;
    doc.setFontSize(12);
    doc.text(perfil, 20, y, { maxWidth: 170 });
    y += 20;
  
    // Formación académica
    doc.setFontSize(14);
    doc.text("Formación Académica:", 20, y);
    y += 8;
    doc.setFontSize(12);
    doc.text(formacion, 20, y, { maxWidth: 170 });
    y += 20;
  
    // Experiencia laboral
    doc.setFontSize(14);
    doc.text("Experiencia Laboral:", 20, y);
    y += 8;
    doc.setFontSize(12);
    doc.text(experiencia, 20, y, { maxWidth: 170 });
    y += 20;
  
    // Habilidades básicas
    doc.setFontSize(14);
    doc.text("Habilidades:", 20, y);
    y += 8;
    doc.setFontSize(12);
    doc.text(habilidades, 20, y, { maxWidth: 170 });
  
    // Descarga el PDF con un nombre personalizado
    doc.save(`CV_${nombre}_${apellido}.pdf`);
  }
  
  