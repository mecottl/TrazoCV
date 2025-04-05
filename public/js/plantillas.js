export async function generarCVEstilo3(doc, nombre, profesion, resumen, experiencia, educacion, habilidades) {
    const grisOscuro = '#333333';
    const blanco = '#FFFFFF';
    const negro = '#000000';
    const anchoPagina = doc.internal.pageSize.getWidth();
    const altoPagina = doc.internal.pageSize.getHeight();
  
    // Fondo lateral
    doc.setFillColor(grisOscuro);
    doc.rect(0, 0, 70, altoPagina, "F");
  
    // Cuadro para foto
    doc.setFillColor(blanco);
    doc.rect(15, 15, 40, 50, "F");
    doc.setTextColor(0);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("FOTO", 35, 45, { align: "center" });
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Descripción", 35, 50, { align: "center" });
  
    let y = 70;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(blanco);
    doc.text("DETALLES PERSONALES", 10, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(`Nombre: ${nombre}`, 10, y);
    y += 5;
    doc.text("Apellidos: Pérez García", 10, y); // si quieres, esto puede venir también del backend
  
    y += 10;
    doc.setFont("helvetica", "bold");
    doc.text("CONTACTO", 10, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.text("Número: ‪+34 666 777 888‬", 10, y);
    y += 5;
    doc.text("📧 Correo: ingeniero.perez@email.com", 10, y);
    y += 5;
    doc.text("Dirección: Calle Inventada, 123, Ciudad", 10, y);
  
    y += 10;
    doc.setFont("helvetica", "bold");
    doc.text("HABILIDADES", 10, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    const habilidadesList = habilidades.split(",");
    habilidadesList.forEach(habilidad => {
      doc.text("• " + habilidad.trim(), 10, y);
      y += 5;
    });
  
    // Sección derecha
    let x = 80;
    y = 20;
  
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(negro);
    doc.text(`${nombre} - ${profesion}`, x, y);
    y += 10;
  
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
  }
  